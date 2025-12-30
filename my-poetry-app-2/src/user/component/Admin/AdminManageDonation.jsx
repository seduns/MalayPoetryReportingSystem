import React from "react";

export default function AdminManageDonation() {
  const stats = [
    { label: "Total Donations", value: "RM 12344" },
    { label: "Total Donation Count", value: "344" },
  ];

  const donationData = [
    { title: "Whispers of the Night", author: "Amelia hance", count: "113", amount: "RM 566" },
    { title: "Ink on My Heart", author: "Danial rechardo", count: "23", amount: "RM 344" },
    { title: "Between Silent Lines", author: "Amelia hance", count: "33", amount: "RM 1100" },
    { title: "Ink on My Heart", author: "Danial rechardo", count: "14", amount: "RM 322" },
    { title: "Between Silent Lines", author: "Amelia hance", count: "21", amount: "RM 432" },
    { title: "Between Silent Lines", author: "Danial rechardo", count: "33", amount: "RM 211" },
    { title: "Ink on My Heart", author: "Amelia hance", count: "66", amount: "RM 455" },
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Monitor <span className="text-[#DC2A54]">Donation</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview of all donation transactions across poetry
        </p>
      </div>

      {/* Large Metric Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8 px-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white border border-black/20 rounded-[25px] p-10 shadow-sm flex flex-col justify-center min-h-[160px]"
          >
            <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-tight">
                {stat.label}
            </p>
            <p className="text-4xl font-bold text-gray-800 tracking-tighter">
                {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Donation Table */}
      <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm overflow-hidden flex flex-col mx-4 mb-4">
        <div className="overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-xs uppercase tracking-widest sticky top-0 z-10">
                <th className="py-5 px-8 text-left font-semibold">Poetry</th>
                <th className="py-5 px-4 text-left font-semibold">Author</th>
                <th className="py-5 px-4 text-left font-semibold">Donation Count</th>
                <th className="py-5 px-8 text-left font-semibold">Donation Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donationData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-8 font-bold text-gray-800 text-sm">{item.title}</td>
                  <td className="py-5 px-4 font-bold text-gray-800 text-sm">{item.author}</td>
                  <td className="py-5 px-4 font-bold text-gray-800 text-sm">{item.count}</td>
                  <td className="py-5 px-8 font-bold text-gray-800 text-sm">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}