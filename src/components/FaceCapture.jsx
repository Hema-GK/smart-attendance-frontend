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

// import { useRef, useState, useCallback } from "react";
// import Webcam from "react-webcam";
// import API from "../api/api";

// export default function FaceCapture({ currentClass }) {
//   const webcamRef = useRef(null);
//   const [student, setStudent] = useState(null);
//   const [confirmed, setConfirmed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [marking, setMarking] = useState(false);
//   const [cameraReady, setCameraReady] = useState(false);

//   // Mobile-optimized constraints
//   const videoConstraints = {
//     facingMode: "user",
//     width: { ideal: 1280 },
//     height: { ideal: 720 }
//   };

//   // 1. Capture and Recognize
//   const captureFace = async () => {
//     if (!webcamRef.current) return;
//     setLoading(true);
//     const image = webcamRef.current.getScreenshot();

//     try {
//       const res = await API.post("/face/recognize", { image });
//       if (res.data.status === "Face recognized") {
//         setStudent(res.data.student);
//       } else {
//         alert(res.data.status || "Face not recognized. Try again.");
//       }
//     } catch (err) {
//       alert("Recognition error. Please check your internet.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Finalize with Distance Alert
//   const markAttendance = async () => {
//     setMarking(true);
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const res = await API.post("/attendance/mark", {
//             student_id: student.id,
//             timetable_id: currentClass.id,
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });

//           if (res.data.status === "success") {
//             alert("Attendance marked! ✅");
//             window.location.href = "/student/dashboard";
//           } else {
//             // Distance alert fix
//             const dist = res.data.distance || "unknown";
//             alert(`Attendance Failed! ❌\nYou are ${dist}m away from the room center.`);
//           }
//         } catch (err) {
//           const errorDist = err.response?.data?.distance;
//           alert(errorDist ? `Too far: ${errorDist}m away.` : "Submission failed.");
//         } finally {
//           setMarking(false);
//         }
//       },
//       () => {
//         alert("Location access denied!");
//         setMarking(false);
//       },
//       { enableHighAccuracy: true }
//     );
//   };

//   return (
//     <div className="glass-card" style={{ padding: "20px", textAlign: "center", width: '100%' }}>
//       <h2 style={{ marginBottom: '20px', color: '#fff' }}>Biometric Verification</h2>
      
//       {/* CAMERA WINDOW */}
//       <div style={webcamWrapper}>
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           onUserMedia={() => setCameraReady(true)}
//           onUserMediaError={() => alert("Camera blocked! Check HTTPS and Permissions.")}
//           style={webcamStyle}
//           playsInline
//         />
//         {!cameraReady && <div style={loadingOverlay}>Initializing Camera...</div>}
//         {loading && <div style={scanLineStyle}></div>}
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {/* STEP 1: CAPTURE */}
//         {!student && (
//           <button 
//             className="aesthetic-btn" 
//             style={captureBtnStyle} 
//             onClick={captureFace} 
//             disabled={!cameraReady || loading}
//           >
//             {loading ? "SCANNING FACE..." : "CAPTURE FACE"}
//           </button>
//         )}

//         {/* STEP 2 & 3: CONFIRM & FINALIZE */}
//         {student && (
//           <div style={resultBox}>
//             <p style={{ fontSize: '0.8rem', opacity: 0.6, color: '#fff' }}>STUDENT DETECTED</p>
//             <h3 style={{ color: '#4facfe', margin: '5px 0' }}>{student.name}</h3>
//             <p style={{ color: '#fff', fontWeight: 'bold' }}>{student.usn}</p>
            
//             {!confirmed ? (
//               <button className="aesthetic-btn" style={confirmBtn} onClick={() => setConfirmed(true)}>
//                 CONFIRM IDENTITY
//               </button>
//             ) : (
//               <button className="aesthetic-btn" style={finalizeBtn} onClick={markAttendance} disabled={marking}>
//                 {marking ? "VERIFYING..." : "FINALIZE ATTENDANCE"}
//               </button>
//             )}

