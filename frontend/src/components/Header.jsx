import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { user } = userFromLocalStorage;

  const handleLogout = () => {
    localStorage.removeItem("user");
    // navigate("/login");
    window.location.reload(true);
  };
  return (
    <div className="navbar">
      <div className="navbar__top">
        <div className="navbar__logo-box">
          <h2 className="navbar__logo" style={{ color: "#fff" }}>
            JIJI
          </h2>
        </div>
        <ul className="navbar__items">
          <li className="navbar__list">
            <Link style={{ color: "#fff" }} to="/">
              Home
            </Link>
          </li>

          {!user && (
            <li className="navbar__list">
              <Link style={{ color: "#fff" }} to="/login">
                Login
              </Link>
            </li>
          )}

          <Link style={{ color: "#fff" }} to="/register">
            <li className="navbar__list">Register</li>
          </Link>
          <li className="navbar__list">
            <Link style={{ color: "#fff" }} to="/create">
              Post
            </Link>
          </li>
          {user && (
            <li
              className="navbar__list"
              style={{ color: "#fff" }}
              onClick={handleLogout}
            >
              Logout
            </li>
          )}

          {user?.username && (
            <li className="navbar__list">
              <Link style={{ color: "#fff" }} to="/account">
                My Account
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
