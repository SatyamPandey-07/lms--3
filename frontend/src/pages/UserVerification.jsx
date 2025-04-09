import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4300/api/v1/users/fetch-notverified-users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleVerify = async (feesReceiptNo, email) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:4300/api/v1/users/verify-signed-up-user", {
        feesReceiptNo,
        email,
      });
      setUsers((prev) => prev.filter((user) => user.feesReceiptNo !== feesReceiptNo));
      setSelectedUser(null);
      toast.success("User verified successfully!");
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Verification failed. Please try again.");
    }
    setLoading(false);
  };

  const getInitials = (fullname = "", surname = "") => {
    return `${fullname.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#f5ede3] to-[#d8c2a9]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#4a3628]">
        User Verification
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-[#e9d9c5] text-[#4a3628] font-semibold text-xs sm:text-sm">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-[#fcf6f0] transition duration-200 text-xs sm:text-sm"
              >
                <td className="py-3 px-4">{user._id.slice(-6)}</td>
                <td className="py-3 px-4">{user.fullname} {user.surname}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="bg-[#6b4f37] text-white px-3 py-1 rounded hover:bg-[#4a3628] transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No users pending verification
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 w-[95%] max-w-md shadow-xl relative"
            >
              <h3 className="text-2xl font-bold mb-2 text-[#4a3628]">
                {selectedUser.fullname} {selectedUser.surname}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Receipt No:</strong> {selectedUser.feesReceiptNo}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-semibold">
                    Profile Image:
                  </p>
                  {selectedUser.profileImage ? (
                    <img
                      src={selectedUser.profileImage}
                      alt="Profile"
                      className="w-full rounded-md border hover:scale-105 transition-transform duration-200"
                      onError={(e) => (e.target.src = "/fallback-user.png")}
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-4xl font-bold text-white bg-[#4a3628] rounded-md">
                      {getInitials(selectedUser.fullname, selectedUser.surname)}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1 font-semibold">
                    ID Card Image:
                  </p>
                  {selectedUser.idCardImage ? (
                    <div className="max-h-52 overflow-auto border rounded-md">
                      <img
                        src={selectedUser.idCardImage}
                        alt="ID Card"
                        className="w-full object-contain hover:scale-105 transition-transform duration-200"
                        onError={(e) => (e.target.src = "/fallback-id.png")}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500 border p-4 rounded-md">
                      No ID card image uploaded.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    handleVerify(selectedUser.feesReceiptNo, selectedUser.email)
                  }
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? (
                    <span className="animate-pulse">Verifying...</span>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Verify
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                >
                  <XCircle size={18} />
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserVerification;
