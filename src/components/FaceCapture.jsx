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

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import API from "../api/api";

export default function FaceCapture({ currentClass }) {
  const webcamRef = useRef(null);
  const [student, setStudent] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Mobile-optimized constraints
  const videoConstraints = {
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };

  // 1. Capture and Recognize
  const captureFace = async () => {
    if (!webcamRef.current) return;
    setLoading(true);
    const image = webcamRef.current.getScreenshot();

    try {
      const res = await API.post("/face/recognize", { image });
      if (res.data.status === "Face recognized") {
        setStudent(res.data.student);
      } else {
        alert(res.data.status || "Face not recognized. Try again.");
      }
    } catch (err) {
      alert("Recognition error. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Finalize with Distance Alert
  const markAttendance = async () => {
    setMarking(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await API.post("/attendance/mark", {
            student_id: student.id,
            timetable_id: currentClass.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });

          if (res.data.status === "success") {
            alert("Attendance marked! ✅");
            window.location.href = "/student/dashboard";
          } else {
            // Distance alert fix
            const dist = res.data.distance || "unknown";
            alert(`Attendance Failed! ❌\nYou are ${dist}m away from the room center.`);
          }
        } catch (err) {
          const errorDist = err.response?.data?.distance;
          alert(errorDist ? `Too far: ${errorDist}m away.` : "Submission failed.");
        } finally {
          setMarking(false);
        }
      },
      () => {
        alert("Location access denied!");
        setMarking(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="glass-card" style={{ padding: "20px", textAlign: "center", width: '100%' }}>
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>Biometric Verification</h2>
      
      {/* CAMERA WINDOW */}
      <div style={webcamWrapper}>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={() => setCameraReady(true)}
          onUserMediaError={() => alert("Camera blocked! Check HTTPS and Permissions.")}
          style={webcamStyle}
          playsInline
        />
        {!cameraReady && <div style={loadingOverlay}>Initializing Camera...</div>}
        {loading && <div style={scanLineStyle}></div>}
      </div>

      <div style={{ marginTop: '20px' }}>
        {/* STEP 1: CAPTURE */}
        {!student && (
          <button 
            className="aesthetic-btn" 
            style={captureBtnStyle} 
            onClick={captureFace} 
            disabled={!cameraReady || loading}
          >
            {loading ? "SCANNING FACE..." : "CAPTURE FACE"}
          </button>
        )}

        {/* STEP 2 & 3: CONFIRM & FINALIZE */}
        {student && (
          <div style={resultBox}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, color: '#fff' }}>STUDENT DETECTED</p>
            <h3 style={{ color: '#4facfe', margin: '5px 0' }}>{student.name}</h3>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>{student.usn}</p>
            
            {!confirmed ? (
              <button className="aesthetic-btn" style={confirmBtn} onClick={() => setConfirmed(true)}>
                CONFIRM IDENTITY
              </button>
            ) : (
              <button className="aesthetic-btn" style={finalizeBtn} onClick={markAttendance} disabled={marking}>
                {marking ? "VERIFYING..." : "FINALIZE ATTENDANCE"}
              </button>
            )}

            <button style={retakeBtn} onClick={() => { setStudent(null); setConfirmed(false); }}>
              Retake Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- STYLES ---

const webcamWrapper = {
  position: 'relative',
  borderRadius: '15px',
  overflow: 'hidden',
  background: '#000',
  border: '2px solid #4facfe',
  aspectRatio: '4/3'
};

const webcamStyle = { width: '100%', height: '100%', objectFit: 'cover' };

const loadingOverlay = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#4facfe', background: '#111'
};

const scanLineStyle = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
  background: '#4facfe', boxShadow: '0 0 15px #4facfe', animation: 'scan 2s linear infinite'
};

const captureBtnStyle = { 
  width: '100%', padding: '15px', borderRadius: '12px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', 
  color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' 
};

const resultBox = { padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' };
const confirmBtn = { width: '100%', background: '#22c55e', color: 'white', marginTop: '10px' };
const finalizeBtn = { width: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', color: 'white', marginTop: '10px' };
const retakeBtn = { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' };