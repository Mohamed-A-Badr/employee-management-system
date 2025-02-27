import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./form/Button";
import Input from "./form/Input";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/login/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.access);
      
      // Redirect to home page
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError("Email or Password are incorrect");
      } else {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="gradient_background">
      <div className="login-container">
        <h1 className="title">Log In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            value={formData.email}
            onChange={handleChange}
            autoFocus={true}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" value="Log In" />
        </form>
      </div>
    </div>
  );
};

export default Login;
