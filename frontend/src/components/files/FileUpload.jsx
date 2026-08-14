import { useRef, useState } from "react";
import "./fileupload.css";
import {
  formatFileSize,
  validateFile,
} from "../../utils/fileUtils";

function FileUpload() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleChooseFile = () => {
    setError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate selected file
    const result = validateFile(file);

    if (!result.valid) {
      setSelectedFile(null);
      setError(result.error);

      // Allow selecting the same file again
      event.target.value = "";

      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const handleChangeFile = () => {
    setError("");
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload">

      {/* Hidden file input */}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="file-input"
      />


      {/* Error message */}

      {error && (
        <div className="file-upload-error">
          {error}
        </div>
      )}


      {/* No file selected */}

      {!selectedFile && (
        <button
          type="button"
          className="upload-file-button"
          onClick={handleChooseFile}
        >
          <span>+</span>
          Upload a file
        </button>
      )}


      {/* File selected */}

      {selectedFile && (
        <div className="selected-file">

          <div className="selected-file-info">

            <div className="selected-file-icon">
              F
            </div>

            <div>

              <strong>
                {selectedFile.name}
              </strong>

              <span>
                {formatFileSize(selectedFile.size)}
              </span>

            </div>

          </div>


          <button
            type="button"
            className="change-file-button"
            onClick={handleChangeFile}
          >
            Change
          </button>

        </div>
      )}

    </div>
  );
}

export default FileUpload;