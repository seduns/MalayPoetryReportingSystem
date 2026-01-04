import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPoetryList } from "../../store/thunk/PoetryThunk";
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";
import Swal from "sweetalert2";

// MUI Icons
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function PoetryDiscoveryPage() {
  const dispatch = useDispatch();
  
  // 1. Data States
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState([]); // Default to empty array
  
  // 2. Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All Year");

  // 3. UI States
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPoetry, setLikedPoetry] = useState(new Set());
  const itemsPerPage = 8;

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const analyticsAction = await dispatch(getAllAnalytics());

      if (getAllAnalytics.fulfilled.match(analyticsAction)) {
        setAnalyticsData(analyticsAction.payload);
      } else {
        Swal.fire({
          icon: "error",
          title: "Fetch Error",
          text: analyticsAction.payload?.message || "Failed to load analytics",
        });
      }
    } catch (error) {
      console.error("Discovery Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /** ---------------- FILTER LOGIC ---------------- */
  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  // We filter the analyticsData because it contains the poetry object inside it
  const filteredItems = analyticsData.filter((item) => {
    const poem = item.poetry;
    
    const matchesSearch = !searchQuery || 
      poem?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenres.length === 0 || 
      selectedGenres.some(selected => 
        poem?.category?.toUpperCase() === selected.toUpperCase()
      );
    
    const itemYear = poem?.dateCreated ? new Date(poem.dateCreated).getFullYear().toString() : "";
    const matchesYear = selectedYear === "All Year" || itemYear === selectedYear;

    return matchesSearch && matchesGenre && matchesYear;
  });

  /** ---------------- PAGINATION LOGIC ---------------- */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const toggleLike = (id) => {
    const newLikedSet = new Set(likedPoetry);
    newLikedSet.has(id) ? newLikedSet.delete(id) : newLikedSet.add(id);
    setLikedPoetry(newLikedSet);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50/30">
        <p className="text-gray-400 font-medium animate-pulse">Loading Poetry Space...</p>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen w-screen flex flex-col font-sans bg-gray-50/30">
      
      {/* Header */}
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
        {/* Sidebar */}
        <aside className="w-64 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col shrink-0">
          <div className="flex items-center gap-2 mb-8 text-gray-800 font-bold uppercase text-xs tracking-widest">
            <span className="material-icons text-sm">filter_list</span>
            Search Filter
          </div>

          <div className="space-y-8">
            <div>
              <p className="font-bold text-sm text-gray-800 mb-4">Genre</p>
              <div className="space-y-3">
                {["Romantic", "Modern", "Nature", "Spiritual"].map((genre) => (
                  <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="w-4 h-4 rounded border-black text-[#DC2A54] focus:ring-[#DC2A54]" 
                    />
                    <span className={`text-sm font-medium transition-colors ${selectedGenres.includes(genre) ? "text-[#DC2A54]" : "text-gray-400"}`}>
                      {genre}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-gray-800 mb-4">Year</p>
              <div className="relative">
                <select 
                  value={selectedYear}
                  onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-gray-50 border border-black/20 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none appearance-none cursor-pointer"
                >
                  <option>All Year</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons text-gray-400 pointer-events-none text-sm">expand_more</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8 overflow-hidden">
          <div className="relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search Poetry Title" 
              className="w-full bg-white border border-black/20 rounded-2xl px-8 py-4 shadow-sm outline-none transition-all pr-16 focus:border-[#DC2A54]" 
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-coral text-white p-3 rounded-2xl shadow-md">
              <span className="material-icons block">search</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {currentItems.map((item) => {
                  const poem = item.poetry;
                  return (
                    <div key={item.id} className="bg-white border border-black/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col group h-[320px]">
                      <h3 className="text-coral text-3xl font-bold leading-tight mb-4 line-clamp-2">{poem?.title}</h3>
                      <p className="text-black text-[12px] leading-relaxed line-clamp-4 mb-6">{poem?.content}</p>
                      
                      <div className="mt-auto">
                        <div className="flex items-center gap-4 text-[10px] font-bold mb-4 text-gray-400">
                          <div className="flex items-center gap-1">
                            <VisibilityIcon sx={{ fontSize: 16, color: "#BDBDBD" }} />
                            <span>{item.viewCount || 0}</span>
                          </div>
                          <div className="flex items-center gap-0">
                            <button onClick={() => toggleLike(poem?.id)} className="p-1">
                              {likedPoetry.has(poem?.id) ? <FavoriteIcon sx={{ fontSize: 18, color: "#DC2A54" }} /> : <FavoriteBorderIcon sx={{ fontSize: 18, color: "#BDBDBD" }} />}
                            </button>
                            <span className={likedPoetry.has(poem?.id) ? "text-[#DC2A54]" : ""}>{item.likeCount || 0}</span>
                          </div>
                        </div>
                        <Link to={`/poetry/${poem?.id}`}>
                          <button className="w-full bg-coral text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                            Read poetry
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 rounded-[30px]">
                <p className="text-gray-400 italic">No poetry matches your search or filters.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-10">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-xl border border-black/10 disabled:opacity-20 bg-white">
                  <ChevronLeftIcon sx={{ fontSize: 20, color: "#DC2A54" }} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)} 
                    className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1 ? "bg-coral text-white shadow-md" : "bg-white border border-black/10 text-gray-400 hover:border-coral"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-xl border border-black/10 disabled:opacity-20 bg-white">
                  <ChevronRightIcon sx={{ fontSize: 20, color: "#DC2A54" }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}