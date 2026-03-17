import { useState } from "react";

export default function UploadTimetable() {
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState("5"); // Default to 5, as seen in your DB
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    
    setStatus("Uploading... please wait");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("semester", semester); // REQUIRED for your backend service

    try {
      // Updated to your Railway URL. Ensure the /admin/ path matches your routes.
      const res = await fetch("https://final-production-8aff.up.railway.app/timetable/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Server error");
      }

      const data = await res.json();
      setStatus("✅ " + (data.message || "Success!"));
      alert("Uploaded successfully!");
    } catch (err) {
      // This catches the 'Failed to fetch' error seen in your console
      setStatus("Error: Could not connect to Railway server");
      console.error(err);
    }
  };

  return (
    <div className="card" style={styles.card}>
      <h2 style={{color: 'white'}}>Upload Timetable</h2>
      
      <div style={styles.inputGroup}>
        <label style={{color: 'white', display: 'block', marginBottom: '5px'}}>Semester:</label>
        <select 
          value={semester} 
          onChange={(e) => setSemester(e.value)}
          style={styles.select}
        >
          {[1,2,3,4,5,6,7,8].map(num => (
            <option key={num} value={num.toString()}>{num}</option>
          ))}
        </select>
      </div>

      <input 
        type="file" 
        accept=".csv, .xlsx" 
        onChange={(e) => setFile(e.target.files[0])} 
        style={{color: 'white'}}
      />
      
      <button onClick={handleUpload} style={styles.button}>
        Upload to Railway DB
      </button>
      
      {status && <p style={styles.statusText}>{status}</p>}
    </div>
  );
}

const styles = {
  card: { padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '15px', textAlign: 'center', maxWidth: '400px', margin: '20px auto' },
  inputGroup: { marginBottom: '15px', textAlign: 'left' },
  select: { width: '100%', padding: '8px', borderRadius: '5px' },
  button: { marginTop: '10px', padding: '10px 20px', backgroundColor: '#ff4b5c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  statusText: { color: 'yellow', marginTop: '10px' }
};