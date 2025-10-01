import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GuardianLogin from "./components/GuardianLogin"; {/*
import StudentLogin from "./components/StudentLogin";
import StaffLogin from "./components/StaffLogin"; */}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guardian-login" element={<GuardianLogin />} /> {/*
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/staff-login" element={<StaffLogin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
