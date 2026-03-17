import { useState, useEffect } from "react";
import API from "../api/api";
import FaceCapture from "../components/FaceCapture";

// Haversine formula to calculate distance in meters
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; 
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function MarkAttendance() {
  const [currentClass, setCurrentClass] = useState(null);
  const [distance, setDistance] = useState(null);
  const [inRange, setInRange] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Class Data
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await API.get("/timetable/current-class");
        if (res.data.class) {
          setCurrentClass(res.data.class);
          setTimeLeft(res.data.class.minutes_left);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, []);

  // Local Countdown Timer logic
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Location Tracking logic
  useEffect(() => {
    if (!currentClass || currentClass.is_lunch || !currentClass.location_polygon) return;

    const poly = typeof currentClass.location_polygon === "string"
      ? JSON.parse(currentClass.location_polygon)
      : currentClass.location_polygon;

    const [targetLat, targetLon] = poly[0];

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const dist = calculateDistance(pos.coords.latitude, pos.coords.longitude, targetLat, targetLon);
        setDistance(dist);
        setInRange(dist <= 15); // Sync with 15m backend radius
      },
      (err) => console.error("GPS Error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentClass]);

  if (loading) return <div style={styles.center}>Loading Session...</div>;

  return (
    <div style={styles.container}>
      {currentClass ? (
        <>
          {/* Header Section */}
          <div style={currentClass.is_lunch ? styles.lunchHeader : styles.headerCard}>
            <h2 style={styles.subject}>{currentClass.subject}</h2>
            <p style={styles.room}>
              {currentClass.is_lunch ? "Time for a break!" : `Room: ${currentClass.classroom}`}
            </p>
            <div style={styles.timerBadge}>
              ⏱️ {timeLeft} mins remaining
            </div>
          </div>

          {currentClass.is_lunch ? (
            /* Lunch UI */
            <div style={styles.lunchBox}>
              <span style={{ fontSize: "50px" }}>🍛</span>
              <h3>Lunch Break</h3>
              <p>The system is currently on break. Verification is paused.</p>
            </div>
          ) : (
            /* Attendance UI */
            <>
              <div style={inRange ? styles.radarSuccess : styles.radarWarning}>
                <p style={styles.radarTitle}>Distance Radar</p>
                <h1 style={styles.distanceText}>{distance !== null ? `${distance}m` : "Locating..."}</h1>
                <p>{inRange ? "✅ You are in Range" : "❌ Walk closer to Room"}</p>
              </div>

              {inRange ? (
                <FaceCapture currentClass={currentClass} />
              ) : (
                <div style={styles.infoBox}>
                  Face verification is disabled until you are inside the classroom boundary.
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div style={styles.noClass}>
          <h2>No Active Session</h2>
          <p>Please check your timetable for the next class.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", maxWidth: "450px", margin: "0 auto", textAlign: "center" },
  headerCard: { background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", padding: "20px", borderRadius: "15px", marginBottom: "20px" },
  lunchHeader: { background: "linear-gradient(135deg, #f6d365, #fda085)", color: "#5d4037", padding: "20px", borderRadius: "15px", marginBottom: "20px" },
  subject: { margin: 0, fontSize: "22px" },
  room: { margin: "5px 0", opacity: 0.9 },
  timerBadge: { background: "rgba(0,0,0,0.2)", display: "inline-block", padding: "5px 12px", borderRadius: "20px", fontSize: "12px", marginTop: "10px" },
  radarSuccess: { background: "#e8f5e9", border: "2px solid #4CAF50", padding: "20px", borderRadius: "15px", color: "#2e7d32", marginBottom: "20px" },
  radarWarning: { background: "#ffebee", border: "2px solid #f44336", padding: "20px", borderRadius: "15px", color: "#c62828", marginBottom: "20px" },
  distanceText: { fontSize: "48px", margin: "10px 0" },
  lunchBox: { padding: "40px 20px", background: "#fffde7", borderRadius: "15px", border: "2px dashed #fbc02d" },
  infoBox: { background: "#5c6bc0", color: "white", padding: "15px", borderRadius: "10px", fontSize: "14px" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
  noClass: { marginTop: "100px", color: "#999" }
};