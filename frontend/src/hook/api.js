import axios from "axios";
const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null, isLoading: false, error: null };
const { token } = userFromLocalStorage;
export const createProduct = async (data) => {
  try {
    const config = {
      headers: {
        contentType: "application/json",
        token: "Bearer " + token,
      },
    };
    const res = await axios.post("/api/products", data, config);
    // if (res.status === "success") window.history.assign("/");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (productId, data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: "Bearer " + token,
    },
  };
  try {
    const res = await axios.post(
      `/api/products/${productId}/reviews`,
      data,
      config
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
