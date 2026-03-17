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

export default function MarkAttendance() {
  const videoRef = useRef(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [isInside, setIsInside] = useState(false);
  const [studentData, setStudentData] = useState(null); // Data after face capture
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("capture"); // 'capture' or 'confirm'

  useEffect(() => {
    // 1. Start Camera Preview
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    // 2. Get Class Info
    fetch("https://final-production-8aff.up.railway.app/timetable/current-class")
      .then(res => res.json())
      .then(data => {
        if (data.status === "Class Active") setCurrentClass(data.class);
      });
  }, []);

  // 3. Silent Radius Logic
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition((pos) => {
      const uLat = pos.coords.latitude;
      const uLon = pos.coords.longitude;
      setLocation({ lat: uLat, lon: uLon });

      if (currentClass?.polygon) {
        const coords = JSON.parse(currentClass.polygon);
        const dist = calculateDistance(uLat, uLon, coords[0][0], coords[0][1]);
        setIsInside(dist <= 15.0);
      }
    }, null, { enableHighAccuracy: true });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentClass]);

  // STEP 1: Capture Face and get Student Info
  const handleFaceRecognition = async () => {
    setLoading(true);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageBlob = canvas.toDataURL("image/jpeg");

    try {
      // Endpoint to only recognize face (without marking attendance yet)
      const res = await fetch("https://final-production-8aff.up.railway.app/attendance/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBlob }),
      });

      const result = await res.json();
      if (result.status === "success") {
        setStudentData(result.student_info);
        setStep("confirm"); // Move to confirmation step
      } else {
        alert("Face not recognized. Please try again.");
      }
    } catch (err) {
      alert("Error connecting to recognition service.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Final Attendance Submission (with distance check)
  const handleConfirmAttendance = async () => {
    if (!isInside) {
      alert("Location Error: You must be inside the classroom to confirm.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentData.id,
          timetable_id: currentClass.id,
          latitude: location.lat,
          longitude: location.lon,
        }),
      });

      const result = await res.json();
      alert(result.message);
      if (result.status === "success") setStep("complete");
    } catch (err) {
      alert("Final submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentClass) return <div className="p-4 text-white">Searching for active class...</div>;

  return (
    <div className="attendance-workflow" style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
      <h2>{currentClass.subject}</h2>
      
      <div className="media-container" style={{ position: 'relative', margin: '20px auto', maxWidth: '400px' }}>
        {step === "capture" && (
          <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '15px', border: '3px solid #555' }} />
        )}

        {step === "confirm" && studentData && (
          <div className="confirmation-card" style={cardStyle}>
            <h3>Verify Your Details</h3>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>USN:</strong> {studentData.usn}</p>
            <p><strong>Section:</strong> {studentData.section}</p>
            <p style={{ color: isInside ? '#4aff4a' : '#ff4d4d' }}>
               {isInside ? "✔ Location Verified" : "✖ Move into Classroom"}
            </p>
          </div>
        )}
      </div>

      <div className="action-area">
        {step === "capture" && (
          <button onClick={handleFaceRecognition} disabled={loading} style={btnStyle("#ff4b5c")}>
            {loading ? "Recognizing..." : "Capture Face"}
          </button>
        )}

        {step === "confirm" && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => setStep("capture")} style={btnStyle("#555")}>Retake</button>
            <button onClick={handleConfirmAttendance} disabled={loading || !isInside} style={btnStyle("#4aff4a")}>
              {loading ? "Submitting..." : "Confirm Attendance"}
            </button>
          </div>
        )}

        {step === "complete" && <h3 style={{ color: '#4aff4a' }}>Attendance Marked Successfully! ✅</h3>}
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(255,255,255,0.1)',
  padding: '20px',
  borderRadius: '15px',
  border: '1px solid #4aff4a',
  textAlign: 'left'
};

const btnStyle = (color) => ({
  padding: '12px 25px',
  backgroundColor: color,
  color: color === "#4aff4a" ? "black" : "white",
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
});