//             <button style={retakeBtn} onClick={() => { setStudent(null); setConfirmed(false); }}>
//               Retake Photo
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- STYLES ---

// const webcamWrapper = {
//   position: 'relative',
//   borderRadius: '15px',
//   overflow: 'hidden',
//   background: '#000',
//   border: '2px solid #4facfe',
//   aspectRatio: '4/3'
// };

// const webcamStyle = { width: '100%', height: '100%', objectFit: 'cover' };

// const loadingOverlay = {
//   position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//   display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#4facfe', background: '#111'
// };

// const scanLineStyle = {
//   position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
//   background: '#4facfe', boxShadow: '0 0 15px #4facfe', animation: 'scan 2s linear infinite'
// };

// const captureBtnStyle = { 
//   width: '100%', padding: '15px', borderRadius: '12px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', 
//   color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' 
// };

// const resultBox = { padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' };
// const confirmBtn = { width: '100%', background: '#22c55e', color: 'white', marginTop: '10px' };
// const finalizeBtn = { width: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', color: 'white', marginTop: '10px' };
// const retakeBtn = { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' };
















// import { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import API from "../api/api";

// export default function FaceCapture({ currentClass }) {
//   const webcamRef = useRef(null);
//   const [student, setStudent] = useState(null);
//   const [confirmed, setConfirmed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [marking, setMarking] = useState(false);

//   const videoConstraints = { facingMode: "user", width: 1280, height: 720 };

//   const captureFace = async () => {
//     if (!webcamRef.current) return;
//     setLoading(true);
//     const image = webcamRef.current.getScreenshot();

//     try {
//       const res = await API.post("/face/recognize", { image });
//       if (res.data.status === "Face recognized") {
//         setStudent(res.data.student);
//       } else {
//         alert(res.data.status || "Face not recognized.");
//       }
//     } catch (err) {
//       alert("Recognition failed. check connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAttendance = async () => {
//     setMarking(true);
    
//     // 1. Get Location
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           // 2. Post to Backend
//           const res = await API.post("/attendance/mark", {
//             student_id: student.id,
//             timetable_id: currentClass.id,
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });

//           if (res.data.status === "success") {
//             alert("Attendance marked! ✅");
//             window.location.href = "/student/dashboard";
//           } else {
//             // FIX: Ensure 0 or low numbers aren't replaced by "unknown"
//             const distanceValue = res.data.distance;
//             const distanceStr = (typeof distanceValue === "number") 
//               ? `${distanceValue.toFixed(2)}m` 
//               : "an unknown distance";

