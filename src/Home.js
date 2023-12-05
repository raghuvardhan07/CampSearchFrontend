import React from "react";
import {Link} from "react-router-dom"
import ImageCarousel from "./ImageCarousel"; // Adjust the path based on your project structure
import './App.css';
import { useAuth } from "./AuthContext";
const Home = () => {
  const {session} = useAuth()
  return (
    <div className="home-container">
      <nav>
        <span className="title-container">CampSearch</span>
        <ul>
          {session && <li><Link to="/upload">Upload</Link></li>}
          {session ? <Link to="/profile">Profile</Link> : <><li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li></>}
        </ul>
      </nav>
      <ImageCarousel />
    </div>
  );
};

export default Home;
