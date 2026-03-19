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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

// --- STYLING CONSTANTS ---
const regContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Changed to minHeight for longer forms
  padding: '40px 20px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  margin: '8px 0',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: 'white',
  outline: 'none',
  fontSize: '0.95rem'
};

const registerButtonStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: 'none',
  background: 'linear-gradient(90deg, #00f2fe, #4facfe)', // Cyan/Blue gradient for Register
  color: 'white',
  fontWeight: '700',
  letterSpacing: '1px',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
  marginTop: '15px',
  transition: '0.3s'
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    section: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed. Try again.");
    }
  };

  return (
    <div style={regContainerStyle}>
      <div className="glass-card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 style={{ marginBottom: '10px' }}>Create Account</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>
          Join the Smart Attendance System
        </p>

        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="USN (University Serial Number)"
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
        />

        <input
          type="text"
          placeholder="Section (e.g., A, B, C)"
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
        />

        <input
          type="password"
          placeholder="Set Password"
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button 
          style={registerButtonStyle}
          onClick={handleRegister}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          REGISTER NOW
        </button>

        <p style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          Already registered?{" "}
          <span 
            onClick={() => navigate('/login')} 
            style={{ color: '#4facfe', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}