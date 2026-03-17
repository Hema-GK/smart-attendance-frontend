import { useState, useEffect, useRef } from "react";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function MarkAttendance({ studentId }) {
  const videoRef = useRef(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [isInside, setIsInside] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  useEffect(() => {
    // Start Camera
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    // Get Class Data
    fetch("https://final-production-8aff.up.railway.app/timetable/current-class")
      .then(res => res.json())
      .then(data => {
        if (data.status === "Class Active") setCurrentClass(data.class);
      });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition((pos) => {
      const uLat = pos.coords.latitude;
      const uLon = pos.coords.longitude;
      setLocation({ lat: uLat, lon: uLon });

      if (currentClass?.polygon) {
        const coords = JSON.parse(currentClass.polygon);
        const [cLat, cLon] = coords[0];
        const dist = calculateDistance(uLat, uLon, cLat, cLon);
        setIsInside(dist <= 15.0); 
      }
    }, null, { enableHighAccuracy: true });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentClass]);

  const handleCapture = async () => {
    setLoading(true);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          timetable_id: currentClass.id,
          latitude: location.lat,
          longitude: location.lon,
          image: imageBase64
        }),
      });
      const result = await res.json();
      setMatchResult(result);
      alert(result.message);
    } catch (err) {
      alert("Error marking attendance.");
    } finally { setLoading(false); }
  };

  if (!currentClass) return <div className="status">Loading class...</div>;

  return (
    <div className="attendance-card" style={{ textAlign: 'center', color: 'white' }}>
      <h2>{currentClass.subject}</h2>
      <p style={{ opacity: 0.7 }}>{currentClass.classroom}</p>

      <div className="video-wrapper" style={{ position: 'relative', margin: '20px auto', maxWidth: '400px' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          style={{ 
            width: '100%', 
            borderRadius: '15px', 
            border: isInside ? '4px solid #4aff4a' : '4px solid #ff4d4d' 
          }} 
        />
        {matchResult && (
          <div style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)', padding: '8px 20px', borderRadius: '20px',
            color: matchResult.status === 'success' ? '#4aff4a' : '#ff4d4d'
          }}>
            {matchResult.status === 'success' ? "Match Found" : "Match Failed"}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        {isInside ? (
          <span style={{ color: '#4aff4a' }}>✔ Inside Classroom Range</span>
        ) : (
          <span style={{ color: '#ff4d4d' }}>✖ Outside Range</span>
        )}
      </div>

      <button 
        onClick={handleCapture} 
        disabled={!isInside || loading}
        className="capture-btn"
        style={{
          padding: '15px 40px',
          borderRadius: '30px',
          backgroundColor: isInside ? '#ff4b5c' : '#444',
          cursor: isInside ? 'pointer' : 'not-allowed',
          border: 'none', color: 'white', fontWeight: 'bold'
        }}
      >
        {loading ? "Matching Face..." : "Capture & Mark"}
      </button>
    </div>
  );
}