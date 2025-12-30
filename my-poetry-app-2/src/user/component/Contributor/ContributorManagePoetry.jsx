import React from "react";

export default function ContributorManagePoetry() {
  const myPoetry = [
    {
      title: "Whispers of the Night",
      status: "Published",
      date: "12/12/2024",
      category: "Romantic",
      author: "Amelia Vence",
      coAuthor: "Daniel Rechardo",
      description: "A quiet reflection on solitude, midnight thoughts, and emotions that surface in silence."
    },
    {
      title: "Whispers of the Night",
      status: "Published",
      date: "20/08/2024",
      category: "Romantic",
      author: "Amelia Vence",
      coAuthor: "Daniel Rechardo",
      description: "A quiet reflection on solitude, midnight thoughts, and emotions that surface in silence."
    },
    {
      title: "Whispers of the Night",
      status: "Published",
      date: "12/06/2023",
      category: "Romantic",
      author: "Amelia Vence",
      coAuthor: "Daniel Rechardo",
      description: "A quiet reflection on solitude, midnight thoughts, and emotions that surface in silence."
    }
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header Section */}
      <div className="mb-8 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Manage <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          View, edit, or remove your poetry
        </p>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 custom-scrollbar">
        {myPoetry.map((poem, index) => (
          <div 
            key={index} 
            className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {poem.title}
                </h2>
                <span className="bg-[#E6F9F0] text-[#56D0A0] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {poem.status}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="bg-[#7B61FF] hover:bg-[#6649FF] text-white px-10 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                  Edit
                </button>
                <button className="bg-[#FFE5E5] hover:bg-[#FFD1D1] text-[#FF5C5C] px-10 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                  Delete
                </button>
              </div>
            </div>

            {/* Metadata Bar */}
            <div className="flex gap-8 text-[11px] text-gray-300 font-medium mb-6">
              <p>By <span className="text-gray-400 ml-1">{poem.author}</span></p>
              <p>Co-author: <span className="text-gray-400 ml-1">{poem.coAuthor}</span></p>
              <p>{poem.date}</p>
              <p>{poem.category}</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm font-medium leading-relaxed max-w-4xl">
              {poem.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}