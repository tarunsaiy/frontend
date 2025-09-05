import React, { useState, useEffect } from 'react';
import { ShoppingCart, Mail, MessageCircle, Upload, UserPlus, Zap } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from "../App"

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(Store);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Floating animation keyframes
  const floatingAnimation = {
    animation: 'float 6s ease-in-out infinite'
  };

  const floatingAnimationDelay = {
    animation: 'float 6s ease-in-out infinite 2s'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 relative overflow-hidden text-yellow-200">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .morph-blob {
          animation: morphBlob 8s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full morph-blob"
          style={floatingAnimation}
        ></div>
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-yellow-400/15 to-amber-500/15 rounded-full morph-blob"
          style={floatingAnimationDelay}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-bl from-yellow-600/10 to-orange-600/10 rounded-full morph-blob"
          style={{...floatingAnimation, animationDelay: '4s'}}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className={`text-center max-w-6xl mx-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-6 leading-tight">
              Empower Students to Earn
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              <ShoppingCart className="w-8 h-8 text-yellow-400 animate-bounce" />
              <div className="h-1 w-16 bg-gradient-to-r from-yellow-600 to-amber-500 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-200 mb-8">
              Buy, Sell & Connect Seamlessly
            </h2>
          </div>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-yellow-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            List your unused items, earn cash, and connect with buyers directly via Email or WhatsApp.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => token ? navigate("/sellproduct") : navigate("/register")} 
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-yellow-900/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <UserPlus className="w-6 h-6 group-hover:animate-pulse" />
              Register & Sell
            </button>
            <button 
              onClick={() => token ? navigate("/mylistings") : navigate("/register")} 
              className="group bg-gray-800 hover:bg-gray-700 text-yellow-300 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border-2 border-yellow-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
              Browse Listings
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className={`grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
          {/* Feature 1 */}
          <div className="group bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-yellow-800/40 transform hover:scale-105 transition-all duration-500 border border-yellow-600/30">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Easy Registration</h3>
            <p className="text-yellow-100 leading-relaxed">
              Sign up in seconds with your student email. Simple, fast, and secure registration process designed for students.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-yellow-800/40 transform hover:scale-105 transition-all duration-500 border border-yellow-600/30">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
              <Upload className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Upload Product Instantly</h3>
            <p className="text-yellow-100 leading-relaxed">
              Upload photos, add descriptions, and set your price. Your products go live instantly for other students to discover.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-yellow-800/40 transform hover:scale-105 transition-all duration-500 border border-yellow-600/30">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-black" />
                <MessageCircle className="w-4 h-4 text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Contact via Email or WhatsApp</h3>
            <p className="text-yellow-100 leading-relaxed">
              Connect directly with buyers through email or WhatsApp. No middleman, just direct student-to-student communication.
            </p>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-20 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <Zap className="w-16 h-16 text-black mx-auto mb-6 animate-pulse" />
            <h3 className="text-4xl font-bold text-black mb-4">Ready to Start Earning?</h3>
            <p className="text-xl text-black/80 mb-8">Join thousands of students already making money from their unused items</p>
            <button
              onClick={() => token ? navigate("/products") : navigate("/register")} 
              className="bg-black text-yellow-400 px-12 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-yellow-900/50 transform hover:scale-105 transition-all duration-300 hover:bg-gray-900">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
