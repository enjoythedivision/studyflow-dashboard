import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "./AuthCard";
import { login, getCurrentUser } from "../api/authApi";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      const user = await getCurrentUser();
      setUser(user);
      navigate("/");
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
      title="Welcome back"
      subtitle="Sign in to manage your courses"
      footer={
        <p className="auth__footer">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          Log in
        </button>
      </form>
    </AuthCard>
  );
}
