import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError("⚠️ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        'https://backend-7ux5.onrender.com/updatepassword',
        { email, password: newPassword }
      );

      setMessage(response.data || '✅ Password updated successfully!');
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data || '❌ Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="max-w-md w-full mt-10 p-6 bg-gray-800 shadow-lg rounded-2xl border border-yellow-400"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4 text-yellow-400">
          🔑 Reset Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your email and new password
        </p>

        {error && (
          <div className="text-red-500 bg-red-100 px-3 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="text-green-500 bg-green-100 px-3 py-2 rounded mb-4 text-sm text-center">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-yellow-400 mb-1">
            📧 Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-semibold text-yellow-400 mb-1">
            🔒 New Password
          </label>
          <input
            type="password"
            id="newPassword"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-yellow-400 mb-1">
            ✅ Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          {loading ? '⏳ Updating...' : '🚀 Update Password'}
        </button>

        <div className="text-center mt-4 text-sm text-gray-400">
          Remembered your password?
          <Link to="/login" className="text-yellow-400 font-semibold hover:underline ml-1">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
