import React from 'react';
import '/src/assets/scss/components/snackbar.scss';

const Snackbar = ({ message, isOpen, onClose, type = 'error' }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    // console.log(isOpen, message);
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`snackbar ${type}`}>
      <div className="snackbar-content">
        <span>{message}</span>
        <button className="snackbar-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
