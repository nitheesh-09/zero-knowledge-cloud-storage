// src/crypto/aes.js

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}


// Convert Base64 back to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}


// Encrypt a message using AES-256-GCM
export async function encryptMessage(message, aesKey) {

  // Convert message into bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Generate a random 12-byte IV
  const iv = window.crypto.getRandomValues(
    new Uint8Array(12)
  );

  // Encrypt
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    data
  );

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv),
  };
}


// Decrypt a message
export async function decryptMessage(
  ciphertext,
  iv,
  aesKey
) {

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToArrayBuffer(iv),
    },
    aesKey,
    base64ToArrayBuffer(ciphertext)
  );

  const decoder = new TextDecoder();

  return decoder.decode(decrypted);
}