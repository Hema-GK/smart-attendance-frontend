import React, { useEffect, useRef, useState } from "react";
import API from "../api/api";
import { Capacitor } from "@capacitor/core";

export default function FaceCapture({ user }) {
  const videoRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wifiBSSID, setWifiBSSID] = useState(null);
  const [syncing, setSyncing] = useState(true);

  const WifiPlugin = Capacitor.Plugins?.WifiPlugin;

  useEffect(() => {
    startCamera();
    fetchWifi();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
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

    const imageData = canvas.toDataURL("image/jpeg");
    setImage(imageData);
  };

  const fetchWifi = async () => {
    try {
      setSyncing(true);

      if (!WifiPlugin) {
        alert("WifiPlugin not available. Sync Android first.");
        return;
      }

      const result = await WifiPlugin.getBSSID();

      console.log("Detected BSSID:", result.bssid);

      setWifiBSSID(result.bssid);
      setSyncing(false);

    } catch (err) {
      console.log(err);
      setSyncing(false);
      alert(err.message || "WiFi fetch failed");
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Capture image first");
      return;
    }

    if (!wifiBSSID) {
      alert("WiFi not detected");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/face/verify", {
        image,
        bssid: wifiBSSID,
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
      <video ref={videoRef} autoPlay playsInline className="video-box" />

      <button onClick={captureImage} className="btn">
        Capture
      </button>

      {image && <img src={image} alt="preview" className="preview" />}

      <div style={{ marginTop: "10px" }}>
        {syncing ? (
          <p style={{ color: "red" }}>🔄 Syncing Wi-Fi...</p>
        ) : (
          <p style={{ color: "green" }}>
            📡 BSSID: {wifiBSSID || "Not detected"}
          </p>
        )}
      </div>

      <button onClick={handleSubmit} disabled={loading} className="submit-btn">
        {loading ? "VERIFYING..." : "SUBMIT"}
      </button>
    </div>
  );
}