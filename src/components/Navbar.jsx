import { Bell, UserCircle } from "lucide-react";

const navbarStyle = {
  height: "70px",
  background: "rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 30px",
  color: "white"
};

export default function Navbar() {
  const teacherName = localStorage.getItem("teacher_name") || "Faculty Member";

  return (
    <nav style={navbarStyle}>
      <div>
        <span style={{ color: "gray" }}>Portal / </span>
        <span style={{ fontWeight: "500" }}>Faculty Dashboard</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Bell size={20} style={{ cursor: "pointer", color: "#94a3b8" }} />
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px", borderLeft: "1px solid #334155", paddingLeft: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.9rem", margin: 0 }}>{teacherName}</p>
            <p style={{ fontSize: "0.7rem", color: "#22c55e", margin: 0 }}>Active Now</p>
          </div>
          <UserCircle size={32} color="#6366f1" />
        </div>
      </div>
    </nav>
  );
}