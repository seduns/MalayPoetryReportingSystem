import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { registerUser } from "../../../store/thunk/AuthThunk";

export default function AdminManageAdmin() {
  const dispatch = useDispatch();

  // 1. Updated state to match your Postman JSON structure
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Prepare the payload with the "USER_ADMIN" role
    const adminPayload = {
      ...formData,
      role: "USER_ADMIN"
    };

    try {
      // 3. Dispatch to your existing registerUser thunk
      await dispatch(registerUser(adminPayload)).unwrap();
      alert("Admin registered successfully!");
      setFormData({ fullName: "", email: "", username: "", password: "" });
    } catch (err) {
      alert(err.message || "Failed to register admin. Check if username/email exists.");
    }
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      {/* ... (Header and Left Table remain same as your previous code) ... */}

      <div className="flex flex-col lg:flex-row gap-8 px-4 items-stretch h-[550px]">
        {/* Left Side: Table Area */}
        <div className="flex-[1.4] flex flex-col">
          {/* ... (Your existing search and table code) ... */}
        </div>

        {/* Right Side: Admin Registration Form */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col h-full justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add New Admin</h2>
          
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
                  placeholder="e.g. Muhd Faiszuddin"
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
                  placeholder="e.g. faisz_admin"
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
                  placeholder="admin@example.com"
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
              className="w-full bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-100"
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