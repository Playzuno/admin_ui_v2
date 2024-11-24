import React, { useState, useRef, useEffect } from 'react';
// import { ArrowLeftRight } from 'lucide-react';
import '/src/assets/scss/components/resizable_container.scss';
const ResizableContainer = ({ children, minWidth = 400, maxWidth = 1200 }) => {
  const [width, setWidth] = useState(900);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = e => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  };

  useEffect(() => {
    const handleMouseMove = e => {
      if (!isDragging) return;

      const delta = e.clientX - startXRef.current;
      const newWidth = Math.min(Math.max(startWidthRef.current + delta, minWidth), maxWidth);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minWidth, maxWidth]);

  return (
    <div className="resizable-wrapper">
      <div ref={containerRef} className="resizable-container" style={{ width: `${width}px` }}>
        {children}
      </div>
      <div
        className={`resize-handle ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        {/* <ArrowLeftRight className="resize-icon" size={20} /> */}
        <i className="fa  fa-arrows-h"></i>
      </div>
    </div>
  );
};

export default ResizableContainer;
