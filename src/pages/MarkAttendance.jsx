// import { useState, useEffect } from "react"
// import FaceCapture from "../components/FaceCapture"
// import API from "../api/api"

// export default function MarkAttendance() {
//   const [currentClass, setCurrentClass] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     API.get("/timetable/current-class")
//       .then(res => {
//         if (res.data.status === "Class Active") {
//           setCurrentClass(res.data.class)
//         }
//         setLoading(false)
//       })
//       .catch(err => {
//         console.log(err)
//         setLoading(false)
//       })
//   }, [])

//   /* ---------------- LOADING SCREEN ---------------- */
//   if (loading) {
//     return (
//       <div style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "linear-gradient(135deg,#667eea,#764ba2)"
//       }}>
//         <h2 style={{ color: "white" }}>Checking Current Class...</h2>
//       </div>
//     )
//   }

//   /* ---------------- NO CLASS ---------------- */
//   if (!currentClass) {
//     return (
//       <div style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "linear-gradient(135deg,#667eea,#764ba2)"
//       }}>
//         <div style={{
//           background: "rgba(255,255,255,0.15)",
//           backdropFilter: "blur(10px)",
//           padding: "40px",
//           borderRadius: "15px",
//           color: "white",
//           textAlign: "center",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
//         }}>
//           <h2>No Class Currently Running</h2>
//           <p>Please try again during class time.</p>
//         </div>
//       </div>
//     )
//   }

//   /* ---------------- MAIN PAGE ---------------- */
//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg,#667eea,#764ba2)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "column"
//     }}>
//       {/* CURRENT CLASS CARD */}
//       <div style={{
//         background: "rgba(255,255,255,0.15)",
//         backdropFilter: "blur(12px)",
//         padding: "30px",
//         borderRadius: "15px",
//         color: "white",
//         textAlign: "center",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//         marginBottom: "30px",
//         width: "350px"
//       }}>
//         <h2>Current Class</h2>
//         <p><b>Subject:</b> {currentClass.subject}</p>
//         <p><b>Section:</b> {currentClass.section}</p>
//         <p><b>Semester:</b> {currentClass.semester}</p>
//         <p><b>Room:</b> {currentClass.classroom}</p>
//       </div>

//       {/* FACE ATTENDANCE */}
//       <FaceCapture currentClass={currentClass} />
//     </div>
//   )
// }



// import { useState, useEffect } from "react";
// import FaceCapture from "../components/FaceCapture";
// import API from "../api/api";

// export default function MarkAttendance() {
//   const [currentClass, setCurrentClass] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     API.get("/timetable/current-class")
//       .then(res => {
//         if (res.data.status === "Class Active") {
//           setCurrentClass(res.data.class);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   // --- LOADING SCREEN ---
//   if (loading) {
//     return (
//       <div style={containerStyle}>
//         <div className="glass-card" style={{padding: '40px', textAlign: 'center'}}>
//           <div className="spinner" style={spinnerStyle}></div>
//           <h2 style={{ color: "white", marginTop: '20px' }}>Verifying Schedule...</h2>
//         </div>
//       </div>
//     );
//   }

//   // --- NO CLASS RUNNING ---
//   if (!currentClass) {
//     return (
//       <div style={containerStyle}>
//         <div className="glass-card" style={{ padding: "40px", color: "white", textAlign: "center", maxWidth: '400px' }}>
//           <h2 style={{color: '#ff4d4d'}}>No Active Session</h2>
//           <p style={{opacity: 0.7, marginTop: '10px'}}>There are no classes scheduled for your section at this moment.</p>
//           <button onClick={() => window.location.reload()} style={retryBtn}>Check Again</button>
//         </div>
//       </div>
//     );
//   }

//   // --- MAIN ATTENDANCE PAGE ---
//   return (
//     <div style={containerStyle}>
//       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '500px'}}>
        
//         {/* INFO CARD */}
//         <div className="glass-card" style={{ width: "100%", textAlign: "center", borderLeft: '4px solid #4facfe' }}>
//           <span style={badgeStyle}>Live Session</span>
//           <h2 style={{fontSize: '1.8rem', margin: '10px 0'}}>{currentClass.subject}</h2>
//           <div style={infoGrid}>
//             <p><b>Section:</b> {currentClass.section}</p>
//             <p><b>Room:</b> {currentClass.classroom}</p>
//           </div>
//         </div>

//         {/* FACE CAPTURE COMPONENT */}
//         <div className="glass-card" style={{width: '100%', padding: '10px'}}>
//              <FaceCapture currentClass={currentClass} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- STYLES ---
// const containerStyle = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "20px"
// };

