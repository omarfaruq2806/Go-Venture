import React from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex ">
      <div>
        <DashboardSidebar></DashboardSidebar>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
