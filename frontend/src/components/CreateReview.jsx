import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createReview } from "../hook/api";

const Review = ({ token }) => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(productId, { review, rating }, token);
  };
  //   console.log(location.pathname.split("/")[2]);
  return (
    <div className="review">
      <h2 className="review__heading">Submit your review</h2>
      <form onSubmit={handleSubmit} className="review__form">
        <input
          type="text"
          className="review__input"
          placeholder="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="5"
          className="review__input"
          placeholder="rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <button className="review__btn">send</button>
      </form>
    </div>
  );
};

export default Review;
