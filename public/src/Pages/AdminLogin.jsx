import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../App';
import Swal from 'sweetalert2';

const AdminLogin = () => {
  const { setadminToken, setuserToken, admintoken } = useContext(Store);
  const navigate = useNavigate();
  const [ud, setUd] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const p = admintoken || localStorage.getItem("admintoken");

  useEffect(() => {
    if (p) {
      navigate('/admin_profile');
    }
  }, [p, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUd((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    try {
      const response = await axios.post('https://backend-7ux5.onrender.com/admin_login', ud);
      const token = response.data.token;

      if (!token) throw new Error('Invalid token from server');

      setadminToken(token);
      localStorage.setItem('admintoken', token);
      setuserToken(null);
      localStorage.removeItem('usertoken');

      await Swal.fire({
        title: '✅ Login Successful',
        text: 'Welcome Admin!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/admin_profile');
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: '❌ Login Failed',
        text: error.response?.data || 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-yellow-500/40">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-yellow-400 drop-shadow-lg">
          ⚡ Admin Login ⚡
        </h2>

        {errorMsg && (
          <div className="bg-red-900/60 text-red-400 border border-red-500/40 p-3 mb-4 rounded-lg text-sm text-center shadow-md">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-900/60 text-green-400 border border-green-500/40 p-3 mb-4 rounded-lg text-sm text-center shadow-md">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-yellow-400">📧 Email</label>
            <input
              type="email"
              name="email"
              value={ud.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-yellow-400">🔑 Password</label>
            <input
              type="password"
              name="password"
              value={ud.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
              disabled={loading}
            />
          </div>

          <div className="flex justify-between text-sm font-medium text-yellow-400">
            <Link to="/updatepassword" className="hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300"
            disabled={loading}
          >
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Not an Admin?
          <Link to="/login" className="text-yellow-400 font-semibold ml-1 hover:underline">
            Login as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
