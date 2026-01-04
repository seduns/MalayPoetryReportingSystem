import React, { useState, useMemo } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function AdminManageAdmin() {
  const initialAdmins = [
    { name: "Naim Danial", username: "naim123" },
    { name: "Leclare", username: "leclaree" },
    { name: "Max Verstepen", username: "max11" },
    { name: "Lewis hamilton", username: "lewis" },
    { name: "Leclare", username: "leclaree" },
    { name: "Kimi Antoneline", username: "kimii" },
    { name: "Pscar Piatsri", username: "oscarr" },
    { name: "Isack hadjar", username: "sackh" },
    { name: "Leclare", username: "leclaree" },
    { name: "Goerge Rusell", username: "gsell" },
    { name: "Lando Norris", username: "landdo" },
    { name: "Leclare", username: "leclaree" },
    { name: "Sergio Perez", username: "checo" },
    { name: "Leclare", username: "leclaree" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const filteredAdmins = useMemo(() => {
    const term = (searchTerm || "").toLowerCase();
    return initialAdmins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(term) ||
        admin.username.toLowerCase().includes(term)
    );
  }, [searchTerm, initialAdmins]);

  const pageCount = Math.max(1, Math.ceil(filteredAdmins.length / rowsPerPage));
  const paginatedRows = filteredAdmins.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4 overflow-hidden">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Manage <span className="text-[#DC2A54]">Admin</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm font-medium">
          Manage administrator access and credentials
        </p>
      </div>

      {/* Main Flex Wrapper - items-stretch ensures equal height */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 items-stretch h-[520px]">
        
        {/* Left Side: Search + Table */}
        <div className="flex-[1.4] flex flex-col">
          {/* Search & Pagination Control Bar */}
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-xs">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search admin..."
                className="w-full pl-9 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] outline-none bg-white text-xs shadow-sm transition-all"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
              />
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-black/5 shadow-sm">
              <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-1 disabled:opacity-20 hover:text-[#7B61FF]">
                <ChevronLeftIcon fontSize="small" />
              </button>
              <span className="text-[11px] font-bold text-gray-600 min-w-[70px] text-center">
                Page {currentPage + 1} / {pageCount}
              </span>
              <button onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))} disabled={currentPage >= pageCount - 1} className="p-1 disabled:opacity-20 hover:text-[#7B61FF]">
                <ChevronRightIcon fontSize="small" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 bg-white border border-black/15 rounded-[30px] shadow-sm overflow-hidden flex flex-col">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#E9ECEF] text-gray-500 text-[10px] uppercase tracking-widest border-b border-black/5">
                  <th className="py-4 px-8 text-center font-bold">Admin Name</th>
                  <th className="py-4 px-8 text-center font-bold">Username</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedRows.length > 0 ? (
                  paginatedRows.map((admin, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-8 text-center">
                        <div className="flex items-center justify-center gap-2">
                           <PersonOutlineIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                           <span className="font-bold text-gray-800 text-xs">{admin.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-8 text-center font-bold text-gray-500 text-xs">
                        @{admin.username}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-20 text-center text-gray-400 text-xs italic">
                      No administrators found.
                    </td>
                  </tr>
                )}
                {/* Filler Rows to keep table height stable */}
                {paginatedRows.length < 10 && paginatedRows.length > 0 && (
                  Array(10 - paginatedRows.length).fill(0).map((_, i) => (
                    <tr key={i} className="h-[46px] border-none"><td colSpan="2"></td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Add New Admin Form - NOW STRETCHED TO MATCH LEFT */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col h-full justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add New Admin</h2>
          
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-gray-500 text-xs font-bold ml-1">Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-500 text-xs font-bold ml-1">Email Address</label>
              <div className="relative">
                <EmailOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" sx={{fontSize: 18}} />
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-500 text-xs font-bold ml-1">Password</label>
              <div className="relative">
                <LockOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" sx={{fontSize: 18}} />
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-[#FF5C5C] focus:ring-0 w-4 h-4 border-gray-300" />
                <span className="text-gray-400 text-[10px] font-medium">Remember me</span>
              </label>
              <button className="text-[#FF5C5C] text-[10px] font-bold hover:underline">Forgot Password?</button>
            </div>

            <button className="w-full bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-100">
               <LoginIcon sx={{ fontSize: 18 }} />
               Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}