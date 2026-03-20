// import { useEffect, useState } from "react"
// import API from "../api/api"
// import Sidebar from "../components/Sidebar"
// import Navbar from "../components/Navbar"

// import { Bar } from "react-chartjs-2"

// import {
// Chart as ChartJS,
// CategoryScale,
// LinearScale,
// BarElement,
// Title,
// Tooltip,
// Legend
// } from "chart.js"

// ChartJS.register(
// CategoryScale,
// LinearScale,
// BarElement,
// Title,
// Tooltip,
// Legend
// )

// export default function TeacherDashboard(){

// const [classes,setClasses] = useState([])
// const [records,setRecords] = useState([])
// const [marks,setMarks] = useState({})
// const [loading,setLoading] = useState(true)

// const teacher_id = localStorage.getItem("teacher_id")

// useEffect(()=>{

// if(!teacher_id){
// window.location.href="/teacher/login"
// return
// }

// API.get(`/teachers/today-classes/${teacher_id}`)
// .then(res=>{
// setClasses(res.data)
// setLoading(false)
// })
// .catch(err=>{
// console.log(err)
// setLoading(false)
// })

// },[])



// /* LOAD ATTENDANCE */

// const loadAttendance = async(timetable_id)=>{

// try{

// const res = await API.get(`/attendance/class/${timetable_id}`)

// setRecords(res.data)

// let m = {}

// res.data.forEach(r=>{

// m[r.usn] = {
// cie1: r.cie1 || "",
// cie2: r.cie2 || "",
// see: r.see_exam || ""
// }

// })

// setMarks(m)

// }catch(err){

// console.log(err)
// alert("Failed to load attendance")

// }

// }



// /* HANDLE MARK INPUT */

// const handleMarksChange = (usn,field,value)=>{

// setMarks({
// ...marks,
// [usn]:{
// ...marks[usn],
// [field]:value
// }
// })

// }



// /* SAVE MARKS */

// const saveMarks = async(usn)=>{

// try{

// await await API.post("/attendance/update-marks",{

// usn:usn,
// cie1:marks[usn]?.cie1,
// cie2:marks[usn]?.cie2,
// see_exam:marks[usn]?.see

// })

// alert("Marks updated")

// }catch(err){

// console.log(err)
// alert("Failed to update marks")

// }

// }



// /* UPDATE CLASSROOM LOCATION USING GPS */

// const updateLocation = (class_id) => {

// if (!navigator.geolocation) {
// alert("Geolocation not supported")
// return
// }

// navigator.geolocation.getCurrentPosition(

// async (position) => {

// const latitude = position.coords.latitude
// const longitude = position.coords.longitude

// try {

// await API.post("/teachers/update-location", {
// class_id,
// latitude,
// longitude
// })

// alert("Classroom location updated")

// } catch (err) {

// console.log(err)
// alert("Location update failed")

// }

// },

// () => {
// alert("Please allow location access")
// }

// )

// }



// /* ANALYTICS */

// let present = records.filter(r=>r.status==="Present").length
// let absent = records.filter(r=>r.status==="Absent").length

// let percentage = records.length
// ? ((present/records.length)*100).toFixed(2)
// : 0

// const chartData = {

// labels:["Present","Absent"],

// datasets:[
// {
// label:"Attendance",
// data:[present,absent],
// backgroundColor:["#22c55e","#ef4444"]
// }
// ]

// }



// if(loading){
// return <h2 style={{padding:"30px"}}>Loading Dashboard...</h2>
// }



// return(

// <div style={{
// display:"flex",
// minHeight:"100vh",
// background:"linear-gradient(135deg,#020617,#0f172a)"
// }}>


// {/* SIDEBAR */}

// <Sidebar/>


// {/* MAIN */}

// <div style={{flex:1}}>

// <Navbar/>


// <div style={{padding:"30px"}}>

// <h2 style={{color:"white"}}>Today's Classes</h2>


// {/* CLASS CARDS */}

// <div style={{
// display:"grid",
// gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
// gap:"20px",
// marginTop:"20px"
// }}>

// {classes.map((c,index)=>(

// <div key={index} style={{

// background:"linear-gradient(145deg,#1e293b,#0f172a)",
// color:"white",
// padding:"20px",
// borderRadius:"12px",
// boxShadow:"0px 6px 18px rgba(0,0,0,0.4)",
// transition:"0.3s"

// }}

// onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.05)"}
// onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}

// >

// <h3>{c.subject}</h3>

// <p>{c.start_time} - {c.end_time}</p>

// <p>Room: {c.classroom}</p>

// <button
// onClick={()=>loadAttendance(c.id)}
// style={{
// marginRight:"10px",
// background:"#3b82f6",
// border:"none",
// padding:"6px 12px",
// color:"white",
// borderRadius:"6px"
// }}
// >
// View Attendance
// </button>

// <button
// onClick={()=>updateLocation(c.id)}
// style={{
// background:"#10b981",
// border:"none",
// padding:"6px 12px",
// color:"white",
// borderRadius:"6px"
// }}
// >
// Update Classroom Location
// </button>

// </div>

// ))}

// </div>



// {/* ATTENDANCE + MARKS */}

// {records.length>0 && (

// <div style={{
// background:"#111827",
// padding:"20px",
// marginTop:"30px",
// borderRadius:"10px",
// color:"white"
// }}>

// <h3>Student Attendance & Marks Entry</h3>

// {records.map((r,i)=>(

// <div key={i} style={{marginBottom:"15px"}}>

// <b>USN:</b> {r.usn} | 
// <b> Status:</b> {r.status}

// <br/><br/>

// <input
// type="number"
// placeholder="CIE1"
// value={marks[r.usn]?.cie1 || ""}
// onChange={(e)=>handleMarksChange(r.usn,"cie1",e.target.value)}
// style={{width:"80px",marginRight:"10px"}}
// />

// <input
// type="number"
// placeholder="CIE2"
// value={marks[r.usn]?.cie2 || ""}
// onChange={(e)=>handleMarksChange(r.usn,"cie2",e.target.value)}
// style={{width:"80px",marginRight:"10px"}}
// />

// <input
// type="number"
// placeholder="SEE"
// value={marks[r.usn]?.see || ""}
// onChange={(e)=>handleMarksChange(r.usn,"see",e.target.value)}
// style={{width:"80px",marginRight:"10px"}}
// />

// <button onClick={()=>saveMarks(r.usn)}>
// Save Marks
// </button>

// </div>

// ))}

// </div>

// )}



// {/* ANALYTICS */}

// {records.length>0 && (

// <div style={{
// background:"#111827",
// padding:"20px",
// marginTop:"30px",
// borderRadius:"10px",
// color:"white"
// }}>

// <h3>Attendance Analytics</h3>

// <p>Attendance Percentage: {percentage}%</p>

// <Bar data={chartData}/>

// </div>

// )}



// {/* ATTENDANCE HISTORY */}

// {records.length>0 && (

// <div style={{
// background:"#111827",
// padding:"20px",
// marginTop:"30px",
// borderRadius:"10px",
// color:"white"
// }}>

// <h3>Attendance History</h3>

// {records.map((r,i)=>(

// <div key={i}>

// USN: {r.usn} |
// Status: {r.status} |
// Date: {r.date} |
// Time: {r.time}

// </div>

// ))}

// </div>

// )}

// </div>

// </div>

// </div>

// )

