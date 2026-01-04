import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAnalytics } from "../../../store/thunk/AnalyticsThunk";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Swal from "sweetalert2";

export default function ContributorAnalysisPoetry() {
  const dispatch = useDispatch();

  // State Management
  const [analyticsData, setAnalyticsData] = useState([]);
  const [selectedPoetry, setSelectedPoetry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accountID = localStorage.getItem("accountId");
    if (accountID) {
      fetchData(accountID);
      console.log(accountID);
    }
  }, [dispatch]);

  const fetchData = async (accountId) => {
    try {
      // Dispatching your Thunk with the contributor's ID
      const resultAction = await dispatch(getAllAnalytics(accountId));

      if (getAllAnalytics.fulfilled.match(resultAction)) {
        const payload = resultAction.payload;

        // Map backend PoetryAnalytics entity to Recharts format
        const formattedData = payload.map((item) => ({
          name: item.poetry.title,
          view: item.viewCount,
          like: item.likeCount,
          id: item.id,
        }));

        setAnalyticsData(formattedData);
        
        // Auto-select the first poetry in the list
        if (formattedData.length > 0) {
          setSelectedPoetry(formattedData[0]);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Fetch Error",
          text: resultAction.payload?.message || "Failed to load analytics",
        });
      }
    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePoetryChange = (e) => {
    const selected = analyticsData.find((item) => item.name === e.target.value);
    setSelectedPoetry(selected);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400 font-medium animate-pulse">Loading Analysis...</p>
      </div>
    );
  }

  /** ---------------- UI ---------------- */
  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header */}
      <div className="mb-8 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Analysis <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Performance overview and reader engagement for your work
        </p>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto pb-10">
        
        {/* Poetry Dropdown Selector */}
        <div className="relative">
          <select
            onChange={handlePoetryChange}
            value={selectedPoetry?.name || ""}
            className="w-full bg-white border border-black/20 rounded-xl px-6 py-4 text-sm text-gray-400 outline-none cursor-pointer appearance-none shadow-sm"
          >
            <option value="">Select Poetry to Analyze</option>
            {analyticsData.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Dashboard Body: Cards + Chart */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Metric Cards */}
          <div className="w-full lg:w-1/3 space-y-4">
            <StatCard 
              label="Total Views" 
              value={selectedPoetry?.view.toLocaleString() || "0"} 
            />
            <StatCard 
              label="Total Likes" 
              value={selectedPoetry?.like.toLocaleString() || "0"} 
            />
            <StatCard 
              label="Engagement Rate" 
              value={selectedPoetry?.view > 0 
                ? `${((selectedPoetry.like / selectedPoetry.view) * 100).toFixed(1)}%` 
                : "0%"
              } 
            />
          </div>

          {/* Right Column: Chart Card */}
          <div className="w-full lg:w-2/3 bg-white border border-black/20 rounded-[30px] p-8 shadow-sm flex flex-col min-h-[400px]">
             <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">Engagement Visualization</h3>
                <p className="text-xs text-gray-400">Comparing views vs likes for {selectedPoetry?.name || 'Selected Poetry'}</p>
             </div>
             
             <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[selectedPoetry]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}} 
                    contentStyle={{borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                  />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                  <Bar 
                    name="Views" 
                    dataKey="view" 
                    fill="#9F92FF" 
                    radius={[8, 8, 0, 0]} 
                    barSize={80} 
                  />
                  <Bar 
                    name="Likes" 
                    dataKey="like" 
                    fill="#FFADAD" 
                    radius={[8, 8, 0, 0]} 
                    barSize={80} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable StatCard following your UI theme
function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-black/20 rounded-[24px] p-8 hover:border-[#DC2A54] transition-all group shadow-sm">
      <p className="text-gray-400 font-bold text-xs mb-2 uppercase tracking-widest">{label}</p>
      <p className="text-4xl font-bold text-gray-800 group-hover:text-[#DC2A54] transition-colors">
        {value}
      </p>
    </div>
  );
}