import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import API from "../api/api";

export default function RegisterStudent() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    section: "",
    password: ""
  });

  const [image, setImage] = useState(null);

  const captureImage = () => {
    const img = webcamRef.current.getScreenshot();
    setImage(img);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please capture your face before registering.");
      return;
    }

    try {
      await API.post("/students/register", {
        ...formData,
        image: image
      });

      alert("Registration Successful! Please login.");
      navigate("/student/login");

    } catch (err) {
      alert("Registration failed. Face not clear or USN exists.");
    }
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card" style={{ width: '400px', padding: '40px' }}>
        
        <h2 style={{ color: '#fff' }}>
          Student <span style={{ color: '#4facfe' }}>Registration</span>
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>
          Join the Smart Attendance network
        </p>

        {/* 📸 CAMERA */}
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          {!image ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <button
                type="button"
                onClick={captureImage}
                className="aesthetic-btn"
                style={{ ...studentBtn, marginTop: "10px" }}
              >
                CAPTURE FACE
              </button>
            </>
          ) : (
            <>
              <img src={image} alt="captured" style={{ width: "100%", borderRadius: "10px" }} />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="aesthetic-btn"
                style={{ ...studentBtn, marginTop: "10px", background: "#ef4444" }}
              >
                RETAKE
              </button>
            </>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} style={formStyle}>
          <input type="text" placeholder="Full Name" style={inputStyle} required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

          <input type="text" placeholder="USN" style={inputStyle} required
            onChange={(e) => setFormData({ ...formData, usn: e.target.value })} />

          <input type="text" placeholder="Section (A, B, or C)" style={inputStyle} required
            onChange={(e) => setFormData({ ...formData, section: e.target.value })} />

          <input type="password" placeholder="Create Password" style={inputStyle} required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

          <button type="submit" className="aesthetic-btn" style={studentBtn}>
            CREATE ACCOUNT
          </button>
        </form>

        <p style={{ marginTop: '20px', color: 'rgba(18, 3, 3, 0.6)', fontSize: '14px' }}>
          Already registered?{" "}
          <span onClick={() => navigate('/student/login')}
            style={{ color: '#4facfe', cursor: 'pointer', fontWeight: 'bold' }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

// STYLES (unchanged)
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' };
const studentBtn = { width: '100%', padding: '14px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' };