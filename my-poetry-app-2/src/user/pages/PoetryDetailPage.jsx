import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import { useDispatch, useSelector } from "react-redux";
import { viewCoauthor } from "../../store/thunk/CoauthorThunk";
import { addLike } from "../../store/thunk/AnalyticsThunk";

export default function PoetryDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Get Data from Redux
  const { poetryAnalyticsData } = useSelector((state) => state.analytics);
  const { coauthorList, loading } = useSelector((state) => state.coauthor);

  // 2. Local State
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // 3. EFFECT: Fetch Co-Authors & Sync Data
  useEffect(() => {
    if (poetryAnalyticsData && poetryAnalyticsData.poetry) {
      dispatch(viewCoauthor(poetryAnalyticsData.poetry.id));
      
      // Sync local like count
      setLikesCount(poetryAnalyticsData.likeCount || 0);
      
      // OPTIONAL: If your backend tells you if the user already liked it, set setIsLiked(true) here.
      // For now, it resets on page reload.
    }
  }, [dispatch, poetryAnalyticsData]); 

  // 4. Handle Like (PERMANENT)
  const handleLikeToggle = () => {
    // Only proceed if NOT already liked
    if (!isLiked) {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        
        // Dispatch API call
        if (poetryAnalyticsData?.poetry?.id) {
            dispatch(addLike(poetryAnalyticsData.poetry.id));
        }
    }
  };

  // ---------------- RENDERING LOGIC ----------------
  const hasData = poetryAnalyticsData && poetryAnalyticsData.poetry;

  if (!hasData && analyticsLoading) {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-400 animate-pulse">Loading Poetry...</p>
        </div>
    );
  }

  if (!hasData) {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
          <p className="text-gray-400">Poetry data not found.</p>
          <button 
            onClick={() => navigate("/poetry-discovery")}
            className="px-6 py-2 bg-[#FF6F61] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#ff5a4a] transition-all"
          >
            Back to Discovery
          </button>
        </div>
      );
  }

  const { poetry, viewCount } = poetryAnalyticsData;
  const { author } = poetry;

  const formattedDate = new Date(poetry.dateCreated).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="p-20 h-screen w-screen flex flex-col md:flex-row font-sans bg-gray-50/30">
      <div className="flex gap-6 h-full w-full overflow-hidden">
        
        {/* Navigation Sidebar */}
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-col items-center bg-white border border-black/10 rounded-[28px] p-2 shadow-sm space-y-2">
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

        {/* Left Column: Poem Content */}
        <div className="flex-[2.5] bg-white border border-black/10 rounded-[30px] shadow-sm p-12 overflow-y-auto custom-scrollbar">
          <header className="mb-10 border-b border-gray-50 pb-6">
            <h1 className="text-4xl font-bold text-[#FF6F61] mb-2">{poetry.title}</h1>
            <p className="text-[#DC2A54] font-bold text-sm italic">
              By {author?.user?.fullName || "Unknown"}
            </p>
          </header>

          <div className="font-serif italic text-gray-800 text-lg leading-loose whitespace-pre-line">
             {poetry.content}
          </div>
        </div>

        {/* Right Column: Metadata & Authors */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm space-y-6">
            <div className="space-y-3">
              <p className="text-[#DC2A54] text-sm font-bold flex flex-col">
                Author: 
                <span className="text-gray-600 font-normal pl-2 border-l-2 border-[#DC2A54] mt-1">
                    {author?.user?.fullName}
                </span>
              </p>
              
              {/* --- CO-AUTHORS SECTION --- */}
              <div className="text-[#DC2A54] text-sm font-bold flex flex-col pt-2 min-h-[50px]">
                  Contributors:
                  {loading ? (
                    <div className="flex items-center gap-2 mt-2 pl-2">
                        <div className="w-3 h-3 border-2 border-[#FF6F61] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-xs font-normal">Loading...</span>
                    </div>
                  ) : (
                     coauthorList && coauthorList.length > 0 ? (
                        <div className="flex flex-col gap-1 mt-1 pl-2 border-l-2 border-gray-200 animate-fade-in">
                            {coauthorList.map((co, index) => (
                            <span key={index} className="text-gray-600 font-normal text-xs">
                                {co.fullName}
                            </span>
                            ))}
                        </div>
                     ) : (
                        <span className="text-gray-400 text-xs font-normal mt-1 pl-2 italic">
                            None
                        </span>
                     )
                  )}
              </div>

              <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider pt-4">
                Published {formattedDate}
              </p>
            </div>

            <div className="flex flex-col gap-1 py-2 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold px-2 py-1">
                <VisibilityIcon sx={{ fontSize: 18 }} />
                <span>{viewCount} Views</span>
              </div>

              <div className="flex items-center gap-1">
                <IconButton 
                    onClick={handleLikeToggle} 
                    disabled={isLiked} // Disable button if already liked
                    size="small" 
                    sx={{ 
                        color: isLiked ? "#DC2A54" : "#BDBDBD",
                        // Force color to stay red even when disabled
                        "&.Mui-disabled": {
                            color: "#DC2A54"
                        }
                    }}
                >
                  {isLiked ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
                </IconButton>
                <span className={`text-xs font-bold ${isLiked ? "text-[#DC2A54]" : "text-gray-400"}`}>
                  {likesCount} Likes
                </span>
              </div>
            </div>

            <Link to="/donation">
              <button className="w-full bg-[#FF6F61] hover:bg-[#ff5a4a] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#FF6F61]/20 transition-all active:scale-95">
                Support the Author
              </button>
            </Link>
          </div>

          <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex-1">
             <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[#DC2A54] italic font-serif text-lg">Poetry Description</h3>
                 <span className="text-[10px] font-bold text-white bg-[#FF6F61] px-2 py-1 rounded-lg uppercase">
                    {poetry.category}
                 </span>
            </div>
            <p className="text-gray-600 text-sm font-medium leading-[1.8] tracking-wide">
              {poetry.description || "No description provided."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}