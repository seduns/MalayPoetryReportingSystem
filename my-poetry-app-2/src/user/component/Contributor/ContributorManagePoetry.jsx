import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePoetry, getPoetryByAuthorId, getPoetryList } from "../../../store/thunk/PoetryThunk";
import { useNavigate } from "react-router-dom";
import { setSelectedPoetry } from "../../../store/slice/PoetrySlice";
import Swal from "sweetalert2";

export default function ContributorManagePoetry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get poetry list from Redux state
  const { poetryList } = useSelector((state) => state.poetry);
  const { accountId } = useSelector((state) => state.auth);

  // Fetch poetry list on component mount
  useEffect(() => {
    dispatch(getPoetryByAuthorId(accountId));
  }, [dispatch]);

  // Handle Edit click
  const handleEdit = (poem) => {
    dispatch(setSelectedPoetry(poem));
    console.log(poem)
    navigate("/contributor/edit-poetry");
  };

const handleDelete = async (id) => {
  // First confirmation
  const firstConfirm = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to delete this poetry.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FF5C5C",
    cancelButtonColor: "#999",
    confirmButtonText: "Continue",
  });

  if (!firstConfirm.isConfirmed) return;

  try {
    await dispatch(deletePoetry(id));

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Poetry has been deleted.",
      confirmButtonColor: "#FF5C5C",
    });

    dispatch(getPoetryByAuthorId(accountId))
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "Something went wrong.",
      confirmButtonColor: "#FF5C5C",
    });
  }
};


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
        {poetryList && poetryList.length > 0 ? (
          poetryList.map((poem) => (
            <div
              key={poem.id}
              className="bg-white border border-black/20 rounded-[30px] p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                    {poem.title}
                  </h2>
                  <span className="bg-[#E6F9F0] text-[#56D0A0] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {poem.status?.name}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(poem)}
                    className="bg-[#7B61FF] hover:bg-[#6649FF] text-white px-10 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(poem.id)} className="bg-[#FFE5E5] hover:bg-[#FFD1D1] text-[#FF5C5C] px-10 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                    Delete
                  </button>
                </div>
              </div>

              {/* Metadata Bar */}
              <div className="flex gap-8 text-[11px] text-gray-300 font-medium mb-6">
                <p>
                  By{" "}
                  <span className="text-gray-400 ml-1">
                    {poem.author?.user?.fullName || "-"}
                  </span>
                </p>
                <p>
                  Co-author:{" "}
                  <span className="text-gray-400 ml-1">
                    {poem.coauthorPublicIds
                      ? poem.coauthorPublicIds.join(", ")
                      : "-"}
                  </span>
                </p>
                <p>{poem.dateCreated ? new Date(poem.dateCreated).toLocaleDateString() : "-"}</p>
                <p>{poem.category || "-"}</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm font-medium leading-relaxed max-w-4xl">
                {poem.description || "-"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No poetry found.
          </p>
        )}
      </div>
    </div>
  );
}
