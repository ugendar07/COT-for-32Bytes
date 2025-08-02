import * as net from 'net';
import { sha256 } from '@noble/hashes/sha256';
import { ec as EC } from 'elliptic';
import * as protobuf from '../generated/message';
import { createInterface } from 'readline';

const ec = new EC('secp256k1');
const NUM_BITS = 32;

// secp256k1 group order (n)
const SECP256K1_ORDER = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter integer y (Bob's input): ", async (yInput) => {
    const y = parseInt(yInput);
    if (isNaN(y)) {
        console.error("Invalid number.");
        rl.close();
        return;
    }

    const socket = new net.Socket();
    const Rs: Uint8Array[] = [];
    const privKeys: any[] = [];

    for (let i = 0; i < NUM_BITS; i++) {
        const key = ec.genKeyPair();
        const pub = key.getPublic(false, 'hex'); // uncompressed (65 bytes)
        Rs.push(Buffer.from(pub, 'hex'));
        privKeys.push(key);
    }

    // Convert y to 32-byte buffer (big-endian)
    const yBytes = Buffer.alloc(32);
    yBytes.writeUInt32BE(y, 28); // Only fill last 4 bytes

    const clientMessage = protobuf.ClientCOTRequest.create({ y: yBytes, Rs });
    const encoded = protobuf.ClientCOTRequest.encode(clientMessage).finish();

    const lengthPrefix = Buffer.alloc(4);
    lengthPrefix.writeUInt32LE(encoded.length, 0);
    const fullMessage = Buffer.concat([lengthPrefix, encoded]);

    socket.connect(8080, '127.0.0.1', () => {
        console.log('[Client] Connected to server');
        socket.write(fullMessage);
    });

    let responseBuffer = Buffer.alloc(0);
    let expectedLength: number | null = null;

    socket.on('data', (chunk) => {
        responseBuffer = Buffer.concat([responseBuffer, chunk]);

        if (expectedLength === null && responseBuffer.length >= 4) {
            expectedLength = responseBuffer.readUInt32LE(0);
        }

        if (expectedLength !== null && responseBuffer.length >= 4 + expectedLength) {
            const message = responseBuffer.subarray(4, 4 + expectedLength);

            try {
                const decoded = protobuf.ServerCOTResponse.decode(message);
                const c0s = decoded.c0s ?? [];
                const c1s = decoded.c1s ?? [];

                if (c0s.length !== NUM_BITS || c1s.length !== NUM_BITS) {
                    throw new Error("Invalid response length");
                }

                let V = BigInt(0);

                for (let i = 0; i < NUM_BITS; i++) {
                    const bit = (y >> i) & 1;
                    const R = Rs[i];           // EC point from server
                    const key = privKeys[i];   // Bob's private scalar
                    const m = bit === 0 ? c0s[i] : c1s[i];

                    const pubPoint = ec.keyFromPublic(R).getPublic();
                    const shared = key.derive(pubPoint); // ECDH
                    const sharedBytes = Buffer.from(shared.toArray('be', 32));

                    const hash = sha256(sharedBytes);
                    const Ui = BigInt('0x' + Buffer.from(hash).toString('hex')) % SECP256K1_ORDER;

                    const mi = BigInt('0x' + Buffer.from(m).toString('hex')) % SECP256K1_ORDER;
                    const mci = (mi - Ui + SECP256K1_ORDER) % SECP256K1_ORDER;

                    const weight = BigInt(1) << BigInt(i);
                    V = (V + weight * mci) % SECP256K1_ORDER;
                }

                console.log(`[Client] Computed additive share V:\n0x${V.toString(16)}`);

            } catch (err: any) {
                console.error('[Client] Decode error:', err.message);
            }

            socket.destroy();
            rl.close();
        }
    });

    socket.on('end', () => {
        console.log('[Client] Server closed connection.');
    });

    socket.on('error', (err) => {
        console.error('[Client] Socket error:', err.message);
        rl.close();
    });

    socket.on('close', () => {
        console.log('[Client] Disconnected from server');
    });
});