// const badgeStyle = {
//     background: 'rgba(79, 172, 254, 0.2)',
//     color: '#4facfe',
//     padding: '4px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: 'bold',
//     textTransform: 'uppercase'
// };

// const infoGrid = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     marginTop: '15px',
//     fontSize: '14px',
//     opacity: 0.8
// };

// const retryBtn = {
//     marginTop: '20px',
//     padding: '10px 20px',
//     background: 'rgba(255,255,255,0.1)',
//     border: '1px solid rgba(255,255,255,0.2)',
//     color: 'white',
//     borderRadius: '8px',
//     cursor: 'pointer'
// };

// const spinnerStyle = {
//     width: '40px',
//     height: '40px',
//     border: '4px solid rgba(255,255,255,0.1)',
//     borderTop: '4px solid #4facfe',
//     borderRadius: '50%',
//     margin: '0 auto',
//     animation: 'spin 1s linear infinite'
// };


// import { useState, useEffect } from "react";
// import FaceCapture from "../components/FaceCapture";
// import API from "../api/api";

// export default function MarkAttendance() {
//   const [currentClass, setCurrentClass] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Initial check to see if any class is active in the timetable
//     API.get("/timetable/current-class")
//       .then(res => {
//         if (res.data.status === "Class Active") {
//           setCurrentClass(res.data.class);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Schedule Verification Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   // --- LOADING SCREEN ---
//   if (loading) {
//     return (
//       <div style={containerStyle}>
//         <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
//           <div className="spinner" style={spinnerStyle}></div>
//           <h2 style={{ color: "white", marginTop: '20px', letterSpacing: '1px' }}>
//             VERIFYING SCHEDULE...
//           </h2>
//           <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '10px' }}>
//             Syncing with institutional server
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --- NO CLASS RUNNING ---
//   if (!currentClass) {
//     return (
//       <div style={containerStyle}>
//         <div className="glass-card" style={{ padding: "40px", color: "white", textAlign: "center", maxWidth: '400px' }}>
//           <div style={{ fontSize: '50px', marginBottom: '15px' }}>⏳</div>
//           <h2 style={{ color: '#ff4d4d', marginBottom: '10px' }}>No Active Session</h2>
//           <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: '1.6' }}>
//             There are no classes scheduled for your section at this moment. 
//             Please ensure you are within the allocated timetable slot.
//           </p>
//           <button 
//             onClick={() => window.location.reload()} 
//             style={retryBtn}
//             onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
//             onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
//           >
//             Refresh Status
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- MAIN ATTENDANCE PAGE ---
//   return (
//     <div style={containerStyle}>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '500px' }}>
        
//         {/* SESSION INFO CARD */}
//         <div className="glass-card" style={{ width: "100%", textAlign: "center", borderLeft: '4px solid #4facfe', position: 'relative', overflow: 'hidden' }}>
//           <div style={glowEffect}></div>
//           <span style={badgeStyle}>Live Session</span>
//           <h2 style={{ fontSize: '1.8rem', margin: '15px 0 5px 0', color: '#fff' }}>
//             {currentClass.subject}
//           </h2>
//           <div style={infoGrid}>
//             <div style={infoItem}>
//               <span style={labelStyle}>SECTION</span>
//               <p style={valueStyle}>{currentClass.section}</p>
//             </div>
//             <div style={infoItem}>
//               <span style={labelStyle}>ROOM</span>
//               <p style={valueStyle}>{currentClass.classroom}</p>
//             </div>
//           </div>
//         </div>

//         {/* BIOMETRIC CAPTURE AREA */}
//         <div className="glass-card" style={{ width: '100%', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
//              {/* NOTE: The distance alert logic we discussed is handled 
//                 inside the FaceCapture component when it calls the backend.
//              */}
//              <FaceCapture currentClass={currentClass} />
//         </div>

//         <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', textAlign: 'center' }}>
//           SECURE BIOMETRIC GATEWAY • ENCRYPTED DATA
//         </p>
//       </div>
//     </div>
//   );
// }

// // --- STYLES ---

// const containerStyle = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "20px",
//   background: "#0f172a" // Deep navy background to pop the glass cards
// };

// const glowEffect = {
//   position: 'absolute',
//   top: '-50%',
//   left: '-50%',
//   width: '200%',
//   height: '200%',
//   background: 'radial-gradient(circle, rgba(79, 172, 254, 0.05) 0%, transparent 70%)',
//   pointerEvents: 'none'
// };

// const badgeStyle = {
//   background: 'rgba(79, 172, 254, 0.15)',
//   color: '#4facfe',
//   padding: '5px 14px',
//   borderRadius: '20px',
//   fontSize: '11px',
//   fontWeight: '800',
//   textTransform: 'uppercase',
//   letterSpacing: '1px'
// };

