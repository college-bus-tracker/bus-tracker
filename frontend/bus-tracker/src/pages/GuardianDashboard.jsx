import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Map from "../components/Map";

const GuardianDashboard = () => {
  const [activeSection, setActiveSection] = useState("tracking");
  const [guardian, setGuardian] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [feeInfo, setFeeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login?role=guardian");
        return;
      }

      try {
        // Fetch guardian profile
        const docRef = doc(db, "guardians", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGuardian(data);

          // Optional: fetch driver info & fee info from Firestore
          if (data.childBusId) {
            const driverDoc = await getDoc(doc(db, "buses", data.childBusId));
            if (driverDoc.exists()) setDriverInfo(driverDoc.data());

            const feeDoc = await getDoc(doc(db, "fees", user.uid));
            if (feeDoc.exists()) setFeeInfo(feeDoc.data());
          }
        } else {
          console.error("Guardian profile not found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
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
      case "tracking":
        return (
          <section id="tracking" className="active">
            <h1>Live Bus Tracking</h1>
            <Map busId={guardian?.childBusId} />
          </section>
        );
      case "driver":
        return (
          <section id="driver" className="active">
            <h1>Driver Information</h1>
            {driverInfo ? (
              <>
                <p><strong>Name:</strong> {driverInfo.name}</p>
                <p><strong>Phone:</strong> {driverInfo.phone}</p>
                <p><strong>Bus No:</strong> {driverInfo.busNo}</p>
              </>
            ) : (
              <p>Loading driver info...</p>
            )}
          </section>
        );
      case "fees":
        return (
          <section id="fees" className="active">
            <h1>Bus Fee Management</h1>
            {feeInfo ? (
              <>
                <p>Status: <span className="status">{feeInfo.status === "paid" ? "Paid ✅" : "Pending ❌"}</span></p>
                {feeInfo.receiptUrl && (
                  <a href={feeInfo.receiptUrl} target="_blank" rel="noopener noreferrer">
                    <button className="btn">Download Receipt</button>
                  </a>
                )}
              </>
            ) : (
              <p>Loading fee info...</p>
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
        <h2>Guardian Dashboard</h2>
        {guardian && (
          <div className="profile">
            <p><strong>Name:</strong> {guardian.name}</p>
            <p><strong>Email:</strong> {guardian.email}</p>
          </div>
        )}
        <ul>
          <li>
            <button
              onClick={() => setActiveSection("tracking")}
              className={activeSection === "tracking" ? "active" : ""}
            >
              Live Tracking
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("driver")}
              className={activeSection === "driver" ? "active" : ""}
            >
              Driver Info
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("fees")}
              className={activeSection === "fees" ? "active" : ""}
            >
              Bus Fee
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

export default GuardianDashboard;
