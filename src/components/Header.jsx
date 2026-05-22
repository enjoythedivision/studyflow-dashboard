export default function Header({ search, setSearch }) {
  return (
    <header className="header">
      <div className="logo">
        {" "}
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
    </header>
  );
}
