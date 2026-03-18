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
        body: JSON.stringify(credentials)
      });
      const data = await res.json();

      if (data.status === "success") {
        // CRITICAL: Save student_id so the report page knows who you are
        localStorage.setItem("student_id", data.student_id);
        navigate("/student/dashboard");
      } else {
        alert(data.message || "Invalid USN or Password");
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

// Styles to match your 7th image
const containerStyle = { textAlign: 'center', color: 'white', padding: '80px 20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const formCard = { background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', width: '100%', maxWidth: '400px' };
const inputStyle = { width: '100%', padding: '15px', margin: '10px 0', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', outline: 'none' };
const btnStyle = { width: '100%', padding: '15px', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' };

export default Login;