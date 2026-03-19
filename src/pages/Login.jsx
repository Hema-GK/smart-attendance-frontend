// import { useState } from "react";

// export default function Login() {
//   const [usn, setUsn] = useState("");
//   const [password, setPassword] = useState("");
  
// const loginStudent = async () => {
//   // 1. Clean input for mobile (removes accidental spaces from keyboard)
//   const cleanUsn = usn.trim();
//   const cleanPassword = password.trim();

//   if (!cleanUsn || !cleanPassword) {
//     alert("Enter USN and Password");
//     return;
//   }

//   try {
//     const res = await fetch("https://final-production-8aff.up.railway.app/students/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ usn: cleanUsn, password: cleanPassword }),
//     });

//     const data = await res.json();

//     // 2. Matches the "status": "success" and "student": {} object from your backend
//     if (data.status === "success" && data.student) {
      
//       // 3. Store the data for the Dashboard to use
//       localStorage.setItem("student_usn", data.student.usn);
//       localStorage.setItem("student_id", data.student.id);
//       localStorage.setItem("student_name", data.student.name);

//       alert(`Welcome back, ${data.student.name}! ✅`);

//       // 4. Guaranteed redirect for Vercel/Mobile
//       window.location.href = window.location.origin + "/student/dashboard";

//     } else {
//       // 5. This will show your custom backend error messages ("Wrong password", etc.)
//       alert(data.message || "Login failed. Please check your credentials.");
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     alert("Server unreachable. Please check your internet connection.");
//   }
// };

//   return (
//     <div className="card">
//       <h2>Student Login</h2>
//       <input placeholder="Enter USN" value={usn} onChange={(e) => setUsn(e.target.value)} />
//       <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={loginStudent}>Login</button>
//       <p style={{ marginTop: "15px" }}>
//         Don't have account? <a href="/student/register" style={{ color: "#fff", fontWeight: "bold" }}>Register</a>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginStudent() {
  const navigate = useNavigate();
  const [usn, setUsn] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // After your API success logic:
    localStorage.setItem("userRole", "student");
    navigate("/student/dashboard"); // Matches your App.jsx
  };

  return (
    <div className="login-container" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <div className="glass-card" style={{width: '350px'}}>
        <h2>Student Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="USN" className="aesthetic-input" onChange={(e)=>setUsn(e.target.value)} style={inputStyle}/>
          <button type="submit" className="aesthetic-btn" style={studentBtn}>Login</button>
        </form>
        <p style={{marginTop:'15px'}}>New? <span onClick={()=>navigate('/student/register')} style={{color:'#4facfe', cursor:'pointer'}}>Register here</span></p>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' };
const studentBtn = { width: '100%', padding: '12px', background: '#4facfe', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };