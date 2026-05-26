export default function Header({ search, setSearch, user, setUser }) {
  //TODO: Fix header responsiveness
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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
            <button className="submit-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}