// const infoGrid = {
//   display: 'flex',
//   justifyContent: 'center',
//   gap: '40px',
//   marginTop: '20px',
//   padding: '10px 0'
// };

// const infoItem = { display: 'flex', flexDirection: 'column', gap: '5px' };
// const labelStyle = { fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', letterSpacing: '0.5px' };
// const valueStyle = { fontSize: '16px', color: '#fff', fontWeight: '600', margin: 0 };

// const retryBtn = {
//   marginTop: '25px',
//   padding: '12px 24px',
//   background: 'rgba(255,255,255,0.1)',
//   border: '1px solid rgba(255,255,255,0.15)',
//   color: 'white',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   fontWeight: 'bold',
//   transition: 'all 0.3s ease'
// };

// const spinnerStyle = {
//   width: '45px',
//   height: '45px',
//   border: '3px solid rgba(255,255,255,0.05)',
//   borderTop: '3px solid #4facfe',
//   borderRadius: '50%',
//   margin: '0 auto',
//   animation: 'spin 1s linear infinite'
// };


// import { useState, useEffect } from "react";
// import FaceCapture from "../components/FaceCapture";
// import API from "../api/api";

// export default function MarkAttendance() {
//   const [currentClass, setCurrentClass] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Initial check to see if any class is active in the timetable
//     API.get("/timetable/current-class")
//       .then(res => {
//         if (res.data.status === "Class Active") {
//           setCurrentClass(res.data.class);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Schedule Verification Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   // --- LOADING SCREEN ---
//   if (loading) {
//     return (
//       <div style={containerStyle}>
//         <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
//           <div className="spinner" style={spinnerStyle}></div>
//           <h2 style={{ color: "white", marginTop: '20px', letterSpacing: '1px' }}>
//             VERIFYING SCHEDULE...
//           </h2>
//           <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '10px' }}>
//             Syncing with institutional server
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --- NO CLASS RUNNING ---
//   if (!currentClass) {
//     return (
//       <div style={containerStyle}>
//         <div className="glass-card" style={{ padding: "40px", color: "white", textAlign: "center", maxWidth: '400px' }}>
//           <div style={{ fontSize: '50px', marginBottom: '15px' }}>⏳</div>
//           <h2 style={{ color: '#ff4d4d', marginBottom: '10px' }}>No Active Session</h2>
//           <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: '1.6' }}>
//             There are no classes scheduled for your section at this moment. 
//             Please ensure you are within the allocated timetable slot.
//           </p>
//           <button 
//             onClick={() => window.location.reload()} 
//             style={retryBtn}
//             onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
//             onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
//           >
//             Refresh Status
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- MAIN ATTENDANCE PAGE ---
//   return (
//     <div style={containerStyle}>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '500px' }}>
        
//         {/* SESSION INFO CARD */}
//         <div className="glass-card" style={{ width: "100%", textAlign: "center", borderLeft: '4px solid #4facfe', position: 'relative', overflow: 'hidden' }}>
//           <div style={glowEffect}></div>
//           <span style={badgeStyle}>Live Session</span>
//           <h2 style={{ fontSize: '1.8rem', margin: '15px 0 5px 0', color: '#fff' }}>
//             {currentClass.subject}
//           </h2>
//           <div style={infoGrid}>
//             <div style={infoItem}>
//               <span style={labelStyle}>SECTION</span>
//               <p style={valueStyle}>{currentClass.section}</p>
//             </div>
//             <div style={infoItem}>
//               <span style={labelStyle}>ROOM</span>
//               <p style={valueStyle}>{currentClass.classroom}</p>
//             </div>
//           </div>
//         </div>

//         {/* BIOMETRIC CAPTURE AREA */}
//         <div className="glass-card" style={{ width: '100%', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
//              {/* Pass currentClass down to FaceCapture.
//                 The distance 'unknown' fix is handled in FaceCapture's markAttendance function
//                 by checking if(typeof res.data.distance === 'number')
//              */}
//              <FaceCapture currentClass={currentClass} />
//         </div>

//         <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', textAlign: 'center' }}>
//           SECURE BIOMETRIC GATEWAY • ENCRYPTED DATA
//         </p>
//       </div>

