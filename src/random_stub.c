#include <stdint.h>
#include <stdlib.h>

uint32_t random32(void) {
    return ((uint32_t)rand() << 16) ^ (uint32_t)rand();
}
