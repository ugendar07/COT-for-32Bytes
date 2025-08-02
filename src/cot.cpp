#define ASIO_STANDALONE
#define ASIO_DISABLE_THREADS

#define ASIO_STANDALONE
#define ASIO_DISABLE_THREADS

#include "cot.hpp"
#include "secp256k1.h"
#include "sha3.h"
#include "bignum.h"
#include "ecdsa.h"


#include <vector>
#include <cstring>
#include <iostream>
#include <random>

#define NUM_BITS 32

// Fixed scalar for testing (instead of true randomness)
static const uint8_t FIXED_SK[32] = {
    0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88,
    0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff, 0x00,
    0x01, 0x10, 0x20, 0x30, 0x40, 0x50, 0x60, 0x70,
    0x80, 0x90, 0xa0, 0xb0, 0xc0, 0xd0, 0xe0, 0xf0
};

// Hash raw data with SHA3-256
std::vector<uint8_t> sha3_hash(const uint8_t* data, size_t len) {
    uint8_t hash[32]; // SHA3-256 = 32 bytes
    sha3_256(data, len, hash);
    return std::vector<uint8_t>(hash, hash + 32);
}

// Perform ECDH: shared secret = priv * pub, then hash X coordinate
std::vector<uint8_t> compute_ecdh_shared_secret(const uint8_t priv_key_bytes[32], const std::vector<uint8_t>& pub_key) {
    curve_point pub_point;
    if (!ecdsa_read_pubkey(&secp256k1, pub_key.data(), &pub_point)) {
        std::cerr << "[Server] Invalid public key!\n";
        return {};
    }

    bignum256 priv_bn;
    bn_read_be(priv_key_bytes, &priv_bn);

    curve_point shared_point;
    point_multiply(&secp256k1, &priv_bn, &pub_point, &shared_point);

    uint8_t shared_x[32];
    bn_write_be(&shared_point.x, shared_x);

    return sha3_hash(shared_x, 32);
}


// uint32_t x = rand() % 256;  // or use std::random_device etc.
// std::cout << "[Server] Chose random x = " << x << "\n";




COTOutput perform_cots(
    const uint8_t x[32],
    const uint8_t y[32],
    const std::vector<std::vector<uint8_t>>& Rs,
    std::vector<COTMessage>& outMessages) {

    COTOutput result;
    result.Uis.clear();
    outMessages.clear();

    bignum256 bn_x;
    bn_read_be(x, &bn_x);
    bn_mod(&bn_x, &secp256k1.order);

    bignum256 bn_U_total;
    bn_zero(&bn_U_total);

    for (size_t i = 0; i < NUM_BITS; ++i) {
        int byte_index = 31 - (i / 8);
        int bit_index = i % 8;
        uint8_t yi = (y[byte_index] >> bit_index) & 1;

        // Generate random Ui
        uint8_t ui_bytes[32];
        secure_random_scalar(ui_bytes);

        bignum256 bn_Ui;
        bn_read_be(ui_bytes, &bn_Ui);// Compute Ui = SHA3(ECDH(sk, R_i)) % n
        std::vector<uint8_t> shared_hash = compute_ecdh_shared_secret(FIXED_SK, Rs[i]);
        if (shared_hash.empty()) {
            std::cerr << "[Server] ECDH failed at index " << i << "\n";
            continue;
        }

        result.Uis.push_back(ui_bytes[0]);  // For logging/debug only

        // std::cout << "[Server] Round " << i << ":\n";
        // std::cout << "  Ui     = 0x";
        // for (int b = 0; b < 32; ++b) printf("%02x", shared_hash[b]);
        // std::cout << "\n";

        // Compute m0 = Ui
        bignum256 bn_m0;
        bn_copy(&bn_Ui, &bn_m0);

        // Compute m1 = Ui + x mod n
        bignum256 bn_m1;
        bn_copy(&bn_Ui, &bn_m1);
        bn_add(&bn_m1, &bn_x);
        bn_mod(&bn_m1, &secp256k1.order);

        // Compute contrib = 2^i * Ui mod n
        bignum256 contrib;
        bn_copy(&bn_Ui, &contrib);
        for (size_t j = 0; j < i; ++j) {
            bn_lshift(&contrib);        // Multiply by 2
            bn_mod(&contrib, &secp256k1.order);
        }

        // U = (U - contrib) mod n
        bn_subtractmod(&bn_U_total, &contrib, &bn_U_total, &secp256k1.order);

        // Serialize m0 and m1
        uint8_t m0_buf[32], m1_buf[32];
        bn_write_be(&bn_m0, m0_buf);
        bn_write_be(&bn_m1, m1_buf);

        // Fill COTMessage
        COTMessage msg;
        msg.c0.assign(m0_buf, m0_buf + 32);
        msg.c1.assign(m1_buf, m1_buf + 32);
        outMessages.push_back(msg);
    }

    // Output U
    bn_write_be(&bn_U_total, result.U);

    std::cout << "[Server] Computed additive share U (hex): " ;
    for (int i = 0; i < 32; ++i) printf("%02x", result.U[i]);
    std::cout << "\n";

    return result;
}