import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="relative bg-[#0d1117] text-[#c9d1d9] py-10 px-6 font-['Oxygen'] border-t border-[#21262d]"
>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
    {/* About / Logo */}
    <div>
      <h2 className="font-bold text-xl text-[#58a6ff] mb-2 drop-shadow-[0_0_4px_#58a6ff]">📚 Library App</h2>
      <p className="text-[#8b949e]">Explore the world of knowledge. Rent and read books with ease.</p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-semibold text-[#58a6ff] mb-2 drop-shadow-[0_0_3px_#58a6ff]">Quick Links</h3>
      <ul className="space-y-1">
        <li><Link to="/" className="hover:text-white hover:underline">Home</Link></li>
        <li><Link to="/login" className="hover:text-white hover:underline">Login</Link></li>
        <li><Link to="/signup" className="hover:text-white hover:underline">Signup</Link></li>
        <li><Link to="/admin-login" className="hover:text-white hover:underline">Admin Login</Link></li>
      </ul>
    </div>

    {/* Contact & Social */}
    <div>
      <h3 className="font-semibold text-[#58a6ff] mb-2 drop-shadow-[0_0_3px_#58a6ff]">Contact</h3>
      <p className="text-[#8b949e]">support@libraryapp.com</p>
      <div className="flex gap-4 mt-3">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-xl hover:text-[#6e5494] hover:drop-shadow-[0_0_6px_#6e5494] transition duration-300" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-xl hover:text-[#0077b5] hover:drop-shadow-[0_0_6px_#0077b5] transition duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl hover:text-[#1da1f2] hover:drop-shadow-[0_0_6px_#1da1f2] transition duration-300" />
        </a>
      </div>
    </div>
  </div>

  <div className="text-center text-xs mt-8 text-[#6e7681]">
    &copy; {new Date().getFullYear()} Library App. All rights reserved.
  </div>

  {/* Scroll to top button */}
  <button
    onClick={scrollToTop}
    className="fixed bottom-5 right-5 bg-[#161b22] hover:bg-[#21262d] text-white p-3 rounded-full shadow-md transition hover:drop-shadow-[0_0_10px_#00FFFF] z-50"
    aria-label="Scroll to top"
  >
    <FaArrowUp />
  </button>
</motion.footer>

  );
};

export default Footer;
