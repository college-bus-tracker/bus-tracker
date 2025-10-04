import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { cn } from "../lib/utils";
import "../components/Backgrounds.css";

// Grid Background Component
export const GridBackground = ({
  className,
  children,
  gridSize = 20,
  gridColor = "#e4e4e7",
  darkGridColor = "#262626",
  showFade = true,
  fadeIntensity = 20,
  ...props
}) => {
  const [currentGridColor, setCurrentGridColor] = useState(gridColor);

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkModeActive =
      document.documentElement.classList.contains("dark") || prefersDarkMode;
    setCurrentGridColor(isDarkModeActive ? darkGridColor : gridColor);

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
          const updatedIsDarkModeActive =
            document.documentElement.classList.contains("dark");
          setCurrentGridColor(
            updatedIsDarkModeActive ? darkGridColor : gridColor
          );
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return function () {
      return observer.disconnect();
    };
  }, [gridColor, darkGridColor]);

  return (
    <div
      className={cn("background-container grid-background", className)}
      style={{
        '--grid-size': gridSize + 'px',
        '--grid-color': currentGridColor,
        '--fade-intensity': fadeIntensity + '%',
      }}
      {...props}
    >
      {showFade && <div className="fade-overlay" />}
      <div className="content">{children}</div>
    </div>
  );
};

// Dot Background Component
export const DotBackground = ({
  className,
  children,
  dotSize = 1,
  dotColor = "#000",
  darkDotColor = "#fff",
  spacing = 20,
  showFade = true,
  fadeIntensity = 20,
  ...props
}) => {
  const [currentDotColor, setCurrentDotColor] = useState(dotColor);

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkModeActive =
      document.documentElement.classList.contains("dark") || prefersDarkMode;
    setCurrentDotColor(isDarkModeActive ? darkDotColor : dotColor);

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
          const updatedIsDarkModeActive =
            document.documentElement.classList.contains("dark");
          setCurrentDotColor(updatedIsDarkModeActive ? darkDotColor : dotColor);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return function () {
      return observer.disconnect();
    };
  }, [dotColor, darkDotColor]);

  return (
    <div
      className={cn("dot-background-container dot-background", className)}
      style={{
        '--dot-spacing': spacing + 'px',
        '--dot-color': currentDotColor,
        '--dot-size': dotSize + 'px',
        '--fade-intensity': fadeIntensity + '%',
      }}
      {...props}
    >
      {showFade && <div className="fade-overlay" />}
      <div className="content">{children}</div>
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // role comes from query param like ?role=student
  const role = new URLSearchParams(location.search).get("role");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch profile based on role
      const docRef = doc(db, role + "s", uid); // "students", "guardians", "staffs"
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("Profile not found in database.");
        return;
      }

      // Navigate to role-based dashboard
      if (role === "student") navigate("/student-dashboard");
      else if (role === "guardian") navigate("/guardian-dashboard");
      else if (role === "staff") navigate("/staff-dashboard");
      else navigate("/dashboard"); // fallback
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <GridBackground>
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h1>Login {role && `as ${role}`}</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Login
          </button>
        </form>
      </div>
    </GridBackground>
  );
}
