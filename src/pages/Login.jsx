import { useState } from "react";

export default function Login() {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
const loginStudent = async () => {
  // 1. Clean input for mobile (removes accidental spaces from keyboard)
  const cleanUsn = usn.trim();
  const cleanPassword = password.trim();

  if (!cleanUsn || !cleanPassword) {
    alert("Enter USN and Password");
    return;
  }

  try {
    const res = await fetch("https://final-production-8aff.up.railway.app/students/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usn: cleanUsn, password: cleanPassword }),
    });

    const data = await res.json();

    // 2. Matches the "status": "success" and "student": {} object from your backend
    if (data.status === "success" && data.student) {
      
      // 3. Store the data for the Dashboard to use
      localStorage.setItem("student_usn", data.student.usn);
      localStorage.setItem("student_id", data.student.id);
      localStorage.setItem("student_name", data.student.name);

      alert(`Welcome back, ${data.student.name}! ✅`);

      // 4. Guaranteed redirect for Vercel/Mobile
      window.location.href = window.location.origin + "/student/dashboard";

    } else {
      // 5. This will show your custom backend error messages ("Wrong password", etc.)
      alert(data.message || "Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Server unreachable. Please check your internet connection.");
  }
};

  return (
    <div className="card">
      <h2>Student Login</h2>
      <input placeholder="Enter USN" value={usn} onChange={(e) => setUsn(e.target.value)} />
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginStudent}>Login</button>
      <p style={{ marginTop: "15px" }}>
        Don't have account? <a href="/student/register" style={{ color: "#fff", fontWeight: "bold" }}>Register</a>
      </p>
    </div>
  );
}