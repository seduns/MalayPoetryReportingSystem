import React, { useState, useMemo } from "react";
// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function AdminManageAuthor() {
  const authors = [
    { name: "Naim Danial", email: "danial@gmail.com", bio: "Poet who writes about silence, love, and midnight thoughts.", id: "0021" },
    { name: "Max Verstepen", email: "max@gmail.com", bio: "Fast paced poetry.", id: "0022" },
    { name: "Lewis hamilton", email: "lewis@gmail.com", bio: "Still I rise.", id: "0023" },
    { name: "Kimi Antoneline", email: "kimi@gmail.com", bio: "Young poet.", id: "0024" },
    { name: "Isack hadjar", email: "isack@gmail.com", bio: "Rising star.", id: "0025" },
    { name: "Lando Norris", email: "lando@gmail.com", bio: "Quadrant vibes.", id: "0026" },
    { name: "Pscar Piatsri", email: "oscar@gmail.com", bio: "Calculated words.", id: "0027" },
    { name: "Leclare", email: "charles@gmail.com", bio: "Monaco dreams.", id: "0028" },
    { name: "Goerge Rusell", email: "george@gmail.com", bio: "The strategist.", id: "0029" },
    { name: "Sergio Perez", email: "checo@gmail.com", bio: "Experience counts.", id: "0030" },
  ];

  // State for Search and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0]);
  const rowsPerPage = 8; // ✅ Changed to 8 rows per page

  // ✅ Search Logic
  const filteredAuthors = useMemo(() => {
    const term = (searchTerm || "").toLowerCase();
    return authors.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // ✅ Pagination Logic
  const pageCount = Math.max(1, Math.ceil(filteredAuthors.length / rowsPerPage));
  const paginatedRows = filteredAuthors.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleNext = () => setCurrentPage((p) => Math.min(pageCount - 1, p + 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4 overflow-hidden">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Manage <span className="text-[#DC2A54]">Author</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm font-medium">
          Detailed overview of poetry contributors with status management.
        </p>
      </div>

      {/* Main Container - items-stretch ensures Left and Right have same height */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 items-stretch h-full overflow-hidden min-h-[520px]">
        
        {/* Left Side: Search + Table */}
        <div className="flex-[1.5] flex flex-col h-full">
          
          {/* Search & Pagination Control Bar */}
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-xs">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search author..."
                className="w-full pl-9 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] outline-none bg-white text-xs shadow-sm transition-all"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
              />
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-black/5 shadow-sm">
              <button onClick={handlePrev} disabled={currentPage === 0} className="p-1 disabled:opacity-20 hover:text-[#7B61FF] transition-colors">
                <ChevronLeftIcon fontSize="small" />
              </button>
              <span className="text-[11px] font-bold text-gray-600 min-w-[70px] text-center">
                Page {currentPage + 1} / {pageCount}
              </span>
              <button onClick={handleNext} disabled={currentPage >= pageCount - 1} className="p-1 disabled:opacity-20 hover:text-[#7B61FF] transition-colors">
                <ChevronRightIcon fontSize="small" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm overflow-hidden flex flex-col">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#E9ECEF] text-gray-500 text-[11px] uppercase tracking-widest border-b border-black/5">
                  <th className="py-4 px-8 text-left font-bold">Author</th>
                  <th className="py-4 px-4 text-center font-bold">View</th>
                  <th className="py-4 px-8 text-center font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedRows.length > 0 ? (
                  paginatedRows.map((author, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      {/* ✅ Reduced row height with py-2.5 */}
                      <td className="py-2.5 px-8 font-bold text-gray-800 text-xs">{author.name}</td>
                      <td className="py-2.5 px-4 text-center">
                        <button 
                          onClick={() => setSelectedAuthor(author)}
                          className="inline-flex items-center gap-1 bg-[#7B61FF] hover:bg-[#6649FF] text-white px-6 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm"
                        >
                          <VisibilityIcon sx={{ fontSize: 12 }} /> View
                        </button>
                      </td>
                      <td className="py-2.5 px-8 text-center">
                        <div className="relative inline-block w-28 text-left">
                          <select className="appearance-none w-full bg-[#E9ECEF] text-gray-800 text-[10px] font-bold py-1 pl-3 pr-8 rounded-full border-none outline-none cursor-pointer">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                          <KeyboardArrowDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" sx={{ fontSize: 14 }} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-20 text-center text-gray-400 text-xs">No authors found.</td>
                  </tr>
                )}
                {/* Filler rows to maintain height for exactly 8 rows */}
                {paginatedRows.length > 0 && paginatedRows.length < 8 && (
                  Array(8 - paginatedRows.length).fill(0).map((_, i) => (
                    <tr key={`filler-${i}`} className="h-[49px] border-none"><td colSpan="3"></td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Author Detail Card */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col items-center h-full justify-center">
          {/* Avatar and Info */}
          <div className="flex items-center gap-6 w-full mb-8">
            <div className="w-20 h-20 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {selectedAuthor.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedAuthor.name}</h2>
              <p className="text-gray-400 text-xs font-semibold">Poetry Contributor</p>
              <p className="text-gray-300 text-[10px] mt-1 font-bold">Author ID: {selectedAuthor.id}</p>
            </div>
          </div>

          {/* Form Fields (Read Only/Display) */}
          <div className="w-full space-y-4">
            <div className="space-y-1">
              <label className="text-gray-400 font-bold text-[11px] block ml-1">Author name:</label>
              <div className="w-full border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 bg-gray-50/50 font-bold">
                {selectedAuthor.name}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold text-[11px] block ml-1">Author email:</label>
              <div className="w-full border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 bg-gray-50/50 font-bold">
                {selectedAuthor.email}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold text-[11px] block ml-1">Author bio:</label>
              <div className="w-full border border-gray-100 rounded-2xl px-4 py-4 text-xs text-gray-600 bg-gray-50/50 min-h-[140px] leading-relaxed">
                {selectedAuthor.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}