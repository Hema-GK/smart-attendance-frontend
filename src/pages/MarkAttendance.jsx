// import { useState, useEffect } from "react"
// import FaceCapture from "../components/FaceCapture"
// import API from "../api/api"

// export default function MarkAttendance() {

// const [currentClass, setCurrentClass] = useState(null)
// const [loading, setLoading] = useState(true)

// useEffect(()=>{

// API.get("/timetable/current-class")
// .then(res=>{

// if(res.data.status === "Class Active"){
// setCurrentClass(res.data.class)
// }

// setLoading(false)

// })
// .catch(err=>{
// console.log(err)
// setLoading(false)
// })

// },[])


// /* ---------------- LOADING SCREEN ---------------- */

// if(loading){

// return(

// <div style={{
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// height:"100vh",
// background:"linear-gradient(135deg,#667eea,#764ba2)"
// }}>

// <h2 style={{color:"white"}}>Checking Current Class...</h2>

// </div>

// )

// }


// /* ---------------- NO CLASS ---------------- */

// if(!currentClass){

// return(

// <div style={{
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// height:"100vh",
// background:"linear-gradient(135deg,#667eea,#764ba2)"
// }}>

// <div style={{
// background:"rgba(255,255,255,0.15)",
// backdropFilter:"blur(10px)",
// padding:"40px",
// borderRadius:"15px",
// color:"white",
// textAlign:"center",
// boxShadow:"0 10px 30px rgba(0,0,0,0.3)"
// }}>

// <h2>No Class Currently Running</h2>
// <p>Please try again during class time.</p>

// </div>

// </div>

// )

// }


// /* ---------------- MAIN PAGE ---------------- */

// return(

// <div style={{
// minHeight:"100vh",
// background:"linear-gradient(135deg,#667eea,#764ba2)",
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// flexDirection:"column"
// }}>

// {/* CURRENT CLASS CARD */}

// <div style={{
// background:"rgba(255,255,255,0.15)",
// backdropFilter:"blur(12px)",
// padding:"30px",
// borderRadius:"15px",
// color:"white",
// textAlign:"center",
// boxShadow:"0 10px 30px rgba(0,0,0,0.3)",
// marginBottom:"30px",
// width:"350px"
// }}>

// <h2>Current Class</h2>

// <p><b>Subject:</b> {currentClass.subject}</p>
// <p><b>Section:</b> {currentClass.section}</p>
// <p><b>Semester:</b> {currentClass.semester}</p>
// <p><b>Room:</b> {currentClass.classroom}</p>

// </div>


// {/* FACE ATTENDANCE */}

// <FaceCapture currentClass={currentClass}/>

// </div>

// )

// }

import { useState, useEffect } from "react";
import FaceCapture from "../components/FaceCapture";
import API from "../api/api";

// --- HAVERSINE FORMULA: Calculates real-world distance in meters ---
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function MarkAttendance() {
  const [currentClass, setCurrentClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null);
  const [isInRange, setIsInRange] = useState(false);

  // COORDINATES: Center of your room from your GPS logs
  const roomCenter = { lat: 12.51635, lon: 76.88126 };
  const ALLOWED_RADIUS = 10.0; // 5 meters

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await API.get("/timetable/current-class");
        if (res.data.status === "Class Active") {
          setCurrentClass(res.data.class);
        }
      } catch (err) {
        console.error("Error fetching class:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClass();

    // LIVE TRACKING: Watch position for real-time distance updates
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const d = calculateDistance(
          pos.coords.latitude,
          pos.coords.longitude,
          roomCenter.lat,
          roomCenter.lon
        );
        setDistance(d.toFixed(2));
        setIsInRange(d <= ALLOWED_RADIUS);
      },
      (err) => console.error("GPS Error:", err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  };

  if (loading) return <div style={pageStyle}><h2 style={{ color: "white" }}>Checking Class...</h2></div>;

  if (!currentClass) {
    return (
      <div style={pageStyle}>
        <div style={{ background: "rgba(255,255,255,0.2)", padding: "40px", borderRadius: "15px", textAlign: "center", color: "white" }}>
          <h2>No Class Currently Running</h2>
          <button onClick={() => window.location.reload()} style={{ marginTop: "20px", padding: "10px 20px" }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* 1. Class Information Card */}
      <div style={{ background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "15px", color: "white", textAlign: "center", marginBottom: "20px", width: "350px" }}>
        <h2>{currentClass.subject}</h2>
        <p><b>Room:</b> {currentClass.classroom}</p>
      </div>

      {/* 2. LIVE DISTANCE RADAR UI */}
      <div style={{ 
          background: isInRange ? "rgba(76, 175, 80, 0.4)" : "rgba(244, 67, 54, 0.4)", 
          padding: "20px", borderRadius: "15px", color: "white", textAlign: "center", marginBottom: "30px", width: "350px", border: "1px solid white" 
      }}>
        <h3>Distance Radar</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
            {distance ? `${distance}m` : "Locating..."}
        </p>
        <p style={{ fontSize: "18px" }}>{isInRange ? "✅ You are in Range" : "❌ Walk closer to Room"}</p>
      </div>

      {/* 3. FACE CAPTURE SECTION */}
      {isInRange ? (
        <FaceCapture currentClass={currentClass} />
      ) : (
        <div style={{ color: "white", textAlign: "center", opacity: 0.8, background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "10px" }}>
          <p>Face verification is disabled until you are inside the classroom boundary.</p>
        </div>
      )}
    </div>
  );
}