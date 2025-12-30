import React from "react";

export default function AdminPoetryStatusManager() {
  const stats = [
    { label: "Poetry", value: "20", color: "text-gray-400" },
    { label: "Pending", value: "3", color: "text-blue-500" },
    { label: "Rejected", value: "8", color: "text-red-400" },
    { label: "Approved", value: "11", color: "text-green-500" },
  ];

  const poetryData = [
    { title: "Whispers of the Night", author: "Amelia hance", category: "Love", status: "Approved" },
    { title: "Between Silent Lines", author: "Amelia hance", category: "Life", status: "Approved" },
    { title: "Whispers of the Night", author: "Danial rechardo", category: "Love", status: "Rejected" },
    { title: "Ink on My Heart", author: "Amelia hance", category: "Motivation", status: "Approved" },
    { title: "Between Silent Lines", author: "Danial rechardo", category: "Romantic", status: "Pending" },
    { title: "Between Silent Lines", author: "Danial rechardo", category: "Friendship", status: "Approved" },
    { title: "Whispers of the Night", author: "Danial rechardo", category: "Love", status: "Approved" },
    { title: "Ink on My Heart", author: "Amelia hance", category: "Friendship", status: "Approved" },
  ];

  // Helper to determine status badge colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-[#76FFB1] text-white";
      case "Rejected": return "bg-[#FF7F7F] text-white";
      case "Pending": return "bg-[#7B61FF] text-white";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Header Section */}
      <div className="mb-4 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Manage <span className="text-[#DC2A54]">Poetry Status</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview report of each poetry in 2 version: full version or summary version
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6 px-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-black/20 rounded-[20px] py-4 shadow-sm flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className={`${stat.color} text-xs font-medium`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Poetry Table */}
      <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm overflow-hidden flex flex-col mx-4">
        <div className="overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-xs uppercase tracking-widest sticky top-0">
                <th className="py-5 px-8 text-left font-semibold">Poetry</th>
                <th className="py-5 px-4 text-left font-semibold">Author</th>
                <th className="py-5 px-4 text-left font-semibold">Category</th>
                <th className="py-5 px-8 text-center font-semibold">View/Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {poetryData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-8 font-bold text-gray-800 text-sm">{item.title}</td>
                  <td className="py-4 px-4 font-bold text-gray-800 text-sm">{item.author}</td>
                  <td className="py-4 px-4 font-bold text-gray-800 text-sm">{item.category}</td>
                  <td className="py-4 px-8">
                    <div className="flex items-center justify-center gap-4">
                      <button className="bg-[#7B61FF] hover:bg-[#6649FF] text-white px-6 py-1.5 rounded-full text-[10px] font-bold transition-all">
                        View
                      </button>
                      <div className={`flex items-center justify-between min-w-[110px] px-3 py-1.5 rounded-full text-[10px] font-bold ${getStatusStyle(item.status)}`}>
                        {item.status}
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}