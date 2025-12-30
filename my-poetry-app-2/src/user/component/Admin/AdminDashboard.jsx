import React from "react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total User", value: "12900" },
    { label: "Total Author", value: "200" },
    { label: "Total Views", value: "1211231" },
    { label: "Total Likes", value: "12221" },
    { label: "Total Poetry", value: "490" },
    { label: "Total Donation Count", value: "89200" },
    { label: "Total Donation", value: "RM 173888" },
    { label: "Total Approved Poetry", value: "420" },
  ];

  return (
    <div className="p-8 w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <span className="text-[#DC2A54] font-serif">The</span> Poetry Space
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-5 border border-black/20 rounded-[20px] shadow-sm bg-white"
          >
            <p className="text-gray-400 text-xs font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Placeholder */}
        <div className="p-6 border border-black/20 rounded-[20px] shadow-sm min-h-[300px] flex items-center justify-center bg-white">
           <p className="text-gray-300 italic">Bar Chart Placeholder (Use Recharts/Chart.js)</p>
        </div>

        {/* Donut Chart Placeholder */}
        <div className="p-6 border border-black/20 rounded-[20px] shadow-sm min-h-[300px] flex items-center justify-center bg-white">
           <p className="text-gray-300 italic">Donut Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
}