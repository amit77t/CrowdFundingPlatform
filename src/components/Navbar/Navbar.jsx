import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Navbar.css';

function Navbar() {
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
        <Link to="/login" className="nav-link login">Login / Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;