// =========================================
// SECUREX YARA RULE CONFIGURATION
// =========================================

// Rule names that the backend YARA service
// is expected to use.
//
// IMPORTANT:
// These are rule identifiers, not the actual
// YARA detection engine.

export const YARA_RULES = {
  MALWARE: "malware_detection",
  SUSPICIOUS_FILE: "suspicious_file",
  RANSOMWARE: "ransomware_detection",
};


// -----------------------------------------
// Default scan configuration
// -----------------------------------------

export const YARA_SCAN_CONFIG = {
  rules: Object.values(YARA_RULES),

  stopOnFirstMatch: false,

  scanTimeout: 30000,
};


// -----------------------------------------
// Get all configured rule names
// -----------------------------------------

export function getYaraRuleNames() {
  return [...YARA_SCAN_CONFIG.rules];
}


// -----------------------------------------
// Check whether a rule is configured
// -----------------------------------------

export function isKnownYaraRule(ruleName) {
  return YARA_SCAN_CONFIG.rules.includes(ruleName);
}