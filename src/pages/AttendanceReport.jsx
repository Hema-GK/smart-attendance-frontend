// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";

// export default function AttendanceReport() {
//   const [records, setRecords] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 1. Get the logged-in student's ID from localStorage
//     const studentId = localStorage.getItem("student_id");

//     // 2. If no ID is found, send them back to login
//     if (!studentId) {
//       navigate("/student/login");
//       return;
//     }

//     // 3. Fetch records specifically for this student
//     API.get(`/attendance/my-records?student_id=${studentId}`)
//       .then((res) => {
//         setRecords(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching records:", err);
//       });
//   }, [navigate]);

//   return (
//     <div style={containerStyle}>
//       <div style={cardStyle}>
//         <button 
//           onClick={() => navigate("/student/dashboard")} 
//           style={backBtnStyle}
//         >
//           ← Back to Dashboard
//         </button>

//         <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#ff4b5c' }}>
//           Attendance Report
//         </h2>

//         <div style={tableContainer}>
//           <table style={tableStyle}>
//             <thead>
//               <tr style={headerRowStyle}>
//                 <th style={thStyle}>Subject</th>
//                 <th style={thStyle}>Date</th>
//                 <th style={thStyle}>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.length > 0 ? (
//                 records.map((r, i) => (
//                   <tr key={i} style={rowStyle}>
//                     <td style={tdStyle}>{r.subject}</td>
//                     <td style={tdStyle}>{r.date}</td>
//                     <td style={tdStyle}>
//                       <span style={statusBadge(r.status)}>
//                         {r.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" style={{ padding: '30px', opacity: 0.7 }}>
//                     No attendance records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- STYLES (Restoring the "Old Features" Look) ---

// const containerStyle = {
//   textAlign: "center",
//   minHeight: "100vh",
//   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: '40px 20px',
//   color: 'white'
// };

// const cardStyle = {
//   background: 'rgba(255,255,255,0.1)',
//   padding: '40px',
//   borderRadius: '20px',
//   backdropFilter: 'blur(10px)',
//   border: '1px solid rgba(255,255,255,0.2)',
//   width: '100%',
//   maxWidth: '900px',
//   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
// };

// const backBtnStyle = {
//   float: 'left',
//   background: 'none',
//   border: 'none',
//   color: 'white',
//   cursor: 'pointer',
//   marginBottom: '20px',
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   opacity: 0.8
// };

// const tableContainer = {
//   marginTop: '20px',
//   overflowX: 'auto',
//   borderRadius: '15px'
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   background: 'rgba(0,0,0,0.2)',
//   borderRadius: '15px',
//   overflow: 'hidden'
// };

// const headerRowStyle = {
//   borderBottom: '2px solid rgba(255,255,255,0.1)'
// };

// const thStyle = {
//   padding: '18px',
//   backgroundColor: 'rgba(255, 75, 92, 0.9)',
//   color: 'white',
//   textAlign: 'center',
//   textTransform: 'uppercase',
//   fontSize: '0.9rem',
//   letterSpacing: '1px'
// };

// const tdStyle = {
//   padding: '15px',
//   borderBottom: '1px solid rgba(255,255,255,0.05)',
//   fontSize: '1rem'
// };

// const rowStyle = {
//   transition: 'background 0.3s'
// };

// const statusBadge = (status) => ({
//   backgroundColor: status === "Present" ? "#4aff4a" : "#ff4b5c",
//   color: "#000",
//   padding: '6px 15px',
//   borderRadius: '20px',
//   fontSize: '0.85rem',
//   fontWeight: 'bold',
//   display: 'inline-block'
// });

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AttendanceReport() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) { navigate("/student/login"); return; }
    API.get(`/attendance/my-records?student_id=${studentId}`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <button onClick={() => navigate("/student/dashboard")} style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
          ← Back
        </button>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Attendance History</h2>

        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th style={thStyle}>Subject</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={tdStyle}>{r.subject}</td>
                    <td style={tdStyle}>{r.date}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                        background: r.status === "Present" ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: r.status === "Present" ? '#4ade80' : '#f87171'
                      }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = { padding: '20px', opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '20px', fontSize: '1rem' };