import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🚍 College Bus Tracker</h1>
      <p>Select your role to continue:</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/guardian-login">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Guardian</button>
        </Link>
      </div>
    </div>
  );
}
