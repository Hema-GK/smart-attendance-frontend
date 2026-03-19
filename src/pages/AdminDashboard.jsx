
// import { useNavigate } from "react-router-dom"

// export default function AdminDashboard(){

// const navigate = useNavigate()

// return(

// <div className="adminDashboard">

// <h2>Admin Dashboard</h2>

// <button
// onClick={()=>navigate("/admin/upload-timetable")}
// >
// Upload Timetable CSV
// </button>

// <button
// onClick={()=>navigate("/admin/upload-polygon")}
// >
// Upload Classroom Polygon CSV
// </button>

// </div>

// )

// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaDrawPolygon, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{padding: '40px', color: 'white', textAlign: 'center'}}>
      <h1 style={{marginBottom: '10px'}}>Admin <span style={{color: '#f59e0b'}}>Control Center</span></h1>
      <p style={{opacity: 0.6, marginBottom: '40px'}}>Manage institution infrastructure and mapping data.</p>

      <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
        
        {/* TIMETABLE BUTTON */}
        <div className="glass-card" style={adminCard} onClick={() => navigate('/admin/upload-timetable')}>
          <FaCloudUploadAlt style={{fontSize: '40px', color: '#f59e0b'}} />
          <h3>Upload Timetable</h3>
          <p style={{fontSize: '12px', opacity: 0.5}}>Import CSV schedule for all sections.</p>
        </div>

        {/* POLYGON BUTTON */}
        <div className="glass-card" style={adminCard} onClick={() => navigate('/admin/upload-polygon')}>
          <FaDrawPolygon style={{fontSize: '40px', color: '#f59e0b'}} />
          <h3>Classroom Mapping</h3>
          <p style={{fontSize: '12px', opacity: 0.5}}>Update GPS coordinates for geo-fencing.</p>
        </div>

      </div>

      <button 
        onClick={() => navigate('/')} 
        style={{marginTop: '50px', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'}}
      >
        <FaSignOutAlt /> Logout System
      </button>
    </div>
  );
}

const adminCard = {
  width: '280px',
  padding: '30px',
  cursor: 'pointer',
  transition: '0.3s',
  border: '1px solid rgba(245, 158, 11, 0.2)', // Amber border
};