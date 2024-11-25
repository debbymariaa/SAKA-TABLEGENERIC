import React from "react";

export type ColumnDefs<T> = {
  title: string;
} & (
  | {
      field: keyof T; // Field adalah properti di data
      render?: never; // Pastikan render tidak boleh ada jika field digunakan
    }
  | {
      render: (rowData: T) => React.ReactNode; // Render untuk kustom konten
      field?: never; // Pastikan field tidak boleh ada jika render digunakan
    }
);

const Table = <T extends Record<string, any>>({
  columnDefs,
  data,
}: {
  columnDefs: ColumnDefs<T>[]; // Kolom berdasarkan tipe T
  data: T[]; // Data adalah array objek tipe T
}) => {
  return (
    <table className="min-w-full divide-y overflow-hidden rounded-lg divide-gray-800 shadow-lg">
      <thead className="bg-green-200">
        <tr>
          {columnDefs.map((column, index) => (
            <th
              key={`header-${index}`}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((rowData, rowIndex) => (
          <tr key={`row-${rowIndex}`} className="cursor-pointer hover:bg-gray-100">
            {columnDefs.map((column, colIndex) => (
              <td key={`cell-${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                {"field" in column && column.field
                  ? rowData[column.field]
                  : "render" in column && column.render
                  ? column.render(rowData)
                  : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
