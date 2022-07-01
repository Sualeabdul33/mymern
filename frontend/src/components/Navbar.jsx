import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { user } = userFromLocalStorage;
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  // console.log(user);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/products", { state: search });
    // console.log(search);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // navigate("/login");
    window.location.reload(true);
  };
  return (
    <>
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
      <div className="navbar__search-box">
        <form action="#" className="navbar__form">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="navbar__input"
            placeholder="Search product by name"
          />
          <button onClick={handleClick} className="navbar__btn">
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default Navbar;
