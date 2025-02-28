import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Investify</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/explore" className="nav-link">Explore</Link>
        <Link to="/start-campaign" className="nav-link">Start a Campaign</Link>
        <Link to="/community" className="nav-link">Community</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        
        {user ? (
          <div className="user-menu">
            <span className="user-name">Hello, {user.name}</span>
            <div className="dropdown-menu">
              <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="nav-link login">Login / Signup</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;