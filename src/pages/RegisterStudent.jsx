import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function RegisterStudent() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState(""); 
  const [section, setSection] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      alert("Camera access denied");
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    // CRITICAL: Increased quality from 0.4 to 0.9 for facial recognition accuracy
    const captured = canvas.toDataURL("image/jpeg", 0.9);
    setImage(captured);
    video.pause();
  };

  const registerStudent = async () => {
    if (!image || !name || !usn || !semester) {
      alert("Please fill all fields and capture your face");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = "https://final-production-8aff.up.railway.app";
      const response = await axios.post(`${backendUrl}/students/register`, {
        name,
        usn,
        password,
        semester: parseInt(semester),
        section,
        image
      });

      if (response.data.status === "success" || response.data.status.includes("successfully")) {
        alert("Student Registered Successfully ✅");
        navigate("/student/login");
      } else {
        alert(response.data.status); // Shows "Multiple faces detected" or "No face detected"
      }
    } catch (err) {
      console.error("REGISTRATION ERROR:", err);
      alert("Registration failed: Server error or connection issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Student Registration</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      <input placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <input placeholder="Semester (e.g. 5)" value={semester} onChange={(e) => setSemester(e.target.value)} style={inputStyle} />
      <input placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} style={inputStyle} />

      <video ref={videoRef} autoPlay width="100%" style={{ borderRadius: "10px", marginTop: "10px" }}></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div style={{ marginTop: '10px' }}>
        <button onClick={startCamera} className="btn">Start Camera</button>
        <button onClick={captureImage} className="btn" style={{ marginLeft: '10px' }}>Capture</button>
      </div>

      <button className="btn register" onClick={registerStudent} disabled={loading} style={regBtnStyle}>
        {loading ? "Processing..." : "Register Student"}
      </button>
    </div>
  );
}

const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '8px' };
const regBtnStyle = { width: '100%', marginTop: '20px', padding: '10px', backgroundColor: '#28a745', color: 'white' };