import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2 } from 'lucide-react';
// import { Cloud } from 'lucide-react';
import '/src/assets/scss/components/file_upload.scss';
const FileUpload = React.forwardRef(
  ({ onFileUpload, onManualEntry, isLoading, onExpandEvent }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
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
      disabled: isLoading,
    });

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
      onExpandEvent();
    };

    return (
      // <div className={`upload-wrapper`}>
      <>
        {!isExpanded ? (
          <div className="vertical-bar" onClick={handleToggle}>
            <div className="vertical-text zuno-h2">Upload Brand/Product Details</div>
          </div>
        ) : (
          <div className="upload-container" ref={ref}>
            <h2 className="upload-title">Upload Brand/Product Details</h2>
            <div
              {...getRootProps()}
              className={`dropzone ${isDragging ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
            >
              <input {...getInputProps()} />
              {/* <Cloud className="upload-icon" size={48} /> */}

              {isLoading ? (
                <Loader2 className="upload-icon animate-spin" size={48} />
              ) : (
                <i className="fa fa-cloud-upload"></i>
              )}
              <p className="upload-text">
                {isLoading
                  ? 'Processing your file...'
                  : 'Drag an file here or upload a file (pdf, excel)'}
              </p>
            </div>
            <div className="divider">
              <span>or</span>
            </div>
            <button className="manual-entry-btn" disabled={isLoading} onClick={onManualEntry}>
              Add one by one
            </button>
          </div>
        )}
      </>
      // </div>
    );
  }
);

export default FileUpload;
