import React from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hook/FetchApi";

const RelatedProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prodId = location.pathname.split("/")[2];
  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { user } = userFromLocalStorage;

  const { data } = useFetch(`/api/products/${prodId}/relatedproducts`);
  const { loading } = useSelector((state) => state.user);
  const handleClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      if (e.target.dataset.prod === data[i]._id) {
        navigate(`/products/${data[i]._id}`, { state: data[i] });
      }
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="relatedProducts">
          <h2 className="relatedProducts__heading">
            Related Products by product type
          </h2>
          <div className="relatedProducts__products">
            {loading
              ? "Loading"
              : data?.map((item, i) => {
                  return (
                    <div className="relatedProducts__product" key={item._id}>
                      <img
                        src={`/${
                          item.photos[
                            Math.floor(Math.random() * item.photos.length)
                          ].filePath
                        }`}
                        alt="product"
                        className="relatedProducts__img"
                      />

                      <div className="relatedProducts__items">
                        <div className="relatedProducts__item">
                          <span className="relatedProducts__title">
                            {item.title}
                          </span>
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
                          <span className="relatedProducts__price">
                            ${item.cheapestPrice}
                          </span>
                        </div>
                        <div className="relatedProducts__item2">
                          <button
                            className="relatedProducts__btn"
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
      ) : (
        <h2 className="relatedProducts__noPost">
          No related product(s) by Type
        </h2>
      )}
    </>
  );
};

export default RelatedProducts;
