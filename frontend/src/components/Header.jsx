import { logout } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Header({ search, setSearch, user, setUser }) {
  const navigate = useNavigate();

  //TODO: Fix header responsiveness
  const handleLogout = async () => {
    try {
      await logout();
      alert("Log out successful. Redirecting...");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <span>Study</span>
        <span>Flow</span>
      </div>

      <input
        className="search"
        type="text"
        placeholder="Search for a course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="header__right">
        {user && (
          <>
            <span>Hi, {user.username || user.email}!</span>
            <button className="submit-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
