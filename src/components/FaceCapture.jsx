import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import API from "../api/api";
import { registerPlugin } from '@capacitor/core';

// Register the native plugin we built in Java
const WiFiHardware = registerPlugin('WiFiHardware');

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
   * Proactive Hardware Probe:
   * Uses our custom WiFiHardware plugin to get the real BSSID.
   */
  const triggerHardwareScan = async () => {
    try {
      const result = await WiFiHardware.getRealBSSID();
      if (result.bssid && result.bssid !== "00:00:00:00:00:00") {
        setLastBSSID(result.bssid.toLowerCase()); 
        return true;
      }
    } catch (e) {
      console.error("Hardware BSSID scan failed:", e);
    }
    return false;
  };

  /**
   * Sync and Calibration Timer:
   * While the student is confirming, we scan for BSSID every second.
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed, countdown]);

  const captureFace = async () => {
    if (!webcamRef.current) return;
    setLoading(true);
    try {
      const image = webcamRef.current.getScreenshot();
      const res = await API.post("/face/recognize", { image });
      if (res.data.status === "Face recognized") { 
        setStudent(res.data.student); 
      }
    } catch (err) { 
      alert("Face recognition failed. Please try again."); 
    } finally { 
      setLoading(false); 
    }
  };

  const markAttendance = async () => {
    setMarking(true);
    let finalBSSID = lastBSSID;

    try {
        // One final hardware check before submission
        const result = await WiFiHardware.getRealBSSID();
        finalBSSID = result.bssid;
        console.log("Submitting with Real BSSID: ", finalBSSID);
    } catch (e) {
        console.error("Hardware BSSID blocked at submission:", e);
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const res = await API.post("/attendance/mark", {
                student_id: student.id,
                timetable_id: currentClass.id,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                bssid: finalBSSID, 
                rssi: -55
            });

            if (res.data.status === "success") {
                alert("Success! Hardware Verified. ✅");
            } else {
                alert(`Failed: ${res.data.message}\nDetected: ${finalBSSID}`);
            }
        } catch (err) {
            alert("Network Error: Could not connect to Railway server.");
        } finally {
            setMarking(false);
        }
    }, (err) => {
        alert("GPS Error: Please enable location services.");
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
          playsInline 
        />
        {!cameraReady && <div style={loadingOverlay}>Starting Camera...</div>}
      </div>

      <div style={{ marginTop: '20px', width: '90%' }}>
        {!student ? (
          <button 
            className="btn-primary" 
            onClick={captureFace} 
            disabled={!cameraReady || loading}
          >
            {loading ? "RECOGNIZING..." : "START SCAN"}
          </button>
        ) : (
          <div style={resultBox}>
            <p style={welcomeHeader}>User: <span style={{color: '#4facfe'}}>{student.name}</span></p>
            
            <div style={statusBadge(lastBSSID)}>
               {lastBSSID === "00:00:00:00:00:00" ? "🔄 Syncing Wi-Fi..." : `📡 Connected: ${lastBSSID}`}
            </div>
            
            {!confirmed ? (
              <button 
                className="btn-primary" 
                style={{ background: '#22c55e', marginTop: '15px' }} 
                onClick={() => setConfirmed(true)}
              >
                CONFIRM IDENTITY
              </button>
            ) : (
              <button 
                className="btn-primary" 
                style={{ 
                  background: (canFinalize && !marking) ? '#6366f1' : '#4b5563',
                  marginTop: '15px'
                }} 
                onClick={markAttendance} 
                disabled={marking || !canFinalize}
              >
                {marking ? "VERIFYING..." : (canFinalize ? "SUBMIT ATTENDANCE" : `CALIBRATING (${countdown}s)`)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// STYLES (Keep as you had them)
const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: '#0f172a', padding: '20px' };
const webcamWrapper = { position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '2px solid #3b82f6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' };
const webcamStyle = { width: '100%', height: 'auto', display: 'block' };
const loadingOverlay = { position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#020617', color: '#3b82f6' };
const resultBox = { padding: '25px', background: '#1e293b', borderRadius: '15px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' };
const welcomeHeader = { color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' };

const statusBadge = (bssid) => ({
  fontSize: '11px',
  padding: '6px 12px',
  borderRadius: '20px',
  display: 'inline-block',
  background: bssid === "00:00:00:00:00:00" ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
  color: bssid === "00:00:00:00:00:00" ? '#f87171' : '#4ade80',
  border: `1px solid ${bssid === "00:00:00:00:00:00" ? '#f87171' : '#4ade80'}`,
  transition: 'all 0.3s ease'
});