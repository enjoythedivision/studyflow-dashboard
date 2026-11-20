import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user, isLoadingUser, handleLogin, handleLogout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
