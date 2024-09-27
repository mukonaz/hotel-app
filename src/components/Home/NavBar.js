import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

const NavBar = () => {
  const user = auth.currentUser;

  return (
    <nav style={navBarStyle}>
      <h1>Giggle Resort</h1>
      <ul style={navListStyle}>
        <li><Link to="/">Home</Link></li>
        {user && <li><Link to="/profile">Profile</Link></li>}
        {!user ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><Link to="/login">Logout</Link></li>
        )}
      </ul>
    </nav>
  );
};

const navBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
};

const navListStyle = {
  listStyleType: 'none',
  display: 'flex',
  gap: '20px',
};

export default NavBar;
