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
  fontSize: '1rem',
  transition: '0.3s'
};

const corporateButtonStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: 'none',
  background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
  color: 'white',
  fontWeight: '700',
  letterSpacing: '1px',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
  marginTop: '20px',
  transition: 'transform 0.2s ease'
};

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Hit the login endpoint
      const res = await API.post("/teachers/login", { 
        email: email, 
        password: password 
      });

      // Step 2: Validate the response
      if (res.data.status === "success") {
        const user = res.data.user;
        
        // Critical: Store the entire user object and the role separately for easy access
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);

        // Step 3: Role-based redirection
        if (user.role === "teacher") {
          navigate("/teacher/dashboard");
        } else {
          alert("Access Denied: This credentials belong to a student account.");
          localStorage.clear(); 
        }
      } else {
        // This handles the "Incorrect Credentials" message from backend
        alert(res.data.message || "Invalid Email or Password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Server Error: Ensure your backend is running and the database is connected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginContainerStyle}>
      <div className="glass-card" style={{ 
        border: '1px solid rgba(168, 85, 247, 0.3)',
        padding: '40px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '20px' }}>
            <span style={{ 
                background: 'rgba(168, 85, 247, 0.2)', 
                padding: '5px 12px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                color: '#c084fc',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }}>
                Faculty Portal
            </span>
        </div>
        
        <h2 style={{ marginBottom: '10px', color: '#fff' }}>Teacher Sign In</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>
            Access classroom analytics and management
        </p>

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

        <button 
            style={corporateButtonStyle}
            onClick={handleLogin}
            disabled={loading}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          {loading ? "AUTHENTICATING..." : "ENTER DASHBOARD"}
        </button>

        <div style={{ marginTop: '20px', fontSize: '13px' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}