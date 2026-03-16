import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginAdmin(){

const navigate = useNavigate()

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

const login = ()=>{

if(username==="admin" && password==="admin123"){

navigate("/admin/dashboard")

}
else{

alert("Invalid admin credentials")

}

}

return(

<div className="card">

<h2>Admin Login</h2>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>
Login
</button>

</div>

)

}