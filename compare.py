import secrets

# secp256k1 order
p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

# Constants
x = 689737994504369569214816515299578963479734985415803615786824941839246864036134
y = 217

# Hex values of U and V
U_hex = 0x612d98448fb0d9057c50e0abc797f0e814b31a69921b70a0efd7b45fe6cda73e
V_hex = 0x39104940991b970e3b0a1df67e519c3c0a99a258a9c17c027ff535fcbb74adec


# Compute expected result
expected = (x * y) % p
received = (U_hex + V_hex) % p

# Output
print(f"x = {x}")
print(f"x = {y}")
print(f"x * y % p = {hex(expected)}")
print(f"U = {hex(U_hex)}")
print(f"V = {hex(V_hex)}")
print(f"U + V % p = {hex(received)}")


if expected == received:
    print("✅ MATCH")
else:
    print("❌ MISMATCH")
