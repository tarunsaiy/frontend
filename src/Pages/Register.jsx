import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to register with these details?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, register!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await axios.post('https://studentbazaar-backend.onrender.com/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      await MySwal.fire({
        title: 'Registration Successful',
        text: 'You can now log in to your account.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/login'); 
    } catch (error) {
      await MySwal.fire({
        title: 'Registration Failed',
        text: error.response?.data || 'An error occurred during registration.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

      setError(error.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-2xl p-8 border border-yellow-500">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">Create Your Account</h1>

        {error && (
          <p className="text-red-400 bg-red-900/40 text-sm text-center px-3 py-2 rounded mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 bg-green-900/40 text-sm text-center px-3 py-2 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-yellow-300">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-yellow-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-yellow-300">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-yellow-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-yellow-300">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-yellow-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-yellow-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-yellow-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?
          <Link to="/login" className="text-yellow-400 font-semibold ml-1 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
