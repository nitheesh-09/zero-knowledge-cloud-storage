// =========================================
// SECUREX YARA SCANNER
// =========================================
//
// This file communicates with the backend
// YARA scanning service.
//
// The actual YARA engine will run on the
// backend, not inside React.
// =========================================

const YARA_SCAN_ENDPOINT = "/api/security/yara/scan";


// -----------------------------------------
// Scan a file
// -----------------------------------------

export async function scanFileWithYara(file) {
  if (!(file instanceof File)) {
    throw new Error("Invalid file supplied for YARA scanning.");
  }

  const formData = new FormData();

  formData.append("file", file);

  let response;

  try {
    response = await fetch(YARA_SCAN_ENDPOINT, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error("YARA connection error:", error);

    throw new Error(
      "Unable to connect to the YARA scanning service."
    );
  }

  if (!response.ok) {
    let message = "YARA scanning failed.";

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      // Server did not return JSON.
    }

    throw new Error(message);
  }

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "Invalid response received from YARA service."
    );
  }

  if (!result || typeof result !== "object") {
    throw new Error(
      "Invalid YARA scan result."
    );
  }

  return {
    scanned: result.scanned === true,

    clean: result.clean === true,

    malicious: result.malicious === true,

    matches: Array.isArray(result.matches)
      ? result.matches
      : [],

    scanId: result.scanId ?? null,

    message:
      result.message ??
      "YARA scan completed.",
  };
}


// -----------------------------------------
// Simple safety check
// -----------------------------------------

export async function isFileSafe(file) {
  const result = await scanFileWithYara(file);

  return (
    result.scanned === true &&
    result.clean === true &&
    result.malicious !== true
  );
}