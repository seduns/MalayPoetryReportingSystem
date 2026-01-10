import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard } from "../../../store/thunk/AnalyticsThunk";
import { getAllDonationsAdmin } from "../../../store/thunk/DonationThunk";
import { getPoetryList } from "../../../store/thunk/PoetryThunk";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import VerifiedIcon from "@mui/icons-material/Verified";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PaymentsIcon from "@mui/icons-material/Payments";

// Charts
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  // ✅ 1. Get Data
  const { dashboardData, loading: analyticsLoading } = useSelector((state) => state.analytics);
  const { allDonations, loading: donationLoading } = useSelector((state) => state.donation);
  const { poetryList, loading: poetryLoading } = useSelector((state) => state.poetry);

  // ✅ 2. Fetch Data
  useEffect(() => {
    dispatch(getAdminDashboard());
    dispatch(getAllDonationsAdmin());
    dispatch(getPoetryList());
  }, [dispatch]);

  // ✅ 3. Helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // ✅ 4. Prepare Cards Data (Compact Design)
  const stats = useMemo(() => {
    const data = dashboardData || {};
    return [
      { 
        label: "Total Users", 
        value: (data.totalUser || 0).toLocaleString(), 
        icon: <GroupIcon fontSize="small" />, 
        gradient: "from-blue-400 to-indigo-600",
        shadow: "shadow-blue-200"
      },
      { 
        label: "Total Authors", 
        value: (data.totalAuthor || 0).toLocaleString(), 
        icon: <CreateIcon fontSize="small" />, 
        gradient: "from-purple-400 to-fuchsia-600",
        shadow: "shadow-purple-200"
      },
      { 
        label: "Total Views", 
        value: (data.totalViews || 0).toLocaleString(), 
        icon: <VisibilityIcon fontSize="small" />, 
        gradient: "from-orange-400 to-amber-600",
        shadow: "shadow-orange-200"
      },
      { 
        label: "Total Likes", 
        value: (data.totalLikes || 0).toLocaleString(), 
        icon: <FavoriteIcon fontSize="small" />, 
        gradient: "from-rose-400 to-pink-600",
        shadow: "shadow-rose-200"
      },
      { 
        label: "Total Poetry", 
        value: (data.totalPoetry || 0).toLocaleString(), 
        icon: <AutoStoriesIcon fontSize="small" />, 
        gradient: "from-teal-400 to-cyan-600",
        shadow: "shadow-teal-200"
      },
      { 
        label: "Approved", 
        value: (data.totalApprovedPoetry || 0).toLocaleString(), 
        icon: <VerifiedIcon fontSize="small" />, 
        gradient: "from-green-400 to-emerald-600",
        shadow: "shadow-green-200"
      },
      { 
        label: "Donation Count", 
        value: (data.totalDonationCount || 0).toLocaleString(), 
        icon: <VolunteerActivismIcon fontSize="small" />, 
        gradient: "from-pink-400 to-rose-600",
        shadow: "shadow-pink-200"
      },
      { 
        label: "Total Donation", 
        value: formatCurrency(data.totalDonationAmount), 
        icon: <PaymentsIcon fontSize="small" />, 
        gradient: "from-emerald-400 to-teal-600",
        shadow: "shadow-emerald-200"
      },
    ];
  }, [dashboardData]);

  // ==========================================
  // 📊 CHART 1: Poetry Count by Status (NEW LOGIC)
  // Logic: Count poetryList items by status.name
  // ==========================================
  const poetryStatusData = useMemo(() => {
    if (!poetryList) return [];
    
    const counts = { "APPROVED": 0, "PENDING": 0, "REJECTED": 0 };

    poetryList.forEach(p => {
      // Access nested status object: p.status.name
      const statusName = p.status?.name || "UNKNOWN";
      
      // Map/Normalize keys if needed, assuming backend sends uppercase
      if (counts[statusName] !== undefined) {
        counts[statusName]++;
      } else if (statusName === "PUBLISHED") {
         // Treat Published as Approved if needed, or separate
         counts["APPROVED"]++;
      }
    });

    return [
      { name: "Approved", count: counts["APPROVED"], fill: "#10B981" }, // Green
      { name: "Pending", count: counts["PENDING"], fill: "#F59E0B" },   // Amber
      { name: "Rejected", count: counts["REJECTED"], fill: "#EF4444" }  // Red
    ];
  }, [poetryList]);


  // ==========================================
  // 🍩 CHART 2: Donation Tiers (Approved Only)
  // ==========================================
  const donationRangeData = useMemo(() => {
    if (!allDonations) return [];

    let below200 = 0;
    let mid200to400 = 0;
    let above400 = 0;

    allDonations.forEach(d => {
      // Filter: Only Approved/Published
      if (d.Status === "APPROVED" || d.Status === "PUBLISHED") {
        const amt = d.donationAmount || 0;
        
        if (amt < 200) {
          below200++;
        } else if (amt >= 200 && amt <= 400) {
          mid200to400++;
        } else {
          above400++;
        }
      }
    });

    return [
      { name: 'Below RM 200', value: below200 },
      { name: 'RM 200 - 400', value: mid200to400 },
      { name: 'Above RM 400', value: above400 },
    ].filter(item => item.value > 0);

  }, [allDonations]);

  const PIE_COLORS = ['#FF8042', '#00C49F', '#FFBB28'];
  const isLoading = analyticsLoading || donationLoading || poetryLoading;

  if (isLoading && !dashboardData) {
    return <div className="p-10 text-center text-gray-400 animate-pulse">Loading dashboard statistics...</div>;
  }

  return (
    <div className="p-6 w-full animate-fadeIn bg-gray-50/30 min-h-screen">
      
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-900">
          Dashboard <span className="text-[#DC2A54]">Overview</span>
        </h1>
        <p className="text-gray-400 mt-1 font-medium text-xs">Real-time platform statistics and analytics.</p>
      </div>

      {/* --- CARDS (Compact) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white rounded-[20px] p-4 shadow-sm hover:shadow-lg transition-all duration-300 group h-[100px] border border-gray-100 flex items-center"
          >
            <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl rounded-full group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>

            <div className={`shrink-0 p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-sm ${stat.shadow} mr-4 relative z-10`}>
                {React.cloneElement(stat.icon, { className: "text-white", fontSize: "small" })}
            </div>

            <div className="flex flex-col relative z-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none mt-0.5">
                  {stat.value}
                </h2>
            </div>
          </div>
        ))}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* BAR CHART: Poetry Status Count */}
        <div className="relative overflow-hidden bg-white rounded-[20px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col border border-gray-100">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-indigo-400 to-blue-600 opacity-5 blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-base font-bold text-gray-800 mb-1">Poetry Status Overview</h3>
              <p className="text-[10px] text-gray-400 mb-6">Current status distribution of all submitted poetry.</p>

              {/* ✅ Chart Height Restored to 320px */}
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={poetryStatusData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    {/* YAxis for Counts (No Currency) */}
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} allowDecimals={false} />
                    <Tooltip
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    {/* Individual Bar Colors mapped from data */}
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={50}>
                      {poetryStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
        </div>

        {/* PIE CHART: Donation Tiers */}
        <div className="relative overflow-hidden bg-white rounded-[20px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col border border-gray-100">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-orange-400 to-amber-600 opacity-5 blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-base font-bold text-gray-800 mb-1">Approved Donation Tiers</h3>
              <p className="text-[10px] text-gray-400 mb-6">Donation tiers for <strong>Approved</strong> poetry only.</p>

              {/* ✅ Chart Height Restored to 320px */}
              <div className="h-[320px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donationRangeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={90}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {donationRangeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                  <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {donationRangeData.reduce((acc, curr) => acc + curr.value, 0)}
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}