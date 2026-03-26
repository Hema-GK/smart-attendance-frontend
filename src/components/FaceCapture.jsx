import React, { useEffect, useRef, useState } from "react";
import API from "../api/api";
import { Geolocation } from "@capacitor/geolocation";

export default function FaceCapture({ user }) {

  const videoRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

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

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setImage(canvas.toDataURL("image/jpeg"));
  };

  // 📍 LOCATION
  const fetchLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

    } catch {
      alert("Location permission required");
    }
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {

    if (!image) return alert("Capture image first");
    if (!location) return alert("Location not available");

    try {
      setLoading(true);

      const res = await API.post("/attendance/mark", {
        student_id: user.id,
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

      <video ref={videoRef} autoPlay className="video-box" />

      <button onClick={captureImage} className="btn">
        Capture
      </button>

      {image && (
        <img src={image} alt="preview" className="preview" />
      )}

      <div style={{ marginTop: "10px" }}>
        <p style={{ color: "green" }}>
          📍 {location?.lat}, {location?.lng}
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="submit-btn"
      >
        {loading ? "VERIFYING..." : "SUBMIT"}
      </button>

    </div>
  );
}