// }


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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function TeacherDashboard() {
  const [classes, setClasses] = useState([])
  const [records, setRecords] = useState([])
  const [marks, setMarks] = useState({})
  const [loading, setLoading] = useState(true)

  // Get the ID saved during login
  const teacher_id = localStorage.getItem("teacher_id")

  useEffect(() => {
    if (!teacher_id) {
      window.location.href = "/teacher/login"
      return
    }

    const fetchClasses = async () => {
      try {
        const res = await API.get(`/teachers/today-classes/${teacher_id}`)
        setClasses(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        console.error("Error fetching classes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [teacher_id])

  /* LOAD ATTENDANCE */
  const loadAttendance = async (timetable_id) => {
    try {
      const res = await API.get(`/teachers/class-attendance/${timetable_id}`)
      setRecords(res.data)

      let m = {}
      res.data.forEach(r => {
        m[r.student_id] = { // Using student_id as key
          cie1: r.cie1 || "",
          cie2: r.cie2 || "",
          see: r.see_exam || ""
        }
      })
      setMarks(m)
    } catch (err) {
      console.error(err)
      alert("Failed to load attendance")
    }
  }

  /* HANDLE MARK INPUT */
  const handleMarksChange = (student_id, field, value) => {
    setMarks({
      ...marks,
      [student_id]: {
        ...marks[student_id],
        [field]: value
      }
    })
  }

  /* SAVE MARKS */
  const saveMarks = async (student_id) => {
    try {
      await API.post("/attendance/update-marks", {
        student_id: student_id,
        cie1: marks[student_id]?.cie1,
        cie2: marks[student_id]?.cie2,
        see_exam: marks[student_id]?.see
      })
      alert("Marks updated")
    } catch (err) {
      alert("Failed to update marks")
    }
  }

  /* UPDATE CLASSROOM LOCATION */
  const updateLocation = (class_id) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported")
      return
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        await API.post("/teachers/update-location", {
          class_id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        alert("Classroom location updated")
      } catch (err) {
        alert("Location update failed")
      }
    }, () => alert("Please allow location access"))
  }

  /* ANALYTICS CALCULATION */
  const presentCount = records.filter(r => r.status === "Present").length
  const totalCount = records.length
  const absentCount = totalCount - presentCount
  const percentage = totalCount ? ((presentCount / totalCount) * 100).toFixed(2) : 0

  const chartData = {
    labels: ["Present", "Absent"],
    datasets: [{
      label: "Attendance Count",
      data: [presentCount, absentCount],
      backgroundColor: ["#22c55e", "#ef4444"]
    }]
  }

  if (loading) return <h2 style={{ padding: "30px", color: "white" }}>Loading Dashboard...</h2>

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg,#020617,#0f172a)" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2 style={{ color: "white" }}>Today's Classes</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px", marginTop: "20px" }}>
            {classes.length > 0 ? classes.map((c, index) => (
              <div key={index} style={{ background: "linear-gradient(145deg,#1e293b,#0f172a)", color: "white", padding: "20px", borderRadius: "12px", boxShadow: "0px 6px 18px rgba(0,0,0,0.4)" }}>
                <h3>{c.subject}</h3>
                <p>{c.start_time} - {c.end_time}</p>
                <p>Room: {c.classroom}</p>
                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                  <button onClick={() => loadAttendance(c.id)} style={{ background: "#3b82f6", border: "none", padding: "8px 12px", color: "white", borderRadius: "6px", cursor: "pointer" }}>View</button>
                  <button onClick={() => updateLocation(c.id)} style={{ background: "#10b981", border: "none", padding: "8px 12px", color: "white", borderRadius: "6px", cursor: "pointer" }}>Set Location</button>
                </div>
              </div>
            )) : <p style={{ color: "gray" }}>No classes scheduled for today.</p>}
          </div>

          {records.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <div style={{ background: "#111827", padding: "25px", borderRadius: "12px", color: "white", marginBottom: "30px" }}>
                <h3 style={{ borderBottom: "1px solid #374151", paddingBottom: "10px" }}>Attendance & Marks</h3>
                {records.map((r, i) => (
                  <div key={i} style={{ padding: "15px 0", borderBottom: "1px solid #1f2937", display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                    <span style={{ minWidth: "150px" }}><b>Student ID:</b> {r.student_id}</span>
                    <span style={{ color: r.status === "Present" ? "#22c55e" : "#ef4444" }}>{r.status}</span>
                    <input type="number" placeholder="CIE1" value={marks[r.student_id]?.cie1 || ""} onChange={(e) => handleMarksChange(r.student_id, "cie1", e.target.value)} style={{ width: "70px", padding: "5px" }} />
                    <input type="number" placeholder="CIE2" value={marks[r.student_id]?.cie2 || ""} onChange={(e) => handleMarksChange(r.student_id, "cie2", e.target.value)} style={{ width: "70px", padding: "5px" }} />
                    <input type="number" placeholder="SEE" value={marks[r.student_id]?.see || ""} onChange={(e) => handleMarksChange(r.student_id, "see", e.target.value)} style={{ width: "70px", padding: "5px" }} />
                    <button onClick={() => saveMarks(r.student_id)} style={{ background: "#6366f1", border: "none", color: "white", padding: "5px 15px", borderRadius: "4px" }}>Update</button>
                  </div>
                ))}
              </div>

              <div style={{ background: "#111827", padding: "25px", borderRadius: "12px", color: "white" }}>
                <h3>Analytics</h3>
                <p style={{ fontSize: "1.2rem" }}>Attendance Percentage: <b>{percentage}%</b></p>
                <div style={{ maxWidth: "500px", marginTop: "20px" }}>
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}