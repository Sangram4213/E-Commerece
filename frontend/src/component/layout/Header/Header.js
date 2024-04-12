import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [searchActive, setSearchActive] = useState(true); // Initialize as true

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

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
        <div className="searchIcon" onClick={toggleSearch}>
          <FaSearch />
        </div>
        {/* Search bar */}
        <div className={`${searchActive ? "search" : ""}`}>
            {console.log(searchActive)}
          <input type="text" placeholder="Search..." />
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
