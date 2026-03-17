import { useState, useEffect, useRef } from "react";

export default function MarkAttendance() {
  const videoRef = useRef(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState(null);

  useEffect(() => {
    // 1. Start Camera Preview immediately
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    // 2. Fetch the Active Class details
    fetch("https://final-production-8aff.up.railway.app/timetable/current-class")
      .then(res => res.json())
      .then(data => {
        if (data.status === "Class Active") setCurrentClass(data.class);
      });

    // 3. Get GPS coordinates silently in the background
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      }, null, { enableHighAccuracy: true });
    }
  }, []);

  const handleInstantAttendance = async () => {
    setLoading(true);
    
    // Capture the frame from the video
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    
    // Convert to Base64 (High quality for recognition)
    const imageBlob = canvas.toDataURL("image/jpeg", 0.9);

    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/attendance/mark-instant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBlob,
          timetable_id: currentClass.id,
          latitude: location.lat,
          longitude: location.lon,
        }),
      });

      const result = await res.json();

      if (result.status === "success") {
        setAttendanceDetails(result.details);
        alert("Success: Attendance recorded successfully! ✅");
      } else {
        // This will display "Outside Range" or "Face not recognized" error messages
        alert(result.message);
      }
    } catch (err) {
      alert("Server connection error. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentClass) return <div style={{padding: '50px', color: 'white', textAlign: 'center'}}>Checking Timetable...</div>;

  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Subject Title at the top (Old Style) */}
      <h2 style={{ fontSize: '32px', marginTop: '40px', color: '#ff4b5c' }}>
        {currentClass.subject}
      </h2>

      <div style={{ margin: '30px auto', maxWidth: '400px' }}>
        {!attendanceDetails ? (
          <>
            {/* Simple Camera Frame */}
            <div style={{ position: 'relative', border: '4px solid rgba(255,255,255,0.2)', borderRadius: '20px', overflow: 'hidden' }}>
              <video ref={videoRef} autoPlay style={{ width: '100%', display: 'block' }} />
            </div>

            {/* Simple Capture Button */}
            <button 
              onClick={handleInstantAttendance} 
              disabled={loading} 
              style={btnStyle}
            >
              {loading ? "Processing..." : "Capture Face"}
            </button>
          </>
        ) : (
          /* Success Card - Displayed after marking (Old Style) */
          <div style={successCardStyle}>
            <h3 style={{ color: '#4aff4a', textAlign: 'center', marginBottom: '20px' }}>Verified Details</h3>
            <p><strong>Name:</strong> {attendanceDetails.name}</p>
            <p><strong>Subject:</strong> {attendanceDetails.subject}</p>
            <p><strong>Classroom:</strong> {attendanceDetails.classroom}</p>
            <p><strong>Teacher:</strong> {attendanceDetails.teacher}</p>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span style={{ backgroundColor: '#4aff4a', color: '#000', padding: '5px 15px', borderRadius: '5px', fontWeight: 'bold' }}>
                PRESENT ✅
              </span>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              style={doneBtnStyle}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// STYLING
const successCardStyle = {
  background: 'rgba(255,255,255,0.05)',
  padding: '30px',
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.2)',
  textAlign: 'left',
  lineHeight: '2'
};

const btnStyle = {
  width: '100%',
  marginTop: '25px',
  padding: '15px',
  backgroundColor: '#ff4b5c',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(255, 75, 92, 0.3)'
};

const doneBtnStyle = {
  width: '100%',
  marginTop: '20px',
  background: 'none',
  border: '1px solid white',
  color: 'white',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer'
};