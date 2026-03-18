import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container" style={containerStyle}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Student Login</h2>
      <input type="text" placeholder="Enter USN" style={inputStyle} />
      <input type="password" placeholder="Enter Password" style={inputStyle} />
      <button style={btnStyle}>Login</button>
      
      <p style={{ marginTop: '20px' }}>
        Don't have account? <Link to="/student/register" style={{ color: '#ff4b5c' }}>Register</Link>
      </p>
    </div>
  );
};

const containerStyle = { textAlign: 'center', color: 'white', padding: '80px 20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
const inputStyle = { width: '85%', padding: '15px', margin: '10px 0', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' };
const btnStyle = { width: '85%', padding: '15px', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };

export default Login;