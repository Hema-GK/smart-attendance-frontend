import {useEffect,useState} from "react";
import API from "../api/api";

export default function AttendanceReport(){

const [records,setRecords] = useState([]);

useEffect(()=>{

API.get("/attendance/my-records").then(res=>{
setRecords(res.data);
})

},[]);

return(

<div style={{textAlign:"center"}}>

<h2>Attendance Report</h2>

<table border="1" style={{margin:"auto"}}>

<thead>
<tr>
<th>Subject</th>
<th>Date</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{records.map((r,i)=>(

<tr key={i}>
<td>{r.subject}</td>
<td>{r.date}</td>
<td>{r.status}</td>
</tr>

))}

</tbody>

</table>

</div>

)

}