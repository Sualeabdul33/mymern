import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchList = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${item._id}`, { state: item });
  };

  return (
    <div className="list__result">
      <img
        src={`/${
          item.photos[Math.floor(Math.random() * item.photos.length)]?.filePath
        }`}
        alt=""
        className="list__img"
      />
      <div className="list__items">
        <span className="list__name">{item?.name}</span>
        <span className="list__price">${item?.cheapestPrice}</span>
        <span className="list__description">{item?.description}</span>
        <span className="home__rating">
          {item?.rating &&
            Array(item?.rating)
              .fill(0)
              .map((_, i) => <FaStar key={i} className="home__stars" />)}
        </span>

        <button className="list__contact" onClick={handleClick}>
          Details...
        </button>
      </div>
    </div>
  );
};

export default SearchList;
