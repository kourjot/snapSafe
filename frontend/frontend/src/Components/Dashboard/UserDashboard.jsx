/** @format */

import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img/snapsafelogo.jpg"
const UserDashboard = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const uploadUserImage = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("data", file);
    });

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You need to log in first!");
      return;
    }

    try {
      const response = await fetch(
        "https://snapsafevj.onrender.com/uploadData",
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && Array.isArray(data.urls)) {
        setImages((prevImages) => [...prevImages, ...data.urls]);
      } else {
        alert("Failed to upload images: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  const fetchUserImages = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://snapsafevj.onrender.com/mydata", {
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      if (Array.isArray(data.data)) {
        setImages(data.data);
      } else {
        alert("Failed to fetch images: Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("An error occurred while fetching the images.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserImages();
    }
  }, []);

  return (
    <div className="user-dashboard">
      {/* Navbar */}
      <nav className="dashboard-header">
        <div className="header-logo">
          <img
            src={img}
            alt="SnapSafe Logo"
            className="header-logo-image"
          />
          <h1 className="header-title">SnapSafe Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <h2 className="dashboard-heading">Welcome to Your Dashboard!</h2>
        <p className="dashboard-description">
          Here you can manage your uploads, view statistics, and more.
        </p>

        {/* Upload Section */}
        <div className="upload-container">
          <input
            type="file"
            id="uploadInput"
            className="file-input-hidden"
            multiple
            onChange={uploadUserImage}
          />
          <label htmlFor="uploadInput" className="upload-btn">
            Upload Image(s)
          </label>
        </div>

        {/* Uploaded Images Grid */}
        <div className="images-grid">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded ${index + 1}`}
              className="uploaded-img"
            />
          ))}
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stats-card">
            <h3 className="card-title">Total Uploads</h3>
            <p className="card-data">{images.length}</p>
          </div>
          <div className="stats-card">
            <h3 className="card-title">Storage Used</h3>
            <p className="card-data">5.6 GB</p>
          </div>
          <div className="stats-card">
            <h3 className="card-title">Active Sessions</h3>
            <p className="card-data">2</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
