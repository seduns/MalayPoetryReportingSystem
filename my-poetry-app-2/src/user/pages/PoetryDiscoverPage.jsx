import React, { useState } from "react"; // Added useState
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

export default function PoetryDiscoverPage() {
  // 1. Expanded list to 20 items (Repeating your data for the example)
  const basePoetry = [
    { title: "Whispers of the Night", views: "30K", likes: "1.2K" },
    { title: "Ink on My Heart", views: "25K", likes: "1.1K" },
    { title: "Between Silent Lines", views: "40K", likes: "2.2K" },
    { title: "A Place Called Home", views: "10K", likes: "900" },
    { title: "Test Poetry Title", views: "10K", likes: "900" },
    { title: "Test Poetry Title", views: "10K", likes: "900" },
    { title: "Test Poetry Title", views: "10K", likes: "900" },
    { title: "Test Poetry Title", views: "10K", likes: "900" },
    { title: "Test Poetry Title", views: "10K", likes: "900" },
  ];
  
  // This creates a list of 20 items
  const poetryList = Array(1).fill(basePoetry).flat();

  // 2. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 3. Logic to calculate which items to show
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = poetryList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(poetryList.length / itemsPerPage);

  const genres = ["Romantic", "Modern", "Nature", "Spiritual"];

  return (
    <div className="p-20 min-h-screen w-screen flex flex-col font-sans bg-gray-50/30">
      
      {/* Profile Button */}
      <Link to="/user-profile" className="fixed left-6 top-8 z-50 flex items-center group w-fit">
        <button className="flex border border-black/20 h-12 w-12 items-center justify-center rounded-2xl bg-white group-hover:bg-[#fff5f7] transition-all duration-200 shadow-sm">
          <PersonIcon sx={{ fontSize: 24, color: "#BDBDBD", '.group:hover &': { color: "#DC2A54" } }} />
        </button>
        <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-[#DC2A54] text-white text-[11px] font-semibold py-1.5 px-3 rounded-md whitespace-nowrap shadow-lg flex items-center after:content-[''] after:absolute after:top-1/2 after:right-full after:-translate-y-1/2 after:border-[6px] after:border-transparent after:border-r-[#DC2A54]">
          User Profile
        </span>
      </Link>

      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-coral font-serif italic">The</span> Poetry Space
        </h1>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden px-4 mb-4">
        {/* Left Sidebar remains same */}
        <aside className="w-64 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col shrink-0">
          <div className="flex items-center gap-2 mb-8 text-gray-800 font-bold uppercase text-xs tracking-widest">
            <span className="material-icons text-sm">filter_list</span>
            Search Filter
          </div>

          <div className="space-y-8">
            {/* Genre Filter */}
            <div>
              <p className="font-bold text-sm text-gray-800 mb-4">Genre</p>
              <div className="space-y-3">
                {genres.map((genre) => (
                  <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className=" w-4 h-4 rounded border-black text-[#DC2A54] focus:ring-[#DC2A54]" 
                    />
                    <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors font-medium">
                      {genre}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <p className="font-bold text-sm text-gray-800 mb-4">Year</p>
              <div className="relative">
                <select className="w-full bg-gray-50 border border-black/20 rounded-xl px-4 py-3 text-sm text-gray-500 outline-none appearance-none cursor-pointer">
                  <option>All Year</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons text-gray-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8 overflow-hidden">
          {/* Search Bar */}
          <div className="relative group">
            <input type="text" placeholder="Search Poetry" className="w-full bg-white border border-black/20 rounded-2xl px-8 py-4 shadow-sm outline-none transition-all pr-16" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-coral text-white p-3 rounded-2xl shadow-md">
              <span className="material-icons block">search</span>
            </button>
          </div>

          {/* Poetry Grid - Now uses 'currentItems' */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {currentItems.map((poem, index) => (
                <div key={index} className="bg-white border border-black/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col group h-[320px]">
                  <h3 className="text-coral text-3xl font-bold leading-tight mb-4 line-clamp-2">
                    {poem.title}
                  </h3>
                  <p className="text-black text-[12px] leading-relaxed line-clamp-4 mb-6">
                    A gentle reflection on solitude and quiet thoughts that appear when the world falls asleep...
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-4 text-[10px] font-bold mb-4">
                      <span><i className="material-icons text-xs align-middle">visibility</i> {poem.views}</span>
                      <span><i className="material-icons text-xs align-middle">thumb_up</i> {poem.likes}</span>
                    </div>
                    <button className="w-full bg-coral text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                      Read poetry
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-12 mb-10">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-black/10 disabled:opacity-20 hover:bg-white"
              >
                <span className="material-icons">chevron_left</span>
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                    currentPage === i + 1 
                    ? "bg-[#DC2A54] text-white shadow-md" 
                    : "bg-white border border-black/10 text-gray-400 hover:border-coral"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-black/10 disabled:opacity-20 hover:bg-white"
              >
                <span className="material-icons">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}