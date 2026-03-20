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
// import { useEffect, useState } from "react";
// import API from "../api/api";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { Menu, X, MapPin, RefreshCw, Clock } from "lucide-react";
// import { Bar } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function TeacherDashboard() {
//   const [classes, setClasses] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [marks, setMarks] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [lastSynced, setLastSynced] = useState(new Date());

//   const [showModal, setShowModal] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [newRoomName, setNewRoomName] = useState("");

//   const teacher_id = localStorage.getItem("teacher_id");

//   const fetchClasses = async () => {
//     try {
//       const res = await API.get(`/teachers/today-classes/${teacher_id}`);
//       setClasses(Array.isArray(res.data) ? res.data : []);
//       setLastSynced(new Date());
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!teacher_id) {
//       window.location.href = "/teacher/login";
//       return;
//     }
//     fetchClasses();
//     const interval = setInterval(fetchClasses, 60000);
//     return () => clearInterval(interval);
//   }, [teacher_id]);

//   const loadAttendance = async (timetable_id) => {
//     try {
//       const res = await API.get(`/teachers/class-attendance/${timetable_id}`);
//       setRecords(res.data);
//       let m = {};
//       res.data.forEach(r => {
//         m[r.student_id] = { cie1: r.cie1 || "", cie2: r.cie2 || "", see: r.see_exam || "" };
//       });
//       setMarks(m);
//     } catch (err) {
//       alert("Failed to load attendance records.");
//     }
//   };

//   const handleUpdateRoom = async () => {
//     try {
//       const res = await API.post("/teachers/update-classroom", {
//         timetable_id: selectedClass.id,
//         classroom_name: newRoomName
//       });
//       if (res.data.status === "success") {
//         setShowModal(false);
//         fetchClasses();
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       alert("Room update failed. Ensure room exists in database.");
//     }
//   };

//   const saveMarks = async (sid) => {
//     try {
//       await API.post("/attendance/update-marks", {
//         student_id: sid,
//         cie1: marks[sid]?.cie1,
//         cie2: marks[sid]?.cie2,
//         see_exam: marks[sid]?.see
//       });
//       alert("Marks saved successfully");
//     } catch (err) {
//       alert("Failed to save marks");
//     }
//   };

//   if (loading) return <div style={{ background: "#020617", height: "100vh", color: "white", padding: "50px" }}>Initializing...</div>;

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: "#020617", position: "relative", overflowX: "hidden" }}>
      
//       {/* 1. DARK OVERLAY FOR MOBILE SIDEBAR */}
//       {sidebarOpen && (
//         <div 
//           className="sidebar-overlay"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* 2. MOBILE TOGGLE BUTTON */}
//       <button 
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="mobile-toggle-btn"
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* 3. SIDEBAR WRAPPER */}
//       <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
//         <Sidebar />
//       </div>

//       {/* 4. MAIN CONTENT AREA */}
//       <div className="main-content">
//         <Navbar />

//         <main style={{ padding: "20px", marginTop: "20px" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "10px" }}>
//             <h2 style={{ color: "white", margin: 0, fontSize: "1.5rem" }}>Today's Schedule</h2>
//             <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "0.75rem" }}>
//               <RefreshCw size={14} />
//               Last sync: {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//             </div>
//           </div>

//           <div className="class-grid">
//             {classes.length > 0 ? classes.map((c) => {
//                const now = new Date().toLocaleTimeString('it-IT'); 
//                const isLive = now >= c.start_time && now <= c.end_time;
               
//                return (
//                 <div key={c.id} className="glass-card" style={{ 
//                   padding: "20px", 
//                   border: isLive ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.1)",
//                   position: "relative"
//                 }}>
//                   {isLive && <div className="live-indicator">LIVE</div>}
//                   <h3 style={{ margin: "0 0 10px 0", color: "white", fontSize: "1.1rem" }}>{c.subject}</h3>
//                   <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", marginBottom: "8px", fontSize: "0.85rem" }}>
//                     <Clock size={14} /> {c.start_time} - {c.end_time}
//                   </div>
//                   <p style={{ color: "white", fontSize: "0.9rem" }}>Room: <b style={{ color: "#6366f1" }}>{c.classroom}</b></p>
                  
//                   <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//                     <button onClick={() => loadAttendance(c.id)} className="btn-primary">View</button>
//                     <button onClick={() => { setSelectedClass(c); setNewRoomName(c.classroom); setShowModal(true); }} className="btn-secondary">Set</button>
//                   </div>
//                 </div>
//                );
//             }) : <p style={{ color: "gray" }}>No more classes for today.</p>}
//           </div>

