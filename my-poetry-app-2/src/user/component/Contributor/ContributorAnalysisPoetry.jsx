import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalytics } from "../../../store/thunk/AnalyticsThunk";
// 1. Import the specific donation thunk
import { getAuthorDonation, getDonationByPoetryId } from "../../../store/thunk/DonationThunk";
import { setPoetryAnalyticsData } from "../../../store/slice/AnalyticsSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AnalyticsDashboard() {
  const dispatch = useDispatch();

  // 1. Get Data from Redux
  const { user } = useSelector((state) => state.auth);
  const currentAccountId = user?.id || localStorage.getItem("accountId");

  const {
    poetryAnalytics,
    poetryAnalyticsData,
    loading: analyticsLoading
  } = useSelector((state) => state.analytics);

  // 2. Get the specific donation data for the selected poetry
  const {
    authorDonationData,
    donationPoetry, // <--- Access the specific poetry donation data here
    loading: donationLoading
  } = useSelector((state) => state.donation);

  // 3. INITIAL FETCH: Run useEffect to get all analytics & global donation
  useEffect(() => {
    if (currentAccountId) {
      dispatch(getAuthorDonation(currentAccountId));
      dispatch(getAllAnalytics());
    }
  }, [dispatch, currentAccountId]);

  // 4. FILTERING LOGIC
  const myPoetryList = useMemo(() => {
    if (!poetryAnalytics || !currentAccountId) return [];

    return poetryAnalytics.filter((item) => {
      const authorId = item.poetry?.author?.id || item.author?.id;
      return String(authorId) === String(currentAccountId);
    });
  }, [poetryAnalytics, currentAccountId]);

  // 5. AUTO-SELECT LOGIC
  useEffect(() => {
    // If we have a list, but no specific poetry is selected/loaded yet
    if (myPoetryList.length > 0 && !poetryAnalyticsData) {
      const firstPoetryId = myPoetryList[0].poetry.id;

      // A. Set Analytics Data
      dispatch(setPoetryAnalyticsData(firstPoetryId));

      // B. Fetch Donation Data for this specific poetry
      dispatch(getDonationByPoetryId(firstPoetryId));
    }
  }, [myPoetryList, poetryAnalyticsData, dispatch]);

  // 6. HANDLE SELECTION
  const handleSelectPoetry = (e) => {
    const newPoetryId = Number(e.target.value);

    // A. Update Analytics View
    dispatch(setPoetryAnalyticsData(newPoetryId));

    // B. Fetch Donation Data for this specific poetry
    dispatch(getDonationByPoetryId(newPoetryId));
  };

  // Helper to format data for the Chart
  const chartData = poetryAnalyticsData ? [
    {
      name: poetryAnalyticsData.poetry.title,
      view: poetryAnalyticsData.viewCount,
      like: poetryAnalyticsData.likeCount
    }
  ] : [];

  // Helper for Engagement Calculation
  const engagementRate = poetryAnalyticsData?.viewCount > 0
    ? ((poetryAnalyticsData.likeCount / poetryAnalyticsData.viewCount) * 100).toFixed(1)
    : "0";

  // ---------------- UI ----------------
  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">

      {/* Header - Fixed Height */}
      <div className="mb-4 px-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          Analysis <span className="text-[#DC2A54]">Dashboard</span>
        </h1>
        <p className="text-gray-400 mt-1 text-xs">
          Overview of your poetry performance and earnings
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 pb-4 overflow-hidden space-y-4">

        {/* Dropdown Selector */}
        <div className="relative shrink-0 bg-white rounded-xl border border-black/10 shadow-sm">
          {analyticsLoading ? (
            <div className="p-3 text-gray-400 text-sm italic">Loading poetry list...</div>
          ) : (
            <select
              onChange={handleSelectPoetry}
              value={poetryAnalyticsData?.poetry?.id || ""}
              className="w-full bg-transparent p-4 text-sm text-gray-600 font-bold outline-none cursor-pointer"
            >
              <option value="" disabled>Select a Poem to Analyze</option>
              {myPoetryList.map((item) => (
                <option key={item.poetry.id} value={item.poetry.id}>
                  {item.poetry.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">

          {/* Left Column: 2x2 Grid */}
          <div className="w-full lg:w-2/5 grid grid-cols-2 grid-rows-2 gap-3 h-full">
            <StatCard
              label="Total Views"
              value={poetryAnalyticsData?.viewCount?.toLocaleString() || "0"}
            />
            <StatCard
              label="Total Likes"
              value={poetryAnalyticsData?.likeCount?.toLocaleString() || "0"}
            />
            <StatCard
              label="Engagement Rate"
              value={`${engagementRate}%`}
            />
            {/* 7. Updated Card to show Specific Donation Value */}
            <StatCard
              label="Earnings"
              // Checks if donationPoetry exists, otherwise 0.00
              value={`RM ${donationPoetry?.donationValue?.toFixed(2) || "0.00"}`}
              highlight={true}
            />
          </div>

          {/* Right Column: Chart Card */}
          <div className="w-full lg:w-3/5 bg-white border border-black/20 rounded-[30px] p-6 shadow-sm flex flex-col h-full">
            <div className="mb-4 shrink-0">
              <h3 className="text-lg font-bold text-gray-800">Engagement Visualization</h3>
              <p className="text-xs text-gray-400">
                Comparing views vs likes for <span className="text-[#DC2A54] font-bold">{poetryAnalyticsData?.poetry?.title || 'Selected Poetry'}</span>
              </p>
            </div>

            {/* Chart Container */}
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
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

// Reusable StatCard
function StatCard({ label, value, highlight = false }) {
  return (
    <div className={`flex flex-col justify-center bg-white border ${highlight ? 'border-[#DC2A54]/30 bg-red-50/10' : 'border-black/20'} rounded-[24px] p-6 hover:border-[#DC2A54] transition-all group shadow-sm h-full`}>
      <p className="text-gray-400 font-bold text-[10px] mb-1 uppercase tracking-widest truncate">{label}</p>
      <p className={`text-2xl lg:text-3xl font-bold ${highlight ? 'text-[#DC2A54]' : 'text-gray-800'} group-hover:text-[#DC2A54] transition-colors truncate`}>
        {value}
      </p>
    </div>
  );
}