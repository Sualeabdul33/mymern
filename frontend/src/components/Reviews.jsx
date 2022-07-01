import React from "react";
import { useLocation } from "react-router-dom";
import Moment from "moment";
import useFetchReviews from "../hook/FetchReviews";
import { FaTrashAlt, FaStar, FaHeart } from "react-icons/fa";
import useFetch from "../hook/FetchApi";
const Reviews = () => {
  const location = useLocation();
  const item = location.state;
  const prodId = location.pathname.split("/")[2];

  // console.log(dateFormat);
  const { data } = useFetchReviews(`/api/products/${prodId}/reviews`);

  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { user } = userFromLocalStorage;

  // const us = productByUser;
  // console.log(us);

  return (
    <div className="reviews">
      <h2 className="reviews__heading">
        Reviews on
        <strong className="reviews__highlighted">{item?.name}</strong>
      </h2>
      {data?.reviews?.length > 0 ? (
        data?.reviews?.map((review) => {
          const stars = Array(5).fill(0);

          return (
            <div className="reviews__review" key={review?._id}>
              <div className="reviews__item">
                <img
                  src={`/uploads/users/${review?.user?.photo}`}
                  alt=""
                  className="reviews__img"
                />
                <span className="reviews__name">{review?.user?.username}</span>
                <span className="reviews__rating">
                  {review?.rating && review?.rating <= 5
                    ? Array(review?.rating)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            style={{ width: "2rem", height: "2rem" }}
                          />
                        ))
                    : Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar key={i} className="reviews__noRating" />
                        ))}
                </span>
                <span className="reviews__date">
                  {review?.createdAt.slice(0, 10)}
                </span>
                {review?.user?._id === user?._id ? (
                  <span>
                    <FaTrashAlt className="reviews__delete" />
                  </span>
                ) : (
                  <FaHeart className="reviews__like" />
                )}
              </div>
              <span className="reviews__text">{review?.review}</span>
            </div>
          );
        })
      ) : (
        <h2 className="reviews__noReviews">No reviews on {item?.name}</h2>
      )}
    </div>
  );
};

export default Reviews;
