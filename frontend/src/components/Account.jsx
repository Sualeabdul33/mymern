import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetchUser, { userSettings } from "../apis/userApis";
import { AiFillSetting } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import Admin from "./Admin";
const defaultUser = `https://th.bing.com/th?q=Default+User+Avatar&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.25&pid=InlineBlock&mkt=en-WW&cc=GH&setlang=en&adlt=moderate&t=1&mw=247`;
const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  // const userSetting = userSettings(dat,'data')
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { user } = userFromLocalStorage;

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    await userSettings("data", formData);
  };
  // console.log(editValue);
  const handlePassword = async (e) => {
    e.preventDefault();
    if (!password || !oldPassword) return;

    await userSettings("password", { oldPassword, password });
  };
  const handleData = async (e) => {
    e.preventDefault();
    if (!username || !email) return;
    await userSettings("data", { username, email });
  };
  return (
    <>
      <div className="account">
        <nav className="account__nav">
          <ul className="account__list">
            <li className="account__item">
              <Link to="/">
                <MdArrowBackIosNew className="account__back" />
              </Link>
            </li>
            <li className="account__item">{user?.username}'s dashboard</li>
            <li className="account__item">
              <img
                src={
                  user?.photo ? `/uploads/users/${user?.photo}` : defaultUser
                }
                alt={user?.username}
                className="account__img"
              />
              <span className="account__username">
                Hello,{user?.username.split(" ")[0]}!
              </span>
            </li>
          </ul>
        </nav>
        <div className="account__container">
          <aside className="account__aside">
            <h2 className="account__heading">
              <AiFillSetting className="account__settings-icon" />{" "}
              <span>Your settings</span>
            </h2>
            <ul className="account__sList">
              <li className="account__sItem">
                <Link style={{ color: "#495057" }} to="/my-products">
                  My products
                </Link>
              </li>
              <li className="account__sItem">
                <Link style={{ color: "#495057" }} to="/all-products">
                  All products
                </Link>
              </li>
              <li className="account__sItem">
                <Link style={{ color: "#495057" }} to="/create">
                  post product
                </Link>
              </li>
              <li className="account__sItem">
                <Link style={{ color: "#495057" }} to="/my-reviews">
                  My reviews
                </Link>
              </li>
            </ul>
          </aside>
          <div className="account__main">
            <figure className="account__profile">
              <form
                onSubmit={handlePhotoSubmit}
                action="#"
                className="account__edit-form"
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  className="account__hidden"
                  id="editor"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {!photo ? (
                  <label htmlFor="editor" className="account__edit">
                    Edit
                  </label>
                ) : (
                  <button className="account__save">save</button>
                )}
              </form>
              <img
                src={
                  user?.photo ? `/uploads/users/${user?.photo}` : defaultUser
                }
                alt={user?.username}
                className="account__pImg"
              />
              <div className="account__user-info">
                <span className="account__username">My Profile</span>
                <span className="account__email">
                  {user?.createdAt.slice(0, 10)}
                </span>
              </div>
              <div className="account__user-info">
                <span className="account__username">{user?.username}</span>
                <span className="account__email">{user?.email}</span>
              </div>
            </figure>
            <div className="account__settings">
              <div className="account__password">
                <form
                  action="#"
                  className="account__form"
                  onSubmit={handlePassword}
                >
                  <ul className="account__form-list">
                    <li className="account__form-item">
                      Change your password here!
                    </li>
                    <li className="account__form-item account__editor">
                      {" "}
                      Edit
                    </li>
                  </ul>
                  <input
                    type="password"
                    className="account__input"
                    placeholder="Your old password"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="account__input"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button className="account__btn account__pbtn">
                    update password
                  </button>
                </form>
              </div>
              <div className="account__data">
                <form
                  action="#"
                  className="account__form"
                  onSubmit={handleData}
                >
                  <ul className="account__form-list">
                    <li className="account__form-item">
                      Update username and email!
                    </li>
                    <li className="account__form-item account__editor">
                      {" "}
                      Edit
                    </li>
                  </ul>
                  <input
                    type="text"
                    className="account__input"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={user?.username}
                  />
                  <input
                    type="text"
                    className="account__input"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user?.email}
                  />
                  <button className="account__btn account__dbtn">
                    update data
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user.isAdmin && <Admin />}
    </>
  );
};

export default Account;
