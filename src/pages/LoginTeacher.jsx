// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// export default function LoginTeacher(){

// const navigate = useNavigate()

// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")

// const loginTeacher = async ()=>{

// try{

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

// console.log("LOGIN RESPONSE:",data)

// if(data.status === "Login success"){

// localStorage.setItem("teacher_id", data.teacher_id)

// navigate("/teacher/dashboard")

// }else{

// alert(data.status)

// }

// }catch(err){

// console.log("ERROR:",err)
// alert("Server error")

// }

// }

// return(

// <div className="card">

// <h2>Teacher Login</h2>

// <input
// placeholder="Email"
// value={email}
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// type="password"
// placeholder="Password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button onClick={loginTeacher}>
// Login
// </button>

// <p>
// Don't have account? 
// <a href="/teacher/register"> Register</a>
// </p>

// </div>

// )

// }

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginTeacher(){

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginTeacher = async () => {
    try {
      // Pointing to your verified live Railway backend
      const backendUrl = "https://final-production-8aff.up.railway.app";

      const res = await fetch(`${backendUrl}/teachers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      console.log("LOGIN RESPONSE:", data)

      if (data.status === "Login success") {
        // Storing the teacher ID for the dashboard sessions
        localStorage.setItem("teacher_id", data.teacher_id)
        
        alert("Login Successful");
        navigate("/teacher/dashboard")
      } else {
        alert(data.status)
      }

    } catch (err) {
      console.log("ERROR:", err)
      // Standardizing error message to match your student login
      alert("Server connection failed")
    }
  }

  return (
    <div className="card">
      <h2>Teacher Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginTeacher}>
        Login
      </button>

      <p style={{ marginTop: "15px" }}>
        Don't have account? 
        <a href="/teacher/register" style={{ color: "#fff", fontWeight: "bold" }}> Register</a>
      </p>
    </div>
  )
}