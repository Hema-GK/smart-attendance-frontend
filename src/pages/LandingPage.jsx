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
import { FaGraduationCap, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" style={styles.container}>
      <h1 style={styles.title}>Smart <span style={{color: '#700ca6'}}>Attendance</span></h1>
      
      <div style={styles.cardWrapper}>
        {/* STUDENT -> Goes to Register */}
        <div className="glass-card" style={styles.card} onClick={() => navigate('/student/register')}>
          <FaGraduationCap style={{fontSize: '50px', color: '#4facfe'}} />
          <h3>Student</h3>
          <button className="aesthetic-btn" style={styles.btnBlue}>Get Started</button>
        </div>

        {/* TEACHER -> Goes to Register */}
        <div className="glass-card" style={styles.card} onClick={() => navigate('/teacher/register')}>
          <FaChalkboardTeacher style={{fontSize: '50px', color: '#4f0797'}} />
          <h3>Faculty</h3>
          <button className="aesthetic-btn" style={styles.btnPurple}>Join Portal</button>
        </div>

        {/* ADMIN -> Goes to Login (Admins usually don't self-register) */}
        <div className="glass-card" style={styles.card} onClick={() => navigate('/admin/login')}>
          <FaUserShield style={{fontSize: '50px', color: '#f59e0b'}} />
          <h3>Admin</h3>
          <button className="aesthetic-btn" style={styles.btnGold}>System Log</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' },
  title: { fontSize: '3rem', color: '#fff', marginBottom: '40px' },
  cardWrapper: { display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' },
  card: { width: '250px', padding: '30px', cursor: 'pointer', transition: '0.3s' },
  btnBlue: { background: 'linear-gradient(90deg, #4facfe, #00f2fe)', width: '100%', border: 'none', padding: '10px', borderRadius: '8px', color: '#fff', fontWeight: 'bold' },
  btnPurple: { background: "radial-gradient(circle at top right, #1e293b, #0f172a, #020617)", width: '100%', border: 'none', padding: '10px', borderRadius: '8px', color: '#fff', fontWeight: 'bold' },
  btnGold: { background: 'linear-gradient(90deg, #f59e0b, #d97706)', width: '100%', border: 'none', padding: '10px', borderRadius: '8px', color: '#fff', fontWeight: 'bold' }
};