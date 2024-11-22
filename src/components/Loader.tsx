import React from 'react';
import '/src/assets/scss/components/loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-dialog">
        <div className="loader-spinner"></div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
