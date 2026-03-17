import { useState } from "react";

export default function UploadPolygon() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first");
      return;
    }
    
    setLoading(true);
    setStatus("Uploading Polygon data...");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Direct link to your verified Railway backend
      const res = await fetch("https://final-production-8aff.up.railway.app/polygon/upload-csv", {
        method: "POST",
        body: formData,
        // Note: Do not manually set headers for FormData with fetch; 
        // the browser handles the boundary automatically.
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Success: Polygon CSV uploaded!");
        alert("Polygon CSV uploaded successfully ✅");
      } else {
        setStatus(`Error: ${data.detail || "Upload failed"}`);
        alert(data.detail || "Upload failed");
      }
    } catch (err) {
      console.error("CONNECTION ERROR:", err);
      setStatus("Error: Cannot reach the server. Check your internet.");
      alert("Server connection failed. Make sure you are not on a restricted network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload Classroom Polygon CSV</h2>
      
      <input 
        type="file" 
        accept=".csv" 
        onChange={(e) => setFile(e.target.files[0])} 
        style={{ marginBottom: "15px" }}
      />
      
      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        {loading ? "Processing..." : "Upload Polygon CSV"}
      </button>

      {status && (
        <p style={{ 
          marginTop: "15px", 
          color: status.includes("Error") ? "#ff4d4d" : "#4aff4a",
          fontSize: "14px",
          fontWeight: "bold"
        }}>
          {status}
        </p>
      )}
    </div>
  );
}