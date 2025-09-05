import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PacmanLoader } from 'react-spinners';
import { Store } from "../App";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MyListings = () => {
  const MySwal = withReactContent(Swal);
  const { usertoken } = useContext(Store);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();
  const [pswd, setpswd] = useState("");

  useEffect(() => {
    const authToken = usertoken || localStorage.getItem("usertoken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    axios.get("https://studentbazaar-backend.onrender.com/mylistings", {
      headers: { Authorization: authToken },
    })
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          Swal.fire("Error", "Failed to fetch listings.", "error");
        }
      });
  }, [usertoken, navigate]);

  const handleDelete = async (productId) => {
    const result = await MySwal.fire({
      title: "Confirm Deletion",
      text: "Enter your password to confirm deletion",
      input: "password",
      inputPlaceholder: "Enter your password",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) return "Password is required!";
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const password = result.value;
    setpswd(password);
    setDeleteLoading(productId);

    try {
      const authToken = usertoken || localStorage.getItem("usertoken");

      const res = await axios.delete(
        `https://studentbazaar-backend.onrender.com/mylistings/deleteproduct/${productId}`,
        {
          data: { password },
          headers: { Authorization: authToken },
        }
      );
      Swal.fire("Deleted!", res.data.message, "success");
      setListings((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      if (err.response?.status === 401) {
        Swal.fire("Failed", "Invalid password. Deletion failed.", "error");
      } else {
        Swal.fire("Error", "Error deleting product.", "error");
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <PacmanLoader color="#facc15" size={30} speedMultiplier={1.5} loading={true} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-4">
            My Listings
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Manage your products with ease. Update details, track performance, or remove listings as needed.
          </p>
          
          <div className="flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 bg-gray-800 rounded-full px-6 py-3 shadow-md border border-yellow-500"
            >
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-300 font-semibold text-lg">
                {listings.length} {listings.length === 1 ? "Product" : "Products"} Listed
              </span>
            </motion.div>
          </div>
        </motion.div>

        {listings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-16"
          >
            <div className="max-w-lg mx-auto bg-gray-800 rounded-2xl p-12 shadow-lg border border-yellow-500">
              <div className="text-6xl mb-6">📦</div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">No Products Listed Yet</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Start your selling journey by adding your first product. It's quick and easy!
              </p>
              <motion.button
                onClick={() => navigate("/sellproduct")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-600 transition-colors duration-200 shadow-lg"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Product
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8" 
            initial="hidden" 
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          >
            <AnimatePresence>
              {listings.map((product) => (
                <ListingCard
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  deleteLoading={deleteLoading === product._id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ListingCard = ({ product, onDelete, onUpdate, deleteLoading }) => {
  const {
    _id, name, price, rollno, collegename, dept, phoneno,
    email, description, googledrivelink, approved_string,
  } = product;

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-700 text-green-200 border-green-600";
      case "Rejected":
        return "bg-red-700 text-red-200 border-red-600";
      default:
        return "bg-yellow-700 text-yellow-200 border-yellow-500";
    }
  };

  return (
    <motion.div
      layout
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="bg-gray-900 p-6 border-b border-gray-700">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-yellow-400 mb-2 line-clamp-2">
            {name}
          </h3>
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-sm ml-3 shrink-0">
            ₹{price}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-6">
          <InfoRow icon="🎓" label="Roll No" value={rollno} />
          <InfoRow icon="🏛️" label="College" value={collegename} />
          <InfoRow icon="📚" label="Department" value={dept} />
          <InfoRow icon="📞" label="Phone" value={phoneno} />
          <InfoRow icon="✉️" label="Email" value={email} />
        </div>

        {approved_string && (
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(approved_string)}`}>
              {approved_string}
            </span>
          </div>
        )}

        {description && (
          <div className="mb-6 bg-gray-900 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">{description}</p>
          </div>
        )}

        {googledrivelink && (
          <motion.a 
            href={googledrivelink} 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center text-sm text-yellow-400 hover:text-yellow-300 font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Images
          </motion.a>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <motion.button
            onClick={() => onUpdate(_id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-yellow-600 shadow-md"
          >
            Update
          </motion.button>
          <motion.button
            onClick={() => onDelete(_id)}
            disabled={deleteLoading}
            whileHover={{ scale: deleteLoading ? 1 : 1.05 }}
            whileTap={{ scale: deleteLoading ? 1 : 0.95 }}
            className="flex-1 bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 hover:bg-red-700 shadow-md"
          >
            {deleteLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ icon, label, value }) => {
  if (!value || value === "N/A") return null;
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-lg">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="text-gray-400 font-medium">{label}:</span>{" "}
        <span className="text-yellow-300 break-words font-semibold">{value}</span>
      </div>
    </div>
  );
};

export default MyListings;