//       {/* Global CSS for the Scanning Animation and Spinner */}
//       <style>{`
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         @keyframes scan {
//           0% { top: 0; }
//           50% { top: 100%; }
//           100% { top: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // --- STYLES ---

// const containerStyle = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "20px",
//   background: "#0f172a" 
// };

// const glowEffect = {
//   position: 'absolute',
//   top: '-50%',
//   left: '-50%',
//   width: '200%',
//   height: '200%',
//   background: 'radial-gradient(circle, rgba(79, 172, 254, 0.05) 0%, transparent 70%)',
//   pointerEvents: 'none'
// };

// const badgeStyle = {
//   background: 'rgba(79, 172, 254, 0.15)',
//   color: '#4facfe',
//   padding: '5px 14px',
//   borderRadius: '20px',
//   fontSize: '11px',
//   fontWeight: '800',
//   textTransform: 'uppercase',
//   letterSpacing: '1px'
// };

// const infoGrid = {
//   display: 'flex',
//   justifyContent: 'center',
//   gap: '40px',
//   marginTop: '20px',
//   padding: '10px 0'
// };

// const infoItem = { display: 'flex', flexDirection: 'column', gap: '5px' };
// const labelStyle = { fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', letterSpacing: '0.5px' };
// const valueStyle = { fontSize: '16px', color: '#fff', fontWeight: '600', margin: 0 };

// const retryBtn = {
//   marginTop: '25px',
//   padding: '12px 24px',
//   background: 'rgba(255,255,255,0.1)',
//   border: '1px solid rgba(255,255,255,0.15)',
//   color: 'white',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   fontWeight: 'bold',
//   transition: 'all 0.3s ease'
// };

// const spinnerStyle = {
//   width: '45px',
//   height: '45px',
//   border: '3px solid rgba(255,255,255,0.05)',
//   borderTop: '3px solid #4facfe',
//   borderRadius: '50%',
//   margin: '0 auto'
// };

import { useState, useEffect } from "react";
import FaceCapture from "../components/FaceCapture";
import API from "../api/api";

export default function MarkAttendance() {
  const [currentClass, setCurrentClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/timetable/current-class")
      .then(res => {
        if (res.data.status === "Class Active") {
          setCurrentClass(res.data.class);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Schedule Verification Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={containerStyle}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div className="spinner" style={spinnerStyle}></div>
          <h2 style={{ color: "white", marginTop: '20px', letterSpacing: '1px' }}>
            VERIFYING SCHEDULE...
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '10px' }}>
            Syncing with institutional server
          </p>
        </div>
      </div>
    );
  }

  if (!currentClass) {
    return (
      <div style={containerStyle}>
        <div className="glass-card" style={{ padding: "40px", color: "white", textAlign: "center", maxWidth: '400px' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>⏳</div>
          <h2 style={{ color: '#ff4d4d', marginBottom: '10px' }}>No Active Session</h2>
          <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: '1.6' }}>
            There are no classes scheduled for your section at this moment. 
            Please ensure you are within the allocated timetable slot.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={retryBtn}
          >
            Refresh Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '500px' }}>
        
        <div className="glass-card" style={{ width: "100%", textAlign: "center", borderLeft: '4px solid #4facfe', position: 'relative', overflow: 'hidden' }}>
          <div style={glowEffect}></div>
          <span style={badgeStyle}>Live Session</span>
          <h2 style={{ fontSize: '1.8rem', margin: '15px 0 5px 0', color: '#fff' }}>
            {currentClass.subject}
          </h2>
          <div style={infoGrid}>
            <div style={infoItem}>
              <span style={labelStyle}>SECTION</span>
              <p style={valueStyle}>{currentClass.section || "N/A"}</p>
            </div>
            <div style={infoItem}>
              <span style={labelStyle}>ROOM</span>
              <p style={valueStyle}>{currentClass.classroom}</p>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ width: '100%', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <FaceCapture currentClass={currentClass} />
        </div>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', textAlign: 'center' }}>
          SECURE BIOMETRIC GATEWAY • ENCRYPTED DATA
        </p>
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
}

// --- STYLES (Unchanged) ---
const containerStyle = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", background: "#0f172a" };
const glowEffect = { position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(79, 172, 254, 0.05) 0%, transparent 70%)', pointerEvents: 'none' };
const badgeStyle = { background: 'rgba(79, 172, 254, 0.15)', color: '#4facfe', padding: '5px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' };
const infoGrid = { display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '20px', padding: '10px 0' };
const infoItem = { display: 'flex', flexDirection: 'column', gap: '5px' };
const labelStyle = { fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', letterSpacing: '0.5px' };
const valueStyle = { fontSize: '16px', color: '#fff', fontWeight: '600', margin: 0 };
const retryBtn = { marginTop: '25px', padding: '12px 24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' };
const spinnerStyle = { width: '45px', height: '45px', border: '3px solid rgba(255,255,255,0.05)', borderTop: '3px solid #4facfe', borderRadius: '50%', margin: '0 auto' };