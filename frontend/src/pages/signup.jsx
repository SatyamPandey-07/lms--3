import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sun, Moon } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [surname, setSurname] = useState("");
  const [feesReceiptNo, setFeesReceiptNo] = useState("");
  const [email, setEmail] = useState("");
  const [idCardImage, setIdCardImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File must be less than 2MB!");
      return;
    }

    setIdCardImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("surname", surname);
    formData.append("feesReceiptNo", feesReceiptNo);
    formData.append("email", email);
    formData.append("idCardImage", idCardImage);
    formData.append("folderName", "users");

    try {
      await axios.post("http://localhost:4300/api/v1/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed. Try again!");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-[#121212] text-white" : "bg-gradient-to-tr from-[#e7dac7] to-[#c2a27a] text-black"} min-h-screen flex items-center justify-center px-4 transition-colors duration-500 font-['Oxygen']`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl border ${darkMode ? "bg-[#1e1e1e] border-[#333]" : "bg-white border-[#c2a27a]"}`}>
        
        {/* Toggle */}
        <div className="flex justify-end mb-2">
          <button onClick={() => setDarkMode(!darkMode)} className="p-1 rounded-full bg-transparent">
            {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-800" size={20} />}
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h2>
        <p className="text-center mb-6 text-sm opacity-80">
          Join the library and explore a world of knowledge 📚
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput label="Full Name" value={fullname} onChange={setFullname} dark={darkMode} />
          <FloatingInput label="Surname" value={surname} onChange={setSurname} dark={darkMode} />
          <FloatingInput label="Fees Receipt No" value={feesReceiptNo} onChange={setFeesReceiptNo} dark={darkMode} />
          <FloatingInput label="Email" type="email" value={email} onChange={setEmail} dark={darkMode} />

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload ID Card</label>
            <label className={`inline-block px-4 py-2 rounded-md cursor-pointer text-white ${darkMode ? "bg-[#4a3628] hover:bg-[#322317]" : "bg-[#4a3628] hover:bg-[#322317]"}`}>
              Choose File
              <input type="file" onChange={handleFileChange} required className="hidden" />
            </label>
            {idCardImage && (
              <p className="text-sm mt-2 opacity-80">📎 {idCardImage.name}</p>
            )}
            {uploadProgress > 0 && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-[#4a3628] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 opacity-80">{uploadProgress}% uploaded</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submit}
            className={`w-full py-2 rounded-md font-semibold tracking-wide transition duration-300 ${
              submit
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#4a3628] text-white hover:bg-[#322317]"
            }`}
          >
            {submit ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#4a3628] font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

const FloatingInput = ({ label, type = "text", value, onChange, dark }) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        required
        className={`peer w-full px-4 pt-5 pb-2 rounded-md border ${dark ? "bg-[#2c2c2c] border-[#444] text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#c2a27a]`}
      />
      <label className={`absolute left-4 top-2 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ${dark ? "text-white peer-placeholder-shown:text-gray-500" : "text-[#4a3628]"}`}>
        {label}
      </label>
    </div>
  );
};

export default Signup;
