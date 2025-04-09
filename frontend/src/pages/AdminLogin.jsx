import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import adminAnim from "../assets/admin-lock.json"; // ⬅️ Add a suitable animation here

function AdminKey() {
  const [orgKey, setOrgKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/users/login/admin",
        { orgKey },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("admin_token", response.data.token);
        toast.success("✅ Verified! Redirecting...");
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Invalid key!");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#0d1117] text-white"
      style={{ fontFamily: "'Oxygen', sans-serif" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="p-8 bg-[#161b22] rounded-2xl shadow-2xl w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 mx-auto mb-4">
          <Lottie animationData={adminAnim} loop />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">🔐 Admin Access</h2>

        <input
          type="password"
          value={orgKey}
          onChange={(e) => setOrgKey(e.target.value)}
          placeholder="Enter Organization Key"
          className="w-full p-3 bg-[#0d1117] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
          required
        />

        <button
          type="submit"
          className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold rounded-lg"
        >
          Verify Key
        </button>
      </motion.form>
    </div>
  );
}

export default AdminKey;
