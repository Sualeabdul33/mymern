import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/userApis";
// import { message } from "antd";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    await login(dispatch, { username, password });
    toast("Logged in successfully");
    // setTimeout(() => {
    //   navigate("/");
    // }, 3000);
  };

  return (
    <div className="login">
      <h3 className="login__heading">Login into your account</h3>
      <form action="#" className="login__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login__input"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          className="login__input"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="login__btn">Login</button>
        {isLoading ? (
          <span className="login__loading">Logging in...</span>
        ) : (
          error && <span className="login__error">{error}</span>
          // message.unsuccess(error)
        )}
        {user?.status && (
          <span className="login__success">
            <ToastContainer />
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
