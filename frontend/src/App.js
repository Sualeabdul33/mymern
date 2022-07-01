import "./sass/style.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// import { Redirect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import Home from "./components/Home";
// import Footer from "./components/Footer";
import Search from "./components/Search";
import Product from "./components/Product";
import CreateProduct from "./components/Create-product";
import Products from "./components/Products";
import Review from "./components/CreateReview";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Slider from "./components/Slider";
import MyProducts from "./components/MyProducts";
// toast.configure();

function App() {
  // const aUser = getUser()
  // const loggedInUSer = useSelector((state) => state.user);
  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { user, token } = userFromLocalStorage;
  const userId = user?._id;
  // console.log(user, token);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/products" element={<Search />} exact></Route>
      <Route path="/products/:id" element={<Product />} exact></Route>
      <Route path="/create" element={<CreateProduct token={token} />}></Route>
      <Route path="/all-products" element={<Products />}></Route>
      <Route
        path="/products/:productId/reviews"
        element={<Review token={token} />}
      ></Route>
      <Route path="/account" element={<Account token={token} />}></Route>

      <Route
        path="/login"
        element={user?.username ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/my-products" element={<MyProducts />} />
    </Routes>
  );
}

export default App;
