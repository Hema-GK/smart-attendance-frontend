import { useState, useEffect } from "react"
import FaceCapture from "../components/FaceCapture"
import API from "../api/api"

export default function MarkAttendance() {
  const [currentClass, setCurrentClass] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get("/timetable/current-class")
      .then(res => {
        if (res.data.status === "Class Active") {
          setCurrentClass(res.data.class)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  /* ---------------- LOADING SCREEN ---------------- */
  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)"
      }}>
        <h2 style={{ color: "white" }}>Checking Current Class...</h2>
      </div>
    )
  }

  /* ---------------- NO CLASS ---------------- */
  if (!currentClass) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}>
          <h2>No Class Currently Running</h2>
          <p>Please try again during class time.</p>
        </div>
      </div>
    )
  }

  /* ---------------- MAIN PAGE ---------------- */
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#667eea,#764ba2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      {/* CURRENT CLASS CARD */}
      <div style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        padding: "30px",
        borderRadius: "15px",
        color: "white",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        marginBottom: "30px",
        width: "350px"
      }}>
        <h2>Current Class</h2>
        <p><b>Subject:</b> {currentClass.subject}</p>
        <p><b>Section:</b> {currentClass.section}</p>
        <p><b>Semester:</b> {currentClass.semester}</p>
        <p><b>Room:</b> {currentClass.classroom}</p>
      </div>

      {/* FACE ATTENDANCE */}
      <FaceCapture currentClass={currentClass} />
    </div>
  )
}