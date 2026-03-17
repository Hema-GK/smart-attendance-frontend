import { useState, useEffect } from "react";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function MarkAttendance({ studentId }) {
  const [currentClass, setCurrentClass] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [canSubmit, setCanSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Locating...");

  useEffect(() => {
    fetch("https://final-production-8aff.up.railway.app/timetable/current-class")
      .then(res => res.json())
      .then(data => {
        if (data.status === "Class Active") setCurrentClass(data.class);
        else setMsg(data.message || "No active class.");
      });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition((pos) => {
      const uLat = pos.coords.latitude;
      const uLon = pos.coords.longitude;
      setLocation({ lat: uLat, lon: uLon });

      if (currentClass?.polygon) {
        try {
          // Parsing the [[lat, lon]] format from your DB
          const coords = JSON.parse(currentClass.polygon);
          const [cLat, cLon] = coords[0];
          const dist = calculateDistance(uLat, uLon, cLat, cLon);
          
          // Background check: 15 meters radius
          setCanSubmit(dist <= 15.0);
        } catch (e) { console.error("Coord error"); }
      }
    }, null, { enableHighAccuracy: true });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentClass]);

  const handleMark = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          timetable_id: currentClass.id,
          latitude: location.lat,
          longitude: location.lon,
        }),
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      alert("Error submitting attendance.");
    } finally { setLoading(false); }
  };

  if (!currentClass) return <div className="p-4 text-white">{msg}</div>;

  return (
    <div className="card" style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
      <h2 style={{ color: '#ff4b5c' }}>{currentClass.subject}</h2>
      <p style={{ opacity: 0.8 }}>Classroom: {currentClass.classroom}</p>
      <p style={{ fontSize: '12px', margin: '10px 0' }}>
        {canSubmit ? "📍 Location Verified" : "❌ Outside Classroom Range"}
      </p>

      <button 
        onClick={handleMark} 
        disabled={!canSubmit || loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: canSubmit ? '#4aff4a' : '#555',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: canSubmit ? 'pointer' : 'not-allowed'
        }}
      >
        {loading ? "Submitting..." : "Mark Present"}
      </button>
    </div>
  );
}