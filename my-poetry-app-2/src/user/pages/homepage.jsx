import React from "react";
import Slider from "react-slick";

// Import slick-carousel css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContributorSideBar from "../component/Contributor/ContributorSideBar";

const PoetryCard = ({ title }) => (
  <div className="px-2">
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-80 text-left">
      <h3 className="text-2xl font-bold text-orange-500 mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-gray-500 text-sm flex-grow">
        A gentle reflection on solitude and quiet thoughts that appear when the world falls asleep, capturing emotions that are often left unspoken.
      </p>
      <div className="flex items-center text-gray-400 text-xs gap-4 mb-4">
        <span>👁️ 28K View</span>
        <span>👍 1.2K Likes</span>
      </div>
      <button className="bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold text-sm w-max hover:bg-orange-600 transition">
        Read poetry
      </button>
    </div>
  </div>
);

export default function Homepage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5, // Show 5 cards like the image
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const poems = [
    "Whispers of the Night",
    "Ink on My Heart",
    "Between Silent Lines",
    "A Place Called Home",
    "When the Sky Weeps",
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      <button className="absolute right-2 bg-white-500 p-3 rounded-full text-black hover:bg-orange-600">
           <a href="/login" className="font-bold text-coral hover:underline">Sign up</a>  
      </button>
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-6 text-center overflow-hidden">
        {/* Abstract Illustration Placeholder */}
        <div className="absolute top-10 left-10 opacity-20">
            {/* You would place your SVG or Image here for the balloon man */}
            <div className="w-32 h-64 border-2 border-gray-300 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-2">
            Poetry <br />
            <span className="text-orange-500 italic">The</span> Space
          </h1>
          <p className="text-gray-500 tracking-widest uppercase text-xs mt-4">
            Discover, read, and appreciate poetry
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto px-6 mb-16">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Poetry"
            className="w-full py-4 px-6 rounded-full border border-orange-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button className="absolute right-2 bg-orange-500 p-3 rounded-full text-white hover:bg-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>


      {/* Poetry Slider Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-10">
          Our Top <span className="underline decoration-orange-500 underline-offset-8">Poetry</span>
        </h2>
        
        <div className="mb-12">
          <Slider {...settings}>
            {poems.map((title, index) => (
              <PoetryCard key={index} title={title} />
            ))}
          </Slider>
        </div>

        <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
          Discover More
        </button>
      </section>
    </div>
  );
}