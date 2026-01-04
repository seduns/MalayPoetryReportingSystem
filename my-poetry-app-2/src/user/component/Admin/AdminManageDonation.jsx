import React, { useState, useMemo } from "react";
// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import SortIcon from "@mui/icons-material/Sort";

export default function AdminManageDonation() {
  const stats = [
    { label: "Total Donations", value: "RM 12344", icon: <AccountBalanceWalletIcon className="text-[#DC2A54]" /> },
    { label: "Donation Count", value: "344", icon: <BarChartIcon className="text-[#7B61FF]" /> },
  ];

  const donationData = [
    { title: "Whispers of the Night", author: "Amelia hance", count: 113, amount: 566 },
    { title: "Between Silent Lines", author: "Danial rechardo", count: 33, amount: 211 },
    { title: "Ink on My Heart", author: "Danial rechardo", count: 23, amount: 344 },
    { title: "Between Silent Lines", author: "Amelia hance", count: 33, amount: 1100 },
    { title: "Ink on My Heart", author: "Danial rechardo", count: 14, amount: 322 },
    { title: "Between Silent Lines", author: "Amelia hance", count: 21, amount: 432 },
    { title: "Between Silent Lines", author: "Danial rechardo", count: 33, amount: 211 },
    { title: "Between Silent Lines", author: "Danial rechardo", count: 33, amount: 211 },
    { title: "Between Silent Lines", author: "Danial rechardo", count: 33, amount: 211 },
    { title: "Ink on My Heart", author: "Amelia hance", count: 66, amount: 455 },
  ];

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default"); // 'default', 'count', 'amount'
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 8;

  // ✅ Search & Sort Logic
  const processedData = useMemo(() => {
    let result = [...donationData];

    // 1. Filter
    const term = (searchTerm || "").toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term)
    );

    // 2. Sort (Highest to Lowest)
    if (sortBy === "count") {
      result.sort((a, b) => b.count - a.count);
    } else if (sortBy === "amount") {
      result.sort((a, b) => b.amount - a.amount);
    }

    return result;
  }, [searchTerm, sortBy]);

  // ✅ Pagination Logic
  const pageCount = Math.max(1, Math.ceil(processedData.length / rowsPerPage));
  const paginatedRows = processedData.slice(
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
          Monitor <span className="text-[#DC2A54]">Donation</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview of all donation transactions across poetry
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 px-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-black/10 rounded-[20px] p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar: Search, Sort & Pagination */}
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 mb-4 gap-4">
        <div className="flex flex-1 w-full gap-3">
          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon fontSize="small" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] focus:outline-none bg-white text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
            />
          </div>

          {/* ✅ Sort Dropdown */}
          <div className="relative">
             <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border border-black/10 rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#7B61FF] outline-none shadow-sm cursor-pointer"
            >
              <option value="default">Sort By: Default</option>
              <option value="count">Sort By: Donation Count</option>
              <option value="amount">Sort By: Donation Amount</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SortIcon fontSize="small" />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-3">
          <button onClick={handlePrev} disabled={currentPage === 0} className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30">
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">Page {currentPage + 1} of {pageCount}</span>
          <button onClick={handleNext} disabled={currentPage >= pageCount - 1} className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30">
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-hidden flex flex-col mx-4 mb-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-gray-500 text-[11px] uppercase tracking-widest sticky top-0 z-10 border-b border-gray-100">
                <th className="py-3 px-8 text-center font-bold">Poetry</th>
                <th className="py-3 px-4 text-center font-bold">Author</th>
                <th className="py-3 px-4 text-center font-bold">Donation Count</th>
                <th className="py-3 px-8 text-center font-bold">Donation Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-2.5 px-8 font-bold text-gray-800 text-xs text-center">{item.title}</td>
                    <td className="py-2.5 px-4 font-medium text-gray-500 text-xs text-center">{item.author}</td>
                    <td className="py-2.5 px-4 font-bold text-gray-800 text-xs text-center">
                      <span className="bg-gray-100 px-3 py-0.5 rounded-full">{item.count}</span>
                    </td>
                    <td className="py-2.5 px-8 font-bold text-[#DC2A54] text-xs text-center">RM {item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="py-16 text-center text-gray-400 text-sm italic">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}