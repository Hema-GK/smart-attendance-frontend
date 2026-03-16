import { useRef, useState } from "react"
import Webcam from "react-webcam"
import API from "../api/api"

export default function FaceCapture({ currentClass }) {
  const webcamRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [student, setStudent] = useState(null)
  const [recognizing, setRecognizing] = useState(false)
  const [marking, setMarking] = useState(false)

  const resetCamera = () => {
    setCapturedImage(null)
    setStudent(null)
  }

  const captureFace = async () => {
    const image = webcamRef.current.getScreenshot()
    if (!image) return alert("Camera not ready")

    setCapturedImage(image)
    setRecognizing(true)

    try {
      const res = await API.post("/face/recognize", { image })
      if (res.data.status === "Face recognized") {
        setStudent(res.data.student)
      } else {
        alert(res.data.status || "Face not recognized")
        setCapturedImage(null)
      }
    } catch (err) {
      console.error(err)
      alert("Face recognition service is offline")
    } finally {
      setRecognizing(false)
    }
  }

  const markAttendance = async () => {
    if (!student) return alert("Please capture your face first")
    if (!currentClass) return alert("No active class session found")

    setMarking(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const res = await API.post("/attendance/mark", {
            student_id: student.id,
            timetable_id: currentClass.id, 
            latitude: latitude,
            longitude: longitude
          })

          // Robust check for response data
          if (res && res.data) {
            if (res.data.status === "success") {
              alert("✅ Success: " + res.data.message)
              resetCamera()
            } else {
              alert("❌ Error: " + res.data.message)
            }
          } else {
            alert("❌ Server returned an empty response.")
          }
        } catch (err) {
          console.error("API Error:", err)
          const errorMsg = err.response?.data?.message || "Failed to submit attendance"
          alert("❌ " + errorMsg)
        } finally {
          setMarking(false)
        }
      },
      (error) => {
        setMarking(false)
        alert("Location error: " + error.message + ". Please enable High-Accuracy GPS/Location.")
      },
      { 
        enableHighAccuracy: true, 
        timeout:15000,
        maximumAge: 0 // Force fresh location, critical for laptops
      }
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.webcamWrapper}>
        {!capturedImage ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={styles.webcam}
          />
        ) : (
          <img src={capturedImage} alt="Captured" style={styles.webcam} />
        )}
      </div>

      <div style={styles.controls}>
        {!capturedImage ? (
          <button onClick={captureFace} disabled={recognizing} style={styles.btnPrimary}>
            {recognizing ? "Recognizing..." : "Verify Face"}
          </button>
        ) : (
          <button onClick={resetCamera} style={styles.btnSecondary}>
            Retake Photo
          </button>
        )}
      </div>

      {student && (
        <div style={styles.resultCard}>
          <h3>Welcome, {student.name}</h3>
          <p>USN: {student.usn} | Section: {student.section}</p>
          <button 
            onClick={markAttendance} 
            disabled={marking} 
            style={marking ? styles.btnDisabled : styles.btnSuccess}
          >
            {marking ? "Processing..." : "Confirm Attendance"}
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { textAlign: "center", width: "100%", maxWidth: "400px", margin: "0 auto" },
  webcamWrapper: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    marginBottom: "20px",
    backgroundColor: "#000"
  },
  webcam: { width: "100%", display: "block" },
  controls: { marginBottom: "20px" },
  resultCard: {
    background: "white",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  btnPrimary: { padding: "12px 24px", background: "#667eea", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  btnSecondary: { padding: "10px 20px", background: "#f44336", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" },
  btnSuccess: { width: "100%", padding: "12px", background: "#4CAF50", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "10px", fontWeight: "bold" },
  btnDisabled: { width: "100%", padding: "12px", background: "#ccc", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", marginTop: "10px" }
}