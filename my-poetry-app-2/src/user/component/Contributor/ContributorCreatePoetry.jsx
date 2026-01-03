import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPoetry } from "../../../store/thunk/PoetryThunk";
import Swal from "sweetalert2";
import { checkCoauthor } from "../../../store/thunk/CoauthorThunk";

export default function ContributorCreatePoetry() {

  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.auth)
  const { poetryData } = useSelector((state) => state.poetry)

  // 1. Setup state for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Select Category",
    content: "",
  });

  // State for co-author logic
  const [coauthorInput, setCoauthorInput] = useState("");
  const [coauthorPublicIds, setCoauthorPublicIds] = useState([]);

  // Handle text/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddCoAuthor = async () => {
    if (!coauthorInput.trim()) return;

    // prevent duplicate
    if (coauthorPublicIds.includes(coauthorInput)) {
      Swal.fire({
        icon: "warning",
        title: "Already added",
        text: "This co-author is already in the list",
      });
      return;
    }

    const result = await dispatch(checkCoauthor(coauthorInput)).unwrap();

    if (result.status === "public_id_found") {
      setCoauthorPublicIds((prev) => [...prev, coauthorInput]);
      setCoauthorInput("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Author not found",
        text: "The author public ID does not exist",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const data = {
      title: formData.title,
      content: formData.content,
      description: formData.description,
      category: formData.category.toUpperCase(),
      coauthorPublicIds: coauthorPublicIds,
    };

    console.log("show data", data);
    console.log("accountId", accountId);

    try {
      // Dispatch the createPoetry thunk
      const resultAction = await dispatch(createPoetry({ poetryData: data, accountId }));

      // Show success or error based on the result
      if (createPoetry.fulfilled.match(resultAction)) {
        Swal.fire({
          icon: "success",
          title: "Poetry Submitted",
          text: "Your poetry has been successfully created and is pending approval.",
          confirmButtonColor: "#FF5C5C",
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: resultAction.payload?.message || "Please fill all required data",
          confirmButtonColor: "#FF5C5C",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to submit poetry. Please try again later.",
        confirmButtonColor: "#FF5C5C",
      });
      console.error("Submit Error:", error);
    }
  };

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
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex gap-6 flex-1 overflow-hidden px-4">

          {/* Left Column: Poetry Details */}
          <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-gray-500 font-bold text-xs uppercase ml-1">Poetry Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Whisper of the night"
                className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-500 font-bold text-xs uppercase ml-1">Poetry Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A short background and meaning behind this poetry..."
                className="w-full bg-[#F3F6F9] border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-500 font-bold text-xs uppercase ml-1">Poetry Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm text-gray-500 outline-none cursor-pointer"
              >
                <option>Select Category</option>
                <option value="LIFE">Life</option>
                <option value="ROMANTIC">Romantic</option>
                <option value="SAD">Sad</option>
                <option value="FRIENDSHIP">Friendship</option>
                <option value="MOTIVATION">Motivation</option>
                <option value="NATURE">Nature</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-gray-500 font-bold text-xs uppercase ml-1">Co-Author</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coauthorInput}
                  onChange={(e) => setCoauthorInput(e.target.value)}
                  placeholder="Enter author code"
                  className="flex-1 bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCoAuthor}
                  className="bg-[#FF5C5C] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#eb4b4b] transition-all"
                >
                  Find
                </button>
              </div>
              {/* Visual feedback for added IDs */}
              <div className="flex flex-wrap gap-2 mt-2">
                {coauthorPublicIds.map(id => (
                  <span key={id} className="bg-gray-100 text-[10px] px-2 py-1 rounded-md font-mono">#{id}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Poetry Content Editor */}
          <div className="flex-1 bg-white border border-black/20 rounded-[30px] shadow-sm p-8 flex flex-col">
            <label className="text-gray-500 font-bold text-xs uppercase ml-1 mb-4">Poetry Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your poetry here..."
              className="flex-1 w-full bg-[#F3F6F9] border-none rounded-2xl px-6 py-6 text-sm italic font-serif focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="flex justify-center py-6">
          <button
            type="submit"
            className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-16 py-4 rounded-full shadow-lg shadow-red-100 transition-all transform hover:scale-105 active:scale-95"
          >
            Save the Poetry
          </button>
        </div>
      </form>
    </div>
  );
}