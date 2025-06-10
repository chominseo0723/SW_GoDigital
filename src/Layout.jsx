import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-black text-white">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <footer className="py-6 text-center text-gray-400 text-sm">
      © 2025 GoDigital
    </footer>
  </div>
);

export default Layout;
