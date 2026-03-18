import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ usn: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usn: credentials.usn.trim(),
          password: credentials.password.trim()
        })
      });

      // Check if the server actually responded with a 200 OK
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Server Error: ${errorData.detail || "Login failed"}`);
        return;
      }

      const data = await res.json();
      console.log("Backend Response:", data);

      if (data.status === "success") {
        // Ensure student_id is present before moving forward
        if (data.student_id) {
          localStorage.setItem("student_id", data.student_id);
          navigate("/student/dashboard");
        } else {
          alert("Login successful but no Student ID received.");
        }
      } else {
        // Fallback for if 'message' is missing in the backend response
        alert(data.message || "Invalid USN or Password (Backend error)");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Cannot connect to the server. Please check your internet or if the backend is running.");
    }
  };

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