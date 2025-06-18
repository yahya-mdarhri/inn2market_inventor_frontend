import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaBars, FaTimes,
  FaTachometerAlt, FaTicketAlt, FaFileAlt, FaUsers,
  FaUser, FaCog, FaSignOutAlt
} from 'react-icons/fa';
import './layout.css';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/Dashboard', label: 'Dashboard', icon: <FaTachometerAlt className="text-xl" /> },
    { path: '/ticket', label: 'Tickets', icon: <FaTicketAlt className="text-xl" /> },
    { path: '/patents', label: 'Patents', icon: <FaFileAlt className="text-xl" /> },
    { path: '/coniventors', label: 'Co-inventors', icon: <FaUsers className="text-xl" /> },
    { path: '/profile', label: 'Profile', icon: <FaUser className="text-xl" /> },
    { path: '/settings', label: 'Settings', icon: <FaCog className="text-xl" /> },
    { path: '/logout', label: 'Log out', icon: <FaSignOutAlt className="text-xl" /> },
  ];

  return (
    <div className="container">
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars />
      </button>
      {sidebarOpen && (
        <div
          className="sidebar-backdrop right"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <img src="logo.svg" alt="Logo" className="sidebar-logo bg-white-800" />
          <h2 className="text-[0.24em] font-semibold text-white max-w-[180px] leading-tight">
            Center for Innovation and Entrepreneurship
          </h2>
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          © UIR 2025 Center for Innovation
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;