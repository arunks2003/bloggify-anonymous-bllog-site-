// src/Navbar.js
import React from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/userSlice";

const Navbar = () => {
  const user = useSelector(selectUser) || localStorage.getItem("loggedIn");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Blogster
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        {!user ? (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        ) : (
          <>
            <Link to="/create-post" className="navbar-link">
              Create Post
            </Link>
            <Link
              to="/login"
              className="navbar-link"
              onClick={(e) => handleClick(e)}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
