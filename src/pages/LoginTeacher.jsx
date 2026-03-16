import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginTeacher(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const loginTeacher = async ()=>{

try{

const res = await fetch("http://127.0.0.1:8000/teachers/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
})

const data = await res.json()

console.log("LOGIN RESPONSE:",data)

if(data.status === "Login success"){

localStorage.setItem("teacher_id", data.teacher_id)

navigate("/teacher/dashboard")

}else{

alert(data.status)

}

}catch(err){

console.log("ERROR:",err)
alert("Server error")

}

}

return(

<div className="card">

<h2>Teacher Login</h2>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={loginTeacher}>
Login
</button>

<p>
Don't have account? 
<a href="/teacher/register"> Register</a>
</p>

</div>

)

}