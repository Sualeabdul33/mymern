import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/FetchApi";
const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null, isLoading: false, error: null };
const { loading } = userFromLocalStorage;
const MyProducts = () => {
  const { data } = useFetch("/api/products/myproducts");
  const navigate = useNavigate();
  // console.log(mapp);
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
        <div className="myProducts">
          <h2 className="myProducts__heading">Your Products for sale</h2>
          <div className="myProducts__products">
            {loading
              ? "Loading"
              : data?.map((item, i) => {
                  return (
                    <div className="myProducts__product" key={item._id}>
                      <img
                        src={`/${
                          item.photos[
                            Math.floor(Math.random() * item.photos.length)
                          ].filePath
                        }`}
                        alt="product"
                        className="myProducts__img"
                      />

                      <div className="myProducts__items">
                        <div className="myProducts__item">
                          <span className="myProducts__title">
                            {item.title}
                          </span>
                          <span className="myProducts__city">{item.city}</span>
                          <span className="myProducts__rating">
                            Rating {item.rating}
                          </span>
                          <span className="myProducts__price">
                            ${item.cheapestPrice}
                          </span>
                        </div>
                        <div className="myProducts__item2">
                          <button
                            onClick={handleClick}
                            className="myProducts__btn"
                            data-prod={item._id}
                            style={{ color: "#fff" }}
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
        <h2 className="myProducts__noPost">
          You have not posted anything yet!
        </h2>
      )}
    </>
  );
};

export default MyProducts;
