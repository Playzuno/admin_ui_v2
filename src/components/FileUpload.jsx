import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { Cloud } from 'lucide-react';
import '/src/assets/scss/components/file_upload.scss';
const FileUpload = ({ onFileUpload, onManualEntry }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Brand/Product Details</h2>
      <div {...getRootProps()} className={`dropzone ${isDragging ? 'dragging' : ''}`}>
        <input {...getInputProps()} />
        {/* <Cloud className="upload-icon" size={48} /> */}
        <i className="fa fa-cloud-upload"></i>
        <p className="upload-text">Drag an file here or upload a file (pdf, excel)</p>
      </div>
      <div className="divider">
        <span>or</span>
      </div>
      <button className="manual-entry-btn" onClick={onManualEntry}>
        Add one by one
      </button>
    </div>
  );
};

export default FileUpload;
