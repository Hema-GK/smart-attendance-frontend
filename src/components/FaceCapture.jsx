import React, { useEffect, useRef, useState } from "react";
import API from "../api/api";
import { Geolocation } from "@capacitor/geolocation";

export default function FaceCapture({ user }) {

  const videoRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState(null);

  const [recognizedStudent, setRecognizedStudent] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    startCamera();
    fetchLocation();
  }, []);

  // 🎥 CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch {
      alert("Camera permission denied");
    }
  };

  // 📸 CAPTURE IMAGE
  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imgData = canvas.toDataURL("image/jpeg");
    setImage(imgData);

    // 🔍 CALL FACE RECOGNITION
    try {
      const res = await API.post("/face/recognize", {
        image: imgData
      });

      if (res.data.student) {
        setRecognizedStudent(res.data.student);
      } else {
        alert(res.data.status || "Face not recognized");
      }

    } catch (err) {
      alert("Face recognition failed");
    }
  };

  // 📍 LOCATION
const fetchLocation = async () => {
  try {
    let readings = [];

    for (let i = 0; i < 5; i++) {
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      readings.push({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      });

      await new Promise(r => setTimeout(r, 1000));
    }

    // average
    const avgLat = readings.reduce((a, b) => a + b.lat, 0) / readings.length;
    const avgLon = readings.reduce((a, b) => a + b.lon, 0) / readings.length;

    setLocation({ lat: avgLat, lng: avgLon });

  } catch {
    alert("Location permission required");
  }
};

  // 🚀 MARK ATTENDANCE
  const handleSubmit = async () => {

    if (!recognizedStudent) return alert("Face not recognized");
    if (!location) return alert("Location not available");

    try {
      setLoading(true);

      const res = await API.post("/attendance/mark", {
        student_id: recognizedStudent.id,
        timetable_id: 1,
        latitude: location.lat,
        longitude: location.lng
      });

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="capture-container">

      {/* 🎥 Camera */}
      <video ref={videoRef} autoPlay className="video-box" />

      <button onClick={captureImage} className="btn">
        Capture Face
      </button>

      {/* 📸 Preview */}
      {image && (
        <img src={image} alt="preview" className="preview" />
      )}

      {/* 📍 Location */}
      <p style={{ color: "green", marginTop: "10px" }}>
        📍 {location?.lat}, {location?.lng}
      </p>

      {/* 👤 Student Details */}
      {recognizedStudent && (
        <div className="student-card">
          <h3>👤 {recognizedStudent.name}</h3>
          <p>USN: {recognizedStudent.usn}</p>
          <p>Section: {recognizedStudent.section}</p>

          {!confirmed ? (
            <button onClick={() => setConfirmed(true)}>
              Confirm Identity
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "MARKING..." : "Mark Attendance"}
            </button>
          )}
        </div>
      )}

    </div>
  );
}