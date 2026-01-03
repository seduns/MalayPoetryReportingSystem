import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from "react-redux";

export default function PoetryDetailPage() {
  const { poetryAnalyticsData } = useSelector((state) => state.analytics);

  if (!poetryAnalyticsData) {
    return (
      <div className="p-20 text-center text-gray-500">
        No poetry selected. Go back to <Link to="/poetry-discovery" className="text-orange-500 underline">Poetry Discovery</Link>.
      </div>
    );
  }

  const { poetry, viewCount, likeCount } = poetryAnalyticsData;

  const poemLines = poetry.content.split("\n").map((line) => line.trim());

  return (
    <div className="p-20 h-full w-screen flex-col md:flex-row font-sans">
      <div className="flex gap-6 h-full overflow-hidden">

        {/* Home Button */}
        <Link to="/poetry-discovery" className="h-0 group">
          <button className="flex border border-black/20 h-12 w-12 items-center justify-center rounded-2xl bg-white group-hover:bg-[#fff5f7] transition-all duration-200 shadow-sm">
            <HomeIcon sx={{ 
              fontSize: 24, 
              color: "#BDBDBD", 
              '.group:hover &': { color: "#DC2A54" } 
            }} />
          </button>
        </Link>
        
        {/* Left Column: Full Poem Text */}
        <div className="flex-[2.5] bg-white border border-black/20 rounded-[30px] shadow-sm p-12 overflow-y-auto custom-scrollbar">
        
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-coral mb-1">{poetry.title}</h1>
            <p className="text-[#DC2A54] font-bold text-sm italic">By {poetry.author.user.fullName}</p>
          </header>

          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
              {poemLines.map((line, i) => <p key={i}>{line}</p>)}
            </div>
            <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
              {poemLines.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Description */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* Author & Stats Card */}
          <div className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <p className="text-[#DC2A54] text-sm font-bold">Author: {poetry.author.user.fullName}</p>
              {/* You can add contributors if available */}
              <p className="text-gray-300 text-[10px] font-medium uppercase tracking-wider">
                Published {new Date(poetry.dateCreated).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col gap-3 py-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                <span className="material-icons text-sm">visibility</span> {viewCount} Views
              </div>
              <div className="flex items-center gap-2 text-[#DC2A54] text-xs font-bold">
                <span className="material-icons text-sm">thumb_up</span> {likeCount} Likes
              </div>
            </div>

            <Link to="/donation">
              <button className="w-full bg-coral hover:opacity-90 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-50 transition-all active:scale-95">
                Support the author
              </button>
            </Link>
          </div>

          {/* Poetry Description Card */}
          <div className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm flex-1">
            <h3 className="text-[#DC2A54] italic font-serif text-lg mb-6">Poetry Description</h3>
            <p className="text-gray-800 text-sm font-medium leading-[1.8] tracking-wide">
              {poetry.description || "No description provided for this poem."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
