// =========================================
// SECUREX YARA RULE CONFIGURATION
// =========================================
//
// These are identifiers for the rules that
// the backend YARA service will use.
//
// The actual YARA rule definitions should
// eventually live on the backend.
// =========================================


// -----------------------------------------
// Rule identifiers
// -----------------------------------------

export const YARA_RULES = {

  MALWARE:
    "malware_detection",

  SUSPICIOUS_FILE:
    "suspicious_file",

  RANSOMWARE:
    "ransomware_detection",

};


// -----------------------------------------
// Scan configuration
// -----------------------------------------

export const YARA_SCAN_CONFIG = {

  rules: Object.values(YARA_RULES),

  stopOnFirstMatch: false,

  scanTimeout: 30000,

};


// -----------------------------------------
// Get configured rule names
// -----------------------------------------

export function getYaraRuleNames() {
  return [
    ...YARA_SCAN_CONFIG.rules
  ];
}


// -----------------------------------------
// Check whether rule exists
// -----------------------------------------

export function isKnownYaraRule(ruleName) {

  return YARA_SCAN_CONFIG.rules.includes(
    ruleName
  );

}