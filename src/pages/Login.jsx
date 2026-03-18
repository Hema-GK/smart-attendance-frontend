import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ usn: "", password: "" });

const handleLogin = async (e) => {
  e.preventDefault();
  
  // Debug: See what you are sending
  console.log("Sending to backend:", credentials);

  try {
    const res = await fetch("https://final-production-8aff.up.railway.app/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usn: credentials.usn.trim(), // Trim spaces here too
        password: credentials.password.trim()
      })
    });
    
    const data = await res.json();
    console.log("Backend response:", data); // Debug: See the actual error message

    if (data.status === "success") {
      localStorage.setItem("student_id", data.student_id);
      navigate("/student/dashboard");
    } else {
      // This will now show the specific error from the backend
      alert(data.message); 
    }
  } catch (err) {
    alert("Server is down or CORS error");
  }
};

  // --- MISSING RETURN BLOCK ADDED HERE ---
  return (
    <div style={containerStyle}>
      <div style={formCard}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Student Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Enter USN" 
            style={inputStyle} 
            required
            onChange={(e) => setCredentials({...credentials, usn: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Enter Password" 
            style={inputStyle} 
            required
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <button type="submit" style={btnStyle}>Login</button>
        </form>
        
        <p style={{ marginTop: '20px' }}>
          Don't have account? <Link to="/student/register" style={{ color: '#ff4b5c', fontWeight: 'bold' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = { textAlign: 'center', color: 'white', padding: '80px 20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const formCard = { background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', width: '100%', maxWidth: '400px' };
const inputStyle = { width: '100%', padding: '15px', margin: '10px 0', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', outline: 'none' };
const btnStyle = { width: '100%', padding: '15px', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' };

export default Login;