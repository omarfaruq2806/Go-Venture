import React from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    // FULL SYSTEM BLOCK WRAPPER: bg-base-100 & text-base-content ensure korbe pura dash theme switch logic context
    <div className="flex flex-col lg:flex-row min-h-screen bg-base-100 text-base-content transition-colors duration-200">
      {/* Sidebar Wrapper Element Grid */}
      <div className="flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Page Panel View Render Container */}
      {/* w-full min-w-0 tracking system dynamic layout padding matching updates content flow line screen resolution box */}
      <div className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
