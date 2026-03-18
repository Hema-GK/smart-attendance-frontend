// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export default function StudentDashboard(){
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Safety Check: If someone reaches here without logging in, send them back
//     const user = localStorage.getItem("student_id");
//     if (!user) {
//       console.log("No student session found, redirecting to login...");
//       navigate("/student/login");
//     }
//   }, [navigate]);

//   return(
//     <div style={{ textAlign:"center", marginTop:"120px" }}>
//       <h2>Student Dashboard</h2>
//       <p>Welcome, USN: {localStorage.getItem("student_usn")}</p>
//       <br/>
//       <button className="btn" onClick={()=>navigate("/student/mark-attendance")}>
//         Mark Attendance
//       </button>
//       <br/><br/>
//       <button className="btn" onClick={()=>navigate("/student/attendance-report")}>
//         View Attendance Report
//       </button>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("student_name") || "Student";
  const studentUsn = localStorage.getItem("student_usn") || "N/A";

  useEffect(() => {
    // If no ID is found, the user isn't logged in, redirect to login page
    if (!localStorage.getItem("student_id")) {
      navigate("/student/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // 1. Clear all session data
    localStorage.clear(); 
    
    // 2. Alert the user
    alert("Logged out successfully");

    // 3. Redirect to Landing Page (the root '/')
    window.location.href = "/"; 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px", color: "white", padding: "20px" }}>
      <div style={{
        background: "rgba(255,255,255,0.1)",
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        display: "inline-block",
        minWidth: "300px"
      }}>
        <h1>Welcome, {studentName}!</h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>USN: {studentUsn}</p>
        
        <div style={{ marginTop: "40px" }}>
          <button 
            className="btn" 
            style={{ width: "100%", marginBottom: "15px" }}
            onClick={() => navigate("/student/mark-attendance")}
          >
            Mark Attendance
          </button>
          
          <button 
            className="btn" 
            style={{ width: "100%", marginBottom: "30px" }}
            onClick={() => navigate("/student/attendance-report")}
          >
            View My Report
          </button>

          <hr style={{ opacity: 0.3, marginBottom: "20px" }} />

          {/* LOGOUT BUTTON */}
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: "#ff4b2b",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}