import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions
import { getPoetryList, updatePoetryStatus } from "../../../store/thunk/PoetryThunk"; 

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList"; // ✅ Added Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// Stat Icons
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AdminPoetryStatusManager() {
  const dispatch = useDispatch();

  // Redux State
  const { poetryList, loading } = useSelector((state) => state.poetry);

  // Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All"); // ✅ New Status Filter State
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // Fetch Data on Mount
  useEffect(() => {
    dispatch(getPoetryList());
  }, [dispatch]);

  // Helper to safely get status string
  const getSafeStatus = (item) => {
    if (!item.status) return "PENDING";
    return typeof item.status === 'object' ? item.status.name : item.status;
  };

  // Calculate Dynamic Stats
  const stats = useMemo(() => {
    const total = poetryList?.length || 0;
    const pending = poetryList?.filter(p => getSafeStatus(p) === "PENDING").length || 0;
    const rejected = poetryList?.filter(p => getSafeStatus(p) === "REJECTED").length || 0;
    const approved = poetryList?.filter(p => getSafeStatus(p) === "APPROVED").length || 0;

    return [
      { label: "Poetry", value: total, color: "text-gray-400", icon: <AutoStoriesIcon sx={{ fontSize: 20 }} /> },
      { label: "Pending", value: pending, color: "text-blue-500", icon: <HourglassEmptyIcon sx={{ fontSize: 20 }} /> },
      { label: "Rejected", value: rejected, color: "text-red-400", icon: <CancelIcon sx={{ fontSize: 20 }} /> },
      { label: "Approved", value: approved, color: "text-green-500", icon: <CheckCircleIcon sx={{ fontSize: 20 }} /> },
    ];
  }, [poetryList]);

  // Helper for Status Colors
  const getStatusStyle = (status) => {
    const safeStatus = status || "";
    switch (safeStatus) {
      case "APPROVED": return "bg-[#76FFB1] text-white";
      case "REJECTED": return "bg-[#FF7F7F] text-white";
      case "PENDING": return "bg-[#7B61FF] text-white";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  // Update Status Handler
  const handleStatusChange = (poetryId, newStatus) => {
    const upperCaseStatus = newStatus.toUpperCase();
    dispatch(updatePoetryStatus({ poetryId, status: upperCaseStatus }));
  };

  // ✅ Updated Filtering Logic
  const filteredData = useMemo(() => {
    if (!poetryList) return [];
    
    let data = [...poetryList];
    const term = (searchTerm || "").toLowerCase();

    // 1. Filter by Category
    if (categoryFilter !== "All") {
      data = data.filter(item => item.category === categoryFilter);
    }

    // 2. Filter by Status (New)
    if (statusFilter !== "All") {
      data = data.filter(item => getSafeStatus(item) === statusFilter);
    }

    // 3. Filter by Search
    return data.filter(item => {
      const title = item.title?.toLowerCase() || "";
      const authorName = item.author?.user?.fullName?.toLowerCase() || "";
      return title.includes(term) || authorName.includes(term);
    });
  }, [searchTerm, categoryFilter, statusFilter, poetryList]); // Added statusFilter dependency

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
  
  // Extract Unique Categories
  const categories = useMemo(() => {
    if (!poetryList) return ["All"];
    const cats = new Set(poetryList.map(item => item.category).filter(Boolean));
    return ["All", ...cats];
  }, [poetryList]);

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4 overflow-hidden">
      {/* Header Section */}
      <div className="mb-4 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Manage <span className="text-[#DC2A54]">Poetry Status</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm font-medium">
          Review and update poetry approval states
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4 px-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-black/10 rounded-[20px] py-3 px-4 shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-bold text-gray-800 leading-none">{stat.value}</p>
              <p className={`${stat.color} text-[9px] font-bold uppercase tracking-wider mt-1`}>{stat.label}</p>
            </div>
            <div className={`${stat.color} opacity-80`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-3 gap-4">
        <div className="flex flex-1 w-full gap-2">
          
          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
            <input
              type="text"
              placeholder="Search title or author..."
              className="w-full pl-9 pr-4 py-1.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] outline-none bg-white text-xs"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <SortIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
            <select 
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(0); }}
              className="appearance-none pl-9 pr-8 py-1.5 border border-black/10 rounded-xl bg-white text-xs focus:ring-2 focus:ring-[#7B61FF] outline-none cursor-pointer"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* ✅ Status Filter (New) */}
          <div className="relative">
            <FilterListIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
              className="appearance-none pl-9 pr-8 py-1.5 border border-black/10 rounded-xl bg-white text-xs focus:ring-2 focus:ring-[#7B61FF] outline-none cursor-pointer font-bold text-gray-600"
            >
              <option value="All">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-1 disabled:opacity-30">
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-[11px] font-bold text-gray-500">Page {currentPage + 1} of {pageCount}</span>
          <button onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))} disabled={currentPage >= pageCount - 1} className="p-1 disabled:opacity-30">
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-black/15 rounded-[25px] shadow-sm overflow-hidden mx-4 mb-2 flex flex-col">
        <div className="pb-4">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-[10px] uppercase tracking-widest border-b border-black/5">
                <th className="py-3 px-4 text-center font-bold w-[30%]">Poetry</th>
                <th className="py-3 px-4 text-center font-bold w-[20%]">Author</th>
                <th className="py-3 px-4 text-center font-bold w-[15%]">Category</th>
                <th className="py-3 px-4 text-center font-bold w-[15%]">View</th>
                <th className="py-3 px-4 text-center font-bold w-[20%]">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                    <td colSpan="5" className="py-20 text-center text-gray-400 text-xs animate-pulse">Loading poetry list...</td>
                 </tr>
              ) : paginatedRows.length > 0 ? (
                paginatedRows.map((item, index) => {
                  
                  // Use helper
                  const displayStatus = getSafeStatus(item);

                  return (
                    <tr 
                      key={item.id || index} 
                      className={`hover:bg-gray-50/50 transition-colors ${
                        index === paginatedRows.length - 1 ? "border-none" : "border-b border-gray-50"
                      }`}
                    >
                      <td className="py-2.5 px-4 font-bold text-gray-800 text-[11px] text-center truncate">
                          {item.title}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-gray-500 text-[11px] text-center truncate">
                          {item.author?.user?.fullName || "Unknown"}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[9px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button className="inline-flex items-center gap-1 bg-[#7B61FF] text-white px-4 py-1 rounded-full text-[9px] font-bold hover:shadow-md transition-all">
                          <VisibilityIcon sx={{ fontSize: 11 }} /> View
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="relative inline-block w-24 text-left">
                          
                          <select 
                            value={displayStatus}
                            className={`appearance-none w-full pl-3 pr-6 py-1 rounded-full text-[9px] font-bold cursor-pointer outline-none shadow-sm ${getStatusStyle(displayStatus)}`}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                          <KeyboardArrowDownIcon className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" sx={{ fontSize: 14 }} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-gray-400 text-xs font-medium">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}