import { useState } from "react";

export default function Login() {
  // We don't strictly need useNavigate if we use window.location.href, 
  // but keeping imports clean is good.
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");

  const loginStudent = async () => {
    if (!usn || !password) {
      alert("Enter USN and Password");
      return;
    }

    try {
      const res = await fetch("https://final-production-8aff.up.railway.app/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usn, password }),
      });

      const data = await res.json();

      if (data.status === "Login success" && data.student) {
        // 1. Store credentials for the session
        localStorage.setItem("student_usn", data.student.usn);
        localStorage.setItem("student_id", data.student.id);

        alert("Login Successful");

        // 2. The "Hammer" Redirect: Forces the browser to move to the dashboard
        window.location.href = "/student/dashboard";
        
      } else {
        alert(data.status || "Invalid USN or Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server connection failed. Please try again later.");
    }
  };

  return (
    <div className="card">
      <h2>Student Login</h2>

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

      <button onClick={loginStudent}>
        Login
      </button>

      <p style={{ marginTop: "15px" }}>
        Don't have account?{" "}
        <a href="/student/register" style={{ color: "#fff", fontWeight: "bold" }}>
          Register
        </a>
      </p>
    </div>
  );
}