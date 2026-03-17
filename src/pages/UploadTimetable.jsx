import { useState } from "react";

export default function UploadTimetable() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    
    setStatus("Uploading... please wait");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/admin/upload-timetable", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStatus(data.message || "Success!");
      alert("Uploaded successfully!");
    } catch (err) {
      setStatus("Error: Could not connect to server");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Upload Timetable</h2>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{marginTop: '10px'}}>Upload CSV</button>
      <p style={{color: 'yellow'}}>{status}</p>
    </div>
  );
}