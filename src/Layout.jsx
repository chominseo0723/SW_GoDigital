import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-green-900">
      <Outlet />
    </div>
  );
};

export default Layout;