//           {records.length > 0 && (
//             <section className="glass-card" style={{ marginTop: "30px", padding: "20px" }}>
//               <h3 style={{ color: "white", borderBottom: "1px solid #1e293b", paddingBottom: "10px", fontSize: "1rem" }}>Performance Entry</h3>
//               <div className="table-responsive">
//                 <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", minWidth: "500px" }}>
//                   <thead>
//                     <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: "0.75rem" }}>
//                       <th style={{ padding: "10px" }}>Student ID</th>
//                       <th style={{ padding: "10px" }}>Status</th>
//                       <th style={{ padding: "10px" }}>CIE 1</th>
//                       <th style={{ padding: "10px" }}>CIE 2</th>
//                       <th style={{ padding: "10px" }}>SEE</th>
//                       <th style={{ padding: "10px" }}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {records.map((r, i) => (
//                       <tr key={i} style={{ borderBottom: "1px solid #1e293b", color: "white", fontSize: "0.85rem" }}>
//                         <td style={{ padding: "10px" }}>{r.student_id}</td>
//                         <td style={{ padding: "10px" }}>
//                           <span style={{ color: r.status === "Present" ? "#22c55e" : "#ef4444" }}>● {r.status}</span>
//                         </td>
//                         <td><input type="number" className="marks-input" value={marks[r.student_id]?.cie1} onChange={(e) => setMarks({...marks, [r.student_id]: {...marks[r.student_id], cie1: e.target.value}})} /></td>
//                         <td><input type="number" className="marks-input" value={marks[r.student_id]?.cie2} onChange={(e) => setMarks({...marks, [r.student_id]: {...marks[r.student_id], cie2: e.target.value}})} /></td>
//                         <td><input type="number" className="marks-input" value={marks[r.student_id]?.see} onChange={(e) => setMarks({...marks, [r.student_id]: {...marks[r.student_id], see: e.target.value}})} /></td>
//                         <td><button onClick={() => saveMarks(r.student_id)} className="btn-save">Save</button></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           )}
//         </main>
//       </div>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="glass-card modal-content">
//             <MapPin size={32} color="#6366f1" />
//             <h3 style={{ color: "white", margin: "10px 0" }}>Update Room</h3>
//             <input 
//               type="text" 
//               className="marks-input" 
//               style={{ width: "80%", padding: "10px", marginBottom: "15px", textAlign: "center" }}
//               value={newRoomName} 
//               onChange={(e) => setNewRoomName(e.target.value)}
//             />
//             <div style={{ display: "flex", gap: "10px", width: "100%" }}>
//               <button onClick={() => setShowModal(false)} className="btn-cancel">Cancel</button>
//               <button onClick={handleUpdateRoom} className="btn-primary">Update</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         /* Desktop Default */
//         .sidebar-wrapper { width: 260px; position: sticky; top: 0; height: 100vh; transition: 0.3s; z-index: 100; background: #020617; }
//         .main-content { flex: 1; min-width: 0; }
//         .class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
//         .glass-card { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
//         .live-indicator { position: absolute; top: 10px; right: 10px; background: #22c55e; color: black; font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 4px; }
//         .btn-primary { background: #6366f1; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; flex: 1; font-weight: 600; }
//         .btn-secondary { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 6px; cursor: pointer; flex: 1; }
//         .btn-save { background: #22c55e; border: none; color: black; font-weight: 600; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; }
//         .btn-cancel { background: transparent; border: 1px solid #334155; color: white; flex: 1; border-radius: 6px; cursor: pointer; }
//         .marks-input { background: rgba(255,255,255,0.05); border: 1px solid #334155; color: white; padding: 6px; border-radius: 4px; width: 50px; outline: none; }
//         .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }
//         .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
//         .modal-content { width: 100%; maxWidth: 350px; padding: 25px; display: flex; flexDirection: column; align-items: center; }

//         /* Mobile Adjustments */
//         @media (max-width: 768px) {
//           .sidebar-wrapper { position: fixed; left: -260px; top: 0; height: 100vh; background: #0f172a; }
//           .sidebar-wrapper.open { left: 0; }
//           .main-content { width: 100%; }
//           .class-grid { grid-template-columns: 1fr; }
//           .mobile-toggle-btn { 
//             display: block; position: fixed; top: 15px; left: 15px; z-index: 1000; 
//             background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(255,255,255,0.1); 
//             color: white; padding: 8px; border-radius: 8px; backdrop-filter: blur(5px);
//           }
//           .sidebar-overlay { 
//             position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
//             background: rgba(0,0,0,0.7); z-index: 90; 
//           }
//         }

//         @media (min-width: 769px) {
//           .mobile-toggle-btn { display: none; }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Menu, X, MapPin, RefreshCw, Clock } from "lucide-react";

