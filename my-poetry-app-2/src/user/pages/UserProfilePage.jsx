import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";


export default function UserProfilePage() {
  return (
    <div className="w-screen min-h-screen flex flex-row font-sans overflow-hidden bg-white">
      
      {/* Main Content Area */}
      <div className="flex-1 flex md:flex-row items-center justify-center gap-8 p-6  bg-white-100 overflow-y-auto " >
        
      {/* Home Button */}
      <Link to="/poetry-discovery" className="relative flex items-center group w-fit">
        <button className="flex border border-black/20 h-12 w-12 items-center justify-center rounded-2xl bg-white group-hover:bg-[#fff5f7] transition-all duration-200 shadow-sm">
          <HomeIcon sx={{ 
            fontSize: 24, 
            color: "#BDBDBD", 
            '.group:hover &': { color: "#DC2A54" } // Changes icon color on button hover
          }} />
        </button>
      </Link>

        <div className="flex flex-col lg:flex-row items-start gap-16 ">
          
          {/* Large Profile Avatar */}
          <div className="shrink-0">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">User Profile</h1>
          <p className="text-gray-400 font-medium">Manage your profile</p>
        </header>

            <div className="w-56 h-56 lg:w-72 lg:h-72 bg-coral rounded-full flex items-center justify-center text-white text-9xl font-bold shadow-2xl shadow-red-100">
              N
            </div>
          </div>

          {/* Form Card */}
          <div className="flex-1 min-w-200 bg-white border border-black/20 rounded-[40px] p-10 lg:p-16 shadow-xl shadow-gray-50 ">
            <form className="space-y-8">
              
              {/* User Name */}
              <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm ml-1">User Name:</label>
                <input 
                  type="text" 
                  defaultValue="Naim Danial"
                  className="w-full bg-white border border-black/20 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-red-50 outline-none transition-all"
                />
              </div>

              {/* User Email */}
              <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm ml-1">User email:</label>
                <input 
                  type="email" 
                  defaultValue="danial@gmail.com"
                  className="w-full bg-white border border-black/20 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-red-50 outline-none transition-all"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm ml-1">Username:</label>
                <input 
                  type="text" 
                  defaultValue="danial12344"
                  className="w-full bg-white border border-black/20 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-red-50 outline-none transition-all"
                />
              </div>

              {/* User Password */}
              <div className="space-y-2">
                <label className="text-gray-500 font-bold text-sm ml-1">User password:</label>
                <input 
                  type="password" 
                  defaultValue="danial12344"
                  className="w-full bg-white border border-black/20 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-red-50 outline-none transition-all"
                />
              </div>

              {/* Update Button */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className="bg-coral hover:opacity-90 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  Update Profile
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}