import React from "react";
import { Outlet } from "react-router-dom";
import ContributorSideBar from "../component/Contributor/ContributorSideBar";

export default function ContributorPage() {
  return (
    // Main container: Flex row to put Sidebar and Content side-by-side
    <div className="flex min-h-screen w-screen flex-col md:flex-row font-sans">
      
      {/* 1. Sidebar Section: Fixed width, non-shrinking */}
    <aside className="sticky top-0 h-screen w-20 bg-white border-r border-gray-50">
      <div className="pl-30 pt-40">
        <ContributorSideBar />
      </div>
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