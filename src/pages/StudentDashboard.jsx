import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function StudentDashboard(){
  const navigate = useNavigate();

  useEffect(() => {
    // Safety Check: If someone reaches here without logging in, send them back
    const user = localStorage.getItem("student_id");
    if (!user) {
      console.log("No student session found, redirecting to login...");
      navigate("/student/login");
    }
  }, [navigate]);

  return(
    <div style={{ textAlign:"center", marginTop:"120px" }}>
      <h2>Student Dashboard</h2>
      <p>Welcome, USN: {localStorage.getItem("student_usn")}</p>
      <br/>
      <button className="btn" onClick={()=>navigate("/student/mark-attendance")}>
        Mark Attendance
      </button>
      <br/><br/>
      <button className="btn" onClick={()=>navigate("/student/attendance-report")}>
        View Attendance Report
      </button>
    </div>
  );
}