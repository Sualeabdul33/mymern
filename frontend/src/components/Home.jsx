import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useFetch from "../hook/FetchApi";
import Featured from "./Featured";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FaLocationArrow, FaStar } from "react-icons/fa";

const Home = () => {
  // const { min, max, ...others } = req.query;
  const navigate = useNavigate();
  const { data, loading } = useFetch("/api/products/featured?limit=3");
  // console.log(data);
  const handleClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      if (e.target.dataset.prod === data[i]._id) {
        navigate(`/products/${data[i]._id}`, { state: data[i] });
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="home">
        <h2 className="home__heading">Browse by product name</h2>
        <div className="home__products">
          {loading
            ? "Loading..."
            : data?.map((item) => {
                // console.log(item.photos[0].filePath);
                return (
                  <div to={`/products/${item._id}`} key={item._id}>
                    <div className="home__product" key={item._id}>
                      <img
                        src={`/${
                          item.photos[
                            Math.floor(Math.random() * item.photos.length)
                          ].filePath
                        }`}
                        alt={item.name}
                        className="home__img"
                      />
                      <div className="home__items">
                        <div className="home__item">
                          <span className="home__name">{item.name}</span>
                          <span className="home__city">
                            <FaLocationArrow className="home__city-icon" />
                            <span>{item.city}</span>
                          </span>
                          <span className="home__rating">
                            {item?.rating &&
                              Array(item?.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <FaStar key={i} className="home__stars" />
                                ))}
                          </span>
                          <span className="home__price">
                            ${item.cheapestPrice}
                          </span>
                        </div>
                        <div className="home__item2">
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
      <Featured />
      <Footer />
    </>
  );
};

export default Home;
