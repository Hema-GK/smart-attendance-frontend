import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function RegisterStudent() {

  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Start camera
  const startCamera = async () => {
    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = stream;

    } catch (error) {
      alert("Camera access denied");
    }
  };

  // Capture image
  const captureImage = () => {

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    // compress image
    const captured = canvas.toDataURL("image/jpeg", 0.4);

    setImage(captured);

    video.pause();
  };

  // Register student
  const registerStudent = async () => {

    if (!image) {
      alert("Please capture your face");
      return;
    }

    setLoading(true);

    try {

      await API.post("/students/register", {
        name,
        usn,
        password,
        class_name: className,
        section,
        image
      });

      alert("Student Registered Successfully ✅");

      // ✅ CORRECT ROUTE
      navigate("/student/login");

    } catch (err) {

      console.error(err);
      alert("Registration failed");

    }

    setLoading(false);
  };

  return (

    <div className="card">

      <h2>Student Registration</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Class"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />

      <input
        placeholder="Section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />

      <br />

      <video
        ref={videoRef}
        autoPlay
        width="250"
        style={{ borderRadius: "10px", marginTop: "10px" }}
      ></video>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <br />

      <button className="btn" onClick={startCamera}>
        Start Camera
      </button>

      <button className="btn" onClick={captureImage}>
        Capture Face
      </button>

      <button
        className="btn register"
        onClick={registerStudent}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p>
        Already Registered?
        <span
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => navigate("/student/login")}
        >
          Login
        </span>
      </p>

    </div>

  );
}