import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { viewCoauthor, checkCoauthor, addCoauthor } from "../../../store/thunk/CoauthorThunk";
import { getPoetry, getPoetryByAuthorId } from "../../../store/thunk/PoetryThunk";
import { setSelectedPoetry } from "../../../store/slice/PoetrySlice";

export default function ContributorRegisterCoAuthor() {
  const dispatch = useDispatch();

  const [coauthorInput, setCoauthorInput] = useState(""); // input public ID
  const [coauthorPreview, setCoauthorPreview] = useState([]); // [{publicId, fullName}]
  const [newCoauthorIds, setNewCoauthorIds] = useState([]); // only public IDs to send to backend

  const poetryList = useSelector((state) => state.poetry.poetryList || []);
  const poetryData = useSelector((state) => state.poetry.poetryData);
  const selectedPoetryId = useSelector((state) => state.poetry.selectedPoetryId);
  const { coauthorList } = useSelector((state) => state.coauthor);

  useEffect(() => {
    const accountID = localStorage.getItem("accountId");
    if (accountID) {
      dispatch(getPoetryByAuthorId(accountID));
    }
  }, [dispatch]);

  const handlePoetryChange = (e) => {
    const poetryId = e.target.value;
    if (!poetryId) return;
    dispatch(setSelectedPoetry({ id: Number(poetryId) }));
  };

  useEffect(() => {
    if (!selectedPoetryId) return;
    dispatch(getPoetry(selectedPoetryId));
    dispatch(viewCoauthor(selectedPoetryId));
  }, [selectedPoetryId, dispatch]);

  const handleAddCoAuthor = async () => {
    const input = coauthorInput.trim();
    if (!input) return;

    // prevent duplicate
    if (newCoauthorIds.includes(input)) {
      Swal.fire({
        icon: "warning",
        title: "Already added",
        text: "This co-author is already in the list",
      });
      return;
    }

    try {
      const result = await dispatch(checkCoauthor(input)).unwrap();

      if (result?.id) {
        // add to preview (name) and to public IDs
        setCoauthorPreview((prev) => [...prev, { publicId: result.publicId, fullName: result.fullName }]);
        setNewCoauthorIds((prev) => [...prev, result.publicId]);
        setCoauthorInput(""); // reset input
      } else {
        Swal.fire({
          icon: "error",
          title: "Author not found",
          text: "The author public ID does not exist",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while checking the co-author",
      });
    }
  };

  const handleRemoveCoAuthor = (publicId) => {
    setCoauthorPreview((prev) => prev.filter((co) => co.publicId !== publicId));
    setNewCoauthorIds((prev) => prev.filter((id) => id !== publicId));
  };

  const handleSaveCoAuthors = async () => {
    if (!selectedPoetryId || newCoauthorIds.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Nothing to save",
        text: "Please select poetry and add at least one co-author",
      });
      return;
    }

    try {
      await dispatch(addCoauthor({ poetryId: selectedPoetryId, coauthors: newCoauthorIds })).unwrap();

      Swal.fire({
        icon: "success",
        title: "Co-authors added",
        text: "New co-authors have been added successfully",
      });

      // Clear preview and new IDs after successful save
      setCoauthorPreview([]);
      setNewCoauthorIds([]);

      // Refresh coauthors from backend
      dispatch(viewCoauthor(selectedPoetryId));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to save",
        text: err?.message || "Something went wrong",
      });
    }
  };

  /** ---------------- Current Coauthors from backend ---------------- */
  const currentCoAuthors = coauthorList?.map((co) => co.fullName) || [];

  if (!poetryList.length) {
    return <p>Loading the Poetry...</p>;
  }

  /** ---------------- UI ---------------- */
  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Header */}
      <div className="mb-8 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Register Co-Author <span className="text-[#DC2A54]">Poetry</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Add or remove contributors for this poetry
        </p>
      </div>

      <div className="flex-1 px-4 space-y-8 overflow-y-auto pb-10">
        {/* Poetry Dropdown */}
        <div className="relative">
          <select
            onChange={handlePoetryChange}
            className="w-full bg-white border border-black/20 rounded-xl px-6 py-4 text-sm text-gray-400 outline-none cursor-pointer appearance-none shadow-sm"
          >
            <option value="">Select Poetry</option>
            {poetryList.map((poetry) => (
              <option key={poetry.id} value={poetry.id}>
                {poetry.title}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Poetry Card */}
        {poetryData && (
          <div className="bg-white border border-black/20 rounded-[30px] p-10 shadow-sm">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{poetryData.title}</h2>
            <div className="flex gap-8 text-xs text-gray-300 font-medium">
              <p>
                By{" "}
                <span className="text-gray-400 ml-1">{poetryData.author?.user?.fullName}</span>
              </p>
              <p>{poetryData.dateCreated}</p>
              <p>{poetryData.category}</p>
            </div>
          </div>
        )}

        {/* Current Coauthors */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-gray-400 font-bold text-sm block ml-1">Current Co-Author</label>
            <div className="flex gap-4 flex-wrap">
              {currentCoAuthors.map((name, index) => (
                <div
                  key={index}
                  className="bg-white border border-black/20 rounded-xl px-6 py-3 text-sm font-bold text-gray-800 shadow-sm flex items-center gap-3"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Add New Coauthor */}
          <div className="space-y-3 pt-4">
            <label className="text-gray-400 font-bold text-sm block ml-1">Add Co-Author</label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter Co Author Public ID"
                value={coauthorInput}
                onChange={(e) => setCoauthorInput(e.target.value)}
                className="flex-1 bg-white border border-black/20 rounded-xl px-6 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={handleAddCoAuthor}
                className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-12 py-4 rounded-xl transition-all shadow-md active:scale-95"
              >
                Add
              </button>
            </div>

            {/* Preview of New Coauthors */}
            {coauthorPreview.length > 0 && (
              <div className="pt-4 flex gap-4 flex-wrap">
                {coauthorPreview.map((co, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FFECEC] border border-[#FF5C5C] rounded-xl px-6 py-3 text-sm font-bold text-[#FF5C5C] shadow-sm flex items-center gap-2"
                  >
                    {co.fullName}
                    <button
                      type="button"
                      onClick={() => handleRemoveCoAuthor(co.publicId)}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end px-4 py-6">
        <button
          type="button"
          onClick={handleSaveCoAuthors}
          className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-20 py-4 rounded-xl shadow-lg shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Save the Poetry
        </button>
      </div>
    </div>
  );
}
