import { useState } from "react";
import API from "../api/api";

export default function AttendanceButton(){

const [loading,setLoading] = useState(false)

const markAttendance = ()=>{

setLoading(true)

navigator.geolocation.getCurrentPosition(

async (position)=>{

const latitude = position.coords.latitude
const longitude = position.coords.longitude

console.log("Student Location:",latitude,longitude)

try{

const res = await API.post("/attendance/mark",{

usn:localStorage.getItem("usn"),

student_lat:latitude,
student_lon:longitude

})

alert(res.data.status)

}catch(err){

alert("Attendance Failed")

}

setLoading(false)

},

(error)=>{

alert("Please enable location to mark attendance")
setLoading(false)

}

)

}

return(

<div>

<button
onClick={markAttendance}
style={{
padding:"12px 25px",
background:"#4CAF50",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontSize:"16px"
}}
>

{loading ? "Marking..." : "Mark Attendance"}

</button>

</div>

)

}