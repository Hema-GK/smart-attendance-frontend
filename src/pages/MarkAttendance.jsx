import { useState, useEffect } from "react";

// Haversine formula to calculate distance in meters
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function MarkAttendance({ studentId }) {
  const [currentClass, setCurrentClass] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState("Checking class...");
  const [loading, setLoading] = useState(false);

  // 1. Fetch the active class based on current time
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch("https://final-production-8aff.up.railway.app/timetable/current-class");
        const data = await res.json();
        if (data.status === "Class Active") {
          setCurrentClass(data.class);
        } else {
          setStatus(data.message || "No active class found.");
        }
      } catch (err) {
        setStatus("Error reaching server.");
      }
    };
    fetchClass();
  }, []);

  // 2. Track GPS Location and calculate distance
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        setLocation({ lat: userLat, lon: userLon });

        if (currentClass && currentClass.center_latitude) {
          const dist = calculateDistance(
            userLat,
            userLon,
            currentClass.center_latitude,
            currentClass.center_longitude
          );
          setDistance(dist);
        }
      },
      (err) => setStatus("GPS Access Denied"),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentClass]);

  const handleMark = async () => {
    if (!distance || distance > 15.0) {
      alert(`Too far! You are ${distance?.toFixed(2)}m away. Limit is 15m.`);
      return;
    }

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
      if (result.status === "success") {
        alert(result.message);
        setStatus("Attendance Marked Successfully!");
      } else {
        alert(result.message); // This shows the 'DB Error' or 'GEO-FENCE' error
      }
    } catch (err) {
      alert("Submission failed. Check network.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentClass) return <div className="status-box">{status}</div>;

  const isInside = distance !== null && distance <= 15.0;

  return (
    <div className="attendance-card">
      <h3>{currentClass.subject}</h3>
      <p>Room: {currentClass.classroom}</p>

      {/* Radar Logic */}
      <div className={`radar-circle ${isInside ? "active" : "inactive"}`}>
        <div className="pulse"></div>
        <span className="distance-text">
          {distance ? `${distance.toFixed(1)}m` : "Locating..."}
        </span>
      </div>

      <p className="status-msg">
        {isInside ? "You are inside the class" : "You are outside the range"}
      </p>

      <button 
        onClick={handleMark} 
        disabled={!isInside || loading}
        className="mark-btn"
      >
        {loading ? "Marking..." : "Submit Attendance"}
      </button>
    </div>
  );
}