import axios from "axios";
import { useEffect, useState } from "react";

import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux-store/userReducer";

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null, isLoading: false, error: null };
const { user, token } = userFromLocalStorage;

export const login = async (dispatch, data) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/users/login", data);
    dispatch(loginSuccess(res.data));
    saveData(res.data);
    console.log(res.data);
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    console.log(error.response.data.message);
  }
};

export const register = async (dispatch, data) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("/api/users/register", data);
    dispatch(registerSuccess(res.data));
    saveData(res.data);
    console.log(res.data);
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
    console.log(error.response.data.message);
  }
};

export const userSettings = async (typ, data) => {
  const config = {
    headers: {
      token: "Bearer " + token,
      enctype: "multipart/form-data",
    },
  };
  let url =
    typ === "data" ? "/api/users/updateMe/" : "/api/users/updatepassword";
  console.log(url);
  try {
    const res = await axios.patch(url, data, config);
    // console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

function saveData(data) {
  return localStorage.setItem("user", JSON.stringify(data));
}

export const useFetchUser = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        // console.log(res.data);
      } catch (error) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [url]);
  return { data };
};

export default useFetchUser;
