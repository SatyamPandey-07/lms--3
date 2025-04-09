import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

// Auth Pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import AdminKey from "./pages/AdminLogin";

// Home
import HomePage from "./pages/HomePage";

// User Dashboard
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookUser from "./pages/BookUser";

// Admin Dashboard
import AdminDashboard from "./pages/AdminDashboard";
import BookAdmin from "./pages/BookAdmin";
import IssueAdmin from "./pages/IsssueAdmin";
import UserList from "./pages/UserList";
import UserVerification from "./pages/UserVerification";
import CloseIssue from "./pages/CloseIssue";

// Error Page
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminKey />} />

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book-user" element={<BookUser />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<BookAdmin />} />
          <Route path="/admin/issue-requests" element={<IssueAdmin />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/user-verification" element={<UserVerification />} />
          <Route path="/admin/close-issue" element={<CloseIssue />} />

          {/* Catch-all NotFound Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} pauseOnHover theme="colored" />
    </>
  );
}

export default App;
