import { useEffect, useState } from "react"
import API from "../api/api"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

import { Bar } from "react-chartjs-2"

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
)

export default function TeacherDashboard(){

const [classes,setClasses] = useState([])
const [records,setRecords] = useState([])
const [marks,setMarks] = useState({})
const [loading,setLoading] = useState(true)

const teacher_id = localStorage.getItem("teacher_id")

useEffect(()=>{

if(!teacher_id){
window.location.href="/teacher/login"
return
}

API.get(`/teachers/today-classes/${teacher_id}`)
.then(res=>{
setClasses(res.data)
setLoading(false)
})
.catch(err=>{
console.log(err)
setLoading(false)
})

},[])



/* LOAD ATTENDANCE */

const loadAttendance = async(timetable_id)=>{

try{

const res = await API.get(`/attendance/class/${timetable_id}`)

setRecords(res.data)

let m = {}

res.data.forEach(r=>{

m[r.usn] = {
cie1: r.cie1 || "",
cie2: r.cie2 || "",
see: r.see_exam || ""
}

})

setMarks(m)

}catch(err){

console.log(err)
alert("Failed to load attendance")

}

}



/* HANDLE MARK INPUT */

const handleMarksChange = (usn,field,value)=>{

setMarks({
...marks,
[usn]:{
...marks[usn],
[field]:value
}
})

}



/* SAVE MARKS */

const saveMarks = async(usn)=>{

try{

await await API.post("/attendance/update-marks",{

usn:usn,
cie1:marks[usn]?.cie1,
cie2:marks[usn]?.cie2,
see_exam:marks[usn]?.see

})

alert("Marks updated")

}catch(err){

console.log(err)
alert("Failed to update marks")

}

}



/* UPDATE CLASSROOM LOCATION USING GPS */

const updateLocation = (class_id) => {

if (!navigator.geolocation) {
alert("Geolocation not supported")
return
}

navigator.geolocation.getCurrentPosition(

async (position) => {

const latitude = position.coords.latitude
const longitude = position.coords.longitude

try {

await API.post("/teachers/update-location", {
class_id,
latitude,
longitude
})

alert("Classroom location updated")

} catch (err) {

console.log(err)
alert("Location update failed")

}

},

() => {
alert("Please allow location access")
}

)

}



/* ANALYTICS */

let present = records.filter(r=>r.status==="Present").length
let absent = records.filter(r=>r.status==="Absent").length

let percentage = records.length
? ((present/records.length)*100).toFixed(2)
: 0

const chartData = {

labels:["Present","Absent"],

datasets:[
{
label:"Attendance",
data:[present,absent],
backgroundColor:["#22c55e","#ef4444"]
}
]

}



if(loading){
return <h2 style={{padding:"30px"}}>Loading Dashboard...</h2>
}



return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"linear-gradient(135deg,#020617,#0f172a)"
}}>


{/* SIDEBAR */}

<Sidebar/>


{/* MAIN */}

<div style={{flex:1}}>

<Navbar/>


<div style={{padding:"30px"}}>

<h2 style={{color:"white"}}>Today's Classes</h2>


{/* CLASS CARDS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
gap:"20px",
marginTop:"20px"
}}>

{classes.map((c,index)=>(

<div key={index} style={{

background:"linear-gradient(145deg,#1e293b,#0f172a)",
color:"white",
padding:"20px",
borderRadius:"12px",
boxShadow:"0px 6px 18px rgba(0,0,0,0.4)",
transition:"0.3s"

}}

onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.05)"}
onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}

>

<h3>{c.subject}</h3>

<p>{c.start_time} - {c.end_time}</p>

<p>Room: {c.classroom}</p>

<button
onClick={()=>loadAttendance(c.id)}
style={{
marginRight:"10px",
background:"#3b82f6",
border:"none",
padding:"6px 12px",
color:"white",
borderRadius:"6px"
}}
>
View Attendance
</button>

<button
onClick={()=>updateLocation(c.id)}
style={{
background:"#10b981",
border:"none",
padding:"6px 12px",
color:"white",
borderRadius:"6px"
}}
>
Update Classroom Location
</button>

</div>

))}

</div>



{/* ATTENDANCE + MARKS */}

{records.length>0 && (

<div style={{
background:"#111827",
padding:"20px",
marginTop:"30px",
borderRadius:"10px",
color:"white"
}}>

<h3>Student Attendance & Marks Entry</h3>

{records.map((r,i)=>(

<div key={i} style={{marginBottom:"15px"}}>

<b>USN:</b> {r.usn} | 
<b> Status:</b> {r.status}

<br/><br/>

<input
type="number"
placeholder="CIE1"
value={marks[r.usn]?.cie1 || ""}
onChange={(e)=>handleMarksChange(r.usn,"cie1",e.target.value)}
style={{width:"80px",marginRight:"10px"}}
/>

<input
type="number"
placeholder="CIE2"
value={marks[r.usn]?.cie2 || ""}
onChange={(e)=>handleMarksChange(r.usn,"cie2",e.target.value)}
style={{width:"80px",marginRight:"10px"}}
/>

<input
type="number"
placeholder="SEE"
value={marks[r.usn]?.see || ""}
onChange={(e)=>handleMarksChange(r.usn,"see",e.target.value)}
style={{width:"80px",marginRight:"10px"}}
/>

<button onClick={()=>saveMarks(r.usn)}>
Save Marks
</button>

</div>

))}

</div>

)}



{/* ANALYTICS */}

{records.length>0 && (

<div style={{
background:"#111827",
padding:"20px",
marginTop:"30px",
borderRadius:"10px",
color:"white"
}}>

<h3>Attendance Analytics</h3>

<p>Attendance Percentage: {percentage}%</p>

<Bar data={chartData}/>

</div>

)}



{/* ATTENDANCE HISTORY */}

{records.length>0 && (

<div style={{
background:"#111827",
padding:"20px",
marginTop:"30px",
borderRadius:"10px",
color:"white"
}}>

<h3>Attendance History</h3>

{records.map((r,i)=>(

<div key={i}>

USN: {r.usn} |
Status: {r.status} |
Date: {r.date} |
Time: {r.time}

</div>

))}

</div>

)}

</div>

</div>

</div>

)

}