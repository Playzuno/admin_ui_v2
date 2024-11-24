import React from 'react';

interface TableCellProps {
  content: string;
  columnIndex: number;
  rowIndex: number;
  onDragStart: (columnIndex: number, rowIndex: number) => void;
  onDrop: (fromColumn: number, fromRow: number, toColumn: number, toRow: number) => void;
}

const TableCell: React.FC<TableCellProps> = ({
  content,
  columnIndex,
  rowIndex,
  onDragStart,
  onDrop,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('columnIndex', columnIndex.toString());
    e.dataTransfer.setData('rowIndex', rowIndex.toString());
    onDragStart(columnIndex, rowIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const fromColumn = Number(e.dataTransfer.getData('columnIndex'));
    const fromRow = Number(e.dataTransfer.getData('rowIndex'));
    onDrop(fromColumn, fromRow, columnIndex, rowIndex);
  };

  return (
    <div
      className="table-cell"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {content}
    </div>
  );
};

export default TableCell;