import React, { useState } from "react";
import './FileUpload.scss';
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileUpload = ({ onUpload, onDownload }) => {
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior (opening the file)
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Extract files from the event
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Add new files to the state

    if (onUpload) {
      onUpload(droppedFiles); // Trigger callback
    }
  };

  const handleBrowseFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    if (onUpload) {
      onUpload(selectedFiles); // Trigger callback
    }
  };

  return (
    <div className="file-upload-container">
      <h3>Upload File</h3>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={()=>{handleDrop}}
        // onDrop={handleDrop}
        // onDrop={(e)=>{
        //   e.preventDefault();
        //   e.stopPropagation();
        //   handleDrop();
        // }}
      >
        <span className="d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </span>
        <p className="d-flex justify-content-center align-items-center">
          Drag and Drop files here or
          <label className="browse-link">
            Browse
            <input
              type="file"
              multiple
              onChange={handleBrowseFiles}
              style={{ display: "none" }}
            />
          </label>
        </p>
      </div>

      <div className="file-list">
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="file-actions">
        <button
          className="download-button"
          onClick={onDownload}
          // disabled={!files.length}
        >
          Download
        </button>
        <button
          className="upload-button"
          onClick={() => onUpload(files)}
          // disabled={!files.length}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
