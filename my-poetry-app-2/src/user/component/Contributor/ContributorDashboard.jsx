import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorDashboard } from "../../../store/thunk/AnalyticsThunk"; 

// Icons
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Charts
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, Label 
} from "recharts";

export default function AuthorDashboard() {
  const dispatch = useDispatch();

  // ✅ 1. Get Data from Redux
  const { authorDashboardData: data, loading } = useSelector((state) => state.analytics);

  // ✅ 2. Fetch Data on Mount
  useEffect(() => {
    dispatch(getAuthorDashboard());
  }, [dispatch]);

  // ✅ 3. Helper: Currency Formatter
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-MY', { 
        style: 'currency', 
        currency: 'MYR', 
        minimumFractionDigits: 0 
    }).format(val || 0);
  };

  // ✅ 4. Prepare Cards Data with NEW GRADIENTS
  const stats = useMemo(() => {
    const d = data || {};
    return [
      { 
        label: "Published", 
        value: (d.totalPublishedPoetry || 0).toLocaleString(), 
        icon: <DescriptionIcon />, 
        // Using gradients instead of flat colors
        gradient: "from-amber-400 to-orange-600",
        shadow: "shadow-amber-200"
      },
      { 
        label: "Total Views", 
        value: (d.totalViews || 0).toLocaleString(), 
        icon: <VisibilityIcon />, 
        gradient: "from-blue-400 to-indigo-600",
        shadow: "shadow-blue-200"
      },
      { 
        label: "Total Likes", 
        value: (d.totalLikes || 0).toLocaleString(), 
        icon: <FavoriteIcon />, 
        gradient: "from-rose-400 to-pink-600",
        shadow: "shadow-rose-200"
      },
      { 
        label: "Earnings", 
        value: formatCurrency(d.totalDonation), 
        icon: <MonetizationOnIcon />, 
        gradient: "from-emerald-400 to-teal-600",
        shadow: "shadow-emerald-200"
      },
    ];
  }, [data]);

  // ✅ 5. Prepare Chart Data
  const barChartData = data?.topViewedPoetry || [];
  const pieChartData = (data?.topDonatedPoetry || []).map(item => ({
    name: item.title,
    value: item.primaryMetric
  }));

  // Colors for Pie Chart
  const PIE_COLORS = ['#6366F1', '#EC4899', '#14B8A6', '#F59E0B', '#8B5CF6'];

  if (loading && !data) {
    return <div className="p-10 text-center text-gray-400 animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="flex flex-col h-full animate-fadeIn p-6 bg-gray-50/50 overflow-hidden">
      
      {/* Header Section */}
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, <span className="text-[#DC2A54]">Author</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium mt-1">
          Here is how your content is performing today.
        </p>
      </div>

      {/* --- NEW PREMIUM CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6 shrink-0">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white rounded-[24px] p-5 shadow-sm hover:shadow-lg transition-all duration-300 group h-[150px] border border-gray-100"
          >
            {/* The subtle gradient background blob that moves/grows on hover */}
            <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${stat.gradient} opacity-10 blur-3xl rounded-full group-hover:opacity-25 transition-opacity duration-500`}></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Top Section: Icon and Label arranged horizontally */}
                <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-sm ${stat.shadow}`}>
                        {/* Icon is now white to pop against gradient */}
                        {React.cloneElement(stat.icon, { className: "text-white", fontSize: "medium" })}
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right pt-1">{stat.label}</p>
                </div>

                {/* Bottom Section: Big Value */}
                <div className="mt-2">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">{stat.value}</h2>
                </div>
            </div>
          </div>
        ))}
      </div>
      {/* -------------------------- */}


      {/* Charts Section - Takes remaining height without scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 shrink-0">
             <div>
               <h3 className="text-lg font-bold text-gray-800">Top Performing Poetry</h3>
               <p className="text-xs text-gray-400">Comparing Views vs Likes for your top 5 hits.</p>
             </div>
             {/* Custom Legend */}
             <div className="flex gap-4">
               <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                 <span className="w-3 h-3 rounded-full bg-[#6366F1]"></span> Views
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                 <span className="w-3 h-3 rounded-full bg-[#EC4899]"></span> Likes
               </div>
             </div>
          </div>

          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="title" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 500}} 
                  dy={10}
                  tickFormatter={(val) => val.length > 15 ? val.substring(0, 15) + '...' : val} 
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                <Tooltip 
                   cursor={{fill: '#F9FAFB'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar name="Views" dataKey="primaryMetric" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar name="Likes" dataKey="secondaryMetric" fill="#EC4899" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col h-full">
          <div className="shrink-0 mb-2">
            <h3 className="text-lg font-bold text-gray-800">Top Earners</h3>
            <p className="text-xs text-gray-400">Highest donation received per poem.</p>
          </div>
          
          <div className="flex-1 w-full min-h-0 relative flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                  <Label 
                    value={formatCurrency(pieChartData.reduce((a, b) => a + b.value, 0))} 
                    position="center" 
                    className="text-xl font-extrabold fill-gray-800"
                  />
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => <span className="text-gray-500 text-[10px] font-medium ml-1">{value.length > 20 ? value.substring(0, 20) + '...' : value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[140%] text-center pointer-events-none">
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Top 5 Sum</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}