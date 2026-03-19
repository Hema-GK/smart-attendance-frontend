// import { useState } from "react"

// export default function RegisterTeacher(){

// const [isLogin,setIsLogin] = useState(false)

// const [name,setName] = useState("")
// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")
// const [className,setClassName] = useState("")
// const [subject,setSubject] = useState("")


// const registerTeacher = async ()=>{

// const res = await fetch("http://127.0.0.1:8000/teachers/register",{

// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },

// body:JSON.stringify({

// name,
// email,
// password,
// class_name:className,
// subject

// })

// })

// const data = await res.json()

// alert(data.status)

// }


// const loginTeacher = async ()=>{

// const res = await fetch("http://127.0.0.1:8000/teachers/login",{

// method:"POST",

// headers:{
// "Content-Type":"application/json"
// },

// body:JSON.stringify({

// email,
// password

// })

// })

// const data = await res.json()

// if(data.status==="Login success"){

// alert("Login Success")

// }else{

// alert("Invalid Login")

// }

// }


// return(

// <div className="card">

// <h2>{isLogin ? "Teacher Login" : "Teacher Registration"}</h2>

// {!isLogin && (

// <input
// placeholder="Name"
// onChange={(e)=>setName(e.target.value)}
// />

// )}

// <input
// placeholder="Email"
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// type="password"
// placeholder="Password"
// onChange={(e)=>setPassword(e.target.value)}
// />

// {!isLogin && (

// <>

// <input
// placeholder="Class Handling"
// onChange={(e)=>setClassName(e.target.value)}
// />

// <input
// placeholder="Subject"
// onChange={(e)=>setSubject(e.target.value)}
// />

// </>

// )}

// <br/>

// <button onClick={isLogin ? loginTeacher : registerTeacher}>

// {isLogin ? "Login" : "Register"}

// </button>

// <br/><br/>

// {isLogin ? (

// <p>

// Don't have account?{" "}

// <span
// style={{color:"blue",cursor:"pointer"}}
// onClick={()=>setIsLogin(false)}
// >

// Register

// </span>

// </p>

// ):( 

// <p>

// Already Registered?{" "}

// <span
// style={{color:"blue",cursor:"pointer"}}
// onClick={()=>setIsLogin(true)}
// >

// Login

// </span>

// </p>

// )}

// </div>

// )

// }

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// export default function RegisterTeacher(){

// const navigate = useNavigate()

// const [name,setName] = useState("")
// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")
// const [class_name,setClass] = useState("")
// const [subject,setSubject] = useState("")

// const registerTeacher = async ()=>{

// try{

// const res = await fetch("http://127.0.0.1:8000/teachers/register",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// name,
// email,
// password,
// class_name,
// subject
// })
// })

// const data = await res.json()

// alert(data.status)

// if(data.status.includes("Registered")){
// navigate("/teacher/login")
// }

// }catch(err){

// console.log(err)
// alert("Registration failed")

// }

// }

// return(

// <div className="card">

// <h2>Teacher Registration</h2>

// <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

// <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

// <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

// <input placeholder="Class Handling" onChange={(e)=>setClass(e.target.value)} />

// <input placeholder="Subject" onChange={(e)=>setSubject(e.target.value)} />

// <button onClick={registerTeacher}>
// Register
// </button>

// <p>
// Already Registered? 
// <a href="/teacher/login"> Login</a>
// </p>

// </div>

// )

// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function RegisterTeacher() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", department: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/teacher/register", formData);
      alert("Faculty account created! Please sign in.");
      navigate("/teacher/login"); 
    } catch (err) {
      alert("Registration failed. Use your institutional email.");
    }
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card" style={{ width: '400px', padding: '40px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
        <h2 style={{ color: '#fff' }}>Faculty <span style={{ color: '#a855f7' }}>Portal</span></h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>Register for classroom management</p>

        <form onSubmit={handleRegister} style={formStyle}>
          <input type="text" placeholder="Full Name" style={inputStyle} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Institutional Email" style={inputStyle} required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="text" placeholder="Department" style={inputStyle} required onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
          <input type="password" placeholder="Password" style={inputStyle} required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          
          <button type="submit" className="aesthetic-btn" style={teacherBtn}>REGISTER AS FACULTY</button>
        </form>

        <p style={{ marginTop: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
          Registered already?{" "}
          <span onClick={() => navigate('/teacher/login')} style={{ color: '#a855f7', cursor: 'pointer', fontWeight: 'bold' }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

// --- ADD THESE STYLES AT THE BOTTOM TO REMOVE THE ERRORS ---
const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '100vh', 
  padding: '20px' 
};

const formStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '10px' 
};

const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  borderRadius: '10px', 
  background: 'rgba(255,255,255,0.1)', 
  color: '#fff', 
  border: '1px solid rgba(255,255,255,0.2)', 
  outline: 'none' 
};

const teacherBtn = { 
  width: '100%', 
  padding: '14px', 
  background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
  color: '#fff', 
  border: 'none', 
  borderRadius: '10px', 
  fontWeight: '700', 
  cursor: 'pointer', 
  marginTop: '10px' 
};