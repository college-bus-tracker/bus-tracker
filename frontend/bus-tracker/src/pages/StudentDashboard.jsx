import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Map from "../components/Map";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("busInfo");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login?role=student");
        return;
      }

      try {
        const docRef = doc(db, "students", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          console.error("Student profile not found.");
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "busInfo":
        return (
          <section>
            <h1>Bus Information</h1>
            {student ? (
              <>
                <p><strong>Bus No:</strong> {student.childBusId}</p>
                <p><strong>Driver:</strong> {student.driverName || "Loading..."}</p>
                <p><strong>Phone:</strong> {student.driverPhone || "Loading..."}</p>
                <p><strong>Route:</strong> {student.route || "Loading..."}</p>
              </>
            ) : (
              <p>Loading student info...</p>
            )}
          </section>
        );
      case "tracking":
        return (
          <section>
            <h1>Live Bus Tracking</h1>
            {student?.childBusId ? <Map busId={student.childBusId} /> : <p>No bus assigned.</p>}
          </section>
        );
      default:
        return null;
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Student Dashboard</h2>
        {student && (
          <div className="profile">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
          </div>
        )}
        <ul>
          <li>
            <button
              onClick={() => setActiveSection("busInfo")}
              className={activeSection === "busInfo" ? "active" : ""}
            >
              Bus Info
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("tracking")}
              className={activeSection === "tracking" ? "active" : ""}
            >
              Live Tracking
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </aside>

      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default StudentDashboard;
