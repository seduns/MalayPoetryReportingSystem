import React from "react";
// If you want to use the actual charts, I recommend installing 'recharts'
// npm install recharts

export default function ContributorDashboard() {
  const stats = [
    { label: "Total Published Poetry", value: "6", color: "bg-yellow-50", iconColor: "text-yellow-500" },
    { label: "Total View", value: "1234542", color: "bg-green-50", iconColor: "text-green-500" },
    { label: "Total Like", value: "64111", color: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "Total Donation", value: "RM 17888", color: "bg-red-50", iconColor: "text-red-500" },
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn m-5">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <span className="text-[#DC2A54] font-serif italic">The</span> Poetry Space
        </h1>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-[25px] p-6 shadow-sm flex flex-col h-[180px]">
             {/* Small Icon Box */}
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className={`material-icons ${stat.iconColor} text-sm font-bold`}>description</span>
            </div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Bar/Line Chart Container */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm flex flex-col">
          <p className="text-gray-400 text-xs font-bold mb-4">BarLineChart</p>
          <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
             {/* Placeholder for Bar Chart (Views vs Likes) */}
             <div className="text-center">
                <p className="text-gray-400 text-sm">Bar Chart Component Goes Here</p>
                <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> <span className="text-[10px]">View</span></div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> <span className="text-[10px]">Like</span></div>
                </div>
             </div>
          </div>
        </div>

        {/* Donut Chart Container */}
        <div className="bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm flex flex-col">
          <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200 relative">
             {/* Center Text of Donut */}
             <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">7529</span>
             </div>
             <p className="text-gray-400 text-sm mt-20">Donut Chart Component</p>
          </div>
          {/* Chart Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
             <div className="flex items-center gap-1 text-[8px] text-gray-500">• Whisper of Night</div>
             <div className="flex items-center gap-1 text-[8px] text-gray-500">• Between Silent Lines</div>
             <div className="flex items-center gap-1 text-[8px] text-gray-500">• Ink on My Heart</div>
             <div className="flex items-center gap-1 text-[8px] text-gray-500">• Place Called Home</div>
          </div>
        </div>

      </div>
    </div>
  );
}