import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import { register } from "../api/authApi"

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(formData.email, formData.password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
