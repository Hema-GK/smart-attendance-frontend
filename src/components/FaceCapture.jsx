import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import API from "../api/api";
import { Geolocation } from '@capacitor/geolocation';
import { NativeSettings, AndroidSettings } from 'capacitor-native-settings';
import { registerPlugin } from '@capacitor/core';

// ✅ NEW: Register custom plugin
const WifiPlugin = registerPlugin('WifiPlugin');

export default function FaceCapture({ currentClass }) {
  const webcamRef = useRef(null);
  const [student, setStudent] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [canFinalize, setCanFinalize] = useState(false);
  const [countdown, setCountdown] = useState(5); 
  const [lastBSSID, setLastBSSID] = useState("00:00:00:00:00:00");

  /**
   * 1. REQUEST PERMISSIONS
   */
  const requestHardwareAccess = async () => {
    try {
      const check = await Geolocation.checkPermissions();
      
      if (check.location !== 'granted') {
        const request = await Geolocation.requestPermissions();
        
        if (request.location !== 'granted') {
          const goToSettings = window.confirm(
            "Android requires 'Precise Location' to read Wi-Fi IDs. Open settings?"
          );
          
          if (goToSettings) {
            await NativeSettings.open({
              option: AndroidSettings.ApplicationDetails
            });
          }
          return false;
        }
      }
      return true;
    } catch (e) {
      console.error("Permission error", e);
      return false;
    }
  };

  /**
   * 2. REAL BSSID FETCH (FIXED)
   */
  const triggerHardwareScan = async () => {
    const hasPermission = await requestHardwareAccess();
    if (!hasPermission) return false;

    try {
      const res = await WifiPlugin.getBSSID();

      if (res.bssid && res.bssid !== "UNAVAILABLE") {
        setLastBSSID(res.bssid.toLowerCase());
      } else {
        setLastBSSID("00:00:00:00:00:00");
      }

      return true;
    } catch (e) {
      console.error("BSSID error:", e);
      setLastBSSID("00:00:00:00:00:00");
      return false;
    }
  };

  /**
   * 3. SCAN TIMER
   */
  useEffect(() => {
    let timer;
    if (confirmed && countdown > 0) {
      timer = setInterval(async () => {
        setCountdown((prev) => prev - 1);
        await triggerHardwareScan();
      }, 1000);
    } else if (countdown === 0) {
      setCanFinalize(true);
    }
    return () => clearInterval(timer);
  }, [confirmed, countdown]);

  const captureFace = async () => {
    if (!webcamRef.current) return;
    setLoading(true);
    try {
      const image = webcamRef.current.getScreenshot();
      const res = await API.post("/face/recognize", { image });
      if (res.data.student) setStudent(res.data.student);
      else alert("Face not recognized.");
    } catch (err) { 
      alert("Recognition Error."); 
    }
    finally { 
      setLoading(false); 
    }
  };

  const markAttendance = async () => {
    setMarking(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await API.post("/attendance/mark", {
          student_id: student.id,
          timetable_id: currentClass.id,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          bssid: lastBSSID,
          rssi: -55
        });

        if (res.data.status === "success") alert("Success! ✅");
        else alert(`Failed: ${res.data.message}`);
      } catch (err) { 
        alert("Server connection error."); 
      }
      finally { 
        setMarking(false); 
      }
    }, (err) => {
      alert("Please turn on GPS.");
      setMarking(false);
    }, { enableHighAccuracy: true });
  };

  return (
    <div style={containerStyle}>
      <div style={webcamWrapper}>
        <Webcam 
          ref={webcamRef} 
          audio={false} 
          screenshotFormat="image/jpeg" 
          onUserMedia={() => setCameraReady(true)} 
          style={webcamStyle} 
          videoConstraints={{ facingMode: "user" }} 
        />
      </div>

      <div style={{ marginTop: '20px', width: '90%' }}>
        {!student ? (
          <button 
            className="btn-primary" 
            onClick={captureFace} 
            disabled={!cameraReady || loading} 
            style={btnStyle}
          >
            {loading ? "SCANNING..." : "START FACE SCAN"}
          </button>
        ) : (
          <div style={resultBox}>
            <p style={welcomeHeader}>
              User: <span style={{color: '#4facfe'}}>{student.name}</span>
            </p>

            <div style={statusBadge(lastBSSID)}>
              {lastBSSID === "00:00:00:00:00:00" 
                ? "🔄 Syncing Wi-Fi..." 
                : `📡 ID: ${lastBSSID}`}
            </div>

            {!confirmed ? (
              <button 
                className="btn-primary" 
                style={{ ...btnStyle, background: '#22c55e', marginTop: '15px' }} 
                onClick={() => setConfirmed(true)}
              >
                CONFIRM IDENTITY
              </button>
            ) : (
              <button 
                className="btn-primary" 
                style={{ 
                  ...btnStyle, 
                  background: (canFinalize && !marking) ? '#6366f1' : '#4b5563', 
                  marginTop: '15px' 
                }} 
                onClick={markAttendance} 
                disabled={marking || !canFinalize}
              >
                {marking 
                  ? "VERIFYING..." 
                  : (canFinalize ? "SUBMIT" : `CALIBRATING (${countdown}s)`)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- STYLES (UNCHANGED) ---
const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: '#0f172a', padding: '20px' };
const webcamWrapper = { position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '2px solid #3b82f6' };
const webcamStyle = { width: '100%', height: 'auto', display: 'block' };
const resultBox = { padding: '25px', background: '#1e293b', borderRadius: '15px', textAlign: 'center' };
const welcomeHeader = { color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' };
const btnStyle = { width: '100%', padding: '12px', borderRadius: '8px', color: 'white', fontWeight: 'bold', border: 'none' };
const statusBadge = (bssid) => ({
  fontSize: '11px', padding: '6px 12px', borderRadius: '20px', display: 'inline-block',
  background: bssid === "00:00:00:00:00:00" ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
  color: bssid === "00:00:00:00:00:00" ? '#f87171' : '#4ade80',
  border: `1px solid ${bssid === "00:00:00:00:00:00" ? '#f87171' : '#4ade80'}`
});