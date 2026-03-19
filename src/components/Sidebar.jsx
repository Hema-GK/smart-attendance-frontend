// import { Link } from "react-router-dom"
// import { FaChartBar, FaHistory, FaHome } from "react-icons/fa"

// export default function Sidebar(){

// return(

// <div style={{
// width:"240px",
// background:"rgba(15,23,42,0.95)",
// color:"white",
// padding:"25px",
// display:"flex",
// flexDirection:"column",
// gap:"25px",
// height:"100vh",
// backdropFilter:"blur(10px)"
// }}>

// <h2 style={{marginBottom:"20px"}}>Teacher Panel</h2>

// <Link to="/teacher/dashboard" style={{color:"white",textDecoration:"none"}}>
// <FaHome/> Dashboard
// </Link>

// <Link to="/teacher/analytics" style={{color:"white",textDecoration:"none"}}>
// <FaChartBar/> Analytics
// </Link>

// <Link to="/teacher/history" style={{color:"white",textDecoration:"none"}}>
// <FaHistory/> Attendance History
// </Link>

// </div>

// )

// }

import { Link, useLocation } from "react-router-dom"
import { FaChartBar, FaHistory, FaHome } from "react-icons/fa"

export default function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px 20px',
    borderRadius: '12px',
    color: 'white',
    textDecoration: 'none',
    transition: '0.3s',
    background: location.pathname === path ? 'rgba(255,255,255,0.1)' : 'transparent',
    fontWeight: location.pathname === path ? '700' : '400',
    border: location.pathname === path ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
  });

  return (
    <div style={{
      width: "260px",
      background: "rgba(15, 23, 42, 0.4)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,0.1)",
      padding: "30px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      height: "100vh"
    }}>
      <div style={{ marginBottom: '40px', paddingLeft: '10px' }}>
        <h2 style={{ fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8 }}>Teacher Panel</h2>
      </div>

      <Link to="/teacher/dashboard" style={linkStyle("/teacher/dashboard")}>
        <FaHome /> Dashboard
      </Link>

      <Link to="/teacher/analytics" style={linkStyle("/teacher/analytics")}>
        <FaChartBar /> Analytics
      </Link>

      <Link to="/teacher/history" style={linkStyle("/teacher/history")}>
        <FaHistory /> History
      </Link>
    </div>
  )
}