import React from "react";
import useFetch from "../hook/FetchApi";
import ReactPaginate from "react-paginate";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
const Slider = ({ onIncrease, onDecrease, resultsPerPage, remaining }) => {
  console.log(resultsPerPage, remaining);

  return (
    <div className="paginate">
      <div className="paginate__container">
        {/* <FaArrowAltCircleLeft onClick={onDecrease} className="paginate__left" />
        {remaining >= resultsPerPage && resultsPerPage && remaining && (
          <FaArrowAltCircleRight
            onClick={onIncrease}
            className="paginate__right"
          />
        )} */}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={onIncrease}
        pageRangeDisplayed={6}
        pageCount={onIncrease}
        previousLabel="< previews"
      />
    </div>
  );
};

export default Slider;
