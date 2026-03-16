import { useState } from "react";
import API from "../api/api";

export default function TimetableViewer(){

const [section,setSection] = useState("");
const [classes,setClasses] = useState([]);

const loadTimetable = async () => {

const res = await API.get("/timetable/current-class?section="+section);

setClasses(res.data);


}

return(

<div>

  <h3>Current Class</h3>

  <input
  placeholder="Section"
  onChange={(e)=>setSection(e.target.value)}
  />

  <button onClick={loadTimetable}>
  Get Current Class
  </button>

  <ul>

    {classes.map((c,index)=>(
      <li key={index}>
        {c.subject} | Room {c.room_number} | {c.start_time}-{c.end_time}
      </li>
    ))}

  </ul>

</div>


)

}
