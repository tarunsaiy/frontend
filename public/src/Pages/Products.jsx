import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink, Search } from 'lucide-react';
import { Store } from '../App';

const Products = () => {
  const { usertoken } = useContext(Store);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const authToken = usertoken || localStorage.getItem("usertoken");

  const fetchProducts = async (searchTerm = '') => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://studentbazaar-backend.onrender.com/products${searchTerm ? `?name=${searchTerm}` : ''}`,
        { headers: { Authorization: authToken } }
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [authToken, navigate]);

  const handleSearch = () => fetchProducts(search.trim());

  const truncateDescription = (text, maxLength = 100) =>
    !text ? "No description available" :
      text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <PacmanLoader color="#facc15" size={30} speedMultiplier={1.5} loading={true} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 font-sans text-gray-100 relative overflow-hidden">
      {/* 🔍 Search Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition flex items-center gap-1"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      {/* 📦 Product list */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <div className="text-center col-span-full mt-10">
            <AlertCircle className="mx-auto text-yellow-500 mb-2" size={32} />
            <p className="text-lg text-yellow-400 font-semibold">No products found.</p>
          </div>
        ) : (
          products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-xl shadow-md p-4 hover:shadow-yellow-500/30 hover:scale-[1.02] transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-yellow-300 break-words">{product.name}</h3>
                <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded-lg">
                  ₹{product.price}
                </span>
              </div>

              <p className="text-sm text-gray-400">{truncateDescription(product.description)}</p>

              {product.googledrivelink && (
                <a
                  href={product.googledrivelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-400 text-sm hover:underline"
                >
                  <ExternalLink size={14} className="mr-1" />
                  View Images
                </a>
              )}

              <div className="text-sm text-gray-300 space-y-1 pt-2">
                <p><span className="font-medium text-yellow-300">Roll No:</span> {product.rollno}</p>
                <p><span className="font-medium text-yellow-300">College:</span> {product.collegename}</p>
                <p><span className="font-medium text-yellow-300">Department:</span> {product.dept}</p>
                <p><span className="font-medium text-yellow-300">Phone No:</span> {product.phoneno}</p>
                <p><span className="font-medium text-yellow-300">Seller Email:</span> {product.email}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
