import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';
import { useNavigate } from 'react-router-dom';

const Admin_profile = () => {
  const { admintoken } = useContext(Store);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = admintoken || localStorage.getItem("admintoken");

    if (!token) {
      navigate("/admin_login");
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get('https://backend-7ux5.onrender.com/admin_profile', {
          headers: { Authorization: token },
        });
        setAdmin(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [admintoken, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-yellow-400 animate-pulse">
        🌙 Loading admin profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-bold text-lg bg-gray-800 px-4 py-2 rounded-lg shadow-md">
        {error}
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="text-center mt-10 text-yellow-400 font-semibold text-lg">
        ⚠️ No admin data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-10 max-w-md w-full border border-yellow-500">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">
          ✨ Admin Profile ✨
        </h2>
        <div className="space-y-5 text-gray-200 text-lg">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-400">👤 Name:</span>
            <span className="bg-gray-700 text-yellow-300 px-2 py-1 rounded-md">
              {admin.name || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-400">📧 Email:</span>
            <span className="bg-gray-700 text-yellow-300 px-2 py-1 rounded-md">
              {admin.email || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_profile;
