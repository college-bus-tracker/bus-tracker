import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import "./components/Backgrounds.css";

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

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <GridBackground>
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
    </GridBackground>
  );
}
