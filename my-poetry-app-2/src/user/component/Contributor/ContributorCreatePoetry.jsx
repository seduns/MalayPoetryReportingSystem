import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPoetry } from "../../../store/thunk/PoetryThunk";
import { checkCoauthor } from "../../../store/thunk/CoauthorThunk";
import Swal from "sweetalert2";

export default function ContributorCreatePoetry() {
  const dispatch = useDispatch();
  const accountId = localStorage.getItem("accountId");

  // Form fields state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Select Category",
    content: "",
  });

  // Co-author logic
  const [coauthorInput, setCoauthorInput] = useState("");
  const [coauthors, setCoauthors] = useState([]); // { publicId, fullName }

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add co-author by public ID
  const handleAddCoauthor = async () => {
    if (!coauthorInput.trim()) return;

    // Prevent duplicate
    if (coauthors.some((co) => co.publicId === coauthorInput)) {
      Swal.fire({
        icon: "warning",
        title: "Already added",
        text: "This co-author is already in the list",
      });
      return;
    }

    try {
      const result = await dispatch(checkCoauthor(coauthorInput)).unwrap();
      // Result example: { id: 6, publicId: "1420", fullName: "Muhd NAIM Ahmad" }
      setCoauthors((prev) => [...prev, { publicId: result.publicId, fullName: result.fullName }]);
      setCoauthorInput("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Author not found",
        text: "The author public ID does not exist",
      });
    }
  };

  // Remove co-author
  const handleRemoveCoauthor = (publicId) => {
    setCoauthors((prev) => prev.filter((co) => co.publicId !== publicId));
  };

  // Submit poetry
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      content: formData.content,
      description: formData.description,
      category: formData.category.toUpperCase(),
      coauthorPublicIds: coauthors.map((co) => co.publicId),
    };

    try {
      const resultAction = await dispatch(createPoetry({ poetryData: data, accountId }));

      if (createPoetry.fulfilled.match(resultAction)) {
        Swal.fire({
          icon: "success",
          title: "Poetry Submitted",
          text: "Your poetry has been successfully created and is pending approval.",
          confirmButtonColor: "#FF5C5C",
          timer: 3000,
        });
        // Reset form
        setFormData({ title: "", description: "", category: "Select Category", content: "" });
        setCoauthors([]);
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
      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Create <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Write, shape, and share your words with the world.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex gap-6 flex-1 overflow-hidden px-4">
          {/* Left Column */}
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

            {/* Co-Author Section */}
            <div className="space-y-2">
              <label className="text-gray-500 font-bold text-xs uppercase ml-1">Co-Author</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coauthorInput}
                  onChange={(e) => setCoauthorInput(e.target.value)}
                  placeholder="Enter author public ID"
                  className="flex-1 bg-[#F3F6F9] border-none rounded-xl px-4 py-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCoauthor}
                  className="bg-[#FF5C5C] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#eb4b4b] transition-all"
                >
                  Find
                </button>
              </div>

              {/* Preview Added Co-Authors */}
              <div className="flex flex-wrap gap-2 mt-2">
                {coauthors.map((co) => (
                  <div
                    key={co.publicId}
                    className="bg-gray-100 text-gray-800 rounded-xl px-4 py-2 flex items-center gap-2 text-sm"
                  >
                    {co.fullName}
                    <button
                      type="button"
                      onClick={() => handleRemoveCoauthor(co.publicId)}
                      className="text-red-500 font-bold hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
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

        {/* Submit */}
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
