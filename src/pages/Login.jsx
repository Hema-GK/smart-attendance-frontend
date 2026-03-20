// import { useState } from "react";

// export default function Login() {
//   const [usn, setUsn] = useState("");
//   const [password, setPassword] = useState("");
  
// const loginStudent = async () => {
//   // 1. Clean input for mobile (removes accidental spaces from keyboard)
//   const cleanUsn = usn.trim();
//   const cleanPassword = password.trim();

//   if (!cleanUsn || !cleanPassword) {
//     alert("Enter USN and Password");
//     return;
//   }

//   try {
//     const res = await fetch("https://final-production-8aff.up.railway.app/students/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ usn: cleanUsn, password: cleanPassword }),
//     });

//     const data = await res.json();

//     // 2. Matches the "status": "success" and "student": {} object from your backend
//     if (data.status === "success" && data.student) {
      
//       // 3. Store the data for the Dashboard to use
//       localStorage.setItem("student_usn", data.student.usn);
//       localStorage.setItem("student_id", data.student.id);
//       localStorage.setItem("student_name", data.student.name);

//       alert(`Welcome back, ${data.student.name}! ✅`);

//       // 4. Guaranteed redirect for Vercel/Mobile
//       window.location.href = window.location.origin + "/student/dashboard";

//     } else {
//       // 5. This will show your custom backend error messages ("Wrong password", etc.)
//       alert(data.message || "Login failed. Please check your credentials.");
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     alert("Server unreachable. Please check your internet connection.");
//   }
// };

//   return (
//     <div className="card">
//       <h2>Student Login</h2>
//       <input placeholder="Enter USN" value={usn} onChange={(e) => setUsn(e.target.value)} />
//       <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={loginStudent}>Login</button>
//       <p style={{ marginTop: "15px" }}>
//         Don't have account? <a href="/student/register" style={{ color: "#fff", fontWeight: "bold" }}>Register</a>
//       </p>
//     </div>
//   );
// }



import { useState } from "react";

export default function Login() {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");

  const loginStudent = async (e) => {
    // Prevent page reload if using a form
    if (e) e.preventDefault();

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

      if (data.status === "success" && data.student) {
        localStorage.setItem("student_usn", data.student.usn);
        localStorage.setItem("student_id", data.student.id);
        localStorage.setItem("student_name", data.student.name);

        alert(`Welcome back, ${data.student.name}! ✅`);

        // Use window.location for the most reliable mobile redirect
        window.location.href = window.location.origin + "/student/dashboard";
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server unreachable. Please check your internet connection.");
    }
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card" style={cardStyle}>
        <h2 style={{ marginBottom: "10px", color: "#fff" }}>Student Login</h2>
        <p style={{ color: "rgba(90, 6, 106, 0.5)", fontSize: "14px", marginBottom: "20px" }}>
          Access your attendance portal
        </p>

        {/* Using a form ensures the button "submit" action always triggers */}
        <form onSubmit={loginStudent} style={{ width: "100%" }}>
          <input
            placeholder="Enter USN"
            value={usn}
            style={inputStyle}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={buttonStyle}>
            LOGIN
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "rgba(14, 2, 2, 0.6)" }}>
          Don't have an account?{" "}
          <a href="/student/register" style={{ color: "#4facfe", fontWeight: "bold", textDecoration: "none" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "380px",
  padding: "40px 30px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255, 255, 255, 0.51)",
  color: "black",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(79, 172, 254, 0.4)",
};