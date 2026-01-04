import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";

export default function PoetryDiscoverPage() {
  const dispatch = useDispatch();

  // Redux state
  const { poetryAnalytics = [], loading } = useSelector(
    (state) => state.analytics
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch analytics
  useEffect(() => {
    dispatch(getAllAnalytics());
  }, [dispatch]);

  // Ensure array
  const poetryList = Array.isArray(poetryAnalytics)
    ? poetryAnalytics
    : [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = poetryList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(poetryList.length / itemsPerPage);

  const genres = ["ROMANTIC", "SAD", "LIFE", "MODERN"];

  return (
    <div className="p-20 min-h-screen w-screen flex flex-col font-sans bg-gray-50/30">
      
      {/* Profile Button */}
      <Link
        to="/user-profile"
        className="fixed left-6 top-8 z-50 flex items-center group w-fit"
      >
        <button className="flex border border-black/20 h-12 w-12 items-center justify-center rounded-2xl bg-white group-hover:bg-[#fff5f7] transition-all duration-200 shadow-sm">
          <PersonIcon
            sx={{
              fontSize: 24,
              color: "#BDBDBD",
              ".group:hover &": { color: "#DC2A54" }
            }}
          />
        </button>
        <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-[#DC2A54] text-white text-[11px] font-semibold py-1.5 px-3 rounded-md whitespace-nowrap shadow-lg">
          User Profile
        </span>
      </Link>

      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-coral font-serif italic">The</span>{" "}
          Poetry Space
        </h1>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col shrink-0">
          <div className="mb-8 font-bold uppercase text-xs tracking-widest">
            Search Filter
          </div>

          {/* Genre Filter (UI only for now) */}
          <div className="mb-8">
            <p className="font-bold text-sm mb-4">Genre</p>
            <div className="space-y-3">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="text-sm text-gray-400">
                    {genre}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <p className="font-bold text-sm mb-4">Year</p>
            <select className="w-full bg-gray-50 border border-black/20 rounded-xl px-4 py-3 text-sm">
              <option>All Year</option>
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8 overflow-hidden">
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Poetry"
              className="w-full bg-white border border-black/20 rounded-2xl px-8 py-4 shadow-sm outline-none pr-16"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-coral text-white p-3 rounded-2xl">
              <span className="material-icons">search</span>
            </button>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {loading && (
              <p className="text-center text-gray-400 mt-20">
                Loading poetry...
              </p>
            )}

            {!loading && poetryList.length === 0 && (
              <p className="text-center text-gray-400 mt-20">
                No poetry found
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {currentItems.map((item) => {
                const poetry = item.poetry;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-black/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col h-[320px]"
                  >
                    {/* Title */}
                    <h3 className="text-coral text-3xl font-bold mb-2 line-clamp-2">
                      {poetry.title}
                    </h3>

                    {/* Author */}
                    <p className="text-[10px] text-gray-400 mb-3">
                      by {poetry.author.user.fullName}
                    </p>

                    {/* Description */}
                    <p className="text-black text-[12px] line-clamp-4 mb-6">
                      {poetry.description || poetry.content}
                    </p>

                    <div className="mt-auto">
                      {/* Stats */}
                      <div className="flex gap-4 text-[10px] font-bold mb-4">
                        <span>
                          <i className="material-icons text-xs">visibility</i>{" "}
                          {item.viewCount}
                        </span>
                        <span>
                          <i className="material-icons text-xs">thumb_up</i>{" "}
                          {item.likeCount}
                        </span>
                      </div>

                      {/* Button */}
                      <button className="w-full bg-coral text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                        Read poetry
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12 mb-10">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(p - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  ‹
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold ${
                      currentPage === i + 1
                        ? "bg-coral text-white"
                        : "bg-white border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
