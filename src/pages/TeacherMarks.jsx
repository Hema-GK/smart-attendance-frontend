import {useEffect,useState} from "react"
import API from "../api/api"

export default function TeacherMarks(){

const [students,setStudents] = useState([])

useEffect(()=>{

API.get("/students/class/5/A")
.then(res=>setStudents(res.data))

},[])

const updateMarks = async(student)=>{

await API.post("/marks/update",{

student_id:student.id,
subject:"Operating Systems",
class_name:"5",
section:"A",
cie1:student.cie1,
cie2:student.cie2,
see_exam:student.see_exam

})

alert("Marks Updated")

}

return(

<table>

<tr>
<th>USN</th>
<th>Name</th>
<th>CIE1</th>
<th>CIE2</th>
<th>SEE</th>
<th>Update</th>
</tr>

{students.map(s=>(

<tr key={s.id}>

<td>{s.usn}</td>
<td>{s.name}</td>

<td>
<input
onChange={e=>s.cie1=e.target.value}
/>
</td>

<td>
<input
onChange={e=>s.cie2=e.target.value}
/>
</td>

<td>
<input
onChange={e=>s.see_exam=e.target.value}
/>
</td>

<td>
<button onClick={()=>updateMarks(s)}>
Save
</button>
</td>

</tr>

))}

</table>

)

}