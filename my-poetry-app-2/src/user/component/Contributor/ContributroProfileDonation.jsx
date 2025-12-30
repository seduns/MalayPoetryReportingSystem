import React from "react";

export default function ContributroProfileDonation() {
  const donationStats = [
    { label: "Total Donations", value: "RM 2480.00", color: "text-gray-800" },
    { label: "Withdraw", value: "RM 1200.00", color: "text-gray-800" },
    { label: "Current Balance", value: "RM 1260.00", color: "text-green-500" },
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Profile & <span className="text-[#DC2A54]">Donations</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Manage your profile and track your earnings
        </p>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        
        {/* Left Column: Profile Form */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author name:</label>
            <input 
              type="text" 
              defaultValue="Naim Danial"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author email:</label>
            <input 
              type="email" 
              defaultValue="danial@gmail.com"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author password:</label>
            <input 
              type="password" 
              defaultValue="danial12344"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 font-bold text-sm ml-1">Author bio:</label>
            <textarea 
              defaultValue="Poet who writes about silence, love, and midnight thoughts."
              className="w-full bg-white border border-black/20 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[120px] resize-none"
            />
          </div>

          <button className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-8 py-3 rounded-2xl w-fit transition-all shadow-md">
            Update Profile
          </button>
        </div>

        {/* Right Column: Donation Dashboard */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col">
          
          {/* Top Profile Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-24 h-24 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              N
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Naim Danial</h2>
              <p className="text-gray-400 text-xs">Poetry Contributor</p>
              <p className="text-gray-300 text-[10px] mt-1 uppercase tracking-tighter">Author ID: 0021</p>
            </div>
          </div>

          {/* Stat Mini Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {donationStats.map((stat, index) => (
              <div key={index} className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold mb-1">{stat.label}</p>
                <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Withdrawal Box */}
          <div className="bg-[#FF5C5C] rounded-[25px] p-8 flex items-center justify-between shadow-xl shadow-red-50/50">
            <div className="text-white">
              <p className="text-sm font-bold opacity-90">Available for withdrawal</p>
              <p className="text-2xl font-bold">RM 1260.00</p>
            </div>
            <button className="bg-white text-[#FF5C5C] font-bold px-10 py-3 rounded-full hover:bg-gray-50 transition-all shadow-lg active:scale-95">
              Withdraw
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}