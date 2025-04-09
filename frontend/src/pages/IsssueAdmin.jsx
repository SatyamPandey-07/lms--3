import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { motion, AnimatePresence } from "framer-motion";

const IssueAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:4300/api/v1/users/rentals/pending");
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:4300/api/v1/users/rentals/update-status/${id}`, {
        status: newStatus,
      });
      fetchRequests();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const getNextStatus = (current) => {
    if (current === "pending") return "approved";
    if (current === "approved") return "collected";
    return "done";
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10 font-['Oxygen']">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#f0f6fc]">
        📚 Pending Book Requests
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <motion.div
              key={req._id}
              className="bg-[#161b22] shadow-md rounded-xl p-5 border border-[#30363d]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-2">
                📖 Book: <span className="text-[#58a6ff]">{req.book?.title || "Unknown"}</span>
              </h2>
              <p className="text-gray-300 mb-1">👤 User: {req.user?.fullname || "Unknown"}</p>
              <p className="text-gray-400 mb-3">
                Status: <span className="font-bold text-white">{req.status}</span>
              </p>

              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-3 py-1 text-sm rounded bg-[#238636] hover:bg-[#2ea043] text-white"
                  onClick={() => setSelectedUser(req.user)}
                >
                  View User
                </button>
                <button
                  className="px-3 py-1 text-sm rounded bg-[#8957e5] hover:bg-[#a371f7] text-white"
                  onClick={() => setSelectedBook(req.book)}
                >
                  View Book
                </button>
                <button
                  className="px-3 py-1 text-sm rounded bg-[#1f6feb] hover:bg-[#388bfd] text-white"
                  disabled={req.status === "collected"}
                  onClick={() => updateStatus(req._id, getNextStatus(req.status))}
                >
                  {req.status === "pending"
                    ? "✅ Approve"
                    : req.status === "approved"
                    ? "📦 Mark as Collected"
                    : "✅ Done"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* User Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.dialog
            className="modal modal-open"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="modal-box bg-[#161b22] text-white border border-[#30363d] font-['Oxygen']">
              <h3 className="font-bold text-lg">👤 User Details</h3>
              <p><strong>Name:</strong> {selectedUser.fullname} {selectedUser.surname}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <img
                src={`http://localhost:4300/${selectedUser.idCardImage.replace(/\\/g, "/")}`}
                alt="ID Card"
                className="mt-4 rounded shadow w-full max-w-xs mx-auto border border-[#30363d]"
              />
              <div className="modal-action">
                <button
                  className="btn bg-[#21262d] hover:bg-[#30363d] text-white"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>

      {/* Book Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.dialog
            className="modal modal-open"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="modal-box bg-[#161b22] text-white border border-[#30363d] font-['Oxygen']">
              <h3 className="font-bold text-lg">📖 Book Details</h3>
              <p><strong>Title:</strong> {selectedBook.title}</p>
              <p><strong>Author:</strong> {selectedBook.author}</p>
              <p><strong>Description:</strong> {selectedBook.description}</p>
              <img
                src={`http://localhost:4300${selectedBook.imageUrl}`}
                alt="Book Cover"
                className="mt-4 rounded shadow w-full max-w-xs mx-auto border border-[#30363d]"
              />
              <div className="modal-action">
                <button
                  className="btn bg-[#21262d] hover:bg-[#30363d] text-white"
                  onClick={() => setSelectedBook(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IssueAdmin;
