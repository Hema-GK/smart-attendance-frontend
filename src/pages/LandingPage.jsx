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

import { useNavigate } from "react-router-dom";
import { FaUserStudent, FaChalkboardTeacher } from "react-icons/fa6"; // Ensure react-icons is installed

// --- LANDING PAGE STYLES ---
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px',
  textAlign: 'center'
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
  border: '1px solid rgba(255, 255, 255, 0.1)'
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={{ animation: 'fadeInDown 1s ease-out' }}>
        <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px', fontWeight: '800' }}>
          Smart <span style={{ color: '#4facfe' }}>Attendance</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px' }}>
          Next-generation biometric attendance management for modern institutions.
        </p>
      </div>

      {/* Selection Cards */}
      <div style={cardWrapperStyle}>
        
        {/* STUDENT PATH */}
        <div 
          className="glass-card" 
          style={selectionCardStyle}
          onClick={() => navigate('/login')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: '50px', color: '#4facfe' }}>
            <FaUserStudent />
          </div>
          <div>
            <h3 style={{ margin: '0', color: '#fff' }}>Student Portal</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
              Mark attendance & view records
            </p>
          </div>
          <button className="aesthetic-btn" style={{ width: '100%', pointerEvents: 'none' }}>
            Get Started
          </button>
        </div>

        {/* TEACHER PATH */}
        <div 
          className="glass-card" 
          style={{ ...selectionCardStyle, border: '1px solid rgba(168, 85, 247, 0.2)' }}
          onClick={() => navigate('/teacher/login')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: '50px', color: '#a855f7' }}>
            <FaChalkboardTeacher />
          </div>
          <div>
            <h3 style={{ margin: '0', color: '#fff' }}>Faculty Portal</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
              Management & Analytics
            </p>
          </div>
          <button className="aesthetic-btn" style={{ 
            width: '100%', 
            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            pointerEvents: 'none' 
          }}>
            Admin Login
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '60px', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
        © 2026 Smart Attendance System • Secure & Encrypted
      </div>

      {/* Basic Keyframe Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}