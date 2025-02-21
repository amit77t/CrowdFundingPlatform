import React from 'react';
import './pages.css';

function Login() {
  return (
    <div className="login page-container">
      <div className="auth-container">
        <div className="auth-tabs">
          <button className="auth-tab active">Login</button>
          <button className="auth-tab">Sign Up</button>
        </div>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <p className="auth-links">
            <a href="#forgot-password">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;