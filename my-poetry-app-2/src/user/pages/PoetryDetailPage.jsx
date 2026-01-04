import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';

export default function PoetryDetailPage() {
  // 1. Like Toggle State
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1200); // Base count from your 1.2K example

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const poemLines = [
    { left: "The night speaks softly,", right: "The night speaks softly," },
    { left: "when the world learns to rest.", right: "when the world learns to rest." },
    { left: "Thoughts wander freely,", right: "Thoughts wander freely," },
    { left: "unburdened by daylight.", right: "unburdened by daylight." },
  ];

  return (
    <div className="p-20 h-full w-screen flex-col md:flex-row font-sans">
      <div className="flex gap-6 h-full overflow-hidden">

        {/* Parent container (the Link) needs to be relative if not already */}
<div className="flex gap-6 h-full"> 

  {/* Navigation Menu Container */}
  <div className="flex flex-col justify-center"> {/* pt-20 matches your page padding to align with the poem */}
    <div className="left-0 flex flex-col items-center bg-white border border-black/10 rounded-[28px] p-2 shadow-sm space-y-2">
      
      {/* Top Button: Discovery/Grid */}
      <Link to="/poetry-discovery" className="group">
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] transition-all duration-200">
          <GridViewIcon sx={{ 
            fontSize: 24, 
            color: "#BDBDBD", 
            '.group:hover &': { color: "#DC2A54", transform: 'scale(1.1)' } 
          }} />
        </button>
      </Link>

      {/* Separator */}
      <div className="w-8 border-t border-black/5 mx-auto" />

      {/* Bottom Button: Home */}
      <Link to="/" className="group">
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white hover:bg-[#fff5f7] transition-all duration-200">
          <HomeIcon sx={{ 
            fontSize: 24, 
            color: "#BDBDBD", 
            '.group:hover &': { color: "#DC2A54", transform: 'scale(1.1)' } 
          }} />
        </button>
      </Link>
    </div>
  </div>

  {/* Rest of your content (Left Column & Right Column) */}
</div>
        
        {/* Left Column: Full Poem Text */}
        <div className="flex-[2.5] bg-white border border-black/20 rounded-[30px] shadow-sm p-12 overflow-y-auto custom-scrollbar">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-coral mb-1">Whisper of the Night</h1>
            <p className="text-[#DC2A54] font-bold text-sm italic">By Amelia vence</p>
          </header>

          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
              {poemLines.map((line, i) => <p key={i}>{line.left}</p>)}
            </div>
            <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
              {poemLines.map((line, i) => <p key={i}>{line.right}</p>)}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Description */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* Author & Stats Card */}
          <div className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <p className="text-[#DC2A54] text-sm font-bold">Author: Amelia Vence</p>
              <p className="text-[#DC2A54] text-sm font-bold">Contributor: Danial Rechardo</p>
              <p className="text-gray-300 text-[10px] font-medium uppercase tracking-wider">Published October 24, 2025</p>
            </div>

            <div className="flex flex-col gap-1 py-2">
              {/* Views - Static Display */}
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold px-2 py-1">
                <VisibilityIcon sx={{ fontSize: 18 }} />
                <span>30K View</span>
              </div>

              {/* Likes - Toggle Display */}
              <div className="flex items-center gap-1">
                <IconButton onClick={handleLikeToggle} size="small" sx={{ color: isLiked ? "#DC2A54" : "#BDBDBD" }}>
                  {isLiked ? (
                    <FavoriteIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                  )}
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
              This poem reflects on solitude and quiet reflection, capturing the emotions that surface when the world slows down and the heart begins to speak honestly.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}