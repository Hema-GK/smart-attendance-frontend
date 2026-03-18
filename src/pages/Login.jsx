import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");

  const loginStudent = async () => {
    if (!usn || !password) {
      alert("Enter USN and Password");
      return;
    }

    try {
      // UPDATED TO RAILWAY URL
      const res = await fetch("https://final-production-8aff.up.railway.app/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usn, password }),
      });

      const data = await res.json();

      if (data.status === "Login success") {
        localStorage.setItem("student_usn", data.student.usn);
        localStorage.setItem("student_id", data.student.id);
        alert("Login Successful");
        navigate("/student/dashboard");
      } else {
        alert(data.status);
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failed");
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
      <button onClick={loginStudent}>Login</button>
      <p style={{ marginTop: "15px" }}>
        Don't have account?{" "}
        <a href="/student/register" style={{ color: "#fff", fontWeight: "bold" }}>
          Register
        </a>
      </p>
    </div>
  );
}