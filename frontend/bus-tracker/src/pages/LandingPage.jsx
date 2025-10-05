import React from "react";
import { useNavigate } from "react-router-dom";
import '../components/Backgrounds.css'; // Import your CSS

export default function LandingPage() {
  const navigate = useNavigate();

  const backgroundStyles = {
    position: 'relative',
    backgroundSize: '20px 20px',
    backgroundImage: 'radial-gradient(circle, #d3d3d3 1px, transparent 1px)',
    display: 'flex',
    height: '50rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    maskImage: 'radial-gradient(ellipse at center, black 80%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 80%, transparent 100%)',
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 20,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    height: '90%',
  };

  return (
    <div className="background-container dot-background">
      <div style={backgroundStyles}>
        <div style={contentStyles}>
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1 style={{ textDecoration: 'underline' }}>🚍 College Bus Tracker</h1>
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
        </div>
      </div>
    </div>
  );
}
