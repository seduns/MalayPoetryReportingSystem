import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Icons
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Thunks
import { registerUser } from "../../../store/thunk/AuthThunk";
import { getAdminPoetryAll} from "../../../store/thunk/AdminThunk"; // Added status thunk

export default function AdminManageAdmin() {
  const dispatch = useDispatch();

  // 1. Component State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",   
  });

  // 2. Redux State
  const { poetryList, loading: adminLoading } = useSelector((state) => state.admin || {});

  // 3. Fetch data on mount
  useEffect(() => {
    dispatch(getAdminPoetryAll());
  }, [dispatch]);

  // 4. Filter & Pagination Logic
  const { paginatedAdmins, totalPages } = useMemo(() => {
    if (!poetryList || !Array.isArray(poetryList)) return { paginatedAdmins: [], totalPages: 0 };
    
    // Search Filter
    const filtered = poetryList.filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        (item.user?.fullName || "").toLowerCase().includes(term) ||
        (item.user?.username || "").toLowerCase().includes(term) ||
        (item.user?.email || "").toLowerCase().includes(term)
      );
    });

    const total = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const sliced = filtered.slice(start, start + itemsPerPage);

    return { paginatedAdmins: sliced, totalPages: total };
  }, [searchTerm, poetryList, currentPage]);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 5. Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = async (adminId, newStatus) => {
    try {
      // Assuming your thunk takes { id, status }
      await dispatch(updateAdminStatus({ id: adminId, status: newStatus })).unwrap();
      alert("Status updated successfully!");
      dispatch(getAdminPoetryAll()); // Refresh list
    } catch (err) {
      alert(err.message || "Failed to update status.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminPayload = { ...formData, role: "USER_ADMIN" };

    try {
      await dispatch(registerUser(adminPayload)).unwrap();
      alert("Admin registered successfully!");
      setFormData({ fullName: "", email: "", username: "", password: "" });
      dispatch(getAdminPoetryAll());
    } catch (err) {
      alert(err.message || "Failed to register admin.");
    }
  };

  return (
    <div className="flex flex-col h-full p-6 animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Admin <span className="text-[#DC2A54]">Management</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">Update account status or register new system administrators.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4 items-start">
        
        {/* LEFT SIDE: ADMIN LIST TABLE */}
        <div className="flex-[1.6] w-full bg-white border border-black/20 rounded-[30px] shadow-sm flex flex-col min-h-[580px]">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <h2 className="text-xl font-bold text-gray-800">Existing Accounts</h2>
            <div className="relative w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search admins..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-black border-b border-gray-100">
                  <th className="px-8 py-5">Full Name</th>
                  <th className="px-4 py-5">Email</th>
                  <th className="px-8 py-5 text-center">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {adminLoading ? (
                  <tr><td colSpan="3" className="text-center py-20 text-gray-400 animate-pulse">Fetching data...</td></tr>
                ) : paginatedAdmins.length > 0 ? (
                  paginatedAdmins.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          {/* <div className="w-8 h-8 rounded-full bg-[#DC2A54]/10 text-[#DC2A54] flex items-center justify-center text-xs font-bold">
                            {item.user?.fullName?.charAt(0)}
                          </div> */}
                          <div>
                            <p className="text-sm font-bold text-gray-800">{item.user?.fullName}</p>
                            <p className="text-[10px] text-gray-400">@{item.user?.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500">{item.user?.email}</td>
                      <td className="px-8 py-4 text-center">
                        {/* STATUS DROPDOWN */}
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`appearance-none px-4 py-1.5 rounded-full text-[10px] font-black cursor-pointer outline-none transition-all border-none pr-8 ${
                            item.status === "STATUS_ACTIVE" 
                              ? "bg-green-100 text-green-600 hover:bg-green-200" 
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 8px center",
                            backgroundSize: "12px"
                          }}
                        >
                          <option value="STATUS_ACTIVE">ACTIVE</option>
                          <option value="STATUS_INACTIVE">INACTIVE</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="text-center py-20 text-gray-400">No admins found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAR */}
          <div className="mt-auto p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30 rounded-b-[30px]">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 rounded-xl border border-gray-200 bg-white disabled:opacity-30 hover:shadow-sm transition-all"
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 rounded-xl border border-gray-200 bg-white disabled:opacity-30 hover:shadow-sm transition-all"
              >
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: REGISTRATION FORM */}
        <div className="flex-1 w-full bg-white border border-black/20 rounded-[30px] shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">New Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] font-bold ml-1 uppercase">Full Name</label>
              <div className="relative">
                <PersonOutlineIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" sx={{fontSize: 18}} />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] font-bold ml-1 uppercase">Username</label>
              <div className="relative">
                <BadgeOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" sx={{fontSize: 18}} />
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] font-bold ml-1 uppercase">Email Address</label>
              <div className="relative">
                <EmailOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" sx={{fontSize: 18}} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] font-bold ml-1 uppercase">Password</label>
              <div className="relative">
                <LockOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" sx={{fontSize: 18}} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#DC2A54] hover:bg-[#b82245] text-white font-bold py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-100 active:scale-95">
              <LoginIcon sx={{ fontSize: 18 }} />
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}