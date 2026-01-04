import React, { useState, useMemo } from "react";
// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminManageReport() {
  // Sample Data (Simulating a larger list for pagination)
  const initialReports = Array(15).fill({
    title: "Whispers of the Night",
    author: "Amelia hance",
    status: "Pending",
  });

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10; // ✅ 10 rows per page

  // ✅ Search Filter Logic (Fixing potential undefined errors)
  const filteredData = useMemo(() => {
    const term = (searchTerm || "").toLowerCase();
    return initialReports.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term)
    );
  }, [searchTerm, initialReports]);

  // ✅ Pagination Logic
  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleNext = () => setCurrentPage((p) => Math.min(pageCount - 1, p + 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Poetry <span className="text-[#DC2A54]">Report</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview report of each poetry in 2 version: full version or summary version
        </p>
      </div>

      {/* Control Bar: Search & Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <SearchIcon fontSize="small" />
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or status..."
            className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] focus:outline-none bg-white text-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0); // Reset to first page
            }}
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage >= pageCount - 1}
            className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-hidden flex flex-col mx-4 mb-4">
        <div className="overflow-x-auto overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-gray-500 text-[11px] uppercase tracking-widest sticky top-0 z-10 border-b border-gray-100">
                <th className="py-3 px-8 text-center font-bold">Poetry</th>
                <th className="py-3 px-4 text-center font-bold">Author</th>
                <th className="py-3 px-4 text-center font-bold">Status</th>
                <th className="py-3 px-4 text-center font-bold">View</th>
                <th className="py-3 px-8 text-center font-bold">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    {/* ✅ py-2 for compact height, text-center for alignment */}
                    <td className="py-2 px-8 font-bold text-gray-800 text-xs text-center">
                      {item.title}
                    </td>
                    <td className="py-2 px-4 font-medium text-gray-500 text-xs text-center">
                      {item.author}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-[10px] font-bold">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button className="inline-flex items-center gap-1 bg-[#FFA500] hover:bg-[#FF8C00] text-white px-5 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm">
                        <VisibilityIcon sx={{ fontSize: 12 }} /> View
                      </button>
                    </td>
                    <td className="py-2 px-8 text-center">
                      <button className="inline-flex items-center gap-1 bg-[#FF7F7F] hover:bg-[#FF5C5C] text-white px-5 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm">
                        <DeleteIcon sx={{ fontSize: 12 }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-16 text-center text-gray-400 text-sm">
                    No matching reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}