import React, { useEffect, useRef, useState } from "react";
import API from "../api/api";
import { Geolocation } from "@capacitor/geolocation";
import { registerPlugin } from "@capacitor/core";

const BlePlugin = registerPlugin("BlePlugin");

export default function FaceCapture({ user }) {

  const videoRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState(null);
  const [beaconUUID, setBeaconUUID] = useState(null);
  const [rssi, setRssi] = useState(null);

  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    startCamera();
    fetchLocation();
    fetchBeacon();
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

  // 📡 BLE SCAN
  const fetchBeacon = async () => {
  try {
    const res = await BlePlugin.startScan();

    setRssi(res.rssi);
    setSyncing(false);

  } catch (err) {
    console.log("BLE error:", err);
    setSyncing(false);
  }
};

  // 🚀 SUBMIT
  const handleSubmit = async () => {

    if (!image) return alert("Capture image first");
    if (!location) return alert("Location not available");
    if (!beaconUUID) return alert("Beacon not detected");

    try {
      setLoading(true);

      const res = await API.post("/attendance/mark", {
        student_id: user.id,
        timetable_id: 1,
        latitude: location.lat,
        longitude: location.lng,
        beacon_uuid: beaconUUID,
        rssi: rssi
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
        {syncing ? (
          <p style={{ color: "red" }}>🔄 Syncing beacon...</p>
        ) : (
          <>
            <p style={{ color: "green" }}>
              📡 UUID: {beaconUUID || "Not detected"}
            </p>

            <p style={{ color: "green" }}>
              📶 RSSI: {rssi !== null ? rssi : "N/A"} dBm
            </p>

            <p style={{ color: "green" }}>
              📍 {location?.lat}, {location?.lng}
            </p>
          </>
        )}
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