export default function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [records, setRecords] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());

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
    if (!teacher_id) { window.location.href = "/teacher/login"; return; }
    fetchClasses();
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
      alert("Failed to load records.");
    }
  };

  if (loading) return <div style={{ background: "#020617", height: "100vh", color: "white", padding: "50px" }}>Initializing...</div>;

  return (
    <div className="app-container">
      
      {/* 1. SIDEBAR (Hidden off-screen on mobile) */}
      <aside className={`sidebar-container ${sidebarOpen ? "active" : ""}`}>
        <Sidebar toggle={() => setSidebarOpen(false)} />
      </aside>

      {/* 2. OVERLAY (Dims background when sidebar is open) */}
      {sidebarOpen && <div className="app-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* 3. MAIN CONTENT */}
      <div className="main-wrapper">
        <header className="app-header">
          <button className="menu-trigger" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <Navbar />
        </header>

        <main className="main-content">
          <div className="section-title">
            <h2>Today's Schedule</h2>
            <span><RefreshCw size={12} /> {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div className="card-grid">
            {classes.map((c) => {
              const now = new Date().toLocaleTimeString('it-IT');
              const isLive = now >= c.start_time && now <= c.end_time;
              return (
                <div key={c.id} className={`glass-card ${isLive ? 'live-mode' : ''}`}>
                  {isLive && <div className="status-badge">LIVE</div>}
                  <h3>{c.subject}</h3>
                  <p className="sub-text"><Clock size={14} /> {c.start_time.split('.')[0]} - {c.end_time.split('.')[0]}</p>
                  <p className="sub-text">Room: <span className="highlight">{c.classroom}</span></p>
                  <div className="action-row">
                    <button onClick={() => loadAttendance(c.id)} className="p-btn">View</button>
                    <button onClick={() => { setSelectedClass(c); setShowModal(true); }} className="s-btn">Set</button>
                  </div>
                </div>
              );
            })}
          </div>

          {records.length > 0 && (
            <div className="glass-card table-box">
              <h3>Performance Entry</h3>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>ID</th><th>Status</th><th>CIE1</th><th>CIE2</th><th>SEE</th></tr></thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i}>
                        <td>{r.student_id}</td>
                        <td style={{ color: r.status === "Present" ? "#22c55e" : "#ef4444" }}>{r.status}</td>
                        <td><input className="mini-input" value={marks[r.student_id]?.cie1} readOnly /></td>
                        <td><input className="mini-input" value={marks[r.student_id]?.cie2} readOnly /></td>
                        <td><input className="mini-input" value={marks[r.student_id]?.see} readOnly /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .app-container { display: flex; min-height: 100vh; background: #020617; color: white; font-family: sans-serif; }
        
        /* Desktop Sidebar */
        .sidebar-container { width: 260px; height: 100vh; position: sticky; top: 0; background: #0f172a; z-index: 1000; transition: transform 0.3s ease; }
        
        /* Main Layout */
        .main-wrapper { flex: 1; min-width: 0; display: flex; flexDirection: column; }
        .app-header { display: flex; align-items: center; padding: 10px 20px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; z-index: 800; }
        .menu-trigger { background: none; border: none; color: white; margin-right: 15px; cursor: pointer; display: none; }
        
        .main-content { padding: 20px; }
        .section-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-title h2 { font-size: 1.25rem; margin: 0; }
        .section-title span { font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 4px; }

        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .glass-card { background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; position: relative; }
        .live-mode { border-color: #6366f1; }
        .status-badge { position: absolute; top: 12px; right: 12px; background: #22c55e; color: black; font-size: 0.6rem; font-weight: bold; padding: 2px 6px; border-radius: 4px; }
        
        .sub-text { font-size: 0.85rem; color: #94a3b8; margin: 6px 0; display: flex; align-items: center; gap: 6px; }
        .highlight { color: #6366f1; font-weight: bold; }
        
        .action-row { display: flex; gap: 8px; margin-top: 16px; }
        .p-btn { flex: 1; background: #6366f1; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .s-btn { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 8px; border-radius: 6px; cursor: pointer; }

        .table-box { margin-top: 24px; }
        .table-scroll { overflow-x: auto; margin-top: 12px; }
        table { width: 100%; border-collapse: collapse; min-width: 400px; font-size: 0.8rem; }
        th { text-align: left; padding: 10px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.05); }
        td { padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .mini-input { width: 40px; background: #020617; border: 1px solid #334155; color: white; text-align: center; border-radius: 4px; }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
          .menu-trigger { display: block; }
          .sidebar-container { position: fixed; left: 0; transform: translateX(-100%); z-index: 2000; }
          .sidebar-container.active { transform: translateX(0); }
          .app-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1500; }
          .card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}