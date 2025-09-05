import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, User, Home, LogIn, UserPlus, LogOut,
  PackagePlus, List, Eye, ShoppingBag
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Store } from '../App';

const Navbar = () => {
  const { usertoken, admintoken, setadminToken, setuserToken } = useContext(Store);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const authUserToken = usertoken || localStorage.getItem("usertoken");
  const authAdminToken = admintoken || localStorage.getItem("admintoken");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutUser = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout as a User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;
    setuserToken(null);
    setadminToken(null);
    localStorage.removeItem("usertoken");
    localStorage.removeItem("admintoken");
    navigate("/login");
    MySwal.fire({
      icon: 'success',
      title: 'Logged out!',
      text: 'You have successfully logged out as a user.',
    });
    setIsMobileMenuOpen(false);
  };

  const logoutAdmin = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout as an Admin?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;
    setuserToken(null);
    setadminToken(null);
    localStorage.removeItem("admintoken");
    localStorage.removeItem("usertoken");
    navigate("/admin_login");
    MySwal.fire({
      icon: 'success',
      title: 'Logged out!',
      text: 'You have successfully logged out as an admin.',
    });
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, children, onClick, className = "" }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
          active
            ? 'bg-yellow-500 text-black shadow-lg'
            : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
        } ${className}`}
      >
        <Icon size={18} className={`${active ? 'animate-pulse' : 'group-hover:rotate-12'} transition-transform duration-300`} />
        <span>{children}</span>
      </Link>
    );
  };

  const MobileNavLink = ({ to, icon: Icon, children, onClick }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
          active
            ? 'bg-yellow-500 text-black shadow-lg'
            : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
        }`}
      >
        <Icon size={20} className={`${active ? 'animate-bounce' : 'group-hover:scale-110'} transition-transform duration-300`} />
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-yellow-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px] py-2">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-7 h-7 text-black group-hover:rotate-12 transition-transform" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-yellow-400">StudentStore</span>
              <span className="text-xs text-gray-400 font-medium -mt-1">Buy Smart - Sell Easy</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {(authUserToken || (!authUserToken && !authAdminToken)) && (
              <NavLink to="/" icon={Home}>Home</NavLink>
            )}

            {authUserToken && (
              <>
                <NavLink to="/sellproduct" icon={PackagePlus}>Sell Product</NavLink>
                <NavLink to="/mylistings" icon={List}>My Listings</NavLink>
                <NavLink to="/products" icon={Eye}>Browse Products</NavLink>
                <NavLink to="/profile" icon={User}>Profile</NavLink>
                <button
                  onClick={logoutUser}
                  className="group flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-xl ml-2"
                >
                  <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {authAdminToken && (
              <>
                <NavLink to="/pendingproducts" icon={List}>Pending Products</NavLink>
                <NavLink to="/admin_profile" icon={User}>Admin Profile</NavLink>
                <button
                  onClick={logoutAdmin}
                  className="group flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-xl ml-2"
                >
                  <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!authUserToken && !authAdminToken && (
              <>
                <NavLink to="/login" icon={LogIn}>User-Login</NavLink>
                <NavLink to="/admin_login" icon={LogIn}>Admin-Login</NavLink>
                <Link to="/register" className="group flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-xl ml-2">
                  <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-transform">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-4 pb-6 space-y-3 bg-gray-800 border-t border-yellow-500">
          {(authUserToken || (!authUserToken && !authAdminToken)) && (
            <MobileNavLink to="/" icon={Home} onClick={toggleMobileMenu}>Home</MobileNavLink>
          )}

          {authUserToken && (
            <>
              <MobileNavLink to="/sellproduct" icon={PackagePlus} onClick={toggleMobileMenu}>Sell Product</MobileNavLink>
              <MobileNavLink to="/mylistings" icon={List} onClick={toggleMobileMenu}>My Listings</MobileNavLink>
              <MobileNavLink to="/products" icon={Eye} onClick={toggleMobileMenu}>Browse Products</MobileNavLink>
              <MobileNavLink to="/profile" icon={User} onClick={toggleMobileMenu}>Profile</MobileNavLink>
              <button onClick={logoutUser} className="w-full text-left flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}

          {authAdminToken && (
            <>
              <MobileNavLink to="/pendingproducts" icon={List} onClick={toggleMobileMenu}>Pending Products</MobileNavLink>
              <MobileNavLink to="/admin_profile" icon={User} onClick={toggleMobileMenu}>Admin Profile</MobileNavLink>
              <button onClick={logoutAdmin} className="w-full text-left flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}

          {!authUserToken && !authAdminToken && (
            <>
              <MobileNavLink to="/login" icon={LogIn} onClick={toggleMobileMenu}>User-Login</MobileNavLink>
              <MobileNavLink to="/admin_login" icon={LogIn} onClick={toggleMobileMenu}>Admin-Login</MobileNavLink>
              <Link to="/register" onClick={toggleMobileMenu} className="w-full flex items-center space-x-3 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl font-medium">
                <UserPlus size={20} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
