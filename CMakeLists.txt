cmake_minimum_required(VERSION 3.10)
project(COTServer)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


add_definitions(-DPB_ENABLE_MALLOC)


include_directories(
    include
    external/trezor-crypto
    external/trezor-crypto/ed25519-donna
)

# Set source files
set(SOURCES
    src/main.cpp
    src/cot.cpp
    src/message.pb.c
    src/pb_common.c
    src/pb_encode.c
    src/pb_decode.c
    src/random_stub.c

    
    external/trezor-crypto/bignum.c
    external/trezor-crypto/ecdsa.c
    external/trezor-crypto/sha3.c
    external/trezor-crypto/sha2.c
    external/trezor-crypto/memzero.c
    external/trezor-crypto/hasher.c
    external/trezor-crypto/address.c
    external/trezor-crypto/base58.c
    external/trezor-crypto/rfc6979.c
    external/trezor-crypto/blake256.c
    external/trezor-crypto/blake2b.c


    external/trezor-crypto/secp256k1.c
    external/trezor-crypto/ripemd160.c
    external/trezor-crypto/hmac.c
    external/trezor-crypto/hmac_drbg.c
    external/trezor-crypto/groestl.c
    external/trezor-crypto/ripemd160.c
    
    
)

add_definitions(
    -DUSE_BLAKE
    -DUSE_SHA256
    -DUSE_SHA3
    -DUSE_KECCAK
    -DUSE_RIPEMD160
    -DUSE_GROESTL
    -DUSE_BN_PRINT
)

# Include directories
include_directories(
    include
    external/trezor-crypto
    ${CMAKE_CURRENT_SOURCE_DIR}
)

# Add executable
add_executable(COTServer ${SOURCES})

 
# Link with Winsock for Windows networking
if (WIN32)
    target_link_libraries(COTServer ws2_32)
endif()

# Link libraries if needed
# target_link_libraries(COTServer pthread)  # If you're using threading
