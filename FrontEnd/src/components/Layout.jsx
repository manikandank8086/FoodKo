// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ">
        <Outlet /> {/* This is where the routed components will be rendered */}
      </main>
    </div>
  );
};

export default Layout;