//             alert(`Attendance Failed! ❌\nYou are ${distanceStr} away from the room center.`);
//           }
//         } catch (err) {
//           // Fallback for 400/500 errors
//           const errDist = err.response?.data?.distance;
//           alert(errDist ? `Too far: ${errDist}m away.` : "Internal Server Error.");
//         } finally {
//           setMarking(false);
//         }
//       },
//       (error) => {
//         alert("Location access denied! GPS is required.");
//         setMarking(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   return (
//     <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
//       <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '2px solid #4facfe' }}>
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           style={{ width: '100%', display: 'block' }}
//         />
//         {loading && <div className="scan-line"></div>}
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {!student ? (
//           <button onClick={captureFace} style={btnPrimary} disabled={loading}>
//             {loading ? "SCANNING..." : "CAPTURE FACE"}
//           </button>
//         ) : (
//           <div style={resultContainer}>
//             <p style={{ color: '#4facfe', fontWeight: 'bold' }}>{student.name}</p>
//             {!confirmed ? (
//               <button onClick={() => setConfirmed(true)} style={btnConfirm}>CONFIRM IDENTITY</button>
//             ) : (
//               <button onClick={markAttendance} style={btnFinal} disabled={marking}>
//                 {marking ? "VERIFYING LOCATION..." : "FINALIZE ATTENDANCE"}
//               </button>
//             )}
//             <button onClick={() => { setStudent(null); setConfirmed(false); }} style={btnLink}>Retake</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Simple styles to ensure visibility
// const btnPrimary = { width: '100%', padding: '15px', background: '#4facfe', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' };
// const btnConfirm = { width: '100%', padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', marginTop: '10px' };
// const btnFinal = { width: '100%', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', marginTop: '10px' };
// const btnLink = { background: 'none', color: '#94a3b8', border: 'none', marginTop: '10px', textDecoration: 'underline', cursor: 'pointer' };
// const resultContainer = { padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' };









// import { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import API from "../api/api";

// export default function FaceCapture({ currentClass }) {
//   const webcamRef = useRef(null);
//   const [student, setStudent] = useState(null);
//   const [confirmed, setConfirmed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [marking, setMarking] = useState(false);
//   const [cameraReady, setCameraReady] = useState(false);

//   const videoConstraints = {
//     facingMode: "user",
//     width: { ideal: 1280 },
//     height: { ideal: 720 }
//   };

//   // 1. Capture and Recognize Face
//   const captureFace = async () => {
//     if (!webcamRef.current) return;
//     setLoading(true);
//     const image = webcamRef.current.getScreenshot();

//     try {
//       const res = await API.post("/face/recognize", { image });
//       if (res.data.status === "Face recognized") {
//         setStudent(res.data.student);
//       } else {
//         alert(res.data.status || "Face not recognized. Please adjust lighting.");
//       }
//     } catch (err) {
//       alert("Recognition error. Check your server connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Finalize Attendance with Distance Logic
//   const markAttendance = async () => {
//     setMarking(true);
    
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const res = await API.post("/attendance/mark", {
//             student_id: student.id,
//             timetable_id: currentClass.id,
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });

//           if (res.data.status === "success") {
//             alert("Attendance marked! ✅");
//             window.location.href = "/student/dashboard";
//           } else {
//             // FIX: Prevent the "unknownm" error by checking if distance is a number
//             const dist = res.data.distance;
//             const distanceDisplay = (typeof dist === 'number') 
//               ? `${dist.toFixed(2)}m` 
//               : "an unverified distance";

//             alert(`Attendance Failed! ❌\nYou are ${distanceDisplay} away from the room center.`);
//           }
//         } catch (err) {
//           const errorDist = err.response?.data?.distance;
//           alert(errorDist ? `Too far: ${errorDist}m away.` : "Submission failed. Please try again.");
//         } finally {
//           setMarking(false);
//         }
//       },
//       () => {
//         alert("Location access denied! GPS is required to verify you are in the classroom.");
//         setMarking(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000,maximumAge:0 }
//     );
//   };

//   return (
//     <div style={{ textAlign: "center", width: '100%' }}>
//       <h3 style={{ marginBottom: '15px', color: '#fff', fontSize: '1rem' }}>Biometric Verification</h3>
      
//       {/* CAMERA WINDOW */}
//       <div style={webcamWrapper}>
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           onUserMedia={() => setCameraReady(true)}
//           style={webcamStyle}
//           playsInline
//         />
//         {!cameraReady && <div style={loadingOverlay}>Initializing Camera...</div>}
//         {loading && <div className="scan-line" style={scanLineStyle}></div>}
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {!student ? (
//           <button 
//             className="btn-primary" 
//             style={{ width: '100%' }} 
//             onClick={captureFace} 
//             disabled={!cameraReady || loading}
//           >
//             {loading ? "SCANNING FACE..." : "CAPTURE FACE"}
//           </button>
//         ) : (
//           <div style={resultBox}>
//             <p style={{ fontSize: '0.7rem', opacity: 0.6, color: '#fff', textTransform: 'uppercase' }}>Identity Detected</p>
//             <h3 style={{ color: '#4facfe', margin: '5px 0' }}>{student.name}</h3>
//             <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '15px' }}>{student.usn}</p>
            
//             {!confirmed ? (
//               <button className="btn-primary" style={{ width: '100%', background: '#22c55e' }} onClick={() => setConfirmed(true)}>
//                 CONFIRM IDENTITY
//               </button>
//             ) : (
//               <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} onClick={markAttendance} disabled={marking}>
//                 {marking ? "VERIFYING LOCATION..." : "FINALIZE ATTENDANCE"}
//               </button>
//             )}

//             <button style={retakeBtn} onClick={() => { setStudent(null); setConfirmed(false); }}>
//               Not you? Retake Photo
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- INTERNAL STYLES ---

// const webcamWrapper = {
//   position: 'relative',
//   borderRadius: '12px',
//   overflow: 'hidden',
//   background: '#000',
//   border: '2px solid rgba(79, 172, 254, 0.5)',
//   aspectRatio: '4/3'
// };

// const webcamStyle = { width: '100%', height: '100%', objectFit: 'cover' };

// const loadingOverlay = {
//   position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//   display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#4facfe', background: '#020617'
// };

// const scanLineStyle = {
//   position: 'absolute', left: 0, width: '100%', height: '2px',
//   background: '#4facfe', boxShadow: '0 0 10px #4facfe', zIndex: 10,
//   animation: 'scan 2s linear infinite'
// };

// const resultBox = { 
//   padding: '20px', 
//   background: 'rgba(255,255,255,0.03)', 
//   borderRadius: '12px', 
//   border: '1px solid rgba(255,255,255,0.1)' 
// };

// const retakeBtn = { 
//   background: 'none', 
//   border: 'none', 
//   color: 'rgba(255,255,255,0.4)', 
//   marginTop: '15px', 
//   cursor: 'pointer', 
//   fontSize: '0.8rem',
//   textDecoration: 'underline' 
// };


// import { useRef, useState, useEffect } from "react"; // Added useEffect
// import Webcam from "react-webcam";
// import API from "../api/api";

// export default function FaceCapture({ currentClass }) {
//   const webcamRef = useRef(null);
//   const [student, setStudent] = useState(null);
//   const [confirmed, setConfirmed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [marking, setMarking] = useState(false);
//   const [cameraReady, setCameraReady] = useState(false);
  
//   // --- ADDED FOR GPS STABILIZATION ---
//   const [canFinalize, setCanFinalize] = useState(false);
//   const [countdown, setCountdown] = useState(10);

//   useEffect(() => {
//     let timer;
//     if (confirmed && countdown > 0) {
//       timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     } else if (countdown === 0) {
//       setCanFinalize(true);
//       clearInterval(timer);
//     }
//     return () => clearInterval(timer);
//   }, [confirmed, countdown]);
//   // -----------------------------------

//   const videoConstraints = {
//     facingMode: "user",
//     width: { ideal: 1280 },
//     height: { ideal: 720 }
//   };

//   const captureFace = async () => {
//     if (!webcamRef.current) return;
//     setLoading(true);
//     const image = webcamRef.current.getScreenshot();

//     try {
//       const res = await API.post("/face/recognize", { image });
//       if (res.data.status === "Face recognized") {
//         setStudent(res.data.student);
//       } else {
//         alert(res.data.status || "Face not recognized. Please adjust lighting.");
//       }
//     } catch (err) {
//       alert("Recognition error. Check your server connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAttendance = async () => {
//     setMarking(true);
    
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const res = await API.post("/attendance/mark", {
//             student_id: student.id,
//             timetable_id: currentClass.id,
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });

//           if (res.data.status === "success") {
//             alert("Attendance marked! ✅");
//             window.location.href = "/student/dashboard";
//           } else {
//             const dist = res.data.distance;
//             const distanceDisplay = (typeof dist === 'number') 
//               ? `${dist.toFixed(2)}m` 
//               : "an unverified distance";

//             alert(`Attendance Failed! ❌\nYou are ${distanceDisplay} away from the room center.`);
//           }
//         } catch (err) {
//           const errorDist = err.response?.data?.distance;
//           alert(errorDist ? `Too far: ${errorDist}m away.` : "Submission failed. Please try again.");
//         } finally {
//           setMarking(false);
//         }
//       },
//       () => {
//         alert("Location access denied! GPS is required to verify you are in the classroom.");
//         setMarking(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//     );
//   };

//   return (
//     <div style={{ textAlign: "center", width: '100%' }}>
//       <h3 style={{ marginBottom: '15px', color: '#fff', fontSize: '1rem' }}>Biometric Verification</h3>
      
//       <div style={webcamWrapper}>
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           onUserMedia={() => setCameraReady(true)}
//           style={webcamStyle}
//           playsInline
//         />
//         {!cameraReady && <div style={loadingOverlay}>Initializing Camera...</div>}
//         {loading && <div className="scan-line" style={scanLineStyle}></div>}
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {!student ? (
//           <button 
//             className="btn-primary" 
//             style={{ width: '100%' }} 
//             onClick={captureFace} 
//             disabled={!cameraReady || loading}
//           >
//             {loading ? "SCANNING FACE..." : "CAPTURE FACE"}
//           </button>
//         ) : (
//           <div style={resultBox}>
//             <p style={{ fontSize: '0.7rem', opacity: 0.6, color: '#fff', textTransform: 'uppercase' }}>Identity Detected</p>
//             <h3 style={{ color: '#4facfe', margin: '5px 0' }}>{student.name}</h3>
//             <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '15px' }}>{student.usn}</p>
            
//             {!confirmed ? (
//               <button 
//                 className="btn-primary" 
//                 style={{ width: '100%', background: '#22c55e' }} 
//                 onClick={() => setConfirmed(true)}
//               >
//                 CONFIRM IDENTITY
//               </button>
//             ) : (
//               <button 
//                 className="btn-primary" 
//                 style={{ 
//                     width: '100%', 
//                     background: canFinalize ? 'linear-gradient(90deg, #6366f1, #a855f7)' : '#4b5563',
//                     cursor: canFinalize ? 'pointer' : 'not-allowed'
//                 }} 
//                 onClick={markAttendance} 
//                 disabled={!canFinalize || marking}
//               >
//                 {marking ? "VERIFYING..." : (canFinalize ? "FINALIZE ATTENDANCE" : `STABILIZING GPS (${countdown}s)`)}
//               </button>
//             )}

//             <button style={retakeBtn} onClick={() => { setStudent(null); setConfirmed(false); setCanFinalize(false); setCountdown(10); }}>
//               Not you? Retake Photo
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- INTERNAL STYLES (Unchanged) ---
// const webcamWrapper = { position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#000', border: '2px solid rgba(79, 172, 254, 0.5)', aspectRatio: '4/3' };
// const webcamStyle = { width: '100%', height: '100%', objectFit: 'cover' };
// const loadingOverlay = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#4facfe', background: '#020617' };
// const scanLineStyle = { position: 'absolute', left: 0, width: '100%', height: '2px', background: '#4facfe', boxShadow: '0 0 10px #4facfe', zIndex: 10, animation: 'scan 2s linear infinite' };
// const resultBox = { padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' };
// const retakeBtn = { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', marginTop: '15px', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' };





import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import API from "../api/api";

/** * CRITICAL FIX FOR VERCEL BUILD:
 * We do NOT use a top-level import for Capacitor plugins.
 * This prevents Rollup from failing to resolve the module during the web build.
 */
let Wifi = null;
if (typeof window !== "undefined") {
  import('capacitor-wifi').then(mod => {
    Wifi = mod.Wifi;
  }).catch(() => {
    console.log("Wifi plugin not available in this environment (Browser/Vercel).");
  });
}

export default function FaceCapture({ currentClass }) {
  const webcamRef = useRef(null);
  const [student, setStudent] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [canFinalize, setCanFinalize] = useState(false);
  const [countdown, setCountdown] = useState(5); // 5 seconds is enough for GPS calibration

  useEffect(() => {
    let timer;
    if (confirmed && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanFinalize(true);
    }
    return () => clearInterval(timer);
  }, [confirmed, countdown]);

  const captureFace = async () => {
    if (!webcamRef.current) return;
    setLoading(true);
    const image = webcamRef.current.getScreenshot();
    try {
      const res = await API.post("/face/recognize", { image });
      if (res.data.status === "Face recognized") {
        setStudent(res.data.student);
      } else {
        alert(res.data.status || "Face not recognized.");
      }
    } catch (err) {
      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    setMarking(true);
    
    // Default fallback values (will fail backend check, which is correct for web/unauthorized tests)
    let currentBSSID = "00:00:00:00:00:00";
    let currentRSSI = -100; 

    try {
      /**
       * HARDWARE CHECK:
       * Only attempts to fetch WiFi data if the plugin loaded successfully (Android).
       */
      if (Wifi && typeof Wifi.getIPInfo === 'function') {
        const wifiInfo = await Wifi.getIPInfo(); 
        currentBSSID = wifiInfo.bssid || "00:00:00:00:00:00";
        currentRSSI = wifiInfo.signalLevel || -100; 
      }
    } catch (err) {
      console.warn("Hardware scan skipped. Running in browser mode.");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await API.post("/attendance/mark", {
            student_id: student.id,
            timetable_id: currentClass.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            bssid: currentBSSID,
            rssi: currentRSSI 
          });

          if (res.data.status === "success") {
            alert("Attendance marked successfully! ✅");
            window.location.href = "/student/dashboard";
          } else {
            // Displays specific failure: "Signal too weak", "Wrong BSSID", etc.
            alert(`Verification Failed: ${res.data.message}`);
          }
        } catch (err) {
          alert(err.response?.data?.message || "Server error.");
        } finally {
          setMarking(false);
        }
      },
      (error) => {
        alert("GPS error: Please enable Location services and try again.");
        setMarking(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  return (
    <div style={containerStyle}>
      <div style={webcamWrapper}>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          onUserMedia={() => setCameraReady(true)}
          style={webcamStyle}
          videoConstraints={{ facingMode: "user" }}
          playsInline
        />
        {!cameraReady && <div style={loadingOverlay}>Initializing Camera...</div>}
        {loading && <div style={scanLineStyle}></div>}
      </div>

      <div style={{ marginTop: '20px' }}>
        {!student ? (
          <button className="btn-primary" onClick={captureFace} disabled={!cameraReady || loading}>
            {loading ? "SCANNING FACE..." : "START SCAN"}
          </button>
        ) : (
          <div style={resultBox}>
            <p style={welcomeText}>Welcome, <span style={{color: '#4facfe'}}>{student.name}</span></p>
            {!confirmed ? (
              <button className="btn-primary" style={{ background: '#22c55e' }} onClick={() => setConfirmed(true)}>
                CONFIRM IDENTITY
              </button>
            ) : (
              <button 
                className="btn-primary" 
                style={{ 
                  background: canFinalize ? '#6366f1' : '#4b5563', 
                  cursor: canFinalize ? 'pointer' : 'not-allowed',
                  transition: 'background 0.3s ease'
                }} 
                onClick={markAttendance} 
                disabled={!canFinalize || marking}
              >
                {marking ? "VERIFYING..." : (canFinalize ? "SUBMIT ATTENDANCE" : `CALIBRATING GPS (${countdown}s)`)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// STYLES (Kept consistent with your UI)
const containerStyle = { textAlign: "center", width: '100%', maxWidth: '500px', margin: '0 auto' };
const webcamWrapper = { position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000', border: '2px solid rgba(74, 158, 255, 0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', aspectRatio: '4/3' };
const webcamStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const loadingOverlay = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#4facfe', background: '#020617', fontSize: '1.1rem' };
const scanLineStyle = { position: 'absolute', left: 0, width: '100%', height: '3px', background: '#4facfe', boxShadow: '0 0 15px #4facfe', zIndex: 10, animation: 'scan 2s linear infinite' };
const resultBox = { padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' };
const welcomeText = { fontSize: '1.2rem', marginBottom: '15px', fontWeight: '500', color: 'white' };