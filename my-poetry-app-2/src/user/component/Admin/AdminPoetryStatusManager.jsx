import React, { useState, useMemo } from "react";
// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SortIcon from "@mui/icons-material/Sort";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// Stat Icons
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AdminPoetryStatusManager() {
  const stats = [
    { label: "Poetry", value: "20", color: "text-gray-400", icon: <AutoStoriesIcon sx={{ fontSize: 20 }} /> },
    { label: "Pending", value: "3", color: "text-blue-500", icon: <HourglassEmptyIcon sx={{ fontSize: 20 }} /> },
    { label: "Rejected", value: "8", color: "text-red-400", icon: <CancelIcon sx={{ fontSize: 20 }} /> },
    { label: "Approved", value: "11", color: "text-green-500", icon: <CheckCircleIcon sx={{ fontSize: 20 }} /> },
  ];

  const initialPoetryData = [
    { title: "Whispers of the Night", author: "Amelia hance", category: "Love", status: "Approved" },
    { title: "Between Silent Lines", author: "Amelia hance", category: "Life", status: "Approved" },
    { title: "Whispers of the Night", author: "Danial rechardo", category: "Love", status: "Rejected" },
    { title: "Ink on My Heart", author: "Amelia hance", category: "Motivation", status: "Approved" },
    { title: "Between Silent Lines", author: "Danial rechardo", category: "Romantic", status: "Pending" },
    { title: "Between Silent Lines", author: "Danial rechardo", category: "Friendship", status: "Approved" },
    { title: "Whispers of the Night", author: "Danial rechardo", category: "Love", status: "Approved" },
    { title: "Ink on My Heart", author: "Amelia hance", category: "Friendship", status: "Approved" },
    { title: "Ink on My Heart", author: "Amelia hance", category: "Friendship", status: "Approved" },
    { title: "Ink on My Heart", author: "Amelia hance", category: "Friendship", status: "Approved" },
    { title: "The Silent Forest", author: "John Doe", category: "Nature", status: "Pending" },
    { title: "Echoes of Time", author: "Jane Smith", category: "Life", status: "Approved" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-[#76FFB1] text-white";
      case "Rejected": return "bg-[#FF7F7F] text-white";
      case "Pending": return "bg-[#7B61FF] text-white";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  const filteredData = useMemo(() => {
    let data = [...initialPoetryData];
    const term = (searchTerm || "").toLowerCase();
    if (categoryFilter !== "All") data = data.filter(item => item.category === categoryFilter);
    return data.filter(item => 
      item.title.toLowerCase().includes(term) || item.author.toLowerCase().includes(term)
    );
  }, [searchTerm, categoryFilter, initialPoetryData]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
  const categories = ["All", ...new Set(initialPoetryData.map(item => item.category))];

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

      {/* Stat Cards with Icons */}
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
          <div className="relative flex-1 md:max-w-xs">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] outline-none bg-white text-xs"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
            />
          </div>
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

      {/* Table Container - FIXED HEIGHT & BOTTOM PADDING */}
      <div className="bg-white border border-black/15 rounded-[25px] shadow-sm overflow-hidden mx-4 mb-2 flex flex-col">
        <div className="pb-4"> {/* Added padding for the bottom of the table area */}
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
              {paginatedRows.length > 0 ? (
                paginatedRows.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-gray-50/50 transition-colors ${
                      index === paginatedRows.length - 1 ? "border-none" : "border-b border-gray-50"
                    }`}
                  >
                    <td className="py-2.5 px-4 font-bold text-gray-800 text-[11px] text-center truncate">{item.title}</td>
                    <td className="py-2.5 px-4 font-medium text-gray-500 text-[11px] text-center truncate">{item.author}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[9px] font-bold">{item.category}</span>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 bg-[#7B61FF] text-white px-4 py-1 rounded-full text-[9px] font-bold hover:shadow-md transition-all">
                        <VisibilityIcon sx={{ fontSize: 11 }} /> View
                      </button>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="relative inline-block w-24 text-left">
                        <select 
                          value={item.status}
                          className={`appearance-none w-full pl-3 pr-6 py-1 rounded-full text-[9px] font-bold cursor-pointer outline-none shadow-sm ${getStatusStyle(item.status)}`}
                          onChange={() => {}}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <KeyboardArrowDownIcon className="absolute right-1.5 top-1/2 -translate-y-1/2" sx={{ fontSize: 14 }} />
                      </div>
                    </td>
                  </tr>
                ))
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