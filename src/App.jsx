import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";

import LandingPage from "./pages/LandingPage";

import RegisterStudent from "./pages/RegisterStudent";
import LoginStudent from "./pages/Login.jsx";

import RegisterTeacher from "./pages/RegisterTeacher";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";

import LoginTeacher from "./pages/LoginTeacher";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import MarkAttendance from "./pages/MarkAttendance";
import AttendanceReport from "./pages/AttendanceReport";

import AnalyticsPage from "./pages/AnalyticsPage";
import AttendanceHistory from "./pages/AttendanceHistory";

import UploadTimetable from "./pages/UploadTimetable";
import UploadPolygon from "./pages/UploadPolygon";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const listener = CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      
      // If there is history → go back
      if (window.history.length > 1) {
        window.history.back();
      } 
      // Else exit app
      else {
        CapacitorApp.exitApp();
      }

    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/student/register" element={<RegisterStudent />} />
      <Route path="/student/login" element={<LoginStudent />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      <Route path="/student/mark-attendance" element={<MarkAttendance />} />
      <Route path="/student/attendance-report" element={<AttendanceReport />} />

      <Route path="/teacher/register" element={<RegisterTeacher />} />
      <Route path="/teacher/login" element={<LoginTeacher />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/teacher/analytics" element={<AnalyticsPage />} />
      <Route path="/teacher/history" element={<AttendanceHistory />} />

      <Route path="/admin/upload-timetable" element={<UploadTimetable />} />
      <Route path="/admin/upload-polygon" element={<UploadPolygon />} />

    </Routes>
  );
}

export default App;