import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GuardianLogin from "./components/GuardianLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/guardian-login" element={<GuardianLogin />} />
    </Routes>
  );
}

export default App;