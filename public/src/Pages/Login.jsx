import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../App';
import Swal from 'sweetalert2';

const Login = () => {
  const { usertoken, setuserToken, setadminToken } = useContext(Store);
  const navigate = useNavigate();

  const [ud, setUd] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const p = usertoken || localStorage.getItem('usertoken');
  useEffect(() => {
    if (p) {
      navigate('/products');
    }
  }, [p, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUd((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://studentbazaar-backend.onrender.com/login', ud);
      const { token } = response.data;
      if (!token) throw new Error('Invalid response from server');

      setuserToken(token);
      localStorage.setItem('usertoken', token);

      setadminToken(null);
      localStorage.removeItem('admintoken');

      await Swal.fire({
        title: 'Login Successful',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonColor: '#facc15', // yellow-400
      });

      navigate('/products');
    } catch (error) {
      await Swal.fire({
        title: 'Login Failed',
        text: error.response?.data || 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonColor: '#facc15',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-yellow-500">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={ud.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={ud.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
              disabled={loading}
            />
          </div>

          <div className="flex justify-between text-sm text-yellow-400 font-medium">
            <Link to="/updatepassword" className="hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Don’t have an account?
          <Link to="/register" className="text-yellow-400 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </div>

        <div className="text-center mt-2 text-gray-400 text-sm">
          Are you an Admin?
          <Link to="/admin_login" className="text-yellow-400 font-semibold ml-1 hover:underline">
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
