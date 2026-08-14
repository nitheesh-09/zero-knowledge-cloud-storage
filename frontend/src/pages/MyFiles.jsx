import { useState } from "react";
import "./MyFiles.css";

function MyFiles() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Example.pdf",
      size: "2.4 MB",
      type: "PDF",
      status: "Encrypted",
      date: "Today",
    },
    {
      id: 2,
      name: "Project.zip",
      size: "18.7 MB",
      type: "ZIP",
      status: "Encrypted",
      date: "Yesterday",
    },
  ]);

  const handleDelete = (id) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.id !== id)
    );
  };

  const handleDownload = (file) => {
    alert(
      `Download for "${file.name}" will be connected to the encrypted storage backend.`
    );
  };

  return (
    <div className="my-files-page">

      <div className="my-files-header">

        <div>
          <h1>My Files</h1>

          <p>
            Your encrypted files
          </p>
        </div>

        <div className="file-count">
          {files.length} files
        </div>

      </div>


      {files.length === 0 ? (

        <div className="empty-files">

          <div className="empty-files-icon">
            □
          </div>

          <h2>No files yet</h2>

          <p>
            Upload your first file to get started.
          </p>

        </div>

      ) : (

        <div className="files-list">

          {files.map((file) => (

            <div
              className="file-card"
              key={file.id}
            >

              <div className="file-icon">
                {file.type}
              </div>


              <div className="file-information">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {file.size} • {file.date}
                </span>

              </div>


              <div className="file-status">
                <span className="status-dot"></span>
                {file.status}
              </div>


              <div className="file-actions">

                <button
                  type="button"
                  onClick={() =>
                    handleDownload(file)
                  }
                >
                  Download
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(file.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyFiles;