import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Make sure to create this CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const values = { username, email, password };

    try {
      const res = await axios.post("http://localhost:5001/signup", values);
      if (res.data.status === "success") {
        setSuccess("User registered successfully");
        // Clear form fields after successful signup
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/');  // Assuming '/' is your login route
        }, 2000);  // 2 second delay
      } else {
        setError(res.data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError(err.response?.data?.error || "Server Side Error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;