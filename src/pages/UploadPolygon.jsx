import { useState } from "react"
import API from "../api/api"

export default function UploadPolygon(){

const [file,setFile] = useState(null)

const upload = async()=>{

if(!file){
alert("Select CSV")
return
}

const formData = new FormData()
formData.append("file",file)

try{

const res = await API.post(
"/polygon/upload-csv",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
)

alert(res.data.message)

}catch(err){

console.log(err)
alert("Upload failed")

}

}

return(

<div className="card">

<h2>Upload Classroom Polygon CSV</h2>

<input
type="file"
accept=".csv"
onChange={(e)=>setFile(e.target.files[0])}
/>

<button onClick={upload}>
Upload Polygon CSV
</button>

</div>

)

}