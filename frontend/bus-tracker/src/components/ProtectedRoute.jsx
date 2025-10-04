import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ role, children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        // Check user's role in Firestore
        let collectionName = "";
        if (role === "guardian") collectionName = "guardians";
        else if (role === "staff") collectionName = "staff";
        else if (role === "student") collectionName = "students";

        const docRef = doc(db, collectionName, user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAuthorized(true); // User has correct role
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Error checking role:", err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) return <p style={{ textAlign: "center" }}>Checking authentication...</p>;

  return authorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;