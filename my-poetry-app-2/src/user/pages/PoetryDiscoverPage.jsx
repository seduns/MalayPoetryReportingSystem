import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";

// MUI Imports
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";

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
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId");

  const { poetryAnalytics = [], loading } = useSelector((state) => state.analytics);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All Year");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getAllAnalytics());
  }, [dispatch]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const handleReadClick = (poetryId) => {
    if (accountId) {
      navigate(`/poetry-detail/${poetryId}`);
    } else {
      navigate("/login");
    }
  };

  const filteredPoetry = (Array.isArray(poetryAnalytics) ? poetryAnalytics : []).filter((item) => {
    const poetry = item.poetry;
    const matchesSearch = poetry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poetry.author.user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(poetry.category?.toUpperCase());
    const poetryYear = new Date(poetry.dateCreated).getFullYear().toString();
    const matchesYear = selectedYear === "All Year" || poetryYear === selectedYear;

    return matchesSearch && matchesGenre && matchesYear;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPoetry.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPoetry.length / itemsPerPage);

  const genres = ["ROMANTIC", "SAD", "LIFE", "MODERN"];

  return (
    <div className="p-10 min-h-screen w-screen flex flex-col font-sans bg-gray-50/30">
      <div className="flex justify-end pr-5 mb-4">
        <Link to="/user-profile" className="relative group">
          <button className="flex border border-black/20 h-12 w-12 items-center justify-center rounded-2xl bg-white group-hover:bg-[#fff5f7] transition-all duration-200 shadow-sm">
            <PersonIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54" } }} />
          </button>
        </Link>
      </div>

      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-coral font-serif italic">The</span> Poetry Space
        </h1>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        <aside className="w-64 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col shrink-0">
          <div className="mb-8 font-bold uppercase text-xs tracking-widest">Search Filter</div>
          <div className="mb-8">
            <p className="font-bold text-sm mb-4">Genre</p>
            <div className="space-y-3">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <span className="text-sm text-gray-400">{genre}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-sm mb-4">Year</p>
            <select 
              value={selectedYear}
              onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
              className="w-full bg-gray-50 border border-black/20 rounded-xl px-4 py-3 text-sm"
            >
              <option value="All Year">All Year</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-8 overflow-hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Poetry"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border border-black/20 rounded-2xl px-8 py-4 shadow-sm outline-none pr-16"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-coral text-white p-3 rounded-2xl">
              <span className="material-icons">search</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {currentItems.map((item) => {
                const poetry = item.poetry;
                return (
                  <div key={item.id} className="bg-white border border-black/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col h-[350px]">
                    <h3 className="text-coral text-3xl font-bold mb-2 line-clamp-2">{poetry.title}</h3>
                    <p className="text-[10px] text-gray-400 mb-3">by {poetry.author.user.fullName}</p>
                    <p className="text-black text-[12px] line-clamp-4 mb-6">{poetry.description || poetry.content}</p>

                    <div className="mt-auto">
                      {/* STATS SECTION UPDATED */}
                      <div className="flex flex-col gap-1 py-2 mb-2">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold px-1 py-1">
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                          <span>{item.viewCount.toLocaleString()} View</span>
                        </div>
                        
                        {/* Custom Like Toggle Component */}
                        <LikeButton initialLikes={item.likeCount} />
                      </div>

                      <button 
                        onClick={() => handleReadClick(poetry.id)}
                        className="w-full bg-coral text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                      >
                        Read poetry
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination logic remains same... */}
          </div>
        </div>
      </div>
    </div>
  );
}