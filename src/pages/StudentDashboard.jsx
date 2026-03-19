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
    localStorage.clear(); 
    alert("Logged out successfully");
    window.location.href = "/"; 
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card" style={cardWrapperStyle}>
        
        {/* PROFILE HEADER */}
        <div style={{ marginBottom: "30px" }}>
          <div style={avatarCircle}>
             {studentName.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ fontSize: "2rem", color: "#fff", margin: "15px 0 5px 0" }}>
            Welcome, {studentName}!
          </h1>
          <span style={usnBadge}>USN: {studentUsn}</span>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
          
          {/* PRIMARY ACTIONS */}
          <button 
            className="aesthetic-btn" 
            style={actionButtonStyle}
            onClick={() => navigate("/student/mark-attendance")}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            Mark Attendance
          </button>
          
          <button 
            className="aesthetic-btn" 
            style={{ ...actionButtonStyle, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
            onClick={() => navigate("/student/attendance-report")}
            onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.15)"}
            onMouseOut={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
          >
            View My Report
          </button>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "15px 0" }} />

          {/* LOGOUT BUTTON */}
          <button 
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseOver={(e) => e.target.style.background = "#ff3b1b"}
            onMouseOut={(e) => e.target.style.background = "#ff4b2b"}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "20px",
};

const cardWrapperStyle = {
  width: "100%",
  maxWidth: "400px",
  padding: "40px 30px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const avatarCircle = {
  width: "70px",
  height: "70px",
  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "white",
  margin: "0 auto",
  boxShadow: "0 0 20px rgba(79, 172, 254, 0.4)"
};

const usnBadge = {
  background: "rgba(255,255,255,0.1)",
  padding: "5px 15px",
  borderRadius: "20px",
  fontSize: "0.9rem",
  color: "rgba(255,255,255,0.7)",
  display: "inline-block"
};

const actionButtonStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(79, 172, 254, 0.2)"
};

const logoutButtonStyle = {
  backgroundColor: "#ff4b2b",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  transition: "background 0.3s ease"
};