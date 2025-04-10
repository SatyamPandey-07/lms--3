// src/pages/admin/AdminLayout.jsx

import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, UserCheck, ClipboardCheck } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] p-4 space-y-4 shadow-lg border-r border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</NavItem>
          <NavItem to="/admin/books" icon={<BookOpen size={20} />}>Books</NavItem>
          <NavItem to="/admin/issue-requests" icon={<ClipboardCheck size={20} />}>Issue Requests</NavItem>
          <NavItem to="/admin/users" icon={<Users size={20} />}>User List</NavItem>
          <NavItem to="/admin/user-verification" icon={<UserCheck size={20} />}>Verification</NavItem>
          <NavItem to="/admin/close-issue" icon={<ClipboardCheck size={20} />}>Close Issues</NavItem>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

// Reusable NavItem component
const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#238636] transition ${
        isActive ? "bg-[#238636] font-semibold" : "text-gray-300"
      }`
    }
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

export default AdminLayout;
