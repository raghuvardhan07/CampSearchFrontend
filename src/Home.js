import React from "react";
import {Link} from "react-router-dom"
import ImageCarousel from "./ImageCarousel"; // Adjust the path based on your project structure
import './App.css';
const Home = () => {
  return (
    <div className="home-container">
      <nav>
        <span className="title-container">CampSearch</span>
        <ul>
          <li>Profile</li>
          <li><Link to="/upload">Upload</Link></li>
          <li>About</li>
          
        </ul>
      </nav>
      <ImageCarousel />
    </div>
  );
};

export default Home;
