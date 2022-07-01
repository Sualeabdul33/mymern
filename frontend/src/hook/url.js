import axios from "axios";
import { useEffect, useState } from "react";

const useURL = (url) => {
  const userFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null, isLoading: false, error: null };
  const { token } = userFromLocalStorage;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + token,
      },
    };
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, config);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, token]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, error, loading, reFetch };
};

// export const { data, error, loading, reFetch } = useFetch;

export default useURL;
