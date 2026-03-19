// import { useNavigate } from "react-router-dom"

// export default function LandingPage(){

// const navigate = useNavigate()

// return(

// <div className="home">

// <h1>Smart Attendance System</h1>

// <button
// onClick={()=>navigate("/student/register")}
// >
// Student
// </button>

// <button
// onClick={()=>navigate("/teacher/register")}
// >
// Teacher
// </button>

// <button
// onClick={()=>navigate("/admin/login")}
// >
// Admin
// </button>

// </div>

// )

// }


import React from "react";
import { useNavigate } from "react-router-dom";
// Change fa6 to fa here
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa"; 

// --- LANDING PAGE STYLES ---
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px',
  textAlign: 'center',
  background: 'transparent' 
};

const cardWrapperStyle = {
  display: 'flex',
  gap: '30px',
  marginTop: '40px',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

const selectionCardStyle = {
  width: '280px',
  padding: '40px 20px',
  cursor: 'pointer',
  transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
};

const iconContainerStyle = (color) => ({
  fontSize: '60px',
  color: color,
  filter: `drop-shadow(0 0 10px ${color}44)`
});

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={{ animation: 'fadeInDown 1s ease-out' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '10px', fontWeight: '800' }}>
          Smart <span style={{ color: '#4facfe' }}>Attendance</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Biometric verification and real-time analytics for the modern classroom.
        </p>
      </div>

      <div style={cardWrapperStyle}>
        
        {/* STUDENT PATH */}
        <div 
          style={selectionCardStyle}
          onClick={() => navigate('/login')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
          }}
        >
          <div style={iconContainerStyle('#4facfe')}>
            <FaGraduationCap /> {/* Updated Icon */}
          </div>
          <div>
            <h3 style={{ margin: '0', color: '#fff', fontSize: '1.5rem' }}>Student Portal</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
              Verify identity & mark attendance
            </p>
          </div>
          <button className="aesthetic-btn" style={{ width: '100%', pointerEvents: 'none', background: 'linear-gradient(90deg, #4facfe, #00f2fe)' }}>
            Student Login
          </button>
        </div>

        {/* TEACHER PATH */}
        <div 
          style={{ ...selectionCardStyle, border: '1px solid rgba(168, 85, 247, 0.2)' }}
          onClick={() => navigate('/teacher/login')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
          }}
        >
          <div style={iconContainerStyle('#a855f7')}>
            <FaChalkboardTeacher />
          </div>
          <div>
            <h3 style={{ margin: '0', color: '#fff', fontSize: '1.5rem' }}>Faculty Portal</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
              Manage classes & view analytics
            </p>
          </div>
          <button className="aesthetic-btn" style={{ 
            width: '100%', 
            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            pointerEvents: 'none' 
          }}>
            Faculty Login
          </button>
        </div>

      </div>

      <div style={{ marginTop: '80px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', letterSpacing: '1px' }}>
        SYSTEM STATUS: <span style={{ color: '#4aff4a' }}>OPERATIONAL</span>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}