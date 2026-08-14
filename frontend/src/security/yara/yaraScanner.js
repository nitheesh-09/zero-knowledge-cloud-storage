// =========================================
// SECUREX YARA SCANNER
// Frontend → YARA Security Service
// =========================================

const YARA_SCAN_ENDPOINT = "/api/security/yara/scan";


// -----------------------------------------
// Scan a selected file
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
    throw new Error(
      "Unable to connect to the YARA scanning service."
    );
  }


  // ---------------------------------------
  // Handle server errors
  // ---------------------------------------

  if (!response.ok) {
    let message = "YARA scanning failed.";

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      // Ignore invalid error response
    }

    throw new Error(message);
  }


  // ---------------------------------------
  // Read scan result
  // ---------------------------------------

  const result = await response.json();


  // ---------------------------------------
  // Validate response
  // ---------------------------------------

  if (
    typeof result !== "object" ||
    result === null
  ) {
    throw new Error(
      "Invalid response from YARA scanning service."
    );
  }


  // ---------------------------------------
  // Normalize result
  // ---------------------------------------

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
// Convenience function
// -----------------------------------------

export async function isFileSafe(file) {
  const result = await scanFileWithYara(file);

  return result.scanned && result.clean;
}