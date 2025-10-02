import { Routes, Route, Link } from "react-router-dom"

function Landing() {
  return (
    <div>
      <h1>Bus Tracker</h1>
      <nav>
        <Link to="/guardian">Guardian</Link> |{" "}
        <Link to="/student">Student</Link> |{" "}
        <Link to="/staff">Staff</Link>
      </nav>
    </div>
  )
}

function GuardianLogin() {
  return <h2>Guardian Login Page</h2>
}

function StudentLogin() {
  return <h2>Student Login Page</h2>
}

function StaffLogin() {
  return <h2>Staff Login Page</h2>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/guardian" element={<GuardianLogin />} />
      <Route path="/student" element={<StudentLogin />} />
      <Route path="/staff" element={<StaffLogin />} />
    </Routes>
  )
}
