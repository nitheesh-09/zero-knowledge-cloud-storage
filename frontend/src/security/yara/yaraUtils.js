// =========================================
// SECUREX YARA UTILITIES
// =========================================


// -----------------------------------------
// Check whether a scan completed
// -----------------------------------------

export function isScanCompleted(result) {
  return (
    result !== null &&
    typeof result === "object" &&
    result.scanned === true
  );
}


// -----------------------------------------
// Check whether a file is clean
// -----------------------------------------

export function isScanClean(result) {
  return (
    isScanCompleted(result) &&
    result.clean === true &&
    result.malicious !== true
  );
}


// -----------------------------------------
// Check whether a threat was detected
// -----------------------------------------

export function isThreatDetected(result) {
  return (
    result !== null &&
    typeof result === "object" &&
    result.malicious === true
  );
}


// -----------------------------------------
// Get matched YARA rules
// -----------------------------------------

export function getMatchedRules(result) {
  if (!result || !Array.isArray(result.matches)) {
    return [];
  }

  return result.matches;
}


// -----------------------------------------
// Get a user-friendly scan message
// -----------------------------------------

export function getScanMessage(result) {
  if (!result) {
    return "No YARA scan result available.";
  }

  if (result.message) {
    return result.message;
  }

  if (isThreatDetected(result)) {
    return "Potentially malicious file detected.";
  }

  if (isScanClean(result)) {
    return "No configured YARA rules matched.";
  }

  return "YARA scan could not be completed.";
}


// -----------------------------------------
// Normalize a YARA result
// -----------------------------------------

export function normalizeYaraResult(result) {
  if (!result || typeof result !== "object") {
    return {
      scanned: false,
      clean: false,
      malicious: false,
      matches: [],
      scanId: null,
      message: "Invalid YARA scan result.",
    };
  }

  return {
    scanned: result.scanned === true,

    clean:
      result.clean === true &&
      result.malicious !== true,

    malicious:
      result.malicious === true,

    matches:
      Array.isArray(result.matches)
        ? result.matches
        : [],

    scanId:
      result.scanId ?? null,

    message:
      getScanMessage(result),
  };
}


// -----------------------------------------
// Prepare result for UI
// -----------------------------------------

export function getScanStatus(result) {
  const normalized = normalizeYaraResult(result);

  if (!normalized.scanned) {
    return {
      status: "pending",
      label: "Scan pending",
      message: normalized.message,
    };
  }

  if (normalized.malicious) {
    return {
      status: "threat",
      label: "Threat detected",
      message: normalized.message,
    };
  }

  if (normalized.clean) {
    return {
      status: "clean",
      label: "File is clean",
      message: normalized.message,
    };
  }

  return {
    status: "unknown",
    label: "Scan inconclusive",
    message: normalized.message,
  };
}