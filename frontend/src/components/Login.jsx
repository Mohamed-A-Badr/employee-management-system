import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, saveTokens } from "../utils/auth";
import GradientButton from "./common/GradientButton";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login/", {
        email,
        password,
      });

      const { access, refresh } = response.data;
      saveTokens(access, refresh);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        "An error occurred during login. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log In</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <GradientButton type="submit" fullWidth>
            Log In
          </GradientButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
