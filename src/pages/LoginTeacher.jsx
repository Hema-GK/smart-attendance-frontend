// // import { useState } from "react"
// // import { useNavigate } from "react-router-dom"

// // export default function LoginTeacher(){

// // const navigate = useNavigate()

// // const [email,setEmail] = useState("")
// // const [password,setPassword] = useState("")

// // const loginTeacher = async ()=>{

// // try{

// // const res = await fetch("http://127.0.0.1:8000/teachers/login",{
// // method:"POST",
// // headers:{
// // "Content-Type":"application/json"
// // },
// // body:JSON.stringify({
// // email,
// // password
// // })
// // })

// // const data = await res.json()

// // console.log("LOGIN RESPONSE:",data)

// // if(data.status === "Login success"){

// // localStorage.setItem("teacher_id", data.teacher_id)

// // navigate("/teacher/dashboard")

// // }else{

// // alert(data.status)

// // }

// // }catch(err){

// // console.log("ERROR:",err)
// // alert("Server error")

// // }

// // }

// // return(

// // <div className="card">

// // <h2>Teacher Login</h2>

// // <input
// // placeholder="Email"
// // value={email}
// // onChange={(e)=>setEmail(e.target.value)}
// // />

// // <input
// // type="password"
// // placeholder="Password"
// // value={password}
// // onChange={(e)=>setPassword(e.target.value)}
// // />

// // <button onClick={loginTeacher}>
// // Login
// // </button>

// // <p>
// // Don't have account? 
// // <a href="/teacher/register"> Register</a>
// // </p>

// // </div>

// // )

// // }

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// export default function LoginTeacher(){

//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const loginTeacher = async () => {
//     try {
//       // Pointing to your verified live Railway backend
//       const backendUrl = "https://final-production-8aff.up.railway.app";

//       const res = await fetch(`${backendUrl}/teachers/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email,
//           password
//         })
//       })

//       const data = await res.json()

//       console.log("LOGIN RESPONSE:", data)

//       if (data.status === "Login success") {
//         // Storing the teacher ID for the dashboard sessions
//         localStorage.setItem("teacher_id", data.teacher_id)
        
//         alert("Login Successful");
//         navigate("/teacher/dashboard")
//       } else {
//         alert(data.status)
//       }

//     } catch (err) {
//       console.log("ERROR:", err)
//       // Standardizing error message to match your student login
//       alert("Server connection failed")
//     }
//   }

//   return (
//     <div className="card">
//       <h2>Teacher Login</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={loginTeacher}>
//         Login
//       </button>

//       <p style={{ marginTop: "15px" }}>
//         Don't have account? 
//         <a href="/teacher/register" style={{ color: "#fff", fontWeight: "bold" }}> Register</a>
//       </p>
//     </div>
//   )
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; 

const loginContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: '20px',
  background: '#0b0e14' 
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  margin: '10px 0',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
  fontSize: '1rem'
};

const corporateButtonStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: 'none',
  background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
  color: 'white',
  fontWeight: '700',
  cursor: 'pointer',
  marginTop: '20px'
};

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/teachers/login", { 
        email: email, 
        password: password 
      });

      if (res.data.status === "Login success") {
        // MATCHING THE KEYS: Save teacher_id so Dashboard can read it
        localStorage.setItem("teacher_id", res.data.teacher_id);
        localStorage.setItem("teacher_name", res.data.teacher_name);
        localStorage.setItem("role", "teacher");

        alert("Login Successful!");
        navigate("/teacher/dashboard");
      } else {
        alert(res.data.status || "Invalid Credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Network Error: Backend is not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginContainerStyle}>
      <div className="glass-card" style={{ border: '1px solid rgba(168, 85, 247, 0.3)', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ color: '#fff' }}>Teacher Sign In</h2>
        <input 
          type="email" 
          placeholder="Institutional Email" 
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={corporateButtonStyle} onClick={handleLogin} disabled={loading}>
          {loading ? "AUTHENTICATING..." : "ENTER DASHBOARD"}
        </button>
      </div>
    </div>
  );
}