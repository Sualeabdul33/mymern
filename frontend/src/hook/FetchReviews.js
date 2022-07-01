import React, { useEffect, useState } from "react";
import axios from "axios";
const useFetchReviews = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        // console.log(res.data);
      } catch (error) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [url]);
  return { data };
};

export default useFetchReviews;
