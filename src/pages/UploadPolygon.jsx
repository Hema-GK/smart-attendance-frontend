import { useState } from "react";
import axios from "axios";

export default function UploadPolygon() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPolygon = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure the key 'file' matches your FastAPI parameter

    setLoading(true);
    try {
      // Your verified Railway backend URL
      const backendUrl = "https://final-production-8aff.up.railway.app";

      const res = await axios.post(
        `${backendUrl}/polygon/upload-csv`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Polygon CSV uploaded successfully");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      // Better error messaging to see what the server says
      const errorMsg = err.response?.data?.detail || "Upload failed: Server connection error";
      alert(errorMsg);
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
      />

      <br /><br />

      <button onClick={uploadPolygon} disabled={loading}>
        {loading ? "Uploading..." : "Upload Polygon CSV"}
      </button>
    </div>
  );
}