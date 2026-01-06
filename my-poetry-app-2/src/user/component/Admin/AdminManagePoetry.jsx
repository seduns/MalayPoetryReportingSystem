import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

// Thunk Imports
import { getPoetryList, deletePoetry } from "../../../store/thunk/PoetryThunk";
import { useNavigate } from "react-router-dom";
import { setSelectedPoetry } from "../../../store/slice/PoetrySlice";

export default function AdminManageReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleView = (item) => {
  // 1. Store the selected ID in Redux
  dispatch(setSelectedPoetry({ id: item.id }));
  
  // 2. Use a leading slash "/" to make it an absolute path
  // This forces it to start from http://localhost:5173/ instead of the current folder
  navigate(`/admin/view-poetry/${item.id}`); 
};

  // ✅ Synced with your slice's poetryList
  const { poetryList = [], loading } = useSelector((state) => state.poetry);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(getPoetryList());
  }, [dispatch]);

  // ✅ Search Filter Logic adapted to your nested JSON
  const filteredData = useMemo(() => {
    const data = Array.isArray(poetryList) ? poetryList : [];
    const term = (searchTerm || "").toLowerCase();

    return data.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const authorName = (item.author?.user?.fullName || "").toLowerCase();
      const statusName = (item.status?.name || "").toLowerCase();
      
      return (
        title.includes(term) || 
        authorName.includes(term) || 
        statusName.includes(term)
      );
    });
  }, [searchTerm, poetryList]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this poetry?")) {
      dispatch(deletePoetry(id)).then(() => dispatch(getPoetryList()));
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4 bg-gray-50/20">
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Poetry <span className="text-[#DC2A54]">Report</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Managing {filteredData.length} poetry records from the database.
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
            placeholder="Search title, author, or status..."
            className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#DC2A54] outline-none bg-white text-sm"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-1 rounded-lg border bg-white disabled:opacity-30">
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">Page {currentPage + 1} of {pageCount}</span>
          <button onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))} disabled={currentPage >= pageCount - 1} className="p-1 rounded-lg border bg-white disabled:opacity-30">
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-hidden flex flex-col mx-4 mb-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100">
                <th className="py-4 px-8 text-center font-bold">Poetry Title</th>
                <th className="py-4 px-4 text-center font-bold">Author</th>
                <th className="py-4 px-4 text-center font-bold">Status</th>
                <th className="py-4 px-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="py-20 text-center text-gray-400 italic">Fetching from database...</td></tr>
              ) : paginatedRows.length > 0 ? (
                paginatedRows.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-8 font-bold text-gray-800 text-xs text-center">{item.title}</td>
                    <td className="py-3 px-4 font-medium text-gray-500 text-xs text-center">
                      {/* ✅ Path from your JSON: author -> user -> fullName */}
                      {item.author?.user?.fullName || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        item.status?.name === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {/* ✅ Path from your JSON: status -> name */}
                        {item.status?.name || "PENDING"}
                      </span>
                    </td>
                    <td className="py-3 px-8 text-center flex justify-center gap-2">
                      <button 
                      onClick={() => handleView(item)}
                      className="inline-flex items-center gap-1 bg-[#FFA500] hover:bg-[#FF8C00] text-white px-5 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm"
                    >
                      <VisibilityIcon sx={{ fontSize: 14 }} /> View
                    </button>
                      <button onClick={() => handleDelete(item.id)} className="inline-flex items-center gap-1 bg-[#FF7F7F] text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm">
                        <DeleteIcon sx={{ fontSize: 14 }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="py-20 text-center text-gray-400">No matching records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}