// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api"; // Ensure api.js has the Railway URL

// export default function RegisterStudent() {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [name, setName] = useState("");
//   const [usn, setUsn] = useState("");
//   const [password, setPassword] = useState("");
//   const [className, setClassName] = useState("");
//   const [section, setSection] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       alert("Camera access denied");
//     }
//   };

//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);
//     const captured = canvas.toDataURL("image/jpeg", 0.4);
//     setImage(captured);
//     video.pause();
//   };

//   const registerStudent = async () => {
//     if (!image) {
//       alert("Please capture your face");
//       return;
//     }
//     setLoading(true);
//     try {
//       await API.post("/students/register", {
//         name,
//         usn,
//         password,
//         class_name: className,
//         section,
//         image,
//       });
//       alert("Student Registered Successfully ✅");
//       navigate("/student/login");
//     } catch (err) {
//       console.error(err);
//       alert("Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="card">
//       <h2>Student Registration</h2>
//       <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <input placeholder="Class" value={className} onChange={(e) => setClassName(e.target.value)} />
//       <input placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
//       <br />
//       <video ref={videoRef} autoPlay width="250" style={{ borderRadius: "10px", marginTop: "10px" }}></video>
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       <br />
//       <button className="btn" onClick={startCamera}>Start Camera</button>
//       <button className="btn" onClick={captureImage}>Capture Face</button>
//       <button className="btn register" onClick={registerStudent} disabled={loading}>
//         {loading ? "Registering..." : "Register"}
//       </button>
//       <p>
//         Already Registered?
//         <span style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }} onClick={() => navigate("/student/login")}>
//           Login
//         </span>
//       </p>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; // Ensure your API helper is correctly imported

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", usn: "", section: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration Successful! Please login.");
      navigate("/student/login"); // Redirects to Student Login
    } catch (err) {
      alert("Registration failed. USN might already exist.");
    }
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card" style={{ width: '400px', padding: '40px' }}>
        <h2 style={{ color: '#fff' }}>Student <span style={{ color: '#4facfe' }}>Registration</span></h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>Join the Smart Attendance network</p>

        <form onSubmit={handleRegister} style={formStyle}>
          <input type="text" placeholder="Full Name" style={inputStyle} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="text" placeholder="USN" style={inputStyle} required onChange={(e) => setFormData({ ...formData, usn: e.target.value })} />
          <input type="text" placeholder="Section (A, B, or C)" style={inputStyle} required onChange={(e) => setFormData({ ...formData, section: e.target.value })} />
          <input type="password" placeholder="Create Password" style={inputStyle} required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          
          <button type="submit" className="aesthetic-btn" style={studentBtn}>CREATE ACCOUNT</button>
        </form>

        <p style={{ marginTop: '20px', color: 'rgba(18, 3, 3, 0.6)', fontSize: '14px' }}>
          Already registered?{" "}
          <span onClick={() => navigate('/student/login')} style={{ color: '#4facfe', cursor: 'pointer', fontWeight: 'bold' }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

// Shared Styles (can be moved to a theme file later)
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)'};
const studentBtn = { width: '100%', padding: '14px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' };