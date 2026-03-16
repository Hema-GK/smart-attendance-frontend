import { useNavigate } from "react-router-dom"

export default function LandingPage(){

const navigate = useNavigate()

return(

<div className="home">

<h1>Smart Attendance System</h1>

<button
onClick={()=>navigate("/student/register")}
>
Student
</button>

<button
onClick={()=>navigate("/teacher/register")}
>
Teacher
</button>

<button
onClick={()=>navigate("/admin/login")}
>
Admin
</button>

</div>

)

}