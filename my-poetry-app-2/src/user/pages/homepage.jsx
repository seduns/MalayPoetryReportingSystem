import React, { useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";
// IMPORT YOUR ACTION HERE (Adjust path as needed)
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { setPoetryAnalyticsData } from "../../store/slice/AnalyticsSlice";

const PoetryCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Data Logic: Handle both Flat (Initial) and Nested (API) structures
  const poetryData = item.poetry || item; 
  const viewCount = item.viewCount || 0;
  const likeCount = item.likeCount || 0;

  const handleReadClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (accessToken) {
      // 2. LOGGED IN: Dispatch Action -> Navigate
      console.log("Dispatching Poetry ID:", poetryData.id);
      
      // Dispatch the ID so the reducer can find and set the data
      dispatch(setPoetryAnalyticsData(poetryData.id));
      
      navigate(`/poetry-detail`); 
    } else {
      // 3. GUEST: Redirect to Login
      navigate("/login");
    }
  };

  return (
    <div className="px-2">
      <div className="bg-white p-6 rounded-xl shadow-md border border-black/20 flex flex-col h-80 text-left hover:shadow-lg transition-all">
        <h3 className="text-2xl font-bold text-orange-500 mb-4 line-clamp-2">
          {poetryData.title}
        </h3>
        <p className="text-gray-500 text-sm flex-grow line-clamp-4">
          {poetryData.content}
        </p>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <VisibilityIcon sx={{ fontSize: 22, color: "#DC2A54" }} />
            <span className="text-[#DC2A54] font-bold text-sm">{viewCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteIcon sx={{ fontSize: 22, color: "#DC2A54" }} />
            <span className="text-[#DC2A54] font-bold text-sm">{likeCount}</span>
          </div>
        </div>
        <button 
          onClick={handleReadClick} 
          className="bg-orange-500 text-white py-2 px-6 rounded-lg font-bold text-sm w-max hover:bg-orange-600 transition"
        >
          Read poetry
        </button>
      </div>
    </div>
  );
};

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select data from user slice
  const { poetryAnalytics } = useSelector((state) => state.analytics);
  
  const isLoggedIn = !!(localStorage.getItem("accountId") && localStorage.getItem("accessToken"));

  const handleLogout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const handleDiscoverClick = () => {
    if (localStorage.getItem("accessToken")) { 
      navigate('/poetry-discovery');
    } else { 
      navigate('/login');
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllAnalytics());
    }
  }, [dispatch, isLoggedIn]);

  const displayPoems = useMemo(() => {
    if (!poetryAnalytics || poetryAnalytics.length === 0) return [];
    return [...poetryAnalytics]; 
  }, [poetryAnalytics]);

  return (
    <div className="min-h-screen w-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* Header Buttons */}
      {isLoggedIn ? (
        <button 
          onClick={handleLogout} 
          className="absolute top-6 right-6 z-20 bg-coral px-6 py-2 rounded-3xl text-white hover:bg-black transition-colors"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="absolute top-6 right-6 z-20 bg-coral px-6 py-2 rounded-3xl text-white hover:opacity-90 transition-colors">
            Sign up
          </button>
        </Link>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 text-center min-h-[500px] flex items-center justify-center">
        <div className="relative max-w-4xl mx-auto z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-2">
            Poetry <br />
            <span className="text-orange-500 italic">The</span> Space
          </h1>
          <p className="text-gray-400 tracking-widest uppercase text-xs mt-4">
            Discover, read, and appreciate poetry
          </p>
        </div>
      </section>

      {/* Slider Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">
          {isLoggedIn ? "Latest" : "Featured"} <span className="underline decoration-orange-500 underline-offset-8">Poetry</span>
        </h2>

        <div className="mb-12">
          {displayPoems.length > 0 ? (
            <Slider {...settings}>
              {displayPoems.map((item) => (
                <PoetryCard key={item.id || Math.random()} item={item} />
              ))}
            </Slider>
          ) : (
            <p className="text-gray-400">Loading poetry...</p>
          )}
        </div>

        <button 
          onClick={handleDiscoverClick} 
          className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
        >
          {isLoggedIn ? "Discover More" : "Join to Read More"}
        </button>
      </section>
    </div>
  );
}