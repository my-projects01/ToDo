import React from 'react';
import { Outlet } from 'react-router-dom'; // Assuming you use React Router for nested routes
import TopNavigation from './TopNavigation';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation bar */}
      <header className="bg-blue-600 text-white">
        <TopNavigation />
      </header>
        
        {/* Main content */}
      <main className="flex-1">
        {/* Content of the current route will be rendered here */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} My Application. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;

