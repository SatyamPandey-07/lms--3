import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import AdminLayout from "./pages/admin/AdminLayout";

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

// Admin Dashboard Pages
import AdminDashboard from "./pages/AdminDashboard";
import BookAdmin from "./pages/BookAdmin";
import IssueAdmin from "./pages/IsssueAdmin";
import UserList from "./pages/UserList";
import UserVerification from "./pages/UserVerification";
import CloseIssue from "./pages/CloseIssue";

// Error Page
import NotFound from "./pages/NotFound";

// Secure Routing
import PrivateRoute from "./components/PrivateRoute";

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

          {/* User Protected Routes */}
          <Route element={<PrivateRoute role="user" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/book-user" element={<BookUser />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="books" element={<BookAdmin />} />
              <Route path="issue-requests" element={<IssueAdmin />} />
              <Route path="users" element={<UserList />} />
              <Route path="user-verification" element={<UserVerification />} />
              <Route path="close-issue" element={<CloseIssue />} />
            </Route>
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} pauseOnHover theme="colored" />
    </>
  );
}

export default App;
