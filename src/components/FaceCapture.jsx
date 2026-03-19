// import { useRef, useState } from "react"
// import Webcam from "react-webcam"
// import API from "../api/api"

// export default function FaceCapture({ currentClass }) {
//   const webcamRef = useRef(null)
//   const [capturedImage, setCapturedImage] = useState(null)
//   const [student, setStudent] = useState(null)
//   const [confirmed, setConfirmed] = useState(false)

//   const startCamera = () => {
//     setCapturedImage(null)
//     setStudent(null)
//     setConfirmed(false)
//   }

//   const captureFace = async () => {
//     const image = webcamRef.current.getScreenshot()
//     setCapturedImage(image)

//     try {
//       const res = await API.post("/face/recognize", { image })
//       if (res.data.status === "Face recognized") {
//         setStudent(res.data.student)
//       } else {
//         alert(res.data.status)
//       }
//     } catch (err) {
//       console.log(err)
//       alert("Face recognition failed")
//     }
//   }

//   const markAttendance = async () => {
//     if (!student) {
//       alert("Student not detected")
//       return
//     }

//     if (!currentClass) {
//       alert("No class running right now")
//       return
//     }

//     /* STEP 5: USE HIGH ACCURACY GPS FOR RADIUS CHECK */
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude
//         const lon = position.coords.longitude

//         try {
//           const res = await API.post("/attendance/mark", {
//             student_id: student.id,
//             timetable_id: currentClass.id,
//             latitude: lat,
//             longitude: lon
//           })

//           if (res.data.status === "success") {
//             alert("Attendance marked successfully ✅")
//           } else {
//             alert(res.data.message)
//           }
//         } catch (err) {
//           console.log(err)
//           alert("Attendance failed")
//         }
//       },
//       (error) => {
//         console.log(error)
//         alert("Location access denied or unavailable")
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0
//       }
//     )
//   }

//   return (
//     <div className="card">
//       <h2>Face Attendance</h2>
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/jpeg"
//         width={320}
//         videoConstraints={{ facingMode: "user" }}
//       />
//       <div style={{ marginTop: "10px" }}>
//         <button className="btn" onClick={startCamera}>Start Camera</button>
//         <button className="btn" onClick={captureFace}>Capture Face</button>
//       </div>

//       {capturedImage && (
//         <div style={{ marginTop: "15px" }}>
//           <h4>Captured Image</h4>
//           <img src={capturedImage} width="180" style={{ borderRadius: "10px" }} alt="Captured" />
//         </div>
//       )}

//       {student && (
//         <div className="studentCard" style={{ marginTop: "15px", padding: "10px", border: "1px solid #ccc" }}>
//           <h3>Student Detected</h3>
//           <p><b>Name:</b> {student.name}</p>
//           <p><b>USN:</b> {student.usn}</p>
//           <p><b>Section:</b> {student.section}</p>
//           {!confirmed && (
//             <button className="btn" onClick={() => setConfirmed(true)}>Yes, it's me</button>
//           )}
//         </div>
//       )}

//       {confirmed && (
//         <button className="btn" style={{ backgroundColor: "#28a745", marginTop: "15px" }} onClick={markAttendance}>
//           Mark Attendance
//         </button>
//       )}
//     </div>
//   )
// }

// import { useRef, useState } from "react"
// import Webcam from "react-webcam"
// import API from "../api/api"

// export default function FaceCapture({ currentClass }) {
//   const webcamRef = useRef(null)
//   const [capturedImage, setCapturedImage] = useState(null)
//   const [student, setStudent] = useState(null)
//   const [confirmed, setConfirmed] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const captureFace = async () => {
//     setLoading(true)
//     const image = webcamRef.current.getScreenshot()
//     setCapturedImage(image)

//     try {
//       const res = await API.post("/face/recognize", { image })
//       if (res.data.status === "Face recognized") {
//         setStudent(res.data.student)
//       } else {
//         alert(res.data.status)
//       }
//     } catch (err) {
//       alert("Face recognition failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const markAttendance = async () => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       try {
//         const res = await API.post("/attendance/mark", {
//           student_id: student.id,
//           timetable_id: currentClass.id,
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         })
//         alert(res.data.status === "success" ? "Attendance marked! ✅" : res.data.message)
//       } catch (err) { alert("Attendance failed") }
//     }, () => alert("Location denied"), { enableHighAccuracy: true });
//   }

//   return (
//     <div className="glass-card" style={{ padding: "30px", textAlign: "center", maxWidth: '450px' }}>
//       <h2 style={{ marginBottom: '20px' }}>Biometric Verification</h2>
      
//       <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', border: '2px solid var(--accent)' }}>
//         <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" width="100%" />
//         {loading && <div className="scan-line" style={scanAnim}></div>}
//       </div>

