import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = { email, password };
    try {
      const res = await axios.post("http://localhost:5001/login", values);
      console.log("Response:", res);

      if (res.data.status === "success") {
        alert("You are now logged in!");
        sessionStorage.setItem("userToken", res.data.token);
        navigate("/dashboard");
      } else {
        setErrorMessage(res.data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.error || "Login failed. Please try again.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
      console.error("Error during login", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="register-link">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="register-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;