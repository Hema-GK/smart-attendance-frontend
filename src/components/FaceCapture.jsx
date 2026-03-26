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

  // 📸 CAPTURE IMAGE + FACE RECOGNITION
  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imgData = canvas.toDataURL("image/jpeg");
    setImage(imgData);

    try {
      const res = await API.post("/face/recognize", {
        image: imgData
      });

      if (res.data.student) {
        setRecognizedStudent(res.data.student);
        setConfirmed(false);
      } else {
        alert(res.data.message || "Face not recognized");
      }

    } catch {
      alert("Face recognition failed");
    }
  };

  // 📍 LOCATION FETCH
  const fetchLocation = async () => {
    try {
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });

    } catch {
      console.log("GPS not ready yet");
    }
  };

  // 🚀 MARK ATTENDANCE
  const handleSubmit = async () => {

    if (!image) return alert("Capture image first");

    // 🔥 ALWAYS ENSURE LOCATION
    let currentLocation = location;

    if (!currentLocation) {
      try {
        const pos = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });

        currentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        setLocation(currentLocation);

      } catch {
        return alert("Location not available. Please wait and try again.");
      }
    }

    if (!recognizedStudent) return alert("Face not recognized");

    try {
      setLoading(true);

      const res = await API.post("/attendance/mark", {
        student_id: recognizedStudent.id,
        timetable_id: 1,
        latitude: currentLocation.lat,
        longitude: currentLocation.lng
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
      <div style={{ marginTop: "10px" }}>
        {location ? (
          <p style={{ color: "green" }}>
            📍 {location.lat}, {location.lng}
          </p>
        ) : (
          <p style={{ color: "orange" }}>
            📍 Getting location...
          </p>
        )}
      </div>

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