import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Slider from "./Slider";
import useFetchUser from "../apis/userApis";
import useFetch from "../hook/FetchApi";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";
import Footer from "./Footer";
import { FaLocationArrow, FaStar } from "react-icons/fa";

const Product = () => {
  const location = useLocation();
  const [showPhone, setShowPhone] = useState(false);

  // const { data } = useFetchUser("/api/users");
  // const { data: productData } = useFetch("/api/products");
  // productData.forEach((prod) => {
  //   // console.log(prod);
  // });

  const handlePhone = () => {
    setShowPhone(true);
  };

  const item = location.state;
  // console.log(item);
  return (
    <>
      <Navbar />
      <div className="product">
        <div className="product__single">
          {item?.photos?.map((photo, i) => {
            return (
              <img
                src={`/${photo?.filePath}`}
                alt={`${item?._id}-${i + 1}`}
                key={`${item?._id}-${i + 1}`}
                className={`product__img product__img-${i + 1}`}
              />
            );
          })}
        </div>
        <div className="product__others">
          <div className="product__items">
            <span className="product__name">
              <strong>{item?.name}</strong>
            </span>
            <span className="product__price">
              Amount: <strong>${item?.cheapestPrice}</strong>
            </span>
            <span className="home__rating">
              {item?.rating &&
                Array(item?.rating)
                  .fill(0)
                  .map((_, i) => <FaStar key={i} className="home__stars" />)}
            </span>
            <span className="home__city">
              <FaLocationArrow className="home__city-icon" />
              <span>{item?.city}</span>
            </span>
          </div>
          <p className="product__description">{item?.description}</p>
          <div className="product__contact">
            <button className="product__seller" onClick={handlePhone}>
              {showPhone ? "0" + item?.user?.phone : "Contact seller"}
            </button>
            <Link to={`/products/${item?._id}/reviews`}>
              <button className="product__comment">Leave a review</button>
            </Link>
          </div>
        </div>
      </div>

      <RelatedProducts />
      <Reviews />

      <Footer />
    </>
  );
};

export default Product;
