import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuardianDashboard from "./pages/GuardianDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Guardian Dashboard */}
        <Route
          path="/guardian-dashboard"
          element={
            <ProtectedRoute role="guardian">
              <GuardianDashboard />
            </ProtectedRoute>
          }
        />

        {/* Staff Dashboard */}
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute role="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
