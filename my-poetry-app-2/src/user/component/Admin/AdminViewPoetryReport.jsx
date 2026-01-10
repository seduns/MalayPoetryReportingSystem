import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPoetry } from "../../../store/thunk/PoetryThunk";

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AdminViewPoetryReport() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { poetryData, loading } = useSelector((state) => state.poetry);

  useEffect(() => {
    if (id) {
      dispatch(getPoetry(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="p-20 text-center font-bold text-gray-400">Loading Poetry Details...</div>;
  if (!poetryData) return <div className="p-20 text-center font-bold text-gray-400">No data found for this ID.</div>;

  return (
    <div className="p-10 h-full w-full flex flex-col font-sans bg-gray-50/30">
      
      {/* Top Header / Back Action */}
      <div className="flex items-center justify-between mb-8 px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#DC2A54] transition-all font-bold text-sm uppercase tracking-widest"
        >
          <ArrowBackIcon fontSize="small" /> Back to Report
        </button>
        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          Administrator View Mode
        </div>
      </div>

      <div className="flex gap-8 h-[calc(100vh-180px)] overflow-hidden">
    

        {/* Left Column: The Poetry Content */}
        <div className="flex-[2.5] bg-white border border-black/10 rounded-[40px] shadow-sm p-16 overflow-y-auto custom-scrollbar relative">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-[#fff5f7] text-[#DC2A54] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                 {poetryData.category || "General"}
               </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2 leading-tight">{poetryData.title}</h1>
            <p className="text-[#DC2A54] font-bold text-lg italic">By {poetryData.author?.user?.fullName}</p>
          </header>

          <div className="prose max-w-none">
            {/* Displaying content with preserved line breaks for poetry formatting */}
            <p className="text-xl leading-[2] text-gray-700 whitespace-pre-line font-serif italic">
              {poetryData.content}
            </p>
          </div>
        </div>

        {/* Right Column: Metadata & Administration */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* Status & Info Card */}
          <div className="bg-white border border-black/10 rounded-[35px] p-8 shadow-sm space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mb-1">Status</p>
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${
                  poetryData.status?.name === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {poetryData.status?.name || "PENDING"}
                </span>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mb-1">Author Details</p>
                <p className="text-gray-900 text-sm font-bold">{poetryData.author?.user?.fullName}</p>
                <p className="text-gray-500 text-xs">{poetryData.author?.user?.email}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mb-1">Created Date</p>
                <p className="text-gray-900 text-sm font-bold">
                  {new Date(poetryData.dateCreated).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-gray-400 text-xs font-bold">
              <VisibilityIcon sx={{ fontSize: 18 }} />
              <span>Reference ID: {id}</span>
            </div>
          </div>

          {/* Poetry Description Card */}
          <div className="bg-white border border-black/10 rounded-[35px] p-8 shadow-sm flex-1">
            <h3 className="text-[#DC2A54] italic font-serif text-lg mb-4">Poetry Description</h3>
            <p className="text-gray-600 text-sm font-medium leading-[1.8] tracking-wide">
              {poetryData.description || "No description provided for this poetry."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}