import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const RegisterStudent = () => {
  const videoRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => videoRef.current.srcObject = s);
  };

  return (
    <div className="reg-page" style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>Student Registration</h2>
      <input placeholder="Name" style={inputStyle} />
      <input placeholder="USN" style={inputStyle} />
      <input placeholder="Password" type="password" style={inputStyle} />
      <input placeholder="Semester (e.g. 5)" style={inputStyle} />
      <input placeholder="Section" style={inputStyle} />
      
      <div style={camBox}>
        <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} />
      </div>

      <button onClick={startCamera} style={btnStyle}>Start Camera</button>
      <button style={btnStyle}>Capture & Register</button>

      <p style={{ marginTop: '20px' }}>
        Already registered? <Link to="/student/login" style={{ color: '#ff4b5c' }}>Login</Link>
      </p>
    </div>
  );
};

const camBox = { margin: '20px auto', width: '300px', height: '200px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' };
const containerStyle = { textAlign: 'center', color: 'white', padding: '40px 20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
const inputStyle = { width: '85%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' };
const btnStyle = { width: '85%', padding: '12px', margin: '5px 0', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };

export default RegisterStudent;