import { Link } from "react-router-dom";

export default function StudentLogin() {
  return (
    <div className="login-container" style={{ textAlign: 'center', color: 'white', padding: '50px 20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Student Login</h2>
      <input type="text" placeholder="Enter USN" style={loginInput} />
      <input type="password" placeholder="Enter Password" style={loginInput} />
      <button style={{ ...btnStyle("#ff4b5c"), width: '85%' }}>Login</button>
      
      {/* Restored Register Link */}
      <p style={{ marginTop: '20px' }}>
        Don't have account? <Link to="/register" style={{ color: '#ff4b5c' }}>Register</Link>
      </p>
    </div>
  );
}

const loginInput = { width: '85%', padding: '15px', margin: '10px 0', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' };
const btnStyle = (c) => ({ padding: '15px', backgroundColor: c, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' });