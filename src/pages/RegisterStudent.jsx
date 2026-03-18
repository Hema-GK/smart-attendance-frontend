import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterStudent = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", usn: "", password: "", semester: "", section: "" });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied or not found");
    }
  };

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    // Ensure the URL matches the backend prefix exactly
    const res = await fetch("https://final-production-8aff.up.railway.app/students/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData) // Ensure formData has 'usn', 'password', etc.
    });

    const data = await res.json();
    
    if (data.status === "success") {
      alert("Registration Successful! Now you can login.");
      navigate("/student/login");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    alert("Could not connect to server");
  }
};

  return (
    <div style={containerStyle}>
      <div style={formCard}>
        <h2 style={{ marginBottom: '20px' }}>Student Registration</h2>
        <input placeholder="Name" style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input placeholder="USN" style={inputStyle} onChange={(e) => setFormData({...formData, usn: e.target.value})} />
        <input placeholder="Password" type="password" style={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <input placeholder="Semester (e.g. 5)" style={inputStyle} onChange={(e) => setFormData({...formData, semester: e.target.value})} />
        <input placeholder="Section" style={inputStyle} onChange={(e) => setFormData({...formData, section: e.target.value})} />
        
        <div style={camBox}>
          <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} />
        </div>

        <button onClick={startCamera} style={{...btnStyle, backgroundColor: '#555'}}>Start Camera</button>
        <button onClick={handleRegister} style={btnStyle}>Register Student</button>

        <p style={{ marginTop: '20px' }}>
          Already registered? <Link to="/student/login" style={{ color: '#ff4b5c', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const containerStyle = { textAlign: 'center', color: 'white', padding: '40px 20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center' };
const formCard = { background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', width: '100%', maxWidth: '450px' };
const camBox = { margin: '15px auto', width: '250px', height: '180px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden' };
const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', outline: 'none' };
const btnStyle = { width: '100%', padding: '12px', margin: '5px 0', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default RegisterStudent;