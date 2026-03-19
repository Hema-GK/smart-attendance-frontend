// import { useState } from "react";

// export default function UploadTimetable() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a CSV file first");
//       return;
//     }
    
//     setLoading(true);
//     setStatus("Uploading Timetable data...");
    
//     const formData = new FormData();
//     formData.append("file", file);
    
//     // We send a placeholder because the FastAPI route expects the 'semester' argument,
//     // but your Python service is now configured to pull the real value from the CSV.
//     formData.append("semester", "CSV_DATA"); 

//     try {
//       // Points to your active Railway deployment
//       const res = await fetch("https://final-production-8aff.up.railway.app/timetable/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus("Success: Timetable uploaded!");
//         alert("Timetable CSV uploaded successfully ✅");
//         setFile(null); // Clear the input after success
//       } else {
//         setStatus(`Error: ${data.detail || "Upload failed"}`);
//         alert(data.detail || "Upload failed");
//       }
//     } catch (err) {
//       console.error("CONNECTION ERROR:", err);
//       setStatus("Error: Cannot reach the server.");
//       alert("Server connection failed. Make sure your Railway backend is online.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card" style={styles.card}>
//       <h2 style={styles.title}>Upload Timetable CSV</h2>
//       <p style={styles.subtitle}>Ensure columns match: section, semester, day, start_time, end_time, subject, teacher_id, classroom, is_lunch</p>
      
//       <div style={styles.uploadContainer}>
//         <input 
//           type="file" 
//           accept=".csv" 
//           onChange={(e) => setFile(e.target.files[0])} 
//           style={styles.fileInput}
//         />
        
//         <button 
//           onClick={handleUpload} 
//           disabled={loading}
//           style={loading ? {...styles.button, opacity: 0.6} : styles.button}
//         >
//           {loading ? "Processing..." : "Upload Timetable"}
//         </button>
//       </div>

//       {status && (
//         <p style={{ 
//           ...styles.statusText, 
//           color: status.includes("Error") ? "#ff4d4d" : "#4aff4a" 
//         }}>
//           {status}
//         </p>
//       )}
//     </div>
//   );
// }

// const styles = {
//   card: {
//     padding: "30px",
//     background: "rgba(255, 255, 255, 0.05)",
//     borderRadius: "15px",
//     textAlign: "center",
//     maxWidth: "500px",
//     margin: "40px auto",
//     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//     border: "1px solid rgba(255, 255, 255, 0.18)"
//   },
//   title: { color: "#fff", marginBottom: "10px" },
//   subtitle: { color: "#aaa", fontSize: "12px", marginBottom: "20px" },
//   uploadContainer: { display: "flex", flexDirection: "column", gap: "15px" },
//   fileInput: { 
//     color: "#fff", 
//     padding: "10px", 
//     border: "1px dashed #555", 
//     borderRadius: "5px" 
//   },
//   button: { 
//     padding: "12px", 
//     backgroundColor: "#ff4b5c", 
//     color: "white", 
//     border: "none", 
//     borderRadius: "5px", 
//     cursor: "pointer",
//     fontWeight: "bold",
//     transition: "0.3s"
//   },
//   statusText: { marginTop: "20px", fontSize: "14px", fontWeight: "bold" }
// };

import { useState } from "react";

export default function UploadTimetable() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) { alert("Please select a CSV file first"); return; }
    setLoading(true);
    setStatus("Uploading Timetable data...");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("semester", "CSV_DATA"); 

    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/timetable/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Success: Timetable uploaded!");
        alert("Timetable CSV uploaded successfully ✅");
        setFile(null);
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.detail || "Upload failed"}`);
      }
    } catch (err) {
      setStatus("Error: Cannot reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="glass-card" style={{ padding: "40px", textAlign: "center", maxWidth: "500px", width: '100%' }}>
        <h2 style={{ color: "#fff", marginBottom: "10px" }}>Upload Timetable</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "25px" }}>
          Ensure columns: section, semester, day, start_time, end_time, subject, teacher_id, classroom
        </p>
        
        <input 
          type="file" 
          accept=".csv" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="aesthetic-input"
          style={{ marginBottom: "20px", borderStyle: 'dashed' }}
        />
        
        <button 
          className="aesthetic-btn"
          onClick={handleUpload} 
          disabled={loading}
          style={{ width: "100%", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Processing..." : "Deploy Timetable"}
        </button>

        {status && (
          <p style={{ marginTop: "20px", fontSize: "14px", fontWeight: "bold", color: status.includes("Error") ? "#ff4d4d" : "#4aff4a" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}