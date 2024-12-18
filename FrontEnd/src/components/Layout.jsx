// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
