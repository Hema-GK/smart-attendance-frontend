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
import API from "../api/api";

export default function Login() {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // THIS IS YOUR OLD LOGIC
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const res = await API.post("/auth/login", { usn, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "student");
        navigate("/student/dashboard"); // Successful redirect
      }
    } catch (err) {
      alert("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div style={loginContainerStyle}>
      <div className="glass-card" style={{ width: '350px' }}>
        <h2 style={{marginBottom: '20px'}}>Student Login</h2>
        
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Enter USN" 
            style={inputStyle} 
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
          
          <input 
            type="password" 
            placeholder="Enter Password" 
            style={inputStyle} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* This button now triggers handleLogin because it is type="submit" */}
          <button type="submit" style={primaryButtonStyle}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          New? <span onClick={() => navigate('/student/register')} style={{ color: '#4facfe', cursor: 'pointer', fontWeight: 'bold' }}>Register here</span>
        </p>
      </div>
    </div>
  );
}

const loginContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' };
const primaryButtonStyle = { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };