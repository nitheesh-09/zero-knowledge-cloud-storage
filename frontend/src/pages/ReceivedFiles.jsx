import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceivedFiles.css";

function ReceivedFiles() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "project.pdf",
      size: "4.2 MB",
      sender: "SecureX User",
      date: "Today",
      status: "Encrypted",
    },
    {
      id: 2,
      name: "assignment.zip",
      size: "12.8 MB",
      sender: "SecureX User",
      date: "Yesterday",
      status: "Encrypted",
    },
  ]);

  const handleDecrypt = (file) => {
    alert(
      `Decryption for "${file.name}" will be connected to the receiver private-key flow.`
    );
  };

  return (
    <div className="received-files-page">

      {/* HEADER */}

      <header className="received-header">

        <div className="received-header-left">

          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/chat")}
          >
            ←
          </button>

          <div>
            <h1>Received Files</h1>

            <p>
              Encrypted files shared with you
            </p>
          </div>

        </div>

        <div className="received-count">
          {files.length} files
        </div>

      </header>


      {/* SECURITY MESSAGE */}

      <div className="receiver-security">

        <div className="receiver-security-icon">
          🔒
        </div>

        <div>
          <strong>
            Receiver-side protected
          </strong>

          <p>
            Files are decrypted using your private key.
          </p>
        </div>

      </div>


      {/* FILE LIST */}

      {files.length === 0 ? (

        <div className="received-empty">

          <div className="received-empty-icon">
            □
          </div>

          <h2>
            No received files
          </h2>

          <p>
            Files shared with you will appear here.
          </p>

        </div>

      ) : (

        <div className="received-list">

          {files.map((file) => (

            <div
              className="received-file-card"
              key={file.id}
            >

              {/* FILE ICON */}

              <div className="received-file-icon">
                FILE
              </div>


              {/* FILE INFORMATION */}

              <div className="received-file-info">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {file.size} • {file.date}
                </span>

                <small>
                  From: {file.sender}
                </small>

              </div>


              {/* STATUS */}

              <div className="received-file-status">

                <span className="received-status-dot"></span>

                {file.status}

              </div>


              {/* ACTION */}

              <button
                className="decrypt-button"
                type="button"
                onClick={() => handleDecrypt(file)}
              >
                Decrypt & Download
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ReceivedFiles;