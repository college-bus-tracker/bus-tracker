import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🚍 College Bus Tracker</h1>
      <p>Select your role:</p>

      <div style={{ marginTop: "20px" }}>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => navigate("/login?role=student")}
        >
          Student
        </button>

        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => navigate("/login?role=guardian")}
        >
          Guardian
        </button>

        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => navigate("/login?role=staff")}
        >
          Staff
        </button>

        <div style={{ marginTop: "20px" }}>
          <button
            style={{ padding: "8px 16px" }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
