import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../App';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PacmanLoader } from 'react-spinners';
import {
  ShoppingCart,
  Mail,
  Phone,
  Shield,
  User,
  TrendingUp,
  AlertCircle,
  LogOut,
  Settings
} from 'lucide-react';

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const { usertoken, setuserToken } = useContext(Store);
  const authToken = usertoken || localStorage.getItem("usertoken");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) return navigate('/login');

    fetch('https://studentbazaar-backend.onrender.com/profile', {
      headers: { Authorization: authToken }
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Profile fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [authToken, navigate]);

  const handleLogout = async () => {
    let result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    MySwal.fire({
      icon: 'success',
      title: 'Logged out!',
      text: 'You have successfully logged out.'
    });

    setuserToken(null);
    localStorage.removeItem("usertoken");
    navigate('/login');
  };

  const userGuideSteps = [
    { step: 1, title: '📝 Register Yourself', description: 'Sign up with your name, email, and password to start using the platform.', icon: User },
    { step: 2, title: '🔐 Login', description: 'Log into your account to access your profile and manage products.', icon: Shield },
    { step: 3, title: '🛒 Sell Product', description: 'Click "Sell a Product" and enter product details.', icon: ShoppingCart },
    { step: 4, title: '🧾 Manage Products', description: 'View, update, or delete your products anytime.', icon: Settings },
    { step: 5, title: "🌍 Browse Products", description: 'See what other students are selling.', icon: TrendingUp },
    { step: 6, title: '📞 Contact Sellers', description: "Use email or phone to reach sellers directly.", icon: Phone }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <PacmanLoader color="#facc15" size={30} speedMultiplier={1.5} loading={true} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Title */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">
            Student Marketplace
          </h1>
          <p className="text-lg text-yellow-200">
            Your trusted campus community for buying and selling student essentials
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div className="bg-red-900/50 border border-red-500 text-red-300 rounded-lg p-4 mb-6 flex items-center justify-center max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Profile Info & Guide */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="bg-zinc-900 shadow-lg rounded-3xl p-8 mb-8 border border-yellow-600/30">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black text-2xl font-bold">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{userData?.name || 'Student User'}</h2>
                  <p className="flex items-center text-yellow-300">
                    <Mail className="w-4 h-4 mr-2" />
                    {userData?.email || 'student@university.edu'}
                  </p>
                </div>
              </div>
            </div>

            {/* Guide Steps */}
            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-400">📘 How to Use This Platform</h3>
            <div className="space-y-6">
              {userGuideSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div key={index} className="flex items-start space-x-4 p-6 bg-zinc-800 rounded-2xl shadow-md border border-yellow-700 hover:shadow-yellow-500/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }}>
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-1">{step.title}</h4>
                      <p className="text-yellow-200">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.div className="flex justify-center mb-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button onClick={handleLogout} className="flex items-center px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full shadow-lg font-semibold transform hover:scale-105 transition-all">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </motion.div>

          {/* Note */}
          <motion.div className="p-6 bg-zinc-800 border-l-4 border-yellow-400 rounded-lg shadow-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center mb-3">
              <AlertCircle className="text-yellow-400 w-6 h-6 mr-3" />
              <h4 className="text-lg font-semibold text-yellow-300">⚠️ Important Note</h4>
            </div>
            <p className="text-yellow-200">
              Please delete your product <strong>once someone agrees to buy it</strong> to avoid confusion among other buyers.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
