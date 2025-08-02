#define ASIO_STANDALONE
#define ASIO_DISABLE_THREADS


#include <iostream>
#include <iomanip>
#include <asio.hpp>
#include <random>

#include "message.pb.h"
#include "cot.hpp"
#include "pb_encode.h"
#include "pb_decode.h"
#include "bignum.h"


using asio::ip::tcp;


void print_scalar_as_decimal(const uint8_t scalar[32]) {
    std::cout << "[Server] x (hex): 0x";

    for (int i = 0; i < 32; ++i) {
        std::cout << std::hex << std::setw(2) << std::setfill('0') << (int)scalar[i];
    }
    std::cout << std::dec << "\n";
}

static void secure_random_scalar(uint8_t out[32]) {
    for (int i = 0; i < 32; ++i) out[i] = static_cast<uint8_t>(i + 1);
}

void handle_client(tcp::socket& socket) {
    try {
        auto cleanup = [&]() {
            std::error_code ec;
            socket.shutdown(tcp::socket::shutdown_both, ec);
            socket.close(ec);
        };

        std::cout << "[Server] Client connected\n";

        // Step 1: Read 4-byte little-endian length prefix
        uint8_t len_buf[4];
        asio::read(socket, asio::buffer(len_buf, 4));

        uint32_t msg_len = len_buf[0] |
            (len_buf[1] << 8) |
            (len_buf[2] << 16) |
            (len_buf[3] << 24);

        // std::cout << "[Server] Expecting message of length: " << msg_len << "\n";

        const uint32_t MAX_MESSAGE_SIZE = 4096;
        if (msg_len > MAX_MESSAGE_SIZE) {
            std::cerr << "[Server] Message too large, rejecting.\n";
            cleanup();
            return;
        }

        // Step 2: Read the actual message
        std::vector<uint8_t> buffer(msg_len);
        asio::read(socket, asio::buffer(buffer));
        // std::cout << "[Server] Received " << buffer.size() << " bytes\n";

        // Step 3: Decode request
        ClientCOTRequest request = ClientCOTRequest_init_zero;
        pb_istream_t istream = pb_istream_from_buffer(buffer.data(), buffer.size());
        if (!pb_decode(&istream, ClientCOTRequest_fields, &request)) {
            std::cerr << "[Server] Decoding failed: " << PB_GET_ERROR(&istream) << "\n";
            cleanup();
            return;
        }

        if (request.y.size != 32) {
            std::cerr << "[Server] Invalid y size: " << request.y.size << "\n";
            cleanup();
            return;
        }

        std::array<uint8_t, 32> x;   
        secure_random_scalar(x.data());
        print_scalar_as_decimal(x.data());
        // bignum256 val;
        // bn_read_be(x.data(), &val);  // Convert from bytes
        // bn_print("Value: ", &val);  // Optional debug print
        // std::cout << "[Server] Chose random x = " << x.data() << "\n";
        // std::cout << "[Server] Decoded y = " << request.y << ", Rs_count = " << request.Rs_count << "\n";

        std::array<uint8_t, 32> y;
        memcpy(y.data(), request.y.bytes, 32);
        
        // Step 4: Parse Rs
        std::vector<std::vector<uint8_t>> Rs;
        for (size_t i = 0; i < request.Rs_count; ++i) {
            const pb_bytes_array_t* arr = request.Rs[i];
            // std::cout << "[Server] R[" << i << "] size = " << arr->size << "\n";
            Rs.emplace_back(arr->bytes, arr->bytes + arr->size);
        }

        std::vector<COTMessage> outMessages;
        try {
            COTOutput result = perform_cots(x.data(), y.data(), Rs, outMessages);
            // std::cout << "[Server] perform_cots returned " << outMessages.size() << " messages\n";
        } catch (const std::exception& e) {
            std::cerr << "[Server] perform_cots exception: " << e.what() << "\n";
            cleanup();
            return;
        }

        if (outMessages.empty()) {
            std::cerr << "[Server] COT output is empty\n";
            cleanup();
            return;
        }

        // std::cout << "[Server] Sample c0 size: " << outMessages[0].c0.size()
        //           << ", c1 size: " << outMessages[0].c1.size() << "\n";



        // Step 5: Prepare response
        ServerCOTResponse response = ServerCOTResponse_init_zero;
        response.c0s_count = outMessages.size();
        response.c1s_count = outMessages.size();

        // std::cout << "[Server] response.c0s_count = " << response.c0s_count
        //       << ", response.c1s_count = " << response.c1s_count << "\n";

        for (size_t i = 0; i < outMessages.size(); ++i) {
            const auto& c0 = outMessages[i].c0;
            const auto& c1 = outMessages[i].c1;

            if (c0.size() > 64 || c1.size() > 64) {
                std::cerr << "[Server] ERROR: c0/c1 size too large at index " << i << "\n";
                cleanup();
                return;
            }

            response.c0s[i].size = c0.size();
            memcpy(response.c0s[i].bytes, c0.data(), c0.size());

            response.c1s[i].size = c1.size();
            memcpy(response.c1s[i].bytes, c1.data(), c1.size());

            // std::cout << "[Server] Copied c0[" << i << "] and c1[" << i << "] (size = " << c0.size() << ")\n";
        }

        // Step 6: Encode response
        uint8_t out_buf[8192];
        pb_ostream_t ostream = pb_ostream_from_buffer(out_buf + 4, sizeof(out_buf) - 4);

        std::cout << "[Server] Starting protobuf encode...\n";
        if (!pb_encode(&ostream, ServerCOTResponse_fields, &response)) {
            std::cerr << "[Server] Encoding failed: " << PB_GET_ERROR(&ostream) << "\n";
            cleanup();
            return;
        }
        // std::cout << "[Server] Protobuf encode complete.\n";

        uint32_t resp_len = ostream.bytes_written;

        // Write length prefix
        out_buf[0] = static_cast<uint8_t>(resp_len & 0xFF);
        out_buf[1] = static_cast<uint8_t>((resp_len >> 8) & 0xFF);
        out_buf[2] = static_cast<uint8_t>((resp_len >> 16) & 0xFF);
        out_buf[3] = static_cast<uint8_t>((resp_len >> 24) & 0xFF);

        // std::cout << "[Server] Sending response: total size = " << (resp_len + 4) << " bytes\n";
        asio::write(socket, asio::buffer(out_buf, resp_len + 4));
        socket.shutdown(tcp::socket::shutdown_send);



        // std::cout << "[Server] Response sent and cleaned up.\n";
        cleanup();

    } catch (const std::exception& e) {
        std::cerr << "[Server] Exception: " << e.what() << "\n";
        std::error_code ec;
        socket.shutdown(tcp::socket::shutdown_both, ec);
        socket.close(ec);
    }
}


int main() {
    try {
        asio::io_context io;
        tcp::acceptor acceptor(io, tcp::endpoint(tcp::v4(), 8080));
        std::cout << "[Server] Listening on port 8080...\n";

        while (true) {
            tcp::socket socket(io);
            acceptor.accept(socket);
            std::cout << "[Server] Client connected\n";
            handle_client(socket);
        }
    } catch (std::exception& e) {
        std::cerr << "Server error: " << e.what() << "\n";
    }
    return 0;
}
