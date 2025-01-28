/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = "https://snapsafevj.onrender.com/signup";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the Login component after successful signup
        navigate("/login"); // Use the route path for the login component
      } else {
        // Display API error message
        setErrorMessage(data.message || "An error occurred, please try again.");
      }
    } catch (error) {
      // Handle network errors
      setErrorMessage("An error occurred while communicating with the server.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="brand-logo">SnapSafe</div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="textbox">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email input */}
          <div className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password input */}
          <div className="textbox password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {/* Submit button */}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Signup;
