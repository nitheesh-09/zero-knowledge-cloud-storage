// src/crypto/ecc.js


// ========================================
// Generate ECC / ECDH key pair
// ========================================
export async function generateKeyPair() {

  return await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveBits"]
  );
}


// ========================================
// Export public key
// ========================================
export async function exportPublicKey(
  publicKey
) {

  return await window.crypto.subtle.exportKey(
    "jwk",
    publicKey
  );
}


// ========================================
// Export private key
// ========================================
export async function exportPrivateKey(
  privateKey
) {

  return await window.crypto.subtle.exportKey(
    "jwk",
    privateKey
  );
}


// ========================================
// Import public key
// ========================================
export async function importPublicKey(
  publicKeyData
) {

  return await window.crypto.subtle.importKey(
    "jwk",
    publicKeyData,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );
}


// ========================================
// Derive shared secret
// ========================================
export async function deriveSharedSecret(
  myPrivateKey,
  friendPublicKey
) {

  return await window.crypto.subtle.deriveBits(
    {
      name: "ECDH",
      public: friendPublicKey,
    },
    myPrivateKey,
    256
  );
}