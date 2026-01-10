import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Icons
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from "@mui/icons-material/Search";

// Thunks
import { registerUser } from "../../../store/thunk/AuthThunk";
import { getAdminPoetryAll } from "../../../store/thunk/AdminThunk";

export default function AdminManageAdmin() {
  const dispatch = useDispatch();

  // 1. Component State
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",   
  });

  // 2. Redux State
  // We extract poetryList and loading from the admin slice
  const { poetryList, loading: adminLoading } = useSelector((state) => state.admin || {});

  // 3. Debugging: Log the list whenever it changes to ensure it's reaching the component
  useEffect(() => {
    console.log("Current PoetryList in Component:", poetryList);
  }, [poetryList]);

  // 4. Fetch data on mount
  useEffect(() => {
    dispatch(getAdminPoetryAll());
  }, [dispatch]);

  // 5. Filter Logic (Matches your JSON structure: item.user.fullName)
  const filteredAdmins = useMemo(() => {
    // If poetryList is not an array yet, return empty array to prevent errors
    if (!poetryList || !Array.isArray(poetryList)) return [];
    
    return poetryList.filter((item) => {
      const term = searchTerm.toLowerCase();
      // Accessing the nested 'user' object from your API response
      const name = (item.user?.fullName || "").toLowerCase();
      const uname = (item.user?.username || "").toLowerCase();
      const email = (item.user?.email || "").toLowerCase();
      
      return name.includes(term) || uname.includes(term) || email.includes(term);
    });
  }, [searchTerm, poetryList]);

  // 6. Form Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Explicitly set the role as USER_ADMIN for this form
    const adminPayload = {
      ...formData,
      role: "USER_ADMIN"
    };

    try {
      await dispatch(registerUser(adminPayload)).unwrap();
      alert("Admin registered successfully!");
      // Reset form
      setFormData({ fullName: "", email: "", username: "", password: "" });
      // Refresh the table list to show the new admin
      dispatch(getAdminPoetryAll());
    } catch (err) {
      alert(err.message || "Failed to register admin. Check if username or email is already taken.");
    }
  };

  return (
    <div className="flex flex-col h-full p-6 animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Admin <span className="text-[#DC2A54]">Management</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Register new administrators and manage existing system access.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4 items-start h-full">
        
        {/* LEFT SIDE: ADMIN LIST TABLE */}
        <div className="flex-[1.6] w-full bg-white border border-black/10 rounded-[30px] shadow-sm overflow-hidden flex flex-col max-h-[600px]">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
            <h2 className="text-xl font-bold text-gray-800">Existing Accounts</h2>
            
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search name, email..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10">
                <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-black border-b border-gray-100">
                  <th className="px-8 py-4">Full Name</th>
                  <th className="px-4 py-4">Username</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-8 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {adminLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-20 text-gray-400 animate-pulse">
                      Syncing with database...
                    </td>
                  </tr>
                ) : filteredAdmins.length > 0 ? (
                  filteredAdmins.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50/20 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                            {item.user?.fullName?.charAt(0)}
                          </div>
                          <p className="text-sm font-bold text-gray-800 group-hover:text-[#DC2A54] transition-colors">
                            {item.user?.fullName || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs font-medium text-gray-500">
                        @{item.user?.username}
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500">
                        {item.user?.email}
                      </td>
                      <td className="px-8 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black ${
                          item.status === "STATUS_ACTIVE" 
                            ? "bg-green-100 text-green-600" 
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {item.status === "STATUS_ACTIVE" ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-20 text-gray-400 text-sm italic">
                      No admin accounts found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE: REGISTRATION FORM */}
        <div className="flex-1 w-full bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Add New Admin</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-gray-500 text-[10px] font-bold ml-1 uppercase">Full Name</label>
              <div className="relative">
                <PersonOutlineIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{fontSize: 18}} />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Faiszuddin"
                  className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-gray-500 text-[10px] font-bold ml-1 uppercase">Username</label>
              <div className="relative">
                <BadgeOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{fontSize: 18}} />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g., admin_faisz"
                  className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-gray-500 text-[10px] font-bold ml-1 uppercase">Email Address</label>
              <div className="relative">
                <EmailOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{fontSize: 18}} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@poetry.com"
                  className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-gray-500 text-[10px] font-bold ml-1 uppercase">Password</label>
              <div className="relative">
                <LockOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{fontSize: 18}} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#F3F6F9] border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#DC2A54] hover:bg-[#b82245] text-white font-bold py-3.5 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-100 active:scale-95"
            >
              <LoginIcon sx={{ fontSize: 18 }} />
              Create Admin Account
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}