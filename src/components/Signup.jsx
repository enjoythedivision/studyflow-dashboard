import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "./AuthCard";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start tracking your courses with StudyFlow"
      footer={
        <p className="auth__footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          Sign up
        </button>
      </form>
    </AuthCard>
  );
}
