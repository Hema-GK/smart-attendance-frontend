import { useState } from "react";

export default function Login() {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state to show manual link

  const loginStudent = async () => {
    if (!usn || !password) {
      alert("Enter USN and Password");
      return;
    }

    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usn, password }),
      });

      const data = await res.json();

      if (data.status === "Login success" && data.student) {
        localStorage.setItem("student_usn", data.student.usn);
        localStorage.setItem("student_id", data.student.id);

        alert("Login Successful! Redirecting...");
        setIsSuccess(true); // Show the manual button if redirect hangs

        // Try three different ways to redirect
        try {
           window.location.replace("/student/dashboard"); // Method 1: No history back
        } catch (e) {
           window.location.href = "/student/dashboard"; // Method 2: Standard
        }
      } else {
        alert(data.status || "Invalid USN or Password");
      }
    } catch (error) {
      alert("Network error: Cannot reach the server.");
    }
  };

  return (
    <div className="card">
      <h2>Student Login</h2>
      
      {!isSuccess ? (
        <>
          <input
            placeholder="Enter USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginStudent}>Login</button>
        </>
      ) : (
        <div style={{marginTop: "20px"}}>
          <p>If you are not redirected, tap below:</p>
          <button 
            className="btn" 
            style={{backgroundColor: "#28a745"}}
            onClick={() => window.location.href = "/student/dashboard"}
          >
            Go to Dashboard
          </button>
        </div>
      )}

      <p style={{ marginTop: "15px" }}>
        Don't have account?{" "}
        <a href="/student/register" style={{ color: "#fff", fontWeight: "bold" }}>
          Register
        </a>
      </p>
    </div>
  );
}