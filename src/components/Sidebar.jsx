import { Link } from "react-router-dom"
import { FaChartBar, FaHistory, FaHome } from "react-icons/fa"

export default function Sidebar(){

return(

<div style={{
width:"240px",
background:"rgba(15,23,42,0.95)",
color:"white",
padding:"25px",
display:"flex",
flexDirection:"column",
gap:"25px",
height:"100vh",
backdropFilter:"blur(10px)"
}}>

<h2 style={{marginBottom:"20px"}}>Teacher Panel</h2>

<Link to="/teacher/dashboard" style={{color:"white",textDecoration:"none"}}>
<FaHome/> Dashboard
</Link>

<Link to="/teacher/analytics" style={{color:"white",textDecoration:"none"}}>
<FaChartBar/> Analytics
</Link>

<Link to="/teacher/history" style={{color:"white",textDecoration:"none"}}>
<FaHistory/> Attendance History
</Link>

</div>

)

}