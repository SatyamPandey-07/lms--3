import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { motion, AnimatePresence } from 'framer-motion';

const BooksUser = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4300/api/v1/users/books");
      setBooks(res.data || []);
      setFilteredBooks(res.data || []);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleIssue = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4300/api/v1/users/rentals/issue",
        { ISBN: selectedBook.ISBN },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("✅ Request sent! Status set to pending.");
      setSelectedBook(null);
    } catch (err) {
      console.error("Issue request failed", err);
      alert("❌ Something went wrong while issuing the book.");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = books.filter(
      book =>
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value)
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-[#0d1117] text-white min-h-screen font-['Oxygen']">
      <h2 className="text-3xl text-center font-bold mb-6 text-white">📚 Explore Available Books</h2>

      {/* Sexy Search Bar */}
      <div className="relative max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-5 py-3 rounded-full bg-[#161b22]/70 backdrop-blur border border-gray-600 focus:border-pink-500 text-white placeholder:text-gray-400 placeholder:italic shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1011 18a7.5 7.5 0 005.65-1.35z" />
          </svg>
        </div>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentBooks.map(book => (
          <div key={book._id} className="bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden shadow-lg">
            <img
              src={`http://localhost:4300/${book.image}`}
              alt={book.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-purple-400">{book.title}</h2>
              <p className="text-sm text-gray-400">{book.author}</p>
              <p className="mt-2 text-sm text-gray-300 line-clamp-2">{book.description}</p>
              <p className="mt-1 text-sm">Quantity: {book.quantity}</p>
              <p className="text-sm text-gray-400">ISBN: {book.ISBN}</p>
              <button
                onClick={() => setSelectedBook(book)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
              >
                View & Issue
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded border ${currentPage === index + 1 ? 'bg-purple-600 text-white' : 'bg-[#161b22] text-gray-400 border-gray-600'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal with Framer Motion */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#161b22] border border-gray-600 rounded-lg p-6 w-[90%] md:w-1/2 max-w-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-2 text-purple-400">{selectedBook.title}</h3>
              <img
                src={`http://localhost:4300/${selectedBook.image}`}
                alt={selectedBook.title}
                className="w-full h-60 object-cover rounded"
              />
              <p className="mt-4 text-gray-300">{selectedBook.description}</p>
              <p className="mt-2 text-sm text-gray-400">Author: {selectedBook.author}</p>
              <p className="text-sm text-gray-400">ISBN: {selectedBook.ISBN}</p>
              <p className="text-sm text-gray-400">Quantity: {selectedBook.quantity}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleIssue}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Issue Book"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BooksUser;
