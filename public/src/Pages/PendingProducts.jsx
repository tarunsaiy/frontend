import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PacmanLoader } from 'react-spinners';

const PendingProducts = () => {
  const MySwal = withReactContent(Swal);
  const { admintoken } = useContext(Store);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingProductId, setLoadingProductId] = useState(null);
  const [actionType, setActionType] = useState(""); // "approve" or "reject"

  const token = admintoken || localStorage.getItem("admintoken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin_login";
      return;
    }
    fetchPendingProducts();
  }, [token]);

  const fetchPendingProducts = async () => {
    try {
      const { data } = await axios.get("https://studentbazaar-backend.onrender.com/productstobeapproved", {
        headers: { Authorization: token }
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      await MySwal.fire({
        icon: 'error',
        title: 'Error Loading Products',
        text: 'Unable to fetch pending products. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const approveProduct = async (id, email) => {
    const result = await MySwal.fire({
      title: "Approve Product",
      text: "Are you sure you want to approve this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel"
    });
    if (!result.isConfirmed) return;

    try {
      setLoadingProductId(id);
      setActionType("approve");
      await axios.put(`https://studentbazaar-backend.onrender.com/approveproduct/${id}`, { email }, {
        headers: { Authorization: token }
      });

      await MySwal.fire({
        icon: 'success',
        title: 'Product approved successfully!',
        timer: 1500,
        showConfirmButton: false
      });

      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error("Approve failed:", error);
      await MySwal.fire({
        icon: 'error',
        title: 'Approval Failed',
        text: 'Something went wrong while approving the product.'
      });
    } finally {
      setLoadingProductId(null);
      setActionType("");
    }
  };

  const rejectProduct = async (id, email) => {
    const result = await MySwal.fire({
      title: "Reject Product",
      text: "Are you sure you want to reject this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel"
    });
    if (!result.isConfirmed) return;

    try {
      setLoadingProductId(id);
      setActionType("reject");
      await axios.put(`https://studentbazaar-backend.onrender.com/rejectproduct/${id}`, { email }, {
        headers: { Authorization: token }
      });

      await MySwal.fire({
        icon: 'success',
        title: 'Product rejected successfully!',
        timer: 1500,
        showConfirmButton: false
      });

      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error("Reject failed:", error);
      await MySwal.fire({
        icon: 'error',
        title: 'Rejection Failed',
        text: 'Something went wrong while rejecting the product.'
      });
    } finally {
      setLoadingProductId(null);
      setActionType("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          Pending Products for Approval
        </h1>

        {loading ? (
          <div className="flex justify-center mt-20">
            <PacmanLoader color="#facc15" size={25} />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 text-lg font-medium">🎉 No pending products.</p>
        ) : (
          <div className="space-y-6">
            {products.map(product => (
              <div
                key={product._id}
                className="p-6 bg-gray-800 shadow-md rounded-xl border border-yellow-500 hover:shadow-lg transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-yellow-300 mb-2">{product.name}</h2>
                <div className="text-gray-300 text-sm space-y-1">
                  <p><strong className="text-yellow-400">Price:</strong> ₹{product.price}</p>
                  <p><strong className="text-yellow-400">Roll No:</strong> {product.rollno || "N/A"}</p>
                  <p><strong className="text-yellow-400">College Name:</strong> {product.collegename || "N/A"}</p>
                  <p><strong className="text-yellow-400">Department:</strong> {product.dept || "N/A"}</p>
                  <p><strong className="text-yellow-400">Phone No:</strong> {product.phoneno || "N/A"}</p>
                  <p><strong className="text-yellow-400">Description:</strong> {product.description || "N/A"}</p>
                  <p><strong className="text-yellow-400">Seller Email:</strong> {product.email}</p>
                  {product.googledrivelink && (
                    <p>
                      <strong className="text-yellow-400">Drive Link:</strong>{" "}
                      <a href={product.googledrivelink} className="text-yellow-300 hover:underline" target="_blank" rel="noopener noreferrer">
                        View Files
                      </a>
                    </p>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => approveProduct(product._id, product.email)}
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    disabled={loadingProductId === product._id}
                  >
                    {loadingProductId === product._id && actionType === "approve"
                      ? "Approving..."
                      : "Approve Product"}
                  </button>

                  <button
                    onClick={() => rejectProduct(product._id, product.email)}
                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    disabled={loadingProductId === product._id}
                  >
                    {loadingProductId === product._id && actionType === "reject"
                      ? "Rejecting..."
                      : "Reject Product"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingProducts;
