import { useState, useEffect, useRef } from "react";

export default function MarkAttendance() {
  const videoRef = useRef(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [step, setStep] = useState("capture"); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => videoRef.current.srcObject = s);
    
    // Fetch detailed class info
    fetch("https://final-production-8aff.up.railway.app/timetable/current-class")
      .then(res => res.json())
      .then(data => {
        if (data.status === "Class Active") setCurrentClass(data.class);
      });
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
      setStudentData(result.student_info); // Restores USN, Name, Section
      setStep("confirm");
    } else {
      alert("Face not recognized. Please try again.");
    }
    setLoading(false);
  };

  if (!currentClass) return <div style={containerStyle}><h2>No Class Currently Running</h2></div>;

  return (
    <div style={containerStyle}>
      {/* RESTORED HEADER: Subject, Teacher, Room, Time */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#ff4b5c', fontSize: '2.2rem' }}>{currentClass.subject}</h1>
        <p><strong>Teacher:</strong> {currentClass.teacher_name}</p>
        <p><strong>Classroom:</strong> {currentClass.classroom}</p>
        <p><strong>Timing:</strong> {currentClass.start_time} - {currentClass.end_time}</p>
      </div>

      {step === "capture" ? (
        <div className="video-section">
          <video ref={videoRef} autoPlay style={{ width: '90%', borderRadius: '15px', border: '2px solid rgba(255,255,255,0.2)' }} />
          <button onClick={handleRecognize} disabled={loading} style={mainBtn}>
            {loading ? "Recognizing..." : "Capture Face"}
          </button>
        </div>
      ) : (
        /* RESTORED VERIFICATION CARD */
        <div style={verifyCard}>
          <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>Verify Your Details</h2>
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>USN:</strong> {studentData.usn}</p>
            <p><strong>Section:</strong> {studentData.section}</p>
            <p style={{ color: '#ff4d4d', marginTop: '15px' }}>✖ Move into Classroom</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setStep("capture")} style={{ ...mainBtn, backgroundColor: '#555' }}>Retake</button>
            <button style={mainBtn}>Confirm Attendance</button>
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle = { textAlign: 'center', color: 'white', padding: '30px 20px', minHeight: '100vh', background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' };
const verifyCard = { background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', maxWidth: '400px', margin: '0 auto' };
const mainBtn = { width: '100%', padding: '15px', marginTop: '15px', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };