import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalytics } from "../../store/thunk/AnalyticsThunk";
import { setPoetryAnalyticsData } from "../../store/slice/AnalyticsSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';


const PoetryCard = ({ poetry }) => {
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId");

  // The only navigation logic remains on the main button
  const handleReadClick = () => {
    if (accountId) {
      navigate("/poetry-detail");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="px-2">
      <div className="bg-white p-6 rounded-xl shadow-md border border-black/20 flex flex-col h-80 text-left hover:shadow-lg transition-shadow">
        <h3 className="text-2xl font-bold text-orange-500 mb-4 leading-tight">
          {poetry.poetry.title}
        </h3>

        <p className="text-gray-500 text-sm flex-grow">
          {poetry.poetry.content.length > 100
            ? poetry.poetry.content.substring(0, 100) + "..."
            : poetry.poetry.content}
        </p>

        {/* Static Analytics Display */}
        <div className="flex items-center gap-6 mb-6">
          {/* Views - Always Red */}
          <div className="flex items-center gap-2">
            <VisibilityIcon sx={{ fontSize: 22, color: "#DC2A54" }} />
            <span className="text-[#DC2A54] font-bold text-sm">
              {poetry.viewCount}
            </span>
          </div>

          {/* Likes - Always Red and Filled */}
          <div className="flex items-center gap-2">
            <FavoriteIcon sx={{ fontSize: 22, color: "#DC2A54" }} />
            <span className="text-[#DC2A54] font-bold text-sm">
              {poetry.likeCount}
            </span>
          </div>
        </div>

        <button
          onClick={handleReadClick}
          className="bg-orange-500 text-white py-2.5 px-6 rounded-lg font-bold text-sm w-max hover:bg-orange-600 transition shadow-sm active:scale-95"
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
  const { poetryAnalytics } = useSelector((state) => state.analytics);
  const accountId = localStorage.getItem("accountId");

  const handleDiscoverClick = () => {
    if (accountId) {
      navigate("/poetry-discovery");
    } else {
      navigate("/login");
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    dispatch(getAllAnalytics());
  }, [dispatch]);

  // select top 5 most viewed poems (fallback to first 5 if no views)
  const topPoems = poetryAnalytics
    ? [...poetryAnalytics]
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 5)
    : [];

  return (
    <div className="min-h-screen w-screen flex-col md:flex-row font-sans">
      <Link to="/login">
        <button className="absolute top-6 right-6 z-20 bg-coral px-6 py-2 rounded-3xl text-white hover:opacity-90 transition-colors">
          Sign up
        </button>
      </Link>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-6 text-center overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <div className="custom-bg w-full h-full" />
        </div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-2">
            Poetry <br />
            <span className="text-orange-500 italic">The</span> Space
          </h1>
          <p className="text-gray-500 tracking-widest uppercase text-xs mt-4">
            Discover, read, and appreciate poetry
          </p>
        </div>
      </section>

      {/* Poetry Slider Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-10">
          Our Top <span className="underline decoration-orange-500 underline-offset-8">Poetry</span>
        </h2>

        {topPoems.length > 0 && (
          <div className="mb-12">
            <Slider {...settings}>
              {topPoems.map((poetry) => (
                <PoetryCard key={poetry.id} poetry={poetry} />
              ))}
            </Slider>
          </div>
        )}

        <button
          onClick={handleDiscoverClick}
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
        >
          Discover More
        </button>
      </section>
    </div>
  );
}
