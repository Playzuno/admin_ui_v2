import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import { Column, TableData } from './types';
import '/src/assets/scss/components/custom_table.css';

interface CustomTableProps {
  columns: Column[];
  data: TableData[];
  setData: (data: TableData[]) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns: initialColumns,
  data: data,
  setData: setData,
}) => {
  const [columns, setColumns] = useState(initialColumns);
  // const [data, setData] = useState(initialData);
  const [dragStart, setDragStart] = useState<{ column: number; row: number } | null>(null);

  const handleColumnDrop = (fromIndex: number, toIndex: number) => {
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setColumns(newColumns);
  };

  const handleCellDragStart = (columnIndex: number, rowIndex: number) => {
    setDragStart({ column: columnIndex, row: rowIndex });
  };

  const handleCellDrop = (fromColumn: number, fromRow: number, toColumn: number, toRow: number) => {
    if (fromColumn === toColumn && fromRow === toRow) return;

    const newData = data.map((row, rowIndex) => {
      if (rowIndex === fromRow || rowIndex === toRow) {
        const newRow = { ...row };
        if (rowIndex === fromRow) {
          const fromAccessor = columns[fromColumn].accessor;
          const toAccessor = columns[toColumn].accessor;
          const temp = newRow[fromAccessor];
          newRow[fromAccessor] = data[toRow][toAccessor];
          newRow[toAccessor] = temp;
        }
        return newRow;
      }
      return row;
    });

    setData(newData);
    setDragStart(null);
  };

  return (
    <div className="custom-table-container">
      <TableHeader columns={columns} onDrop={handleColumnDrop} />
      <div className="custom-table-body">
        {data.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="table-row">
            {columns
              .sort((a, b) => a.id - b.id)
              .map((column, columnIndex) => (
                <TableCell
                  key={`cell-${rowIndex}-${column.accessor}`}
                  content={row[column.accessor]?.name}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  onDragStart={handleCellDragStart}
                  onDrop={handleCellDrop}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
