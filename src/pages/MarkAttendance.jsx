import { useState, useEffect } from "react";
import API from "../api/api";
import FaceCapture from "../components/FaceCapture";

// Helper to calculate distance in meters (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
};

export default function MarkAttendance() {
  const [currentClass, setCurrentClass] = useState(null);
  const [distance, setDistance] = useState(null);
  const [inRange, setInRange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);

  // 1. Fetch the active class and its room polygon from backend
  useEffect(() => {
    const fetchCurrentClass = async () => {
      try {
        const res = await API.get("/timetable/current-class");
        if (res.data.status === "Class Active") {
          setCurrentClass(res.data.class);
        } else {
          setCurrentClass(null);
        }
      } catch (err) {
        console.error("Error fetching class:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentClass();
  }, []);

  // 2. Track user location and calculate distance to classroom
  useEffect(() => {
    if (!currentClass || !currentClass.location_polygon) return;

    const poly = typeof currentClass.location_polygon === "string"
      ? JSON.parse(currentClass.location_polygon)
      : currentClass.location_polygon;

    // Use the first coordinate pair as the center point
    const [targetLat, targetLon] = poly[0];

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ latitude, longitude });

        const dist = calculateDistance(latitude, longitude, targetLat, targetLon);
        setDistance(dist);
        
        // 15m threshold to match updated backend routes
        setInRange(dist <= 15); 
      },
      (error) => console.error("GPS Error:", error),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentClass]);

  if (loading) return <div style={styles.center}>Loading active session...</div>;

  return (
    <div style={styles.container}>
      {currentClass ? (
        <>
          <div style={styles.headerCard}>
            <h2 style={styles.subject}>{currentClass.subject}</h2>
            <p style={styles.room}>Room: {currentClass.classroom}</p>
          </div>

          <div style={inRange ? styles.radarSuccess : styles.radarWarning}>
            <p style={styles.radarTitle}>Distance Radar</p>
            <h1 style={styles.distanceText}>
              {distance !== null ? `${distance}m` : "--m"}
            </h1>
            <p>{inRange ? "✅ You are in Range" : "❌ Walk closer to Room"}</p>
          </div>

          {/* Debug coordinates (optional) */}
          <p style={styles.debugText}>
            GPS: {userCoords?.latitude.toFixed(5)}, {userCoords?.longitude.toFixed(5)}
          </p>

          {inRange ? (
            <FaceCapture currentClass={currentClass} />
          ) : (
            <div style={styles.infoBox}>
              Face verification is disabled until you are inside the classroom boundary.
            </div>
          )}
        </>
      ) : (
        <div style={styles.noClass}>
          <h2>No Active Class Found</h2>
          <p>Please check your timetable or wait for the session to start.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center", fontFamily: "sans-serif" },
  headerCard: { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "20px", borderRadius: "15px", marginBottom: "20px" },
  subject: { margin: 0, fontSize: "24px" },
  room: { margin: "5px 0 0", opacity: 0.9 },
  radarSuccess: { background: "rgba(76, 175, 80, 0.1)", border: "2px solid #4CAF50", padding: "20px", borderRadius: "15px", marginBottom: "20px", color: "#2e7d32" },
  radarWarning: { background: "rgba(244, 67, 54, 0.1)", border: "2px solid #f44336", padding: "20px", borderRadius: "15px", marginBottom: "20px", color: "#c62828" },
  radarTitle: { margin: 0, fontWeight: "bold", textTransform: "uppercase", fontSize: "14px" },
  distanceText: { margin: "10px 0", fontSize: "48px" },
  infoBox: { background: "#3f51b5", color: "white", padding: "15px", borderRadius: "10px", lineHeight: "1.5" },
  noClass: { marginTop: "50px", color: "#666" },
  debugText: { fontSize: "10px", color: "#999", marginBottom: "10px" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }
};