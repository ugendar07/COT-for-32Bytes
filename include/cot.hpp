#pragma once
#include <vector>
#include <cstdint>
#include <string>

struct COTMessage {
    std::vector<uint8_t> c0;
    std::vector<uint8_t> c1;
};

struct COTOutput {
    std::vector<uint32_t> Uis;
    uint8_t U[32];
};

COTOutput perform_cots(const uint8_t x[32], const uint8_t y[32],
                       const std::vector<std::vector<uint8_t>>& Rs,
                       std::vector<COTMessage>& outMessages);
