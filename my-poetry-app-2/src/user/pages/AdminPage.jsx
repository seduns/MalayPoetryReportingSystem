import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../component/Admin/AdminSideBar";

export default function AdminPage() {
  return (
    // Main container: Flex row to put Sidebar and Content side-by-side
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans text-gray-900">
      
      {/* 1. Sidebar Section: Fixed width, non-shrinking */}
      <aside className="sticky top-0 h-screen w-0 flex items-center justify-center bg-white border-r border-gray-50">
        <AdminSideBar />
      </aside>

      {/* 2. Content Section: Fills remaining space and centers the Outlet */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* This inner div centers your Dashboard/Reports.
           max-w-7xl ensures it doesn't get too wide on huge screens.
           mx-auto centers it horizontally.
        */}
        <div className="w-full max-w-7xl mx-auto h-full p-4 lg:p-10 overflow-hidden flex flex-col justify-center">
           <Outlet /> 
        </div>
      </main>

    </div>
  );
}