import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from 'html2pdf.js';
// Import your Thunk

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";  
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getPoetryList } from "../../../store/thunk/PoetryThunk";
import { getAllAnalytics } from "../../../store/thunk/AnalyticsThunk";
import { getAllAuthor } from "../../../store/thunk/AuthorThunk";



export const generatePoetryPDF = (item) => {
  // 1. DYNAMIC DATA PREP (Updated for your specific JSON structure)
  const title = item.title || "Untitled";
  const authorName = item.author?.user?.fullName || "Unknown Author";
  const authorHandle = item.author?.user?.username ? `@${item.author.user.username}` : "";
  const category = item.category || "GENERAL";
  const content = item.content || "No content provided.";
  const description = item.description || "No description available.";
  
  // FIX: Accessing status.name and handling dateCreated
  const statusName = item.status?.name || "PENDING"; 
  const dateStr = item.dateCreated ? new Date(item.dateCreated).toLocaleString() : "N/A";

  // 2. ANALYTICS
  const views = Number(item.analytics?.views || 0);
  const likes = Number(item.analytics?.likes || 0);
  const engageRatio = views > 0 ? ((likes / views) * 100).toFixed(1) : "0.0";
  
  // Logic for Status Colors
  const isApproved = statusName.toUpperCase() === "APPROVED";
  const statusBg = isApproved ? "#16a34a" : "#f59e0b"; // Green for Approved, Amber for Pending

  // 3. SCORING LOGIC
  const isPoor = Number(engageRatio) < 1;
  const rating = isPoor ? "UNSATISFACTORY" : "SATISFACTORY";
  const insight = isPoor 
    ? "High visibility with low interaction indicates the content may not be resonating with the current audience."
    : "Strong engagement levels suggest high quality and reader connection.";

  const elementHTML = `
    <div style="width: 210mm; background: white; font-family: sans-serif;">
      
      <div style="padding: 20mm; min-height: 297mm; position: relative; box-sizing: border-box; page-break-after: always;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: #1e3a8a;"></div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; align-items: start;">
            <div>
                <h1 style="font-size: 24pt; font-weight: bold; color: #1e3a8a; margin: 0; letter-spacing: -1px;">FULL ANALYTICS REPORT</h1>
                <p style="color: #9ca3af; font-size: 8pt; font-weight: bold; margin-top: 5px;">DOCUMENT ID: #POET-${item.id}</p>
            </div>
            <div style="background: ${statusBg}; color: white; padding: 8px 15px; border-radius: 5px; font-weight: 900; font-size: 10pt; text-transform: uppercase;">
                STATUS: ${statusName}
            </div>
        </div>

        <div style="display: flex; border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; padding: 20px 0; margin-bottom: 30px;">
            <div style="flex: 1;">
                <h2 style="font-size: 8pt; color: #2563eb; font-weight: bold; margin: 0;">POETRY TITLE</h2>
                <p style="font-size: 18pt; font-family: serif; font-style: italic; font-weight: bold; margin: 5px 0;">"${title}"</p>
                <div style="margin-top: 15px;">
                    <h2 style="font-size: 8pt; color: #2563eb; font-weight: bold; margin: 0;">AUTHOR</h2>
                    <p style="font-weight: bold; color: #111827; margin: 0;">${authorName} <span style="color: #9ca3af; font-weight: normal;">${authorHandle}</span></p>
                </div>
            </div>
            <div style="text-align: right;">
                <h2 style="font-size: 8pt; color: #2563eb; font-weight: bold; margin: 0;">CATEGORY</h2>
                <p style="font-size: 14pt; font-weight: 600; margin: 5px 0;">${category}</p>
                <h2 style="font-size: 8pt; color: #2563eb; font-weight: bold; margin-top: 15px; margin: 0;">SUBMISSION DATE</h2>
                <p style="font-size: 9pt; color: #6b7280; margin: 5px 0;">${dateStr}</p>
            </div>
        </div>

        <section style="background: #f9fafb; border-left: 4px solid #1e3a8a; padding: 25px; border-radius: 0 10px 10px 0; margin-bottom: 30px;">
            <h3 style="font-size: 8pt; font-weight: 900; color: #1e3a8a; margin-bottom: 10px; text-transform: uppercase;">Manuscript Content</h3>
            <div style="white-space: pre-line; font-family: serif; font-size: 14pt; color: #374151; line-height: 1.6; font-style: italic;">
                ${content}
            </div>
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 7pt; color: #9ca3af; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">Description</p>
                <p style="font-size: 10pt; color: #4b5563; font-style: italic;">"${description}"</p>
            </div>
        </section>

        <section>
            <h3 style="font-size: 12pt; font-weight: bold; margin-bottom: 15px; color: #111827;">Performance Interpretation</h3>
            <div style="display: flex; gap: 10px; text-align: center;">
                <div style="flex: 1; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <p style="font-size: 20pt; font-weight: 900; margin: 0;">${views}</p>
                    <p style="font-size: 7pt; font-weight: bold; color: #9ca3af; margin: 0;">TOTAL VIEWS</p>
                </div>
                <div style="flex: 1; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <p style="font-size: 20pt; font-weight: 900; margin: 0;">${likes}</p>
                    <p style="font-size: 7pt; font-weight: bold; color: #9ca3af; margin: 0;">TOTAL LIKES</p>
                </div>
                <div style="flex: 1; padding: 15px; background: #eff6ff; border: 1px solid #2563eb; border-radius: 8px;">
                    <p style="font-size: 20pt; font-weight: 900; color: #2563eb; margin: 0;">${engageRatio}%</p>
                    <p style="font-size: 7pt; font-weight: bold; color: #2563eb; margin: 0;">ENGAGE RATIO</p>
                </div>
            </div>
        </section>
      </div>

      <div style="padding: 20mm; min-height: 297mm; position: relative; box-sizing: border-box; display: flex; flex-direction: column;">
        <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; background: #f3f4f6; border-bottom-left-radius: 100%; z-index: -1;"></div>
        
        <div style="border-bottom: 2px solid black; padding-bottom: 15px; margin-bottom: 40px;">
            <h1 style="font-size: 32pt; font-weight: 900; letter-spacing: -2px; margin: 0;">EXECUTIVE SUMMARY</h1>
            <p style="font-family: monospace; font-size: 10pt; color: #6b7280; margin: 5px 0 0 0;">Report Generated for ${category} Category</p>
        </div>

        <div style="display: flex; gap: 40px; margin-bottom: 40px;">
            <div style="width: 35%; border-right: 1px solid #e5e7eb; padding-right: 20px;">
                <h4 style="font-size: 7pt; font-weight: 900; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Metadata</h4>
                <p style="font-size: 11pt; font-weight: bold; margin: 0;">${title}</p>
                <p style="font-size: 9pt; color: #4b5563; margin: 5px 0;">Author: ${authorName}</p>
                <p style="font-size: 8pt; color: #2563eb; font-weight: bold; text-decoration: underline;">Status: ${statusName}</p>
            </div>
            <div style="width: 65%;">
                <h4 style="font-size: 7pt; font-weight: 900; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Content Snapshot</h4>
                <p style="font-family: serif; font-style: italic; color: #4b5563; border-left: 2px solid #d1d5db; padding-left: 15px; margin: 0;">
                    "${content.substring(0, 150)}..."
                </p>
            </div>
        </div>

        <div style="display: flex; gap: 20px; background: #f9fafb; padding: 30px; border-radius: 20px; margin-bottom: 40px;">
            <div style="flex: 1; border-right: 1px solid #e5e7eb;">
                <span style="font-size: 36pt; font-weight: 900; color: #111827;">${engageRatio}%</span>
                <p style="font-size: 7pt; font-weight: bold; color: #9ca3af; text-transform: uppercase; margin: 0;">Interaction Conversion</p>
            </div>
            <div style="flex: 1; padding-left: 20px;">
                <span style="font-size: 36pt; font-weight: 900; color: #111827;">${views}</span>
                <p style="font-size: 7pt; font-weight: bold; color: #9ca3af; text-transform: uppercase; margin: 0;">Traffic Reach</p>
            </div>
        </div>

        <div style="flex-grow: 1;">
            <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                <span style="background: ${isPoor ? '#dc2626' : '#2563eb'}; color: white; font-weight: bold; font-size: 7pt; padding: 5px 10px; border-radius: 4px; height: fit-content;">INSIGHT</span>
                <p style="font-size: 10pt; color: #374151; margin: 0; line-height: 1.6;">${insight}</p>
            </div>
            <div style="display: flex; gap: 15px;">
                <span style="background: #16a34a; color: white; font-weight: bold; font-size: 7pt; padding: 5px 10px; border-radius: 4px; height: fit-content;">ACTION</span>
                <p style="font-size: 10pt; color: #374151; margin: 0; line-height: 1.6;">Recommend thorough review of content themes to align with reader interests.</p>
            </div>
        </div>

        <div style="background: #111827; color: white; padding: 25px; border-radius: 15px; text-align: center; margin-top: 40px;">
            <h4 style="font-size: 7pt; letter-spacing: 4px; font-weight: 300; margin-bottom: 5px; color: #9ca3af;">OVERALL QUALITY RATING</h4>
            <div style="font-size: 18pt; font-weight: 900; letter-spacing: 2px;">${rating}</div>
        </div>
      </div>

    </div>
  `;

  const options = {
    margin: 0,
    filename: `Report_${title.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(elementHTML).set(options).save();
};



export default function AdminGenerateReport() {
  const dispatch = useDispatch();
  
  // 1. Select data from Redux Store 
  // (Adjust 'poetry' and 'list' based on your actual slice structure)
  // Inside your AdminGenerateReport function
const { poetryList, loading } = useSelector((state) => state.poetry);
const { authorList } = useSelector((state) => state.author); // Adjust 'author' to your actual slice name
const { allAnalytics } = useSelector((state) => state.analytics); // Adjust 'analytics' to your actual slice name

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // 2. Fetch data on component mount
  useEffect(() => {
    dispatch(getPoetryList());
    dispatch(getAllAnalytics());
    dispatch(getAllAuthor());
  }, [dispatch]);


  
  // 3. Filter Logic using Redux data
const filteredData = useMemo(() => {
  if (!poetryList || !Array.isArray(poetryList)) return [];

  return poetryList.map((poetry) => {
    // 1. Find the analytics (keeping this as is)
    const analyticsMatch = allAnalytics?.find(ans => 
      Number(ans.poetryId) === Number(poetry.id)
    );

    return {
      ...poetry,
      // Since 'author' is already inside 'poetry', we just map it over
      // We use 'authorData' to keep your table code consistent
      authorData: poetry.author || null, 
      analytics: analyticsMatch || { views: 0, likes: 0 }
    };
  }).filter((item) => {
    const term = searchTerm.toLowerCase();
    const title = (item.title || "").toLowerCase();
    
    // 2. Access the nested name: item -> authorData (which is poetry.author) -> user -> fullName
    const authorName = (item.authorData?.user?.fullName || "").toLowerCase();
    
    return title.includes(term) || authorName.includes(term);
  });
}, [searchTerm, poetryList, allAnalytics]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedRows = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleNext = () => setCurrentPage((p) => Math.min(pageCount - 1, p + 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));

  return (
    <div className="flex flex-col h-full animate-fadeIn p-4">
      <div className="mb-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Poetry <span className="text-[#DC2A54]">Report</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Overview report of each poetry in 2 version: full version or summary version
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 gap-4">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <SearchIcon fontSize="small" />
          </div>
          <input
            type="text"
            placeholder="Search title or author..."
            className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#7B61FF] focus:outline-none bg-white text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <span className="text-xs font-bold text-gray-600">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage >= pageCount - 1}
            className="p-1 rounded-lg border border-gray-200 bg-white disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-black/10 rounded-[25px] shadow-sm overflow-hidden flex flex-col mx-4 mb-4">
        <div className="overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E9ECEF] text-gray-500 text-[11px] uppercase tracking-widest sticky top-0 z-10 border-b border-gray-100">
                <th className="py-3 px-8 text-center font-bold">Poetry</th>
                <th className="py-3 px-4 text-center font-bold">Author</th>
                <th className="py-3 px-4 text-center font-bold">Full Report</th>
                <th className="py-3 px-8 text-center font-bold">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-400 text-sm">
                    Loading reports...
                  </td>
                </tr>
              ) : paginatedRows.length > 0 ? (
                paginatedRows.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-2 px-8 font-bold text-gray-800 text-xs text-center">
                      {item.title}
                    </td>
                    <td className="py-2 px-4 font-medium text-gray-500 text-xs text-center">
                      {/* Handle author as string or object */}
                      {item.authorData?.user?.fullName || "Unknown Author"}
                    </td>
                   <td className="py-2 px-4 text-center">
  {/* FULL REPORT BUTTON */}
  <button 
    onClick={() => generatePoetryPDF(item)} 
    className="inline-flex items-center gap-1 bg-[#7B61FF] hover:bg-[#6649FF] text-white px-4 py-1 rounded-full text-[10px] font-bold transition-all"
  >
    <FileDownloadIcon sx={{ fontSize: 12 }} /> Download
  </button>
</td>

<td className="py-2 px-8 text-center">
  {/* SUMMARY BUTTON (Optional: Create a separate function if you want ONLY the summary page) */}
  <button 
    onClick={() => generatePoetryPDF(item)} 
    className="inline-flex items-center gap-1 bg-[#FF7F7F] hover:bg-[#FF5C5C] text-white px-4 py-1 rounded-full text-[10px] font-bold transition-all"
  >
    <FileDownloadIcon sx={{ fontSize: 12 }} /> Download
  </button>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-400 text-sm">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}