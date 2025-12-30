import React, { useState } from "react";

export default function AdminManageAuthor() {
  // Mock data matching your interface
  const authors = [
    { name: "Naim Danial", email: "danial@gmail.com", bio: "Poet who writes about silence, love, and midnight thoughts.", id: "0021" },
    { name: "Max Verstepen", email: "max@gmail.com", bio: "Fast paced poetry.", id: "0022" },
    { name: "Lewis hamilton", email: "lewis@gmail.com", bio: "Still I rise.", id: "0023" },
    { name: "Kimi Antoneline", email: "kimi@gmail.com", bio: "Young poet.", id: "0024" },
    { name: "Isack hadjar", email: "isack@gmail.com", bio: "Rising star.", id: "0025" },
    { name: "Lando Norris", email: "lando@gmail.com", bio: "Quadrant vibes.", id: "0026" },
    { name: "Pscar Piatsri", email: "oscar@gmail.com", bio: "Calculated words.", id: "0027" },
    { name: "Leclare", email: "charles@gmail.com", bio: "Monaco dreams.", id: "0028" },
    { name: "Goerge Rusell", email: "george@gmail.com", bio: "The strategist.", id: "0029" },
  ];

  const [selectedAuthor, setSelectedAuthor] = useState(authors[0]);

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Manage <span className="text-[#DC2A54]">Author</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview report of each poetry in 2 version: full version or summary version
        </p>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Left: Author List Table */}
        <div className="flex-[1.5] bg-white border border-black/20 rounded-[30px] shadow-sm overflow-hidden flex flex-col">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-xs uppercase tracking-widest">
                <th className="py-5 px-8 text-left font-semibold">Author</th>
                <th className="py-5 px-4 text-center font-semibold">View</th>
                <th className="py-5 px-8 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 overflow-y-auto">
              {authors.map((author, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-8 font-bold text-gray-800 text-sm">{author.name}</td>
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => setSelectedAuthor(author)}
                      className="bg-[#7B61FF] hover:bg-[#6649FF] text-white px-10 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
                    >
                      View
                    </button>
                  </td>
                  <td className="py-4 px-8 text-center">
                    <select className="bg-[#E9ECEF] text-gray-800 text-xs font-bold py-1.5 px-4 rounded-full border-none outline-none cursor-pointer">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Author Detail Card */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col items-center">
          {/* Avatar and Info */}
          <div className="flex items-center gap-6 w-full mb-10">
            <div className="w-24 h-24 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {selectedAuthor.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedAuthor.name}</h2>
              <p className="text-gray-400 text-xs">Poetry Contributor</p>
              <p className="text-gray-300 text-[10px] mt-1">Author ID: {selectedAuthor.id}</p>
            </div>
          </div>

          {/* Form Fields (Read Only/Display) */}
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-gray-400 font-bold text-sm block">Author name:</label>
              <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white">
                {selectedAuthor.name}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-bold text-sm block">Author email:</label>
              <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white">
                {selectedAuthor.email}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-bold text-sm block">Author bio:</label>
              <div className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-sm text-gray-700 bg-white min-h-[120px]">
                {selectedAuthor.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}