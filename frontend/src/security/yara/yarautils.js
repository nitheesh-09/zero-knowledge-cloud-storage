// =========================================
// SECUREX YARA UTILITIES
// =========================================


// -----------------------------------------
// Check whether scan completed
// -----------------------------------------

export function isScanCompleted(result) {

  return (
    result !== null &&
    typeof result === "object" &&
    result.scanned === true
  );

}


// -----------------------------------------
// Check whether file is clean
// -----------------------------------------

export function isScanClean(result) {

  return (
    isScanCompleted(result) &&
    result.clean === true &&
    result.malicious !== true
  );

}


// -----------------------------------------
// Check whether threat was detected
// -----------------------------------------

export function isThreatDetected(result) {

  return (
    result !== null &&
    typeof result === "object" &&
    result.malicious === true
  );

}


// -----------------------------------------
// Get matched rules
// -----------------------------------------

export function getMatchedRules(result) {

  if (
    !result ||
    !Array.isArray(result.matches)
  ) {
    return [];
  }

  return result.matches;

}


// -----------------------------------------
// Get scan message
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
// Normalize YARA result
// -----------------------------------------

export function normalizeYaraResult(result) {

  if (
    !result ||
    typeof result !== "object"
  ) {
    return {

      scanned: false,

      clean: false,

      malicious: false,

      matches: [],

      scanId: null,

      message:
        "Invalid YARA scan result.",

    };
  }


  return {

    scanned:
      result.scanned === true,

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
// Convert result into UI status
// -----------------------------------------

export function getScanStatus(result) {

  const normalized =
    normalizeYaraResult(result);


  // Scan has not completed
  if (!normalized.scanned) {

    return {

      status: "pending",

      label: "Scan pending",

      message:
        normalized.message,

    };

  }


  // Threat detected
  if (normalized.malicious) {

    return {

      status: "threat",

      label: "Threat detected",

      message:
        normalized.message,

    };

  }


  // Clean file
  if (normalized.clean) {

    return {

      status: "clean",

      label: "File is clean",

      message:
        normalized.message,

    };

  }


  // Unknown state
  return {

    status: "unknown",

    label: "Scan inconclusive",

    message:
      normalized.message,

  };

}