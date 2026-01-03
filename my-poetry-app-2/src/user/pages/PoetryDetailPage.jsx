import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";

export default function PoetryDetailPage() {
  const poemLines = [
    { left: "The night speaks softly,", right: "The night speaks softly," },
    { left: "when the world learns to rest.", right: "when the world learns to rest." },
    { left: "Thoughts wander freely,", right: "Thoughts wander freely," },
    { left: "unburdened by daylight.", right: "unburdened by daylight." },
  ];

  return (
    <div className="p-20 h-full w-screen flex-col md:flex-row font-sans">
      <div className="flex gap-6 h-full overflow-hidden">

       {/* Home Button */}
      <Link to="/poetry-discovery" className="h-0 group">
        <button className="flex border border-black/20 h-12 w-12 items-center justify-center rounded-2xl bg-white group-hover:bg-[#fff5f7] transition-all duration-200 shadow-sm">
          <HomeIcon sx={{ 
            fontSize: 24, 
            color: "#BDBDBD", 
            '.group:hover &': { color: "#DC2A54" } // Changes icon color on button hover
          }} />
        </button>
      </Link>
        
        {/* Left Column: Full Poem Text */}
        <div className="flex-[2.5] bg-white border border-black/20 rounded-[30px] shadow-sm p-12 overflow-y-auto custom-scrollbar">
        
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-coral mb-1">Whisper of the Night</h1>
            <p className="text-[#DC2A54] font-bold text-sm italic">By Amelia vence</p>
          </header>

          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            {/* Stanza 1 */}
            <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
              {poemLines.map((line, i) => <p key={i}>{line.left}</p>)}
            </div>
            {/* Stanza 2 (Repeated for layout) */}
            <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
              {poemLines.map((line, i) => <p key={i}>{line.right}</p>)}
            </div>

            {/* Stanza 3 */}
            <div className="space-y-6 pt-4">
               <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
                  <p>In silence, hearts confess,</p>
                  <p>what voices never dared to say.</p>
                  <p>The stars listen patiently,</p>
                  <p>as worries slowly fade away.</p>
               </div>
            </div>
            {/* Stanza 4 */}
            <div className="space-y-6 pt-4">
               <div className="space-y-1 font-serif italic text-gray-800 leading-relaxed">
                  <p>In silence, hearts confess,</p>
                  <p>what voices never dared to say.</p>
                  <p>The stars listen patiently,</p>
                  <p>as worries slowly fade away.</p>
               </div>
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

            <div className="flex flex-col gap-3 py-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                <span className="material-icons text-sm">visibility</span> 30K View
              </div>
              <div className="flex items-center gap-2 text-[#DC2A54] text-xs font-bold">
                <span className="material-icons text-sm">thumb_up</span> 1.2K Likes
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