import React from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

export default function AdminManageAdmin() {
  const admins = [
    { name: "Naim Danial", username: "naim123" },
    { name: "Max Verstepen", username: "max11" },
    { name: "Lewis hamilton", username: "lewis" },
    { name: "Kimi Antoneline", username: "kimii" },
    { name: "Isack hadjar", username: "sackh" },
    { name: "Lando Norris", username: "landdo" },
    { name: "Pscar Piatsri", username: "oscarr" },
    { name: "Leclare", username: "leclaree" },
    { name: "Goerge Rusell", username: "gsell" },
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Manage <span className="text-[#DC2A54]">Admin</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview of all donation transactions across poetry
        </p>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        {/* Left: Admin List Table */}
        <div className="flex-[1.2] bg-white border border-black/20 rounded-[30px] shadow-sm overflow-hidden flex flex-col">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-xs uppercase tracking-widest sticky top-0">
                <th className="py-5 px-8 font-semibold">Admin</th>
                <th className="py-5 px-8 font-semibold">Username</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((admin, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-8 font-bold text-gray-800 text-sm">{admin.name}</td>
                  <td className="py-4 px-8 font-bold text-gray-600 text-sm">{admin.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Add New Admin Form */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add New Admin</h2>
          
          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-gray-500 text-xs font-bold ml-1">Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
              />
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-[#FF5C5C] focus:ring-0 w-4 h-4 border-gray-300" />
                <span className="text-gray-400 text-[10px] font-medium">Remember me</span>
              </label>
              <button className="text-[#FF5C5C] text-[10px] font-bold hover:underline">Forgot Password?</button>
            </div>

            {/* Sign Up Button */}
            <button className="w-full bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-100">
               <LoginIcon sx={{ fontSize: 18, transform: 'rotate(0deg)' }} />
               Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}