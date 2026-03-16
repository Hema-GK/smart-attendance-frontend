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

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterTeacher(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [class_name,setClass] = useState("")
const [subject,setSubject] = useState("")

const registerTeacher = async ()=>{

try{

const res = await fetch("http://127.0.0.1:8000/teachers/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
password,
class_name,
subject
})
})

const data = await res.json()

alert(data.status)

if(data.status.includes("Registered")){
navigate("/teacher/login")
}

}catch(err){

console.log(err)
alert("Registration failed")

}

}

return(

<div className="card">

<h2>Teacher Registration</h2>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

<input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

<input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

<input placeholder="Class Handling" onChange={(e)=>setClass(e.target.value)} />

<input placeholder="Subject" onChange={(e)=>setSubject(e.target.value)} />

<button onClick={registerTeacher}>
Register
</button>

<p>
Already Registered? 
<a href="/teacher/login"> Login</a>
</p>

</div>

)

}