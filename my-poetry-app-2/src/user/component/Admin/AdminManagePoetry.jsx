import React from "react";

export default function AdminGenerateReport() {
  const reports = Array(9).fill({
    title: "Whispers of the Night",
    author: "Amelia hance",
    status: "Pending",
  });

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Poetry <span className="text-[#DC2A54]">Report</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview report of each poetry in 2 version: full version or summary version
        </p>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-gray-100 rounded-[30px] shadow-sm overflow-hidden flex flex-col">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#E9ECEF] text-gray-500 text-xs uppercase tracking-widest">
              <th className="py-5 px-8 text-left font-semibold">Poetry</th>
              <th className="py-5 px-4 text-left font-semibold">Author</th>
              <th className="py-5 px-4 text-left font-semibold">Status</th>
              <th className="py-5 px-4 text-center font-semibold">Full Report</th>
              <th className="py-5 px-8 text-center font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-8 font-bold text-gray-800 text-sm">{item.title}</td>
                <td className="py-4 px-4 font-bold text-gray-800 text-sm">{item.author}</td>
                <td className="py-4 px-4 font-bold text-gray-800 text-sm">{item.status}</td>
                <td className="py-4 px-4 text-center">
                  <button className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-8 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm">
                    View
                  </button>
                </td>
                <td className="py-4 px-8 text-center">
                  <button className="bg-[#FF7F7F] hover:bg-[#FF5C5C] text-white px-8 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}