import { useState } from "react";

interface TableProps {
  name: string;
  data: any[];
  columns: string[];
  setSelectedId?: (id: string) => void;
}
export default function Table({
  name,
  data,
  columns,
  setSelectedId,
}: TableProps) {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  return (
    <section className="bg-white mb-8 p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-serif mb-4 text-gray-700">{name}</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={column} className="px-4 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr
                onClick={() => {
                  if (selectedRow === p.id) {
                    setSelectedRow(null);
                    setSelectedId?.("");
                  } else {
                    setSelectedRow(p.id);
                    setSelectedId?.(p.id);
                  }
                  console.log(selectedRow);
                }}
                key={p.id}
                className="border-t hover:bg-gray-100"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className={`px-4 py-2 ${
                      selectedRow === p.id ? "bg-[#f8f5f1]" : ""
                    }`}
                  >
                    {p[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
