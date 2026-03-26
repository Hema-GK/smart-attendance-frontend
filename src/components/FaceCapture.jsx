import React, { useEffect, useRef, useState } from "react";
import API from "../api/api";
import { Geolocation } from "@capacitor/geolocation";
import { registerPlugin } from "@capacitor/core";

const WifiPlugin = registerPlugin("WifiPlugin");

export default function FaceCapture({ user }) {
  const videoRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ssid, setSsid] = useState(null);
  const [location, setLocation] = useState(null);
  const [syncing, setSyncing] = useState(true);
  const [rssi, setRssi] = useState(null);

  useEffect(() => {
    startCamera();
    fetchLocation();
    fetchSSID();
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
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch {
      alert("Location permission required");
    }
  };

  // 📡 SSID FROM NATIVE
  const fetchSSID = async () => {
  try {
    const res = await WifiPlugin.getWifiInfo();

    console.log("WiFi Info:", res);

    setSsid(res.ssid);
    setRssi(res.rssi); // 🔥 NEW
    setSyncing(false);
  } catch (err) {
    console.log("WiFi error:", err);
    setSsid("UNKNOWN");
    setRssi(-100);
    setSyncing(false);
  }
};

  // 🚀 SUBMIT
 const handleSubmit = async () => {
  if (!image) return alert("Capture image first");
  if (!location) return alert("Location not available");
  if (!ssid) return alert("WiFi not detected");

  try {
    setLoading(true);

    const res = await API.post("/attendance/mark", {
      student_id: user.id,
      timetable_id: 1, // later you can make this dynamic
      image,
      ssid,
      rssi, // ✅ THIS IS YOUR NEW FIELD
      latitude: location.lat,
      longitude: location.lng,
    });
    console.log({
  ssid,
  rssi,
  location
});

    alert(res.data.message || "Attendance marked");
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

      {image && <img src={image} alt="preview" className="preview" />}

      <div style={{ marginTop: "10px" }}>
        {syncing ? (
          <p style={{ color: "orange" }}>🔄 Syncing Wi-Fi...</p>
        ) : (
          <>
            <p style={{ color: "green" }}>📡 SSID: {ssid}</p>
            <p style={{ color: "green" }}>📶 RSSI: {rssi} dBm</p>
            <p style={{ color: "green" }}>
              📍 {location?.lat}, {location?.lng}
            </p>
          </>
        )}
      </div>

      <button onClick={handleSubmit} disabled={loading} className="submit-btn">
        {loading ? "VERIFYING..." : "SUBMIT"}
      </button>
    </div>
  );
}