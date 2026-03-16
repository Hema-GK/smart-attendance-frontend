export default function Navbar(){

const logout = ()=>{

localStorage.removeItem("teacher_id")
window.location.href="/teacher/login"

}

return(

<div style={{
background:"#0f172a",
color:"white",
padding:"15px 30px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
boxShadow:"0px 2px 10px rgba(0,0,0,0.4)"
}}>

<h2>Smart Attendance System</h2>

<button
onClick={logout}
style={{
background:"#ef4444",
border:"none",
padding:"7px 15px",
borderRadius:"6px",
color:"white"
}}
>
Logout
</button>

</div>

)

}