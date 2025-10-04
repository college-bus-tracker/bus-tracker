import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
  );
}
