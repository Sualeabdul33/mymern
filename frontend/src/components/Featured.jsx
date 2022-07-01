import React from "react";
import useFetch from "../hook/FetchApi";
import { useNavigate } from "react-router-dom";
import { FaLocationArrow, FaStar } from "react-icons/fa";
const Featured = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(`/api/products/top-3?limit=3`);
  const handleClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      if (e.target.dataset.prod === data[i]._id) {
        navigate(`/products/${data[i]._id}`, { state: data[i] });
      }
    }
  };
  // console.log(data);
  return (
    <div className="featured">
      <h2 className="featured__heading">Top most expensive products</h2>
      <div className="featured__products">
        {loading
          ? "Loading"
          : data?.map((item, i) => {
              return (
                <div className="featured__product" key={item._id}>
                  <div className="featured__brand">Top</div>
                  <img
                    src={`/${
                      item.photos[
                        Math.floor(Math.random() * item.photos.length)
                      ].filePath
                    }`}
                    alt="product"
                    className="featured__img"
                  />

                  <div className="featured__items">
                    <div className="featured__item">
                      <span className="featured__title">{item.title}</span>
                      <span className="home__city">
                        <FaLocationArrow className="home__city-icon" />
                        <span>{item.city}</span>
                      </span>
                      <span className="featured__rating">
                        {item?.rating &&
                          Array(item?.rating)
                            .fill(0)
                            .map((_, i) => (
                              <FaStar key={i} className="featured__stars" />
                            ))}
                      </span>
                      <span className="featured__price">
                        ${item.cheapestPrice}
                      </span>
                    </div>
                    <div className="featured__item2">
                      <button
                        className="featured__btn"
                        data-prod={item._id}
                        style={{ color: "#fff" }}
                        onClick={handleClick}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Featured;
