import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, login, logout } from "../api/authApi";

export default function useAuth() {
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

  async function handleLogin(email, password) {
    await login(email, password);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  }

  async function handleLogout() {
    try {
      await logout();
      alert("Log out successful. Redirecting...");
      setUser(null);
      navigate("/login");
    } catch (error) {
      alert("Failed to log out.");
      console.error(error);
    }
  }

  return { user, isLoadingUser, handleLogin, handleLogout };
}
