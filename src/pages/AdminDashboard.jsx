
import { useNavigate } from "react-router-dom"

export default function AdminDashboard(){

const navigate = useNavigate()

return(

<div className="adminDashboard">

<h2>Admin Dashboard</h2>

<button
onClick={()=>navigate("/admin/upload-timetable")}
>
Upload Timetable CSV
</button>

<button
onClick={()=>navigate("/admin/upload-polygon")}
>
Upload Classroom Polygon CSV
</button>

</div>

)

}