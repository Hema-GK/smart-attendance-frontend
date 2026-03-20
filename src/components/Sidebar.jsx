// import { Link, useNavigate } from "react-router-dom";
// import { LayoutDashboard, BarChart3, History, LogOut, X } from "lucide-react";

// export default function Sidebar({ toggle }) { // Added toggle prop
//   const navigate = useNavigate();
//   const teacherName = localStorage.getItem("teacher_name") || "Faculty";

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/teacher/login");
//   };

//   const sidebarStyle = {
//     width: "100%", // Changed to 100% to fill the wrapper
//     height: "100vh",
//     background: "#0f172a",
//     borderRight: "1px solid rgba(255,255,255,0.1)",
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px",
//     position: "relative"
//   };

//   const linkStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     padding: "12px",
//     color: "#94a3b8",
//     textDecoration: "none",
//     borderRadius: "8px",
//     transition: "0.3s",
//     marginBottom: "8px"
//   };

//   return (
//     <div style={sidebarStyle}>
//       {/* --- MOBILE CLOSE BUTTON --- */}
//       <button 
//         onClick={toggle} 
//         className="sidebar-close-btn"
//         style={{
//           position: "absolute", top: "20px", right: "20px",
//           background: "rgba(255,255,255,0.05)", border: "none",
//           color: "white", padding: "5px", borderRadius: "5px",
//           cursor: "pointer", display: "none" // Hidden by default (Desktop)
//         }}
//       >
//         <X size={24} />
//       </button>

//       <div style={{ marginBottom: "40px", padding: "0 12px" }}>
//         <h2 style={{ color: "white", fontSize: "1.5rem", margin: "0" }}>Attendify</h2>
//         <p style={{ color: "#6366f1", fontSize: "0.8rem", fontWeight: "bold", marginTop: "5px" }}>{teacherName}</p>
//       </div>

//       <nav style={{ flex: 1 }}>
//         <Link to="/teacher/dashboard" style={linkStyle} onClick={toggle}>
//           <LayoutDashboard size={20} /> Dashboard
//         </Link>
        
//         <Link to="/teacher/analytics" style={linkStyle} onClick={toggle}>
//           <BarChart3 size={20} /> Analytics
//         </Link>

//         <Link to="/teacher/history" style={linkStyle} onClick={toggle}>
//           <History size={20} /> History
//         </Link>
//       </nav>

//       <button 
//         onClick={handleLogout}
//         style={{ ...linkStyle, border: "none", background: "none", cursor: "pointer", color: "#ef4444", marginTop: "auto" }}
//       >
//         <LogOut size={20} /> Logout
//       </button>

//       {/* Internal CSS for the Close Button Visibility */}
//       <style>{`
//         @media (max-width: 768px) {
//           .sidebar-close-btn { display: block !important; }
//         }
//         /* Hover effects */
//         a:hover { color: white !important; background: rgba(255,255,255,0.05); }
//       `}</style>
//     </div>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart3, History, LogOut, X } from "lucide-react";

export default function Sidebar({ toggle }) {
  const navigate = useNavigate();
  const teacherName = localStorage.getItem("teacher_name") || "Faculty";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ color: "white", margin: 0 }}>Attendify</h2>
        <button onClick={toggle} className="mobile-close-btn" style={{ background: "none", border: "none", color: "white", display: "none" }}>
          <X size={24} />
        </button>
      </div>
      
      <p style={{ color: "#6366f1", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "20px" }}>{teacherName}</p>

      <nav style={{ flex: 1 }}>
        <Link to="/teacher/dashboard" className="nav-link" onClick={toggle}><LayoutDashboard size={18} /> Dashboard</Link>
        <Link to="/teacher/analytics" className="nav-link" onClick={toggle}><BarChart3 size={18} /> Analytics</Link>
        <Link to="/teacher/history" className="nav-link" onClick={toggle}><History size={18} /> History</Link>
      </nav>

      <button onClick={() => { localStorage.clear(); navigate("/teacher/login"); }} className="logout-btn">
        <LogOut size={18} /> Logout
      </button>

      <style>{`
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px; color: #94a3b8; text-decoration: none; border-radius: 8px; margin-bottom: 5px; transition: 0.2s; }
        .nav-link:hover { background: rgba(255,255,255,0.05); color: white; }
        .logout-btn { display: flex; align-items: center; gap: 12px; padding: 12px; color: #ef4444; background: none; border: none; cursor: pointer; margin-top: auto; width: 100%; text-align: left; }
        @media (max-width: 768px) { .mobile-close-btn { display: block !important; } }
      `}</style>
    </div>
  );
}