import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState("buses");
  const [staff, setStaff] = useState(null);
  const [buses, setBuses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login?role=staff");
        return;
      }

      try {
        // Fetch staff profile
        const docRef = doc(db, "staff", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStaff(docSnap.data());

          // Fetch buses assigned to this staff
          const busesRef = collection(db, "buses");
          const busesQuery = query(busesRef, where("staffId", "==", user.uid));
          const busesSnap = await getDocs(busesQuery);
          const busesList = busesSnap.docs.map((d) => d.data());
          setBuses(busesList);

          // Fetch students assigned to this staff's buses
          const studentsRef = collection(db, "students");
          const studentsSnap = await getDocs(studentsRef);
          const assignedStudents = studentsSnap.docs
            .map((d) => d.data())
            .filter((s) => busesList.some((b) => b.id === s.childBusId));
          setStudents(assignedStudents);
        } else {
          console.error("Staff profile not found");
        }
      } catch (err) {
        console.error("Error fetching staff data:", err);
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
      case "buses":
        return (
          <section>
            <h1>Manage Buses</h1>
            {buses.length ? (
              <ul>
                {buses.map((bus, index) => (
                  <li key={index}>
                    <strong>{bus.busNo}</strong> - {bus.route}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No buses assigned.</p>
            )}
          </section>
        );
      case "students":
        return (
          <section>
            <h1>Student List</h1>
            {students.length ? (
              <ul>
                {students.map((student, index) => (
                  <li key={index}>
                    {student.name} - {student.email} - Bus: {student.childBusId}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students assigned to your buses.</p>
            )}
          </section>
        );
      case "routes":
        return (
          <section>
            <h1>Bus Routes</h1>
            {buses.length ? (
              <ul>
                {buses.map((bus, index) => (
                  <li key={index}>
                    <strong>{bus.busNo}</strong> - Route: {bus.route}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No routes assigned.</p>
            )}
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
        <h2>Staff Dashboard</h2>
        {staff && (
          <div className="profile">
            <p><strong>Name:</strong> {staff.name}</p>
            <p><strong>Email:</strong> {staff.email}</p>
          </div>
        )}
        <ul>
          <li>
            <button
              onClick={() => setActiveSection("buses")}
              className={activeSection === "buses" ? "active" : ""}
            >
              Manage Buses
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("students")}
              className={activeSection === "students" ? "active" : ""}
            >
              Student List
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("routes")}
              className={activeSection === "routes" ? "active" : ""}
            >
              Routes
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

export default StaffDashboard;
