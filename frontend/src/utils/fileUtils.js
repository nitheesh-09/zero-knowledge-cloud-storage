// =========================================
// SECUREX FILE UTILITIES
// =========================================


// -----------------------------------------
// Maximum allowed file size
// -----------------------------------------
// 100 MB

const MAX_FILE_SIZE = 100 * 1024 * 1024;


// -----------------------------------------
// Check file size
// -----------------------------------------

export function isFileSizeValid(file) {
  if (!file) {
    return false;
  }

  return file.size <= MAX_FILE_SIZE;
}


// -----------------------------------------
// Format file size
// -----------------------------------------

export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 Bytes";
  }

  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  const safeIndex = Math.min(
    index,
    units.length - 1
  );

  const size =
    bytes / Math.pow(1024, safeIndex);

  return `${size.toFixed(2)} ${units[safeIndex]}`;
}


// -----------------------------------------
// Validate file name
// -----------------------------------------

export function isValidFileName(fileName) {
  if (!fileName || typeof fileName !== "string") {
    return false;
  }

  const trimmedName = fileName.trim();

  if (trimmedName.length === 0) {
    return false;
  }

  // Maximum filename length
  if (trimmedName.length > 255) {
    return false;
  }

  // Characters that should not appear
  // in a filename/path
  const invalidCharacters =
    /[<>:"/\\|?*\x00-\x1F]/;

  return !invalidCharacters.test(trimmedName);
}


// -----------------------------------------
// Get file extension
// -----------------------------------------

export function getFileExtension(fileName) {
  if (!fileName || typeof fileName !== "string") {
    return "";
  }

  const lastDot = fileName.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return fileName
    .slice(lastDot + 1)
    .toLowerCase();
}


// -----------------------------------------
// Validate complete file
// -----------------------------------------

export function validateFile(file) {

  // No file
  if (!file) {
    return {
      valid: false,
      error: "Please select a file.",
    };
  }


  // Make sure it is actually a File object
  if (!(file instanceof File)) {
    return {
      valid: false,
      error: "Invalid file.",
    };
  }


  // Validate filename
  if (!isValidFileName(file.name)) {
    return {
      valid: false,
      error: "The file name is invalid.",
    };
  }


  // Validate size
  if (!isFileSizeValid(file)) {
    return {
      valid: false,
      error: "File size cannot exceed 100 MB.",
    };
  }


  // Everything is valid
  return {
    valid: true,
    error: null,
  };
}