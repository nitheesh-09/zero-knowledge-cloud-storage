// src/crypto/fileEncryption.js

import { wrapFileKey, unwrapFileKey } from "./keyWrapping";


// ========================================
// ENCRYPT FILE
// ========================================
export async function encryptFile(
  file,
  publicKey
) {

  if (!file) {
    throw new Error("No file provided");
  }

  if (!publicKey) {
    throw new Error("No public key provided");
  }

  console.log("📄 Reading file:", file.name);

  // 1. Read file
  const fileData =
    await file.arrayBuffer();


  // 2. Generate AES-256-GCM file key
  const aesFileKey =
    await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );


  console.log("🔑 AES-256 file key generated");


  // 3. Generate file encryption IV
  const fileIv =
    window.crypto.getRandomValues(
      new Uint8Array(12)
    );


  // 4. Encrypt actual file
  const encryptedData =
    await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: fileIv,
      },
      aesFileKey,
      fileData
    );


  console.log("🔒 File data encrypted with AES-256-GCM");


  // 5. Wrap AES file key using ECC/ECDH
  const wrappedKeyData =
    await wrapFileKey(
      aesFileKey,
      publicKey
    );


  console.log("🔐 AES file key wrapped");


  // 6. Return encrypted package
  return {

    encryptedData,

    // IV used for actual file encryption
    fileIv,

    // Wrapped AES key
    wrappedKey:
      wrappedKeyData.wrappedKey,

    // IV used to encrypt/wrap AES key
    wrappingIv:
      wrappedKeyData.iv,

    // HKDF salt
    salt:
      wrappedKeyData.salt,

    // Temporary ECDH public key
    ephemeralPublicKey:
      wrappedKeyData.ephemeralPublicKey,

    // Metadata
    fileName:
      file.name,

    fileType:
      file.type,

    originalSize:
      file.size,
  };
}


// ========================================
// DECRYPT FILE
// ========================================
export async function decryptFile(
  encryptedData,
  fileIv,
  aesKey,
  fileName,
  fileType
) {

  const decryptedData =
    await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: fileIv,
      },
      aesKey,
      encryptedData
    );


  return new File(
    [decryptedData],
    fileName,
    {
      type: fileType,
    }
  );
}