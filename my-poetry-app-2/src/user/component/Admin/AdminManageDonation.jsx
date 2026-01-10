import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import SortIcon from "@mui/icons-material/Sort";

// Thunk
import { getAllDonationsAdmin } from "../../../store/thunk/DonationThunk";

export default function AdminManageDonation() {
  const dispatch = useDispatch();
  
  // 1. Get data from Redux
  const { allDonations, loading } = useSelector((state) => state.donation);

  // 2. Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 8;

  // 3. Fetch data on mount
  useEffect(() => {
    dispatch(getAllDonationsAdmin());
  }, [dispatch]);

  // 4. Ensure we are working with an array
  const donationList = Array.isArray(allDonations) ? allDonations : [];

  // 5. ✅ FIXED: Dynamic Stats Calculation
  const stats = useMemo(() => {
    // Calculate Total Money (RM)
    const totalAmount = donationList.reduce(
      (acc, curr) => acc + (Number(curr.donationAmount) || 0), 
      0
    );

    // ✅ FIXED: Calculate Total Count (Sum of all donationCount properties)
    // Previously it was just counting the number of rows (donationList.length)
    const totalCount = donationList.reduce(
      (acc, curr) => acc + (Number(curr.donationCount) || 0), 
      0
    );

    return [
      { 
        label: "Total Donations Received", 
        value: `RM ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 
        icon: <AccountBalanceWalletIcon className="text-[#DC2A54]" /> 
      },
      { 
        label: "Total Transactions", 
        value: totalCount.toLocaleString(), // Formats 1000 to 1,000
        icon: <BarChartIcon className="text-[#7B61FF]" /> 
      },
    ];
  }, [donationList]);

  // 6. Search & Sort Logic
  const processedData = useMemo(() => {
    let result = [...donationList];

    // Filter
    const term = (searchTerm || "").toLowerCase();
    if (term) {
      result = result.filter(
        (item) =>
          (item.poetryTitle || "").toLowerCase().includes(term) ||
          (item.poetryOwner || "").toLowerCase().includes(term)
      );
    }

    // Sort
    if (sortBy === "count") {
      result.sort((a, b) => (b.donationCount || 0) - (a.donationCount || 0));
    } else if (sortBy === "amount") {
      result.sort((a, b) => (b.donationAmount || 0) - (a.donationAmount || 0));
    }

    return result;
  }, [searchTerm, sortBy, donationList]);

  // 7. Pagination Logic
  const pageCount = Math.max(1, Math.ceil(processedData.length / rowsPerPage));
  const paginatedRows = processedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleNext = () => setCurrentPage((p) => Math.min(pageCount - 1, p + 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4 overflow-hidden">
      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Monitor <span className="text-[#DC2A54]">Donation</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview of all donation transactions across poetry
        </p>
      </div>

      {/* Stats Cards */}
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

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 mb-4 gap-4">
        <div className="flex flex-1 w-full gap-3">
          <div className="relative flex-1 md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon fontSize="small" />
            </div>
            <input
              type="text"
              placeholder="Search by Title or Author..."
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] focus:outline-none bg-white text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
            />
          </div>

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

        <div className="flex items-center gap-3">
          <button onClick={handlePrev} disabled={currentPage === 0} className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors">
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">Page {currentPage + 1} of {pageCount}</span>
          <button onClick={handleNext} disabled={currentPage >= pageCount - 1} className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors">
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] flex flex-col mx-4 mb-4">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="bg-[#E9ECEF] text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100">
              <th className="py-3 px-8 text-center font-bold">Poetry</th>
              <th className="py-3 px-4 text-center font-bold">Author</th>
              <th className="py-3 px-4 text-center font-bold">Donation Count</th>
              <th className="py-3 px-8 text-center font-bold">Donation Amount</th>
            </tr>
          </thead>  
          <tbody className="divide-y divide-gray-50">
            {loading ? (
                  <tr><td colSpan="4" className="py-16 text-center text-gray-400 text-sm italic animate-pulse">Loading data...</td></tr>
            ) : paginatedRows.length > 0 ? (
              paginatedRows.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-2.5 px-8 font-bold text-gray-800 text-xs text-center">{item.poetryTitle}</td>
                  <td className="py-2.5 px-4 font-medium text-gray-500 text-xs text-center">{item.poetryOwner}</td>
                  <td className="py-2.5 px-4 font-bold text-gray-800 text-xs text-center">
                    <span className="bg-gray-100 px-3 py-0.5 rounded-full">{item.donationCount}</span>
                  </td>
                  <td className="py-2.5 px-8 font-bold text-[#DC2A54] text-xs text-center">
                      RM {(item.donationAmount || 0).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="py-16 text-center text-gray-400 text-sm italic">No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}