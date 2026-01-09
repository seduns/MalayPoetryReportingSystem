import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

// 1. Dummy Data for Guest Users
const dummyPoetry = [
  { 
    id: 'd1', 
    viewCount: '12.4K', 
    likeCount: '1.2K', 
    poetry: { 
      title: "The Silent Forest", 
      content: "Deep in the woods where the sunlight barely touches the mossy ground, secrets are whispered by the ancient roots and carried by the wandering wind..." 
    } 
  },
  { 
    id: 'd2', 
    viewCount: '8.9K', 
    likeCount: '842', 
    poetry: { 
      title: "Ocean Echoes", 
      content: "The rhythm of the tide is a song the sand has memorized for centuries, a salt-stained lullaby that pulls the moon closer to the shore..." 
    } 
  },
  { 
    id: 'd3', 
    viewCount: '25.1K', // This is your "Viral" poem
    likeCount: '4.7K', 
    poetry: { 
      title: "City Lights", 
      content: "Concrete giants glow with a thousand electric eyes watching the night, where heartbeat-drums echo through neon alleys and iron veins..." 
    } 
  },
  { 
    id: 'd4', 
    viewCount: '5.2K', 
    likeCount: '310', 
    poetry: { 
      title: "Desert Wind", 
      content: "A dance of dust and heat across the golden dunes of a forgotten land, where time is measured in grains of sand and the sun never asks for permission..." 
    } 
  },
  { 
    id: 'd5', 
    viewCount: '15.7K', 
    likeCount: '2.1K', 
    poetry: { 
      title: "Winter's Breath", 
      content: "Silver frost clings to the window, painting patterns of ice in the dark, while the world holds its breath under a blanket of silent, falling stars..." 
    } 
  },
];

const PoetryCard = ({ poetry }) => {
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId");

  const handleReadClick = () => {
    console.log("wow", poetry.poetry.id)
    if (accountId) {
      navigate(`/poetry-detail`); 
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="px-2">
      <div className="bg-white p-6 rounded-xl shadow-md border border-black/20 flex flex-col h-80 text-left hover:shadow-lg transition-all">
        <h3 className="text-2xl font-bold text-orange-500 mb-4 line-clamp-2">
          {poetry.poetry.title}
        </h3>
        <p className="text-gray-500 text-sm flex-grow line-clamp-4">
          {poetry.poetry.content}
        </p>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <VisibilityIcon sx={{ fontSize: 22, color: "#DC2A54" }} />
            <span className="text-[#DC2A54] font-bold text-sm">{poetry.viewCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteIcon sx={{ fontSize: 22, color: "#DC2A54" }} />
            <span className="text-[#DC2A54] font-bold text-sm">{poetry.likeCount}</span>
          </div>
        </div>
        <button onClick={handleReadClick} className="bg-orange-500 text-white py-2 px-6 rounded-lg font-bold text-sm w-max hover:bg-orange-600 transition">
          Read poetry
        </button>
      </div>
    </div>
  );
};

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { poetryAnalytics } = useSelector((state) => state.analytics);
  
  // Get items from storage
  const accountId = localStorage.getItem("accountId");
  const accessToken = localStorage.getItem("accessToken");

  // Logical check for login status
  const isLoggedIn = !!(accountId && accessToken);

  // FIXED: Logic to remove keys using STRING names
  const handleLogout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("accessToken");
    // Force reload to clear all states and redirect to login
    window.location.href = "/login";
  };

  const handleDiscoverClick = () => {
    if (isLoggedIn) { 
      navigate('/poetry-discovery');
    } else { 
      navigate('/login');
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4, // Adjusted for better card width
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

  // Determine data: Top 5 from API if logged in, otherwise Dummy Data
  const displayPoems = isLoggedIn && poetryAnalytics?.length > 0
    ? [...poetryAnalytics].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5)
    : dummyPoetry;

  return (
    <div className="min-h-screen w-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* Dynamic Header Button */}
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
          {/* Spread the settings object correctly */}
          <Slider {...settings}>
            {displayPoems.map((poetry) => (
              <PoetryCard key={poetry.id} poetry={poetry} />
            ))}
          </Slider>
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