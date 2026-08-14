// src/crypto/keyWrapping.js

// ================================
// ArrayBuffer -> Base64
// ================================
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}


// ================================
// Base64 -> ArrayBuffer
// ================================
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}


// ================================
// Make sure recipient public key
// is a CryptoKey
// ================================
async function ensurePublicKey(publicKey) {

  if (!publicKey) {
    throw new Error(
      "wrapFileKey: publicKey is undefined"
    );
  }

  // Already a CryptoKey
  if (publicKey instanceof CryptoKey) {
    return publicKey;
  }

  // Otherwise assume JWK
  return await window.crypto.subtle.importKey(
    "jwk",
    publicKey,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );
}


// ================================
// WRAP AES FILE KEY
// ================================
export async function wrapFileKey(
  aesFileKey,
  publicKey
) {

  console.log("🔐 Starting AES key wrapping...");
  console.log("Public key received:", publicKey);

  // 1. Make sure recipient public key is CryptoKey
  const recipientPublicKey =
    await ensurePublicKey(publicKey);

  console.log("✅ Recipient public key ready");


  // 2. Generate temporary / ephemeral ECDH key pair
  const ephemeralKeyPair =
    await window.crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      true,
      ["deriveBits"]
    );

  console.log("🔑 Ephemeral ECDH key pair generated");


  // 3. Derive shared secret
  const sharedSecret =
    await window.crypto.subtle.deriveBits(
      {
        name: "ECDH",
        public: recipientPublicKey,
      },
      ephemeralKeyPair.privateKey,
      256
    );

  console.log("🤝 Shared secret derived");


  // 4. Import shared secret into HKDF
  const keyMaterial =
    await window.crypto.subtle.importKey(
      "raw",
      sharedSecret,
      "HKDF",
      false,
      ["deriveKey"]
    );


  // 5. Generate random salt
  const salt =
    window.crypto.getRandomValues(
      new Uint8Array(32)
    );


  // 6. Derive AES wrapping key
  const wrappingKey =
    await window.crypto.subtle.deriveKey(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt: salt,
        info: new TextEncoder().encode(
          "SecureX file-key wrapping"
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


  // 7. Generate IV for wrapping
  const wrappingIv =
    window.crypto.getRandomValues(
      new Uint8Array(12)
    );


  // 8. Export AES file key
  const rawFileKey =
    await window.crypto.subtle.exportKey(
      "raw",
      aesFileKey
    );


  // 9. Encrypt AES file key
  const wrappedKey =
    await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: wrappingIv,
      },
      wrappingKey,
      rawFileKey
    );

  console.log("🔒 AES file key wrapped successfully");


  // 10. Export ephemeral public key
  const ephemeralPublicKey =
    await window.crypto.subtle.exportKey(
      "jwk",
      ephemeralKeyPair.publicKey
    );


  // 11. Return everything needed for decryption
  return {
    wrappedKey:
      arrayBufferToBase64(wrappedKey),

    iv:
      arrayBufferToBase64(wrappingIv),

    salt:
      arrayBufferToBase64(salt),

    ephemeralPublicKey,
  };
}


// ================================
// UNWRAP AES FILE KEY
// ================================
export async function unwrapFileKey(
  wrappedKey,
  iv,
  salt,
  ephemeralPublicKey,
  privateKey
) {

  console.log("🔓 Starting AES key unwrapping...");


  // 1. Import ephemeral public key
  const ephemeralKey =
    await window.crypto.subtle.importKey(
      "jwk",
      ephemeralPublicKey,
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      true,
      []
    );


  // 2. Derive same shared secret
  const sharedSecret =
    await window.crypto.subtle.deriveBits(
      {
        name: "ECDH",
        public: ephemeralKey,
      },
      privateKey,
      256
    );


  console.log("🤝 Shared secret recreated");


  // 3. Import shared secret into HKDF
  const keyMaterial =
    await window.crypto.subtle.importKey(
      "raw",
      sharedSecret,
      "HKDF",
      false,
      ["deriveKey"]
    );


  // 4. Convert salt
  const saltBytes =
    base64ToArrayBuffer(salt);


  // 5. Derive same wrapping key
  const wrappingKey =
    await window.crypto.subtle.deriveKey(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt: saltBytes,
        info: new TextEncoder().encode(
          "SecureX file-key wrapping"
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


  // 6. Decrypt wrapped AES key
  const rawFileKey =
    await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToArrayBuffer(iv),
      },
      wrappingKey,
      base64ToArrayBuffer(wrappedKey)
    );


  // 7. Import decrypted bytes as AES key
  const aesFileKey =
    await window.crypto.subtle.importKey(
      "raw",
      rawFileKey,
      {
        name: "AES-GCM",
      },
      true,
      ["encrypt", "decrypt"]
    );

  console.log("🔑 AES file key successfully unwrapped");

  return aesFileKey;
}