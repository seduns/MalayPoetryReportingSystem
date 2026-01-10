import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Thunk & Actions
import { getPoetryList, deletePoetry } from "../../../store/thunk/PoetryThunk";

export default function AdminManageReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { poetryList = [], loading } = useSelector((state) => state.poetry);

  // Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 8;

  useEffect(() => {
    dispatch(getPoetryList());
  }, [dispatch]);

  // ✅ UPDATED: Navigation Handler
  // Navigates to the details page passing the ID in the URL
  const handleView = (id) => {
    navigate(`/admin/poetry-report/${id}`);
  };

  // Handle Delete with SweetAlert2
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2A54",
      cancelButtonColor: "#b0b0b0",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePoetry(id)).then((action) => {
          if (deletePoetry.fulfilled.match(action)) {
            Swal.fire({
              title: "Deleted!",
              text: "The poetry record has been deleted.",
              icon: "success",
              confirmButtonColor: "#DC2A54",
            });
            dispatch(getPoetryList());
          } else {
            Swal.fire({
              title: "Error!",
              text: action.payload || "Failed to delete poetry.",
              icon: "error",
              confirmButtonColor: "#DC2A54",
            });
          }
        });
      }
    });
  };

  // Helper for Status Colors
  const getStatusColor = (statusName) => {
    const status = (statusName || "").toUpperCase();
    switch (status) {
      case "APPROVED":
      case "PUBLISHED": 
        return "bg-green-100 text-green-700";
      case "REJECTED": 
        return "bg-red-100 text-red-700";
      case "PENDING": 
        return "bg-blue-100 text-blue-700"; 
      default: 
        return "bg-gray-100 text-gray-700";
    }
  };

  // Filter Logic (Search + Status)
  const filteredData = useMemo(() => {
    const data = Array.isArray(poetryList) ? poetryList : [];
    const term = (searchTerm || "").toLowerCase();

    return data.filter((item) => {
      // 1. Check Status Filter
      const itemStatus = item.status?.name || "PENDING";
      if (statusFilter !== "All" && itemStatus !== statusFilter) {
        return false;
      }

      // 2. Check Search Term
      const title = (item.title || "").toLowerCase();
      const authorName = (item.author?.user?.fullName || "").toLowerCase();
      const statusName = (itemStatus).toLowerCase();
      
      return (
        title.includes(term) || 
        authorName.includes(term) || 
        statusName.includes(term)
      );
    });
  }, [searchTerm, statusFilter, poetryList]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4 bg-gray-50/20 overflow-hidden">
      {/* Header */}
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
        
        <div className="flex flex-1 gap-3 w-full md:max-w-xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon fontSize="small" />
            </div>
            <input
              type="text"
              placeholder="Search title, author..."
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#DC2A54] outline-none bg-white text-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative min-w-[160px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FilterListIcon fontSize="small" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
              className="w-full pl-10 pr-8 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#DC2A54] outline-none bg-white text-sm appearance-none cursor-pointer font-medium text-gray-600"
            >
              <option value="All">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <KeyboardArrowDownIcon fontSize="small" />
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-1 rounded-lg border bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors">
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">Page {currentPage + 1} of {pageCount}</span>
          <button onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))} disabled={currentPage >= pageCount - 1} className="p-1 rounded-lg border bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors">
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] flex flex-col mx-4 mb-4">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="bg-[#E9ECEF] text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100">
              <th className="py-4 px-8 text-center font-bold">Poetry Title</th>
              <th className="py-4 px-4 text-center font-bold">Author</th>
              <th className="py-4 px-4 text-center font-bold">Status</th>
              <th className="py-4 px-4 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="4" className="py-20 text-center text-gray-400 italic animate-pulse">Fetching from database...</td></tr>
            ) : paginatedRows.length > 0 ? (
              paginatedRows.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-8 font-bold text-gray-800 text-xs text-center">{item.title}</td>
                  <td className="py-3 px-4 font-medium text-gray-500 text-xs text-center">
                    {item.author?.user?.fullName || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(item.status?.name)}`}>
                      {item.status?.name || "PENDING"}
                    </span>
                  </td>
                  <td className="py-3 px-8 text-center flex justify-center gap-2">
                    
                    {/* ✅ UPDATED VIEW BUTTON */}
                    <button 
                      onClick={() => handleView(item.id)}
                      className="inline-flex items-center gap-1 bg-[#FFA500] hover:bg-[#FF8C00] text-white px-5 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm"
                    >
                      <VisibilityIcon sx={{ fontSize: 14 }} /> View
                    </button>

                    <button onClick={() => handleDelete(item.id)} className="inline-flex items-center gap-1 bg-[#FF7F7F] hover:bg-[#ff6666] text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm transition-all">
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
  );
}