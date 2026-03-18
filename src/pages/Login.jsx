import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
      <h2>Student Login</h2>
      <input type="text" placeholder="Enter USN" className="login-input" />
      <input type="password" placeholder="Enter Password" style={{ marginTop: '10px' }} className="login-input" />
      <button className="btn-login" style={{ backgroundColor: '#ff4b5c', marginTop: '20px' }}>Login</button>
      
      <p style={{ marginTop: '20px' }}>
        Don't have account? <Link to="/register" style={{ color: '#ff4b5c' }}>Register</Link>
      </p>
    </div>
  );
};
export default Login;