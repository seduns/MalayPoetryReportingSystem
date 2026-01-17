import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { viewCoauthor, addCoauthor } from "../../../store/thunk/CoauthorThunk";
import { getPoetry, getPoetryByAuthorId } from "../../../store/thunk/PoetryThunk";
import { setSelectedPoetry } from "../../../store/slice/PoetrySlice";
// Import the Author Thunk to get the list for search
import { getAllAuthor } from "../../../store/thunk/AuthorThunk"; 

export default function ContributorRegisterCoAuthor() {
  const dispatch = useDispatch();

  // Redux Data
  const poetryList = useSelector((state) => state.poetry.poetryList || []);
  const poetryData = useSelector((state) => state.poetry.poetryData);
  const selectedPoetryId = useSelector((state) => state.poetry.selectedPoetryId);
  const { coauthorList } = useSelector((state) => state.coauthor);
  // Get Author List for Search
  const { authorList } = useSelector((state) => state.author);

  // UI States
  const [coauthorInput, setCoauthorInput] = useState(""); 
  const [coauthorPreview, setCoauthorPreview] = useState([]); // [{publicId, fullName}]
  const [newCoauthorIds, setNewCoauthorIds] = useState([]); // [publicId, publicId]

  // Autocomplete States
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const wrapperRef = useRef(null);

  // 1. Initial Data Fetch (Poetry + Authors)
  useEffect(() => {
    const accountID = localStorage.getItem("accountId");
    if (accountID) {
      dispatch(getPoetryByAuthorId(accountID));
    }
    // Fetch all authors for the search dropdown
    dispatch(getAllAuthor());
  }, [dispatch]);

  // 2. Handle Click Outside Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Handle Poetry Selection
  const handlePoetryChange = (e) => {
    const poetryId = e.target.value;
    if (!poetryId) return;
    dispatch(setSelectedPoetry({ id: Number(poetryId) }));
    
    // Reset local additions when switching poetry
    setCoauthorPreview([]);
    setNewCoauthorIds([]);
    setCoauthorInput("");
  };

  // Fetch Co-authors when poetry is selected
  useEffect(() => {
    if (!selectedPoetryId) return;
    dispatch(getPoetry(selectedPoetryId));
    dispatch(viewCoauthor(selectedPoetryId));
  }, [selectedPoetryId, dispatch]);


  // 3. Search / Typing Handler
  const handleSearchChange = (e) => {
    const userInput = e.target.value;
    setCoauthorInput(userInput);
    setSelectedCandidate(null); // Reset selection if typing resumes

    if (userInput.trim() && authorList) {
        // Filter: Name includes input, case-insensitive
        const filtered = authorList.filter((author) => 
            author.user.fullName.toLowerCase().includes(userInput.toLowerCase()) &&
            author.status === "STATUS_ACTIVE"
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
    } else {
        setSuggestions([]);
        setShowSuggestions(false);
    }
  };

  // 4. Handle Selecting Name from List
  const handleSelectSuggestion = (author) => {
    setCoauthorInput(author.user.fullName);
    setSelectedCandidate(author);
    setShowSuggestions(false);
  };

  // 5. Add Co-Author Logic (Updated)
  const handleAddCoAuthor = () => {
    // Determine which author object to use
    let targetAuthor = selectedCandidate;

    // Fallback: If they typed a name exactly but didn't click the dropdown
    if (!targetAuthor) {
        targetAuthor = authorList?.find(a => a.user.fullName.toLowerCase() === coauthorInput.toLowerCase());
    }

    if (!targetAuthor) {
        Swal.fire({
            icon: "error",
            title: "Author not found",
            text: "Please select an author from the list.",
        });
        return;
    }

    // Check against newly added list
    if (newCoauthorIds.includes(targetAuthor.publicId)) {
        Swal.fire({
            icon: "warning",
            title: "Already added",
            text: "This co-author is already in the pending list",
        });
        return;
    }

    // Check against EXISTING backend list
    const isAlreadyInBackend = coauthorList?.some(c => c.fullName === targetAuthor.user.fullName); // simplified check
    if (isAlreadyInBackend) {
        Swal.fire({
            icon: "warning",
            title: "Already Registered",
            text: "This user is already a co-author for this poetry.",
        });
        return;
    }

    // Success: Add to state
    setCoauthorPreview((prev) => [...prev, { publicId: targetAuthor.publicId, fullName: targetAuthor.user.fullName }]);
    setNewCoauthorIds((prev) => [...prev, targetAuthor.publicId]);
    
    // Reset Input
    setCoauthorInput("");
    setSelectedCandidate(null);
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
        text: "Please select poetry and add at least one new co-author",
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
    return <p className="p-8">Loading Poetry Data...</p>;
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
              {currentCoAuthors.length > 0 ? (
                currentCoAuthors.map((name, index) => (
                    <div
                    key={index}
                    className="bg-white border border-black/20 rounded-xl px-6 py-3 text-sm font-bold text-gray-800 shadow-sm flex items-center gap-3"
                    >
                    {name}
                    </div>
                ))
              ) : (
                <span className="text-gray-300 text-sm italic ml-1">No co-authors yet.</span>
              )}
            </div>
          </div>

          {/* Add New Coauthor Section */}
          <div className="space-y-3 pt-4 relative" ref={wrapperRef}>
            <label className="text-gray-400 font-bold text-sm block ml-1">Add Co-Author</label>
            <div className="flex gap-4 relative">
                
              {/* Search Input Container */}
              <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Search Author Name..."
                    value={coauthorInput}
                    onChange={handleSearchChange}
                    className="w-full bg-white border border-black/20 rounded-xl px-6 py-4 text-sm focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
                    autoComplete="off"
                />
                
                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-100 rounded-xl mt-1 shadow-xl max-h-48 overflow-y-auto">
                        {suggestions.map((author) => (
                            <li
                                key={author.id}
                                onClick={() => handleSelectSuggestion(author)}
                                className="px-6 py-3 hover:bg-red-50 cursor-pointer text-sm text-gray-700 flex justify-between items-center transition-colors border-b border-gray-50 last:border-0"
                            >
                                <span className="font-medium">{author.user.fullName}</span>
                                <span className="text-xs text-gray-400">@{author.user.username}</span>
                            </li>
                        ))}
                    </ul>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddCoAuthor}
                className="bg-[#FF5C5C] hover:bg-[#eb4b4b] text-white font-bold px-12 py-4 rounded-xl transition-all shadow-md active:scale-95"
              >
                Add
              </button>
            </div>

            {/* Preview of New Coauthors (Pending Save) */}
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