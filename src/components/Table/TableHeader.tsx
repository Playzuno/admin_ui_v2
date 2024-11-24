import React from 'react';
import { Column } from './types';

interface TableHeaderProps {
  columns: Column[];
  onDrop: (fromIndex: number, toIndex: number) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, onDrop }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData('columnIndex'));
    if (fromIndex !== toIndex) {
      onDrop(fromIndex, toIndex);
    }
  };

  return (
    <div className="custom-table-header">
      {columns.map((column, index) => (
        <div
          key={`header-${column.accessor}`}
          className="header-cell"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          {column.header}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;