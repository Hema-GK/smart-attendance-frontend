// import { useNavigate } from "react-router-dom";

// export default function StudentDashboard(){

// const navigate = useNavigate();

// return(

// <div style={{
// textAlign:"center",
// marginTop:"120px"
// }}>

// <h2>Student Dashboard</h2>

// <br/>

// <button
// className="btn"
// onClick={()=>navigate("/student/mark-attendance")}
// >
// Mark Attendance
// </button>

// <br/><br/>

// <button
// className="btn"
// onClick={()=>navigate("/student/attendance-report")}
// >
// View Attendance Report
// </button>

// </div>

// )

// }


import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clears the student_id and any other saved credentials
    localStorage.clear(); 
    navigate("/"); // Redirects to Landing Page
  };

  return (
    <div style={containerStyle}>
      {/* Logout Button positioned at the top right */}
      <button onClick={handleLogout} style={logoutBtnStyle}>
        Logout
      </button>

      <div style={cardStyle}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '30px' }}>Student Dashboard</h2>

        <div style={buttonGroup}>
          <button 
            style={btnStyle} 
            onClick={() => navigate("/student/mark-attendance")}
          >
            Mark Attendance
          </button>

          <button 
            style={secondaryBtnStyle} 
            onClick={() => navigate("/student/attendance-report")}
          >
            View Attendance Report
          </button>
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---
const containerStyle = {
  textAlign: "center",
  minHeight: "100vh",
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  padding: '20px',
  position: 'relative' // Needed for absolute positioning of logout button
};

const logoutBtnStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  backdropFilter: 'blur(5px)'
};

const cardStyle = {
  background: 'rgba(255,255,255,0.1)',
  padding: '50px 40px',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: '450px'
};

const buttonGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const btnStyle = {
  width: '100%',
  padding: '18px',
  backgroundColor: '#ff4b5c',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(255, 75, 92, 0.3)'
};

const secondaryBtnStyle = {
  ...btnStyle,
  backgroundColor: 'transparent',
  border: '1px solid white',
  boxShadow: 'none'
};