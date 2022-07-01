import React from "react";
import { useState } from "react";
import { register } from "../apis/userApis";
import { useDispatch } from "react-redux";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(dispatch, { username, email, password, phone });
  };
  return (
    <div className="register">
      <h2 className="register__heading">Sign up with us!</h2>
      <form action="#" className="register__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="register__input"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="email"
          className="register__input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
        />
        <input
          type="password"
          className="register__input"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="number"
          className="register__input"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone number"
        />
        <button className="register__btn">register</button>
      </form>
    </div>
  );
};

export default Register;
