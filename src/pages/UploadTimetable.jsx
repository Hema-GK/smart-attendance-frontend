import { useState } from "react";

export default function UploadTimetable() {
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState("5"); // Default semester
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first");
      return;
    }
    
    setLoading(true);
    setStatus("Uploading Timetable data...");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("semester", semester); // Required by your backend Form(...)

    try {
      // Corrected URL: Must match the prefix and route in your Python file
      const res = await fetch("https://final-production-8aff.up.railway.app/timetable/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Success: Timetable CSV uploaded!");
        alert("Timetable CSV uploaded successfully ✅");
      } else {
        setStatus(`Error: ${data.detail || "Upload failed"}`);
        alert(data.detail || "Upload failed");
      }
    } catch (err) {
      console.error("CONNECTION ERROR:", err);
      setStatus("Error: Cannot reach the server.");
      alert("Server connection failed. Make sure your Railway backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Upload Timetable CSV</h2>
      
      <div style={{ marginBottom: "15px", textAlign: "left" }}>
        <label>Select Semester: </label>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num}</option>)}
        </select>
      </div>

      <input 
        type="file" 
        accept=".csv" 
        onChange={(e) => setFile(e.target.files[0])} 
        style={{ marginBottom: "15px" }}
      />
      
      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{ width: "100%", padding: "10px", backgroundColor: "#ff4b5c", color: "white", border: "none", cursor: "pointer" }}
      >
        {loading ? "Processing..." : "Upload Timetable CSV"}
      </button>

      {status && (
        <p style={{ 
          marginTop: "15px", 
          color: status.includes("Error") ? "#ff4d4d" : "#4aff4a",
          fontWeight: "bold"
        }}>
          {status}
        </p>
      )}
    </div>
  );
}