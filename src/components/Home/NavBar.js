import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/home'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Giggle Resort</div>
        <div className="md:hidden">
          {/* Mobile Menu Button */}
          <button className="text-gray-500 focus:outline-none focus:text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-500">
              About
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/profile" className="hover:text-gray-500">
                Profile
              </Link>
            </li>
          )}
          {!user ? (
            <li>
              <Link to="/login" className="hover:text-gray-500">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-500 focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <Link to="/" className="hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-500">
              About
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/profile" className="hover:text-gray-500">
                Profile
              </Link>
            </li>
          )}
          {!user ? (
            <li>
              <Link to="/login" className="hover:text-gray-500">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-500 focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
