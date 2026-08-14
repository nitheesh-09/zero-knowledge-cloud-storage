import { useState } from "react";

import {
  validateFile,
  formatFileSize,
} from "../../utils/fileUtils";

import { scanFileWithYara } from "../../security/yaraScanner";

import {
  getScanStatus,
  getMatchedRules,
} from "../../security/yara/yarautils";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    setSelectedFile(null);
    setScanResult(null);
    setError("");

    if (!file) {
      return;
    }

    const validation = validateFile(file);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setSelectedFile(file);
    setScanning(true);

    try {
      const result = await scanFileWithYara(file);

      setScanResult(result);
    } catch (scanError) {
      setError(
        scanError instanceof Error
          ? scanError.message
          : "YARA scanning failed."
      );
    } finally {
      setScanning(false);
    }
  }

  const scanStatus = scanResult
    ? getScanStatus(scanResult)
    : null;

  const matchedRules = scanResult
    ? getMatchedRules(scanResult)
    : [];

  return (
    <div className="file-upload">

      <input
        type="file"
        onChange={handleFileChange}
        disabled={scanning}
      />

      {selectedFile && (
        <div className="file-details">

          <p>
            <strong>File:</strong>{" "}
            {selectedFile.name}
          </p>

          <p>
            <strong>Size:</strong>{" "}
            {formatFileSize(selectedFile.size)}
          </p>

        </div>
      )}

      {scanning && (
        <p>
          Scanning file...
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

      {scanStatus && (
        <div className="scan-result">

          <p>
            <strong>
              {scanStatus.label}
            </strong>
          </p>

          <p>
            {scanStatus.message}
          </p>

          {matchedRules.length > 0 && (
            <div>
              <strong>
                Matched rules:
              </strong>

              <ul>
                {matchedRules.map((rule, index) => (
                  <li key={index}>
                    {typeof rule === "string"
                      ? rule
                      : JSON.stringify(rule)}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default FileUpload;