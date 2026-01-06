import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllAnalytics, addView } from "../../store/thunk/AnalyticsThunk";
import Swal from "sweetalert2";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { setPoetryAnalyticsData } from "../../store/slice/AnalyticsSlice";
import { viewCoauthor } from "../../store/thunk/CoauthorThunk";

// Sub-component to handle individual card likes
const LikeButton = ({ initialLikes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLikeToggle = (e) => {
    e.stopPropagation(); // Prevents triggering card click if applicable
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center gap-1">
      <IconButton onClick={handleLikeToggle} size="small" sx={{ color: isLiked ? "#DC2A54" : "#BDBDBD", padding: '4px' }}>
        {isLiked ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
      </IconButton>
      <span className={`text-xs font-bold ${isLiked ? "text-[#DC2A54]" : "text-gray-400"}`}>
        {likesCount.toLocaleString()} Likes
      </span>
    </div>
  );
};

export default function PoetryDiscoverPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // 1. Get data directly from Redux
  const { poetryAnalytics, loading } = useSelector((state) => state.analytics);

  /* ---------------- STATE ---------------- */
  // FIX: Removed [analyticsData, setAnalyticsData]. We use poetryAnalytics directly.
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All Year");

  const [currentPage, setCurrentPage] = useState(1);
  const [likedPoetry, setLikedPoetry] = useState(new Set());

  const itemsPerPage = 8;

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    // We must fetch data to populate the Redux store
    dispatch(getAllAnalytics());
  }, [dispatch]);

  /* ---------------- FILTER ---------------- */
  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
    setCurrentPage(1);
  };

  // FIX: Filter directly on poetryAnalytics
  const filteredItems = (poetryAnalytics || []).filter((item) => {
    const poem = item.poetry;
    if (!poem) return false;

    // Search Logic
    const matchSearch =
      !searchQuery ||
      poem.title?.toLowerCase().includes(searchQuery.toLowerCase());

    // Genre Logic
    const matchGenre =
      selectedGenres.length === 0 ||
      selectedGenres.includes(poem.category);

    // Year Logic
    const year = poem.dateCreated
      ? new Date(poem.dateCreated).getFullYear().toString()
      : "";

    const matchYear = selectedYear === "All Year" || year === selectedYear;

    return matchSearch && matchGenre && matchYear;
  });

  /* ---------------- ACTIONS ---------------- */
  const handleView = (id) => {
    // This dispatches the action, which hits the API, then updates Redux
    dispatch(addView(id));
    dispatch(setPoetryAnalyticsData(id));
    // dispatch(viewCoauthor(id));
    navigate("/poetry-detail")
  };

  const toggleLike = (id) => {
    const next = new Set(likedPoetry);
    next.has(id) ? next.delete(id) : next.add(id);
    setLikedPoetry(next);
    // You should probably dispatch(addLike(id)) here too
  };

  /* ---------------- PAGINATION ---------------- */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  if (loading && poetryAnalytics.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50/30">
        <p className="text-gray-400 animate-pulse">Loading Poetry Space...</p>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen w-screen bg-gray-50/30">
      {/* Profile */}
      <div className="flex justify-end mb-6">
        <Link to="/user-profile">
          <button className="h-12 w-12 rounded-2xl bg-white border shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
            <PersonIcon sx={{ color: "#BDBDBD" }} />
          </button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        <span className="italic text-coral text-[#FF6F61]">The</span> Poetry Space
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8 h-fit">
          <p className="font-bold text-xs uppercase mb-6 text-gray-400 tracking-wider">Search Filter</p>

          <div className="mb-8">
            <p className="font-bold text-sm mb-4 text-gray-700">Genre</p>
            {["ROMANTIC", "MODERN", "LIFE", "SAD"].map((g) => (
              <label key={g} className="flex gap-3 mb-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g)}
                  onChange={() => handleGenreChange(g)}
                  className="accent-[#FF6F61] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#FF6F61] transition-colors">{g}</span>
              </label>
            ))}
          </div>

          <div>
            <p className="font-bold text-sm mb-4 text-gray-700">Year</p>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6F61] bg-white"
            >
              <option>All Year</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Poetry Title..."
              className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl px-8 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]/20 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF6F61] text-white p-3 rounded-xl hover:bg-[#ff5a4a] transition-colors shadow-md shadow-[#FF6F61]/30">
              <span className="material-icons text-sm font-bold">search</span>
            </button>
          </div>

          {/* Grid */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {currentItems.map((item) => {
                const poem = item.poetry;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col h-[340px] hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide bg-gray-50 px-2 py-1 rounded-md">
                        {poem.category}
                      </span>
                    </div>

                    <h3 className="text-[#FF6F61] text-2xl font-bold line-clamp-2 mb-2 group-hover:underline decoration-2 underline-offset-4">
                      {poem.title}
                    </h3>

                    <p className="text-xs text-gray-500 mb-4 italic">
                      By {poem.author?.user?.fullName || "Unknown"}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-4 mb-6 leading-relaxed flex-grow">
                      {poem.description || poem.content}
                    </p>

                    <div className="mt-auto border-t border-gray-50 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                          {/* This view count will now update automatically via Redux */}
                          {item.viewCount || 0}
                        </span>

                        <button
                          onClick={() => toggleLike(poem.id)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#DC2A54] transition-colors"
                        >
                          {likedPoetry.has(poem.id) ? (
                            <FavoriteIcon sx={{ color: "#DC2A54", fontSize: 20 }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                          )}
                          {item.likeCount || 0}
                        </button>
                      </div>

                      {/* FIX: Moved onClick to the Link wrapper or ensure button doesn't conflict.
                          Ideally, handleView should be called, and navigation happens naturally via Link */}
                        <button onClick={() => handleView(item.poetry.id)} className="w-full bg-[#FF6F61] hover:bg-[#ff5a4a] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF6F61]/20 transition-all active:scale-95">
                          Read Poetry
                        </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 opacity-50">
              <p className="text-6xl mb-4">📜</p>
              <p className="text-gray-500 font-medium">No poetry found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
              >
                <ChevronLeftIcon />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl transition-all ${
                    currentPage === i + 1
                      ? "bg-[#FF6F61] text-white shadow-md shadow-[#FF6F61]/30 scale-110"
                      : "border hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}