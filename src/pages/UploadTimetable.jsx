import { useState } from "react"
import axios from "axios"

export default function UploadTimetable(){

const [file,setFile] = useState(null)

const uploadTimetable = async () => {

if(!file){
alert("Please select a CSV file")
return
}

const formData = new FormData()
formData.append("file",file)

try{

const res = await axios.post(
"http://127.0.0.1:8000/admin/upload-timetable",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
)

alert(res.data.message || "Timetable uploaded successfully")

}catch(err){

console.log(err)
alert("Upload failed")

}

}

return(

<div className="card">

<h2>Upload Timetable CSV</h2>

<input
type="file"
accept=".csv"
onChange={(e)=>setFile(e.target.files[0])}
/>

<br/><br/>

<button onClick={uploadTimetable}>
Upload Timetable CSV
</button>

</div>

)

}