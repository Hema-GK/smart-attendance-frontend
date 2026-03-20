import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Ensure we hit the backend route: @router.get("/student/{student_id}")
      API.get(`/attendance/student/${user.id}`)
        .then((res) => {
          setHistory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("History fetch error", err);
          setLoading(false);
        });
    } else {
      window.location.href = "/student/login";
    }
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>My Attendance History</h2>
          
          <div style={{ background: "#111827", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
              <thead>
                <tr style={{ background: "#1e293b", textAlign: "left" }}>
                  <th style={{ padding: "15px" }}>Subject</th>
                  <th style={{ padding: "15px" }}>Date</th>
                  <th style={{ padding: "15px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? history.map((record, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #1f2937" }}>
                    <td style={{ padding: "15px" }}>{record.subject || "General Class"}</td>
                    <td style={{ padding: "15px" }}>
                      {record.date ? new Date(record.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{ 
                        background: record.status === "Present" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                        color: record.status === "Present" ? "#22c55e" : "#ef4444",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "0.85rem"
                      }}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" style={{ padding: "30px", textAlign: "center", color: "gray" }}>
                      {loading ? "Loading history..." : "No attendance records found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}