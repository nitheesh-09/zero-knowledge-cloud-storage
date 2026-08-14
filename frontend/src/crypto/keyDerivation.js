// src/crypto/keyDerivation.js

export async function deriveAESKey(sharedSecret) {

  // Import the ECDH shared secret
  const keyMaterial =
    await window.crypto.subtle.importKey(
      "raw",
      sharedSecret,
      "HKDF",
      false,
      ["deriveKey"]
    );

  // Derive a 256-bit AES-GCM key
  const aesKey =
    await window.crypto.subtle.deriveKey(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt: new Uint8Array(32),
        info: new TextEncoder().encode(
          "SecureX messaging key"
        ),
      },
      keyMaterial,
      {
        name: "AES-GCM",
        length: 256,
      },
      false,
      ["encrypt", "decrypt"]
    );

  return aesKey;
}