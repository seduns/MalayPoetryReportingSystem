import React from "react";

export default function ContributorEditPoetry() {
  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Edit <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Write, shape, and share your words with the world.
        </p>
      </div>

      {/* Form Container */}
      <div className="flex gap-10 flex-1 overflow-hidden px-4">
        
        {/* Left Column: Metadata Inputs */}
        <div className="flex-[0.8] space-y-6 overflow-y-auto pr-2">
          
          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-sm ml-1">Poetry Content</label>
            <input 
              type="text" 
              defaultValue="Whisper of the night"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-sm ml-1">Poetry Description</label>
            <textarea 
              defaultValue="A short background and meaning behind this poetry..."
              className="w-full bg-white border border-black/20 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[140px] resize-none shadow-sm"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-gray-500 font-bold text-sm ml-1">Poetry Category</label>
            <div className="relative">
              <select className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none shadow-sm">
                <option>Romactic</option>
                <option>Nature</option>
                <option>Life</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-sm ml-1">Co Author</label>
            <input 
              type="text" 
              defaultValue="Danial Rechardoo"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm outline-none shadow-sm mb-2"
            />
            <div className="flex justify-end">
              <button className="bg-[#FF5C5C] text-white px-5 py-2 rounded-lg text-[10px] font-bold hover:bg-[#eb4b4b] transition-all">
                Add author
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Poetry Content Display */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col">
          <label className="text-gray-400 font-bold text-sm mb-6">Poetry Content</label>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="space-y-6 font-serif italic text-gray-800 leading-relaxed text-base">
              <p>
                The night speaks softly,<br />
                when the world learns to rest.<br />
                Thoughts wander freely,<br />
                unburdened by daylight.
              </p>
              <p>
                In silence, hearts confess,<br />
                what voices never dared to say.<br />
                The stars listen patiently,<br />
                as worries slowly fade away.
              </p>
              <p>
                The night speaks softly,<br />
                when the world learns to rest.<br />
                Thoughts wander freely,<br />
                unburdened by daylight.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="flex justify-center py-8">
        <button className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-24 py-4 rounded-xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95">
          Edit Poetry
        </button>
      </div>
    </div>
  );
}