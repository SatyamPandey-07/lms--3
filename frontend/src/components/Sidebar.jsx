import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-700 transition ${
      isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-300"
    }`;

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📚 Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClasses}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/with-rentals" className={linkClasses}>
          📦 Users With Rentals
        </NavLink>
        <NavLink to="/admin/unverified" className={linkClasses}>
          🚫 Unverified Users
        </NavLink>
        <NavLink to="/admin/book-list" className={linkClasses}>
          📚 Book List
        </NavLink>
        <NavLink to="/admin/pending-requests" className={linkClasses}>
          🕓 Pending Requests
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
