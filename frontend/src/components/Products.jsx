import React, { useEffect, useState } from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import useURL from "../hook/url";
import Navbar from "./Navbar";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading } = useURL(`/api/products`);

  const handleClick = (e) => {
    for (let i = 0; i < data.products.length; i++) {
      if (e.target.dataset.prod === data.products[i]._id) {
        navigate(`/products/${data.products[i]._id}`, {
          state: data.products[i],
        });
      }
    }
  };

  // console.log(location);

  return (
    <>
      <Navbar />
      <div className="products">
        <h2 className="products__heading">Browse by product name</h2>
        <div className="products__products">
          {loading
            ? "Loading..."
            : data?.products?.map((item) => {
                // console.log(item.photos[0].filePath);
                return (
                  <div to={`/products/${item._id}`} key={item._id}>
                    <div className="products__product" key={item._id}>
                      <img
                        src={`/${
                          item.photos[
                            Math.floor(Math.random() * item.photos.length)
                          ].filePath
                        }`}
                        alt={item.name}
                        className="products__img"
                      />
                      <div className="products__items">
                        <div className="products__item">
                          <span className="products__name">{item.name}</span>
                          <span className="products__city">
                            <FaLocationArrow className="products__city-icon" />
                            <span>{item.city}</span>
                          </span>
                          <span className="products__rating">
                            {item?.rating &&
                              Array(item?.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <FaStar key={i} className="products__stars" />
                                ))}
                          </span>
                          <span className="products__price">
                            ${item.cheapestPrice}
                          </span>
                        </div>
                        <div className="products__item2">
                          <button
                            className="home__btn"
                            onClick={handleClick}
                            style={{ color: "#fff" }}
                            data-prod={item._id}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Products;
