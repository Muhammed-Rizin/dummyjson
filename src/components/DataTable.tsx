import React from "react";
import Pagination from "./Pagination";
import { DataTableProps } from "../types";

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max mt-4 bg-white rounded-lg shadow-md border border-black">
          <thead>
            <tr className="bg-[#c0e3e5]">
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="p-3 text-center text-[#322625] whitespace-nowrap border border-[#f0f0f0]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-[#f0f0f0] transition duration-300">
                {columns.map((column) => (
                  <td
                    key={column.field}
                    className={`p-2 text-[#322625] border border-[#f0f0f0] max-w-sm ${column.className}`}
                  >
                    {row[column.field as keyof typeof row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};

export default DataTable;
