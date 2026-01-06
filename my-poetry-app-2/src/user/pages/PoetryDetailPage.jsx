import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";

export default function PoetryDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // 1. Fetch data from Redux
  const { poetryAnalytics } = useSelector((state) => state.analytics);
  
  // 2. Find the specific poem matching the ID from the URL
  const selectedData = poetryAnalytics?.find(item => item.poetry.id === parseInt(id));

  // 3. Like Toggle State (Initialized with database count)
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (!poetryAnalytics) {
      dispatch(getAllAnalytics());
    }
  }, [dispatch, poetryAnalytics]);

  useEffect(() => {
    if (selectedData) {
      setLikesCount(selectedData.likeCount);
    }
  }, [selectedData]);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  if (!selectedData) return <div className="p-20 text-center">Loading Poetry...</div>;

  return (
    <div className="p-20 h-full w-screen flex-col md:flex-row font-sans">
      <div className="flex gap-6 h-full overflow-hidden">
        <div className="flex gap-6 h-full"> 
          {/* Navigation Menu */}
          <div className="flex flex-col justify-center">
            <div className="left-0 flex flex-col items-center bg-white border border-black/10 rounded-[28px] p-2 shadow-sm space-y-2">
              <Link to="/poetry-discovery" className="group">
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] transition-all duration-200">
                  <GridViewIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54", transform: 'scale(1.1)' } }} />
                </button>
              </Link>
              <div className="w-8 border-t border-black/5 mx-auto" />
              <Link to="/" className="group">
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] transition-all duration-200">
                  <HomeIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54", transform: 'scale(1.1)' } }} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Left Column: Full Poem Text */}
        <div className="flex-[2.5] bg-white border border-black/20 rounded-[30px] shadow-sm p-12 overflow-y-auto custom-scrollbar">
          <header className="mb-10">
            {/* DYNAMIC TITLE */}
            <h1 className="text-4xl font-bold text-coral mb-1">{selectedData.poetry.title}</h1>
            {/* DYNAMIC AUTHOR */}
            <p className="text-[#DC2A54] font-bold text-sm italic">By {selectedData.poetry.author?.user?.fullName}</p>
          </header>

          <div className="font-serif italic text-gray-800 leading-relaxed text-xl whitespace-pre-line">
            {/* DYNAMIC CONTENT with line breaks preserved */}
            {selectedData.poetry.content}
          </div>
        </div>

        {/* Right Column: Metadata & Description */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* Author & Stats Card */}
          <div className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <p className="text-[#DC2A54] text-sm font-bold">Author: {selectedData.poetry.author?.user?.fullName}</p>
              <p className="text-[#DC2A54] text-sm font-bold">Category: {selectedData.poetry.category}</p>
              <p className="text-gray-300 text-[10px] font-medium uppercase tracking-wider">
                Published {new Date(selectedData.poetry.dateCreated).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col gap-1 py-2">
              {/* DYNAMIC VIEWS */}
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold px-2 py-1">
                <VisibilityIcon sx={{ fontSize: 18 }} />
                <span>{selectedData.viewCount.toLocaleString()} View</span>
              </div>

              {/* DYNAMIC LIKES */}
              <div className="flex items-center gap-1">
                <IconButton onClick={handleLikeToggle} size="small" sx={{ color: isLiked ? "#DC2A54" : "#BDBDBD" }}>
                  {isLiked ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
                </IconButton>
                <span className={`text-xs font-bold ${isLiked ? "text-[#DC2A54]" : "text-gray-400"}`}>
                  {likesCount.toLocaleString()} Likes
                </span>
              </div>
            </div>

            <Link to="/donation">
              <button className="w-full bg-coral hover:opacity-90 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-50 transition-all active:scale-95">
                support the author
              </button>
            </Link>
          </div>

          {/* Poetry Description Card */}
          <div className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm flex-1">
            <h3 className="text-[#DC2A54] italic font-serif text-lg mb-6">Poetry Description</h3>
            <p className="text-gray-800 text-sm font-medium leading-[1.8] tracking-wide">
              {/* DYNAMIC DESCRIPTION */}
              {selectedData.poetry.description || "No description provided for this masterpiece."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}