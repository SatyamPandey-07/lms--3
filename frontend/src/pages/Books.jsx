import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { motion } from "framer-motion";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/books");
      setBooks(res.data.books || []);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0d1117] text-white font-['Oxygen']">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white">
  📚📖 <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
    Explore Our Book Collection
  </span>
</h1>


      {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 bg-[#161b22] border border-gray-700 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-400">No books available.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#161b22]/70 backdrop-blur-lg border border-purple-700/30 rounded-2xl shadow-lg hover:shadow-purple-500/40 transition-all transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              <img
                src={`http://localhost:4300/${book.image}`}
                alt={book.title}
                className="h-52 w-full object-cover border-b border-purple-800/30"
              />
              <div className="p-5">
                <h2 className="text-2xl font-bold text-purple-400">{book.title}</h2>
                <p className="text-sm text-gray-400 mt-1">👤 {book.author}</p>
                <p className="mt-3 text-sm text-gray-300 line-clamp-3">{book.description}</p>
                <p className="mt-4 text-sm font-semibold text-white">
                  Quantity:{" "}
                  <span className={book.quantity > 0 ? "text-green-400" : "text-red-500"}>
                    {book.quantity > 0 ? book.quantity : "Out of Stock"}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
