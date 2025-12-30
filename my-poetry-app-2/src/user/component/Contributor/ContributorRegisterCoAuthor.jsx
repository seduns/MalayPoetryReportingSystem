import React from "react";

export default function ContributorRegisterCoAuthor() {
  const currentCoAuthors = ["Daniel Rechardo", "Danial"];

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header Section */}
      <div className="mb-8 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Register Co-Author <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Add or remove contributors for this poetry
        </p>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto pb-10">
        {/* Poetry Selection Dropdown */}
        <div className="relative">
          <select className="w-full bg-white border border-black/20 rounded-xl px-6 py-4 text-sm text-gray-400 outline-none cursor-pointer appearance-none shadow-sm">
            <option>Whispers of the Night</option>
            <option>Ink on My Heart</option>
            <option>Between Silent Lines</option>
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Selected Poetry Card */}
        <div className="bg-white border border-black/20 rounded-[30px] p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Whispers of the Night</h2>
          <div className="flex gap-8 text-xs text-gray-300 font-medium">
            <p>By <span className="text-gray-400 ml-1">Amelia Vence</span></p>
            <p>20/08/2024</p>
            <p>Romantic</p>
          </div>
        </div>

        {/* Co-Author Management Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-gray-400 font-bold text-sm block ml-1">Current Co-Author</label>
            <div className="flex gap-4">
              {currentCoAuthors.map((name, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-black/20 rounded-xl px-6 py-3 text-sm font-bold text-gray-800 shadow-sm flex items-center gap-3"
                >
                  {name}
                  {/* Optional: Add a 'remove' icon here if needed */}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <label className="text-gray-400 font-bold text-sm block ml-1">Add Co-Author</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Enter Co Author ID"
                className="flex-1 bg-white border border-black/20 rounded-xl px-6 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
              />
              <button className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-12 py-4 rounded-xl transition-all shadow-md active:scale-95">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end px-4 py-6">
        <button className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-20 py-4 rounded-xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95">
          Save the Poetry
        </button>
      </div>
    </div>
  );
}