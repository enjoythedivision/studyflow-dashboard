import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "./api/authApi";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    }

    loadCurrentUser();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      alert("Log out successful. Redirecting...");
      setUser(null);
      navigate("/login");
    } catch (error) {
      alert("Failed to log out.");
      console.error(error);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          isLoadingUser ? null : user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
