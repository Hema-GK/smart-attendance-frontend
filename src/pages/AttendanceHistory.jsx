import { useEffect, useState } from "react"
import API from "../api/api"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export default function AnalyticsPage() {

  const [data, setData] = useState([])

  // Inside your AttendanceHistory.jsx
useEffect(() => {
  const studentData = JSON.parse(localStorage.getItem("student")); // Ensure key matches your login save
  if (studentData && studentData.id) {
    API.get(`/attendance/student/${studentData.id}`)
      .then(res => {
        setHistory(res.data);
      })
      .catch(err => console.error("History fetch error:", err));
  }
}, []);
  return (
    <div style={{ padding: "20px" }}>

      <h2>Attendance Analytics</h2>

      <ResponsiveContainer width="100%" height={400}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="usn" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="present" fill="#4CAF50" />

          <Bar dataKey="absent" fill="#f44336" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}