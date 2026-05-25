import React from 'react';
import type { ReactNode } from 'react';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  striped?: boolean;
  hoverable?: boolean;
  responsive?: boolean;
}

/**
 * Table Component
 * Tabla con soporte para filas rayadas, hover states y scroll responsivo
 * 
 * @example
 * <Table 
 *   columns={[{ key: 'name', label: 'Nombre' }]}
 *   data={[{ name: 'Juan' }]}
 *   striped
 *   hoverable
 * />
 */
export const Table: React.FC<TableProps> = ({
  columns,
  data,
  striped = true,
  hoverable = true,
  responsive = true,
}) => {
  const alignClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const containerClass = responsive ? 'overflow-x-auto' : '';

  return (
    <div className={containerClass}>
      <table className="w-full text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 font-semibold ${alignClass(col.align)} ${col.width ? `w-${col.width}` : ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${striped && idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
                  hoverable ? 'hover:bg-gray-100 transition-colors' : ''
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 py-4 ${alignClass(col.align)}`}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
