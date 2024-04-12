// import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../../images/logo.png";
import "./Header.css";
import Search_icon_dark from '../../../images/search-w.png';

const Header = () => {
//   const [searchActive, setSearchActive] = useState(false); // Initialize as false

//   const toggleSearch = () => {
//     setSearchActive(!searchActive);
//   };

  return (
    <nav className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Product</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="icons">
        {/* <div className="searchIcon" onClick={toggleSearch}>
          <FaSearch />
        </div>
        <div className={`search ${searchActive ? "active" : ""}`}>
          <input type="text" placeholder="Search..." />
        </div> */}

        <div className="search-box">
            <input type="text" placeholder="Search"/>
            <img src={Search_icon_dark} alt=""/>
        </div>
        <div className="loginUser">
          <Link to={"/login"}>
            <FaUser />
          </Link>
        </div>
        <div className="cart">
          <Link to={"/cart"}>
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
