import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart3, History, LogOut } from "lucide-react";

const sidebarStyle = {
  width: "260px",
  background: "#0f172a",
  borderRight: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column",
  padding: "20px"
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  color: "#94a3b8",
  textDecoration: "none",
  borderRadius: "8px",
  transition: "0.3s",
  marginBottom: "8px"
};

export default function Sidebar() {
  const navigate = useNavigate();
  const teacherName = localStorage.getItem("teacher_name") || "Faculty";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/teacher/login");
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ marginBottom: "40px", padding: "0 12px" }}>
        <h2 style={{ color: "white", fontSize: "1.5rem" }}>Attendify</h2>
        <p style={{ color: "#6366f1", fontSize: "0.8rem", fontWeight: "bold" }}>{teacherName}</p>
      </div>

      <nav style={{ flex: 1 }}>
        <Link to="/teacher/dashboard" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "white"}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        
        <Link to="/teacher/analytics" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "white"}>
          <BarChart3 size={20} /> Analytics
        </Link>

        <Link to="/teacher/history" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "white"}>
          <History size={20} /> History
        </Link>
      </nav>

      <button 
        onClick={handleLogout}
        style={{ ...linkStyle, border: "none", background: "none", cursor: "pointer", color: "#ef4444", marginTop: "auto" }}
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}