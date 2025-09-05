import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from '../App';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SellProduct = () => {
  const { usertoken } = useContext(Store);
  const token = usertoken || localStorage.getItem("usertoken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rollno: '',
    collegename: '',
    googledrivelink: '',
    description: '',
    dept: '',
    phoneno: ''
  });

  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Please Login to Sell Products
          </h2>
          <Link to="/login" className="text-yellow-500 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit this product?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await axios.post('https://studentbazaar-backend.onrender.com/sellproduct', formData, {
        headers: {
          Authorization: token
        }
      });
      if (res.status === 201) {
        await MySwal.fire({
          icon: 'success',
          title: 'Posted!',
          text: 'Product posted successfully!',
        });
        navigate('/mylistings');
      }
    } catch (err) {
      await MySwal.fire({
        icon: 'error',
        title: 'Oops!',
        text:
          typeof err.response?.data === 'string'
            ? err.response.data
            : err.response?.data?.message || 'Failed to add product',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-900 p-8 rounded-lg shadow-lg space-y-5 text-yellow-400"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Sell Your Product
        </h2>

        {[
          { name: "name", type: "text", placeholder: "Enter product name", label: "Product Name" },
          { name: "price", type: "number", placeholder: "Enter price", label: "Price" },
          { name: "rollno", type: "text", placeholder: "Enter your roll number", label: "Roll Number" },
          { name: "collegename", type: "text", placeholder: "Enter your college name", label: "College Name" },
          { name: "googledrivelink", type: "url", placeholder: "Enter drive link of the Product images", label: "Google Drive Link" },
          { name: "dept", type: "text", placeholder: "Enter your department", label: "Department" },
          { name: "phoneno", type: "tel", placeholder: "Enter your phone number", label: "Phone Number" },
        ].map(({ name, type, placeholder, label }) => (
          <div key={name}>
            <label className="block mb-1 font-medium text-yellow-300" htmlFor={name}>{label}</label>
            <input
              name={name}
              id={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full border border-yellow-500 bg-black text-yellow-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium text-yellow-300" htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            required
            className="w-full border border-yellow-500 bg-black text-yellow-400 px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-400 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-200"
        >
          {loading ? 'Posting...' : 'Post Product'}
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
