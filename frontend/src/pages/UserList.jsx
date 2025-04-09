import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { BadgeCheck, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersWithRentals = async () => {
      try {
        const response = await axios.get("http://localhost:4300/api/v1/users/with-rentals");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users with rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithRentals();
  }, []);

  const getInitials = (fullname = "", surname = "") =>
    `${fullname.charAt(0)}${surname.charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7ede2] via-[#f1d6b8] to-[#c2a27a] py-12 px-6 font-['Oxygen']">
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/30 border border-[#d8b892] rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-[#4a3628] mb-12 tracking-wide">
          🛡️ Verified Users & 📚 Issued Books
        </h1>

        {loading ? (
          <p className="text-center text-[#4a3628] text-lg font-medium animate-pulse">
            Loading users...
          </p>
        ) : users.length === 0 ? (
          <p className="text-center text-[#4a3628] text-lg font-medium">
            No verified users found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 border border-[#e6c8a8] rounded-2xl p-6 shadow-md hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 duration-300 ease-in-out backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#4a3628] text-white font-semibold text-lg flex items-center justify-center rounded-full shadow-inner">
                      {getInitials(user.fullname, user.surname)}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#4a3628] hover:text-[#6b4f37] transition">
                        {user.username || `${user.fullname} ${user.surname}`}
                      </h2>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <BadgeCheck size={22} className="text-green-600" title="Verified" />
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm text-[#4a3628]">
                  <BookOpen size={18} className="text-[#4a3628]" />
                  <span
                    className={`font-medium ${
                      user.issuedCount === 0 ? "text-red-600" : "text-[#4a3628]"
                    }`}
                  >
                    {user.issuedCount} {user.issuedCount === 1 ? "Book" : "Books"} Issued
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
