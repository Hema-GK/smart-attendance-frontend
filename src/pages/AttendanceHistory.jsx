import { useEffect, useState } from "react";
import API from "../api/api";

export default function AttendanceHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            // Fetching from the new route we just added
            API.get(`/attendance/student/${user.id}`)
                .then(res => setHistory(res.data))
                .catch(err => console.error("Fetch error:", err));
        }
    }, []);

    return (
        <div className="attendance-container">
            <h2>Attendance History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record, index) => (
                        <tr key={index}>
                            <td>{record.subject || "N/A"}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td><span className="status-present">Present</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}