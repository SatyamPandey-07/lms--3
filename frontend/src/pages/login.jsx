import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const { data } = await axios.post("http://localhost:4300/api/v1/users/login", {
        username,
        password,
      }, { withCredentials: true });

      if (data.token) {
        const { token, user, role } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user._id);
        localStorage.setItem("role", role);
        localStorage.setItem("userInfo", JSON.stringify(user));
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(role === "admin" ? "/admin-login" : `/dashboard/${user._id}`);
        }, 1000);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed, try again!");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-[#121212] text-white" : "bg-gradient-to-r from-[#e8d9c4] to-[#b8926b] text-black"} min-h-screen w-full flex items-center justify-center font-['Oxygen'] px-4 transition-colors duration-500`}>
      <ToastContainer position="top-center" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-full max-w-md ${darkMode ? "bg-[#1e1e1e]" : "bg-white/90"} backdrop-blur-lg p-8 rounded-2xl shadow-xl border ${darkMode ? "border-[#333]" : "border-[#d5b99b]"}`}
      >
        {/* 🌗 Toggle */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
        </div>

        <h2 className="text-center text-3xl font-bold mb-2">
          Welcome Back
        </h2>
        <p className="text-center mb-6 text-sm">
          Log in to explore your library universe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Floating Label - Username */}
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`peer w-full px-4 pt-5 pb-2 rounded-lg border ${darkMode ? "border-[#444] bg-[#2c2c2c] text-white" : "border-[#d5b99b] bg-white"} focus:outline-none focus:ring-2 focus:ring-[#b58b63]`}
            />
            <label className={`absolute left-4 top-2 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ${darkMode ? "text-white peer-placeholder-shown:text-gray-500" : "text-[#3c2b1e]"}`}>
              Username
            </label>
          </div>

          {/* Floating Label - Password + Toggle */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`peer w-full px-4 pt-5 pb-2 pr-10 rounded-lg border ${darkMode ? "border-[#444] bg-[#2c2c2c] text-white" : "border-[#d5b99b] bg-white"} focus:outline-none focus:ring-2 focus:ring-[#b58b63]`}
            />
            <label className={`absolute left-4 top-2 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ${darkMode ? "text-white peer-placeholder-shown:text-gray-500" : "text-[#3c2b1e]"}`}>
              Password
            </label>
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-500 cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right -mt-4">
            <Link to="/forgot-password" className="text-xs underline text-blue-600 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: submit ? 1 : 1.03 }}
            disabled={submit}
            className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
              submit
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : `${darkMode ? "bg-[#6b4f37] hover:bg-[#4a3628] text-white" : "bg-[#6b4f37] hover:bg-[#4a3628] text-white"} shadow-md`
            }`}
          >
            {submit ? "Logging In..." : "Log In"}
          </motion.button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-5">
          📩 Check your email for login credentials after verification.
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
