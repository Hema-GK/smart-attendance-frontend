import { useState, useEffect, useRef } from "react";

export default function MarkAttendance() {
  const videoRef = useRef(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [studentData, setStudentData] = useState(null);
  const [step, setStep] = useState("capture"); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Camera & GPS Setup
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => videoRef.current.srcObject = s);
    navigator.geolocation.watchPosition(p => setLocation({ lat: p.coords.latitude, lon: p.coords.longitude }));

    // 2. Load Class with all details
    fetch("https://final-production-8aff.up.railway.app/timetable/current-class")
      .then(res => res.json())
      .then(data => data.status === "Class Active" && setCurrentClass(data.class));
  }, []);

  const handleRecognize = async () => {
    setLoading(true);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    
    const res = await fetch("https://final-production-8aff.up.railway.app/attendance/recognize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: canvas.toDataURL("image/jpeg") })
    });
    const result = await res.json();
    if (result.status === "success") {
      setStudentData(result.student_info);
      setStep("confirm");
    } else {
      alert(result.message);
    }
    setLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const res = await fetch("https://final-production-8aff.up.railway.app/attendance/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: studentData.id,
        timetable_id: currentClass.id,
        latitude: location.lat,
        longitude: location.lon
      })
    });
    const result = await res.json();
    alert(result.message);
    if (result.status === "success") setStep("done");
    setLoading(false);
  };

  if (!currentClass) return <div className="loading">Checking Schedule...</div>;

  return (
    <div className="attendance-page" style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
      {/* Restored Header Details */}
      <div className="class-info">
        <h1 style={{ color: '#ff4b5c' }}>{currentClass.subject}</h1>
        <p><strong>Teacher:</strong> {currentClass.teacher_name}</p>
        <p><strong>Classroom:</strong> {currentClass.classroom}</p>
        <p><strong>Time:</strong> {currentClass.start_time} - {currentClass.end_time}</p>
      </div>

      {step === "capture" && (
        <div className="camera-section">
          <video ref={videoRef} autoPlay style={{ width: '90%', borderRadius: '15px', border: '2px solid #555' }} />
          <button onClick={handleRecognize} disabled={loading} style={btnStyle("#ff4b5c")}>
            {loading ? "Recognizing..." : "Capture Face"}
          </button>
        </div>
      )}

      {/* Restored Verification Card */}
      {step === "confirm" && (
        <div className="verify-card" style={cardStyle}>
          <h2>Verify Your Details</h2>
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>USN:</strong> {studentData.usn}</p>
          <p><strong>Section:</strong> {studentData.section}</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setStep("capture")} style={btnStyle("#555")}>Retake</button>
            <button onClick={handleConfirm} disabled={loading} style={btnStyle("#ff4b5c")}>
              {loading ? "Processing..." : "Confirm Attendance"}
            </button>
          </div>
        </div>
      )}

      {step === "done" && <h2 style={{ color: '#4aff4a' }}>Attendance Marked! ✅</h2>}
    </div>
  );
}

const cardStyle = { background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '15px', border: '1px solid #4aff4a', margin: '20px auto', maxWidth: '380px', textAlign: 'left' };
const btnStyle = (c) => ({ width: '100%', padding: '12px', marginTop: '10px', backgroundColor: c, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' });