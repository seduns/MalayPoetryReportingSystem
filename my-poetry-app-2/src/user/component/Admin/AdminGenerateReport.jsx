import React, { useState, useMemo } from "react";
// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function AdminGenerateReport() {
  const reports = [
    { title: "Whispers of the Night", author: "Amelia hance" },
    { title: "Between Silent Lines", author: "Amelia hance" },
    { title: "Whispers of the Night", author: "Danial rechardo" },
    { title: "Ink on My Heart", author: "Amelia hance" },
    { title: "Between Silent Lines", author: "Danial rechardo" },
    { title: "Between Silent Lines", author: "Danial rechardo" },
    { title: "Between Silent Lines", author: "Danial rechardo" },
    { title: "Between Silent Lines", author: "Danial rechardo" },
    { title: "Ink on My Heart", author: "Amelia hance" },
    { title: "The Silent Forest", author: "John Doe" },
    { title: "Echoes of Time", author: "Jane Smith" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10; // ✅ Updated to 10 rows

  // ✅ Fixed Filter Logic: Ensuring searchTerm is handled safely
  const filteredData = useMemo(() => {
    const term = (searchTerm || "").toLowerCase();
    return reports.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term)
    );
  }, [searchTerm, reports]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleNext = () => setCurrentPage((p) => Math.min(pageCount - 1, p + 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4">
      {/* Header Section - Kept position */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Poetry <span className="text-[#DC2A54]">Report</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview report of each poetry in 2 version: full version or summary version
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 gap-4">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <SearchIcon fontSize="small" />
          </div>
          <input
            type="text"
            placeholder="Search title or author..."
            className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] focus:outline-none bg-white text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage >= pageCount - 1}
            className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-hidden flex flex-col mx-4 mb-4">
        <div className="overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-gray-500 text-[11px] uppercase tracking-widest sticky top-0 z-10 border-b border-gray-100">
                <th className="py-3 px-8 text-center font-bold">Poetry</th> {/* ✅ Centered */}
                <th className="py-3 px-4 text-center font-bold">Author</th> {/* ✅ Centered */}
                <th className="py-3 px-4 text-center font-bold">Full Report</th>
                <th className="py-3 px-8 text-center font-bold">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    {/* ✅ Reduced py-2 for smaller row height */}
                    <td className="py-2 px-8 font-bold text-gray-800 text-xs text-center">
                      {item.title}
                    </td>
                    <td className="py-2 px-4 font-medium text-gray-500 text-xs text-center">
                      {item.author}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button className="inline-flex items-center gap-1 bg-[#7B61FF] hover:bg-[#6649FF] text-white px-4 py-1 rounded-full text-[10px] font-bold transition-all">
                        <FileDownloadIcon sx={{ fontSize: 12 }} /> Download
                      </button>
                    </td>
                    <td className="py-2 px-8 text-center">
                      <button className="inline-flex items-center gap-1 bg-[#FF7F7F] hover:bg-[#FF5C5C] text-white px-4 py-1 rounded-full text-[10px] font-bold transition-all">
                        <FileDownloadIcon sx={{ fontSize: 12 }} /> Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-400 text-sm">
                    No results found.
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