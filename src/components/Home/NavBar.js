import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const Navbar = () => {
  const user = auth.currentUser;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Giggle Resort</div>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-500">About</Link></li>
          <li><Link to="/luxurious-room" className="hover:text-gray-500">Luxurious Room</Link></li>
          <li><Link to="/rooms" className="hover:text-gray-500">Rooms</Link></li>
          <li><Link to="/services" className="hover:text-gray-500">Services</Link></li>
          <li><Link to="/pricing" className="hover:text-gray-500">Pricing</Link></li>
          {user && <li><Link to="/profile" className="hover:text-gray-500">Profile</Link></li>}
          {!user ? (
            <li><Link to="/login" className="hover:text-gray-500">Login</Link></li>
          ) : (
            <li><Link to="/home" className="hover:text-gray-500">Logout</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
