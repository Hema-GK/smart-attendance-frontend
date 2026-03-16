import { useNavigate } from "react-router-dom";

export default function StudentDashboard(){

const navigate = useNavigate();

return(

<div style={{
textAlign:"center",
marginTop:"120px"
}}>

<h2>Student Dashboard</h2>

<br/>

<button
className="btn"
onClick={()=>navigate("/student/mark-attendance")}
>
Mark Attendance
</button>

<br/><br/>

<button
className="btn"
onClick={()=>navigate("/student/attendance-report")}
>
View Attendance Report
</button>

</div>

)

}