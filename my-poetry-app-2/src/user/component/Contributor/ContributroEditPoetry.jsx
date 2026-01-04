import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPoetry, updatePoetry } from "../../../store/thunk/PoetryThunk";
import Swal from "sweetalert2";

export default function ContributorEditPoetry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedPoetryId, poetryData } = useSelector((state) => state.poetry);

  const [data, setData] = useState({
    title: "",
    content: "",
    description: "",
    category: "LIFE",
  });

  // Prefill form when poetryData is available
  useEffect(() => {
    dispatch(getPoetry(selectedPoetryId));
  }, [dispatch, selectedPoetryId]);

  useEffect(() => {
    if (poetryData) {
      setData({
        title: poetryData.title || "",
        content: poetryData.content || "",
        description: poetryData.description || "",
        category: poetryData.category || "LIFE",
      });
    }
  }, [poetryData]);

const handleUpdate = async () => {
  if (!poetryData) return;

  const updatedData = { ...data };

  try {
    // Assuming updatePoetry is a thunk that returns a Promise
    await dispatch(updatePoetry({ id: selectedPoetryId, data: updatedData }));

    Swal.fire({
      icon: "success",
      title: "Poetry Updated!",
      text: "Your poetry has been successfully updated.",
      confirmButtonColor: "#FF5C5C",
    });

    
  } catch (error) {
    console.error("Update failed", error);

    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#FF5C5C",
    });
  }
};

  if (!poetryData) return <p>Loading poetry...</p>;

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Edit <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Write, shape, and share your words with the world.
        </p>
      </div>

      {/* Form */}
      <div className="flex gap-10 flex-1 overflow-hidden px-4">
        {/* Left Column */}
        <div className="flex-[0.8] space-y-6 overflow-y-auto pr-2">
          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-sm ml-1">
              Poetry Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 font-bold text-sm ml-1">
              Poetry Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full bg-white border border-black/20 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[140px] resize-none shadow-sm"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-gray-500 font-bold text-sm ml-1">
              Poetry Category
            </label>
            <div className="relative">
              <select
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className="w-full bg-white border border-black/20 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer appearance-none shadow-sm"
              >
                <option value="LIFE">Life</option>
                <option value="ROMANTIC">Romantic</option>
                <option value="SAD">Sad</option>
                <option value="FRIENDSHIP">Friendship</option>
                <option value="MOTIVATION">Motivation</option>
                <option value="NATURE">Nature</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Content */}
        <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-10 flex flex-col">
          <label className="text-gray-400 font-bold text-sm mb-6">
            Poetry Content
          </label>
          <textarea
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            className="flex-1 w-full text-center resize-none outline-none border border-black/20 rounded-xl p-6 text-gray-800 font-serif italic text-base leading-relaxed custom-scrollbar"
            placeholder="Write your poetry here..."
          />
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-center py-8">
        <button
          onClick={handleUpdate}
          className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-24 py-4 rounded-xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Update Poetry
        </button>
      </div>
    </div>
  );
}