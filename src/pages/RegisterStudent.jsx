import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function StudentRegistration() {
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", usn: "", password: "", semester: "", section: "" });

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => videoRef.current.srcObject = s);
  };

  return (
    <div className="registration-form" style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
      <h2>Student Registration</h2>
      <input type="text" placeholder="Name" className="reg-input" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="text" placeholder="USN" className="reg-input" onChange={e => setFormData({...formData, usn: e.target.value})} />
      <input type="password" placeholder="Password" className="reg-input" onChange={e => setFormData({...formData, password: e.target.value})} />
      <input type="text" placeholder="Semester (e.g. 5)" className="reg-input" onChange={e => setFormData({...formData, semester: e.target.value})} />
      <input type="text" placeholder="Section" className="reg-input" onChange={e => setFormData({...formData, section: e.target.value})} />
      
      <div className="preview-box" style={{ margin: '15px auto', width: '300px', height: '200px', backgroundColor: '#222', borderRadius: '10px' }}>
        <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '10px' }} />
      </div>

      <button onClick={startCamera} style={btnStyle("#ff4b5c")}>Start Camera</button>
      <button className="btn-reg" style={btnStyle("#ff4b5c")}>Capture & Register</button>

      {/* Restored Login Link */}
      <p style={{ marginTop: '20px' }}>
        Already registered? <Link to="/login" style={{ color: '#ff4b5c' }}>Login</Link>
      </p>
    </div>
  );
}

const btnStyle = (c) => ({ width: '80%', padding: '12px', margin: '8px 0', backgroundColor: c, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' });