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
import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Menu, X, MapPin, RefreshCw, Clock } from "lucide-react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [records, setRecords] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newRoomName, setNewRoomName] = useState("");

  const teacher_id = localStorage.getItem("teacher_id");

  const fetchClasses = async () => {
    try {
      const res = await API.get(`/teachers/today-classes/${teacher_id}`);
      setClasses(Array.isArray(res.data) ? res.data : []);
      setLastSynced(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!teacher_id) {
      window.location.href = "/teacher/login";
      return;
    }

    fetchClasses();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchClasses, 60000);
    return () => clearInterval(interval);
  }, [teacher_id]);

  const loadAttendance = async (timetable_id) => {
    try {
      const res = await API.get(`/teachers/class-attendance/${timetable_id}`);
      setRecords(res.data);
      let m = {};
      res.data.forEach(r => {
        m[r.student_id] = { cie1: r.cie1 || "", cie2: r.cie2 || "", see: r.see_exam || "" };
      });
      setMarks(m);
    } catch (err) {
      alert("Failed to load attendance records.");
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const res = await API.post("/teachers/update-classroom", {
        timetable_id: selectedClass.id,
        classroom_name: newRoomName
      });
      if (res.data.status === "success") {
        setShowModal(false);
        fetchClasses();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Room update failed. Ensure room exists in database.");
    }
  };

  const saveMarks = async (sid) => {
    try {
      await API.post("/attendance/update-marks", {
        student_id: sid,
        cie1: marks[sid]?.cie1,
        cie2: marks[sid]?.cie2,
        see_exam: marks[sid]?.see
      });
      alert("Marks saved successfully");
    } catch (err) {
      alert("Failed to save marks");
    }
  };

  if (loading) return <div style={{ background: "#020617", height: "100vh", color: "white", padding: "50px" }}>Initializing...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617", position: "relative" }}>
      
      {/* Mobile Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ position: "fixed", top: "20px", left: "20px", zIndex: 100, background: "none", border: "none", color: "white" }}
        className="mobile-toggle"
      >
        {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar with mobile logic */}
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, width: "100%" }}>
        <Navbar />

        <main style={{ padding: "30px", marginTop: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <h2 style={{ color: "white", margin: 0 }}>Today's Schedule</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "0.8rem" }}>
              <RefreshCw size={14} className="spin-hover" />
              Last sync: {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {/* Classes Grid */}
          <div className="class-grid">
            {classes.length > 0 ? classes.map((c) => {
               const now = new Date().toLocaleTimeString('it-IT'); 
               const isLive = now >= c.start_time && now <= c.end_time;
               
               return (
                <div key={c.id} className="glass-card" style={{ 
                  padding: "20px", 
                  border: isLive ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {isLive && <div className="live-indicator">LIVE</div>}
                  <h3 style={{ margin: "0 0 10px 0", color: "white" }}>{c.subject}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", marginBottom: "5px" }}>
                    <Clock size={14} /> {c.start_time} - {c.end_time}
                  </div>
                  <p style={{ color: "white" }}>Room: <b style={{ color: "#6366f1" }}>{c.classroom}</b></p>
                  
                  <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                    <button onClick={() => loadAttendance(c.id)} className="btn-primary">View</button>
                    <button onClick={() => { setSelectedClass(c); setNewRoomName(c.classroom); setShowModal(true); }} className="btn-secondary">Set Classroom</button>
                  </div>
                </div>
               );
            }) : <p style={{ color: "gray" }}>No more classes for today.</p>}
          </div>

          {/* Attendance Section */}
          {records.length > 0 && (
            <section className="glass-card" style={{ marginTop: "40px", padding: "25px" }}>
              <h3 style={{ color: "white", borderBottom: "1px solid #1e293b", paddingBottom: "15px" }}>Student Performance Entry</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: "0.85rem" }}>
                      <th style={{ padding: "12px" }}>Student ID</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>CIE 1</th>
                      <th style={{ padding: "12px" }}>CIE 2</th>
                      <th style={{ padding: "12px" }}>SEE</th>
                      <th style={{ padding: "12px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1e293b", color: "white" }}>
                        <td style={{ padding: "12px" }}>{r.student_id}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ color: r.status === "Present" ? "#22c55e" : "#ef4444" }}>● {r.status}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input type="number" className="marks-input" value={marks[r.student_id]?.cie1} onChange={(e) => setMarks({...marks, [r.student_id]: {...marks[r.student_id], cie1: e.target.value}})} />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input type="number" className="marks-input" value={marks[r.student_id]?.cie2} onChange={(e) => setMarks({...marks, [r.student_id]: {...marks[r.student_id], cie2: e.target.value}})} />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input type="number" className="marks-input" value={marks[r.student_id]?.see} onChange={(e) => setMarks({...marks, [r.student_id]: {...marks[r.student_id], see: e.target.value}})} />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <button onClick={() => saveMarks(r.student_id)} className="btn-save">Save</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Classroom Change Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <MapPin size={40} color="#6366f1" />
            <h3 style={{ color: "white", margin: "15px 0 5px 0" }}>Update Classroom</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "20px" }}>Change location for {selectedClass?.subject}</p>
            <input 
              type="text" 
              className="marks-input" 
              style={{ width: "100%", padding: "12px", marginBottom: "20px", textAlign: "center" }}
              value={newRoomName} 
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="e.g. Lab 2 or Room 405"
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} className="btn-cancel">Cancel</button>
              <button onClick={handleUpdateRoom} className="btn-primary">Update</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sidebar-wrapper { width: 260px; transition: 0.3s; }
        .class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .glass-card { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); }
        .live-indicator { position: absolute; top: 12px; right: 12px; background: #22c55e; color: black; font-size: 0.6rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
        .btn-primary { background: #6366f1; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; flex: 1; font-weight: 600; }
        .btn-secondary { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 10px 15px; border-radius: 8px; cursor: pointer; flex: 1; }
        .btn-save { background: #22c55e; border: none; color: black; font-weight: 600; padding: 5px 12px; border-radius: 4px; cursor: pointer; }
        .btn-cancel { background: transparent; border: 1px solid #334155; color: white; flex: 1; border-radius: 8px; cursor: pointer; }
        .marks-input { background: rgba(0,0,0,0.3); border: 1px solid #334155; color: white; padding: 8px; border-radius: 6px; width: 60px; outline: none; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal-content { width: 100%; maxWidth: 400px; padding: 30px; display: flex; flexDirection: column; align-items: center; }
        
        @media (max-width: 768px) {
          .sidebar-wrapper { position: fixed; left: -260px; z-index: 90; }
          .sidebar-wrapper.open { left: 0; }
          .mobile-toggle { display: block !important; }
          .class-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}