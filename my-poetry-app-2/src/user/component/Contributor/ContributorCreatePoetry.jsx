import React from "react";

export default function ContributorCreatePoetry() {
  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Create <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Write, shape, and share your words with the world.
        </p>
      </div>

      {/* Form Container */}
      <div className="flex gap-6 flex-1 overflow-hidden px-4">
        
        {/* Left Column: Poetry Details */}
        <div className="flex-1 bg-white border border-gray-100 rounded-[30px] shadow-sm p-8 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-xs uppercase ml-1">Poetry Title</label>
            <input 
              type="text" 
              placeholder="Whisper of the night"
              className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-xs uppercase ml-1">Poetry Description</label>
            <textarea 
              placeholder="A short background and meaning behind this poetry..."
              className="w-full bg-[#F3F6F9] border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-xs uppercase ml-1">Poetry Category</label>
            <select className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm text-gray-500 outline-none cursor-pointer">
              <option>Select Category</option>
              <option>Love</option>
              <option>Life</option>
              <option>Nature</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-xs uppercase ml-1">Coo Author</label>
            <div className="flex gap-2">
               <input 
                type="text" 
                placeholder="Enter author code"
                className="flex-1 bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm outline-none"
              />
              <button className="bg-[#FF5C5C] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#eb4b4b] transition-all">
                Find
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Poetry Content Editor */}
        <div className="flex-1 bg-white border border-gray-100 rounded-[30px] shadow-sm p-8 flex flex-col">
          <label className="text-gray-500 font-bold text-xs uppercase ml-1 mb-4">Poetry Content</label>
          <textarea 
            placeholder="Write your poetry here..."
            className="flex-1 w-full bg-[#F3F6F9] border-none rounded-2xl px-6 py-6 text-sm italic font-serif focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="flex justify-center py-6">
        <button className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-16 py-4 rounded-full shadow-lg shadow-red-100 transition-all transform hover:scale-105 active:scale-95">
          Save the Poetry
        </button>
      </div>
    </div>
  );
}