//       <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//         <button className="aesthetic-btn" style={{ flex: 1 }} onClick={captureFace}>
//           {loading ? "Scanning..." : "Capture Face"}
//         </button>
//       </div>

//       {student && (
//         <div className="glass-card" style={{ marginTop: "20px", padding: "20px", background: 'rgba(99, 102, 241, 0.1)' }}>
//           <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Student Detected</p>
//           <h3 style={{ margin: '5px 0' }}>{student.name}</h3>
//           <p style={{ margin: 0, fontWeight: 'bold' }}>{student.usn}</p>
//           {!confirmed ? (
//             <button className="aesthetic-btn" style={{ marginTop: '15px', width: '100%', background: '#22c55e' }} onClick={() => setConfirmed(true)}>
//               Confirm Identity
//             </button>
//           ) : (
//             <button className="aesthetic-btn" style={{ marginTop: '15px', width: '100%', background: 'var(--accent-gradient)' }} onClick={markAttendance}>
//               Finalize Attendance
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// const scanAnim = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '4px',
//   background: 'var(--accent)',
//   boxShadow: '0 0 15px var(--accent)',
//   animation: 'scan 2s linear infinite'
// };


import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import API from "../api/api";

export default function FaceCapture({ currentClass }) {
  const webcamRef = useRef(null);
  const [student, setStudent] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Video constraints for Mobile (Forces back/front camera correctly)
  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user" // Use "user" for front camera, "environment" for back
  };

  const captureFace = async () => {
    if (!webcamRef.current) return;
    setLoading(true);
    
    try {
      const image = webcamRef.current.getScreenshot();
      if (!image) {
        alert("Camera not ready. Please wait a moment.");
        setLoading(false);
        return;
      }

      const res = await API.post("/face/recognize", { image });
      if (res.data.status === "Face recognized") {
        setStudent(res.data.student);
      } else {
        alert(res.data.status || "Recognition failed.");
      }
    } catch (err) {
      alert("Recognition error. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    setMarking(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await API.post("/attendance/mark", {
            student_id: student.id,
            timetable_id: currentClass.id,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          if (res.data.status === "success") {
            alert("Attendance marked! ✅");
            window.location.href = "/student/dashboard";
          } else {
            alert(`Failed: ${res.data.distance}m away.`);
          }
        } catch (err) { alert("Error marking attendance."); }
        finally { setMarking(false); }
      },
      () => { alert("Location required!"); setMarking(false); },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: '#fff', marginBottom: '15px' }}>Biometric Verification</h2>
      
      {/* CAMERA BOX */}
      <div style={webcamContainer}>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={() => setCameraReady(true)}
          onUserMediaError={() => alert("Please allow camera access in browser settings!")}
          style={webcamStyle}
        />
        {!cameraReady && <div style={cameraPlaceholder}>Initializing Camera...</div>}
        {loading && <div style={scanLineStyle}></div>}
      </div>

      <div style={{ marginTop: '20px' }}>
        {!student ? (
          <button className="aesthetic-btn" style={captureBtn} onClick={captureFace} disabled={!cameraReady || loading}>
            {loading ? "SCANNING..." : "CAPTURE FACE"}
          </button>
        ) : (
          <div className="glass-card" style={resultCard}>
            <h3 style={{ color: '#4facfe', margin: '5px 0' }}>{student.name}</h3>
            <p style={{ color: '#fff', opacity: 0.8 }}>{student.usn}</p>
            
            {!confirmed ? (
              <button className="aesthetic-btn" style={{ background: '#22c55e', width: '100%' }} onClick={() => setConfirmed(true)}>
                CONFIRM IDENTITY
              </button>
            ) : (
              <button className="aesthetic-btn" style={{ background: 'var(--accent-gradient)', width: '100%' }} onClick={markAttendance} disabled={marking}>
                {marking ? "VERIFYING..." : "FINALIZE ATTENDANCE"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- NEW STYLES ---
const webcamContainer = {
  position: 'relative',
  width: '100%',
  aspectRatio: '1/1',
  borderRadius: '20px',
  overflow: 'hidden',
  background: '#000',
  border: '2px solid #4facfe'
};

const webcamStyle = { width: '100%', height: '100%', objectFit: 'cover' };

const cameraPlaceholder = {
  position: 'absolute',
  top: 0, left: 0, width: '100%', height: '100%',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  color: '#4facfe', background: '#111'
};

const scanLineStyle = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
  background: '#4facfe', boxShadow: '0 0 15px #4facfe', animation: 'scan 2s linear infinite'
};

const captureBtn = { width: '100%', padding: '15px', borderRadius: '12px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', color: '#fff', border: 'none', fontWeight: 'bold' };

const resultCard = { padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', marginTop: '10px' };