import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Moon, Sun } from "lucide-react";
import Lottie from "lottie-react";
import navvAnimation from "../assets/reading.json";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      const userData = localStorage.getItem("userInfo");

      setIsLoggedIn(!!token);
      if (userRole) setRole(userRole);
      if (userData) setUser(JSON.parse(userData));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 shadow-xl ${
        darkMode ? "bg-[#1f1f1f] text-white" : "bg-gradient-to-br from-[#f1e2d0] to-[#c2a27a] text-[#4a3628]"
      } transition-all duration-300 backdrop-blur-lg`}
    >
      <div className="navbar px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Title + Lottie */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-3xl font-bold font-[Oxygen] tracking-tight whitespace-nowrap">
            Library System
          </h1>
          <div className="h-10 w-35 p-1 rounded-b-2xl bg-gradient-to-br from-[#facc15] via-[#f59e0b] to-[#d97706] shadow-lg animate-pulse hover:scale-105 transition-transform duration-300">
  <Lottie animationData={navvAnimation} loop={true} />
</div>

        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex space-x-8 text-lg font-medium font-[Oxygen]">
          <HoverLink to="/" label="Home" dark={darkMode} />
          {isLoggedIn && (
            <HoverLink
              to={
                role === "admin"
                  ? "/admin-login"
                  : `/dashboard/${localStorage.getItem("user_id")}`
              }
              label="Dashboard"
              dark={darkMode}
            />
          )}
          <HoverLink to="/support" label="Support" dark={darkMode} />
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4 font-[Oxygen]">
          <button className="relative">
            <Bell size={22} className="hover:scale-110 transition duration-200" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun size={22} className="hover:rotate-90 transition" />
            ) : (
              <Moon size={22} className="hover:rotate-90 transition" />
            )}
          </button>

          {isLoggedIn && user ? (
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName || "User"}`}
                alt="avatar"
                className="h-10 w-10 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute right-0 mt-2 w-52 shadow-lg rounded-lg p-4 space-y-2 ${
                    darkMode ? "bg-[#2b2b2b] text-white" : "bg-white text-[#4a3628]"
                  }`}
                >
                  <p className="text-sm font-semibold">{user.fullName}</p>
                  <p className="text-sm">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-2 px-3 py-1 rounded-md bg-[#4a3628] text-white hover:bg-[#322317] transition"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border-2 border-[#4a3628] text-[#4a3628] rounded-lg hover:bg-[#4a3628] hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-[#4a3628] text-white rounded-lg hover:bg-[#322317] transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

const HoverLink = ({ to, label, dark }) => (
  <Link
    to={to}
    className={`relative transition duration-300 ${
      dark ? "text-white" : "text-[#4a3628]"
    } hover:text-[#2d1b0f] group`}
  >
    {label}
    <span
      className={`absolute left-1/2 bottom-0 w-0 h-[2px] ${
        dark ? "bg-white" : "bg-[#4a3628]"
      } transition-all duration-300 transform -translate-x-1/2 group-hover:w-full`}
    />
  </Link>
);

export default Navbar;
