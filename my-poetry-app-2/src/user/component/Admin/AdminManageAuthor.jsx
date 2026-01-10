import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";

// ✅ Import the update action
import { getAllAuthor, updateAuthorStatus } from "../../../store/thunk/AuthorThunk";

export default function AdminManageAuthor() {
  const dispatch = useDispatch();
  
  // Redux State
  const { authorList, loading } = useSelector((state) => state.author);

  // Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  
  const rowsPerPage = 8;

  // 1. Fetch Data on Mount
  useEffect(() => {
    dispatch(getAllAuthor());
  }, [dispatch]);

  // 2. Set Initial Selected Author
  useEffect(() => {
    if (authorList && authorList.length > 0 && !selectedAuthor) {
      setSelectedAuthor(authorList[0]);
    }
  }, [authorList, selectedAuthor]);

  // ✅ 3. Handle Status Change
  const handleStatusChange = (id, newStatusValue) => {
    // Convert UI value "STATUS_ACTIVE" -> API value "active"
    const apiStatus = newStatusValue === "STATUS_ACTIVE" ? "active" : "inactive";
    
    // Dispatch the update thunk
    dispatch(updateAuthorStatus({ id, status: apiStatus }));
  };

  // 4. Search & Filter Logic
  const filteredAuthors = useMemo(() => {
    if (!authorList) return [];

    const term = (searchTerm || "").toLowerCase();
    
    return authorList.filter((item) => {
      const userName = item.user?.fullName?.toLowerCase() || "";
      const userEmail = item.user?.email?.toLowerCase() || "";
      
      const matchesSearch = userName.includes(term) || userEmail.includes(term);

      let matchesStatus = true;
      if (statusFilter === "Active") {
        matchesStatus = item.status === "STATUS_ACTIVE";
      } else if (statusFilter === "Inactive") {
        matchesStatus = item.status === "STATUS_INACTIVE";
      }

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, authorList]);

  // Pagination Logic
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

      <div className="flex flex-col lg:flex-row gap-6 px-4 items-stretch h-full overflow-hidden min-h-[520px]">
        
        {/* Left Side: Search + Table */}
        <div className="flex-[1.5] flex flex-col h-full">
          
          {/* Controls Bar */}
          <div className="flex justify-between items-center gap-4 mb-4">
            {/* Search Bar */}
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

            {/* Status Filter */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <FilterListIcon sx={{ fontSize: 16 }} />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
                className="pl-9 pr-8 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] outline-none bg-white text-xs shadow-sm appearance-none font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <KeyboardArrowDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" sx={{ fontSize: 16 }} />
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-black/5 shadow-sm ml-auto">
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
                {loading ? (
                   <tr>
                     <td colSpan="3" className="py-20 text-center text-gray-400 text-xs animate-pulse">Loading authors...</td>
                   </tr>
                ) : paginatedRows.length > 0 ? (
                  paginatedRows.map((author, index) => (
                    <tr key={author.id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 px-8 font-bold text-gray-800 text-xs">
                        {author.user?.fullName}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button 
                          onClick={() => setSelectedAuthor(author)}
                          className="inline-flex items-center gap-1 bg-[#7B61FF] hover:bg-[#6649FF] text-white px-6 py-1 rounded-full text-[10px] font-bold transition-all shadow-sm"
                        >
                          <VisibilityIcon sx={{ fontSize: 12 }} /> View
                        </button>
                      </td>
                      <td className="py-2.5 px-8 text-center">
                        <div className="relative inline-block w-32 text-left">
                          {/* ✅ Fix: Added onChange and switched defaultValue to value */}
                          <select 
                            value={author.status} 
                            onChange={(e) => handleStatusChange(author.id, e.target.value)}
                            className={`appearance-none w-full text-[10px] font-bold py-1 pl-3 pr-8 rounded-full border-none outline-none cursor-pointer transition-colors duration-200
                              ${author.status === "STATUS_ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                            `}
                          >
                            <option value="STATUS_ACTIVE">Active</option>
                            <option value="STATUS_INACTIVE">Inactive</option>
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
                
                {/* Filler rows */}
                {!loading && paginatedRows.length > 0 && paginatedRows.length < 8 && (
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
          {selectedAuthor ? (
            <>
              <div className="flex items-center gap-6 w-full mb-8">
                <div className="w-20 h-20 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {selectedAuthor.user?.fullName ? selectedAuthor.user.fullName.charAt(0) : "?"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedAuthor.user?.fullName}</h2>
                  <p className="text-gray-400 text-xs font-semibold">@{selectedAuthor.user?.username}</p>
                  <p className="text-gray-300 text-[10px] mt-1 font-bold">Public ID: {selectedAuthor.publicId}</p>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold text-[11px] block ml-1">Full Name:</label>
                  <div className="w-full border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 bg-gray-50/50 font-bold">
                    {selectedAuthor.user?.fullName}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold text-[11px] block ml-1">Email:</label>
                  <div className="w-full border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 bg-gray-50/50 font-bold">
                    {selectedAuthor.user?.email}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-bold text-[11px] block ml-1">Bio:</label>
                  <div className="w-full border border-gray-100 rounded-2xl px-4 py-4 text-xs text-gray-600 bg-gray-50/50 min-h-[140px] leading-relaxed">
                    {selectedAuthor.bio || "No bio available."}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-sm font-medium">
               {loading ? "Loading details..." : "Select an author to view details"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}