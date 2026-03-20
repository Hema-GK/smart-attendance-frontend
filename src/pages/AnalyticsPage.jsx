import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    if (!teacher_id) {
      window.location.href = "/teacher/login";
      return;
    }

    // Fetching analytics specifically for this teacher's classes
    API.get(`/attendance/analytics/${teacher_id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Analytics fetch error:", err));
  }, [teacher_id]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>Attendance Analytics</h2>
          
          <div style={{ background: "#111827", padding: "20px", borderRadius: "12px" }}>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="usn" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}