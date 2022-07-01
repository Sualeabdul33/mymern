import React from "react";
import useFetchUser from "../apis/userApis";
import useFetch from "../hook/FetchApi";
import FetchReviews from "../hook/FetchReviews";
const Admin = () => {
  const { data: users } = useFetchUser("/api/users");
  const { data: products } = useFetch("/api/products");
  const { data: reviews } = FetchReviews("/api/reviews");

  return (
    <div className="account__admin">
      <div className="account__items">
        <div className="account__products">
          <span className="account__number">{products?.length}</span>
          <span className="account__name">products</span>
        </div>
        <div className="account__users">
          <span className="account__number">{users?.results}</span>
          <span className="account__name">users</span>
        </div>
        <div className="account__reviews">
          <span className="account__number">{reviews?.result}</span>
          <span className="account__name">reviews</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;
