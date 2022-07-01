import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from "./Footer";
import SearchList from "./SearchList";
import useFetch, { reFetch } from "../hook/FetchApi";
import Header from "./Header";
import Navbar from "./Navbar";

const Search = () => {
  const location = useLocation();

  const name = location.state;
  const [nam, setNam] = useState();
  const [type, setType] = useState("");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  // const [loadedData, setLoadedData] = useState([]);
  const { data, loading, reFetch } = useFetch(
    `/api/products?search=${nam}&min=${min}&max=${max}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // reFetch();

    // console.log(data);
  };
  // console.log(location);
  return (
    <>
      <Header />
      <div className="list">
        <div className="list__search">
          <form action="#" className="list__form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="list__input "
              onChange={(e) => setNam(e.target.value)}
              placeholder="search product"
            />
            <div className="list__items">
              <label className="list__label" htmlFor="min">
                Min price
              </label>
              <input
                type="text"
                onChange={(e) => setMin(e.target.value)}
                className="list__input"
                min="1"
              />
            </div>
            <div className="list__items">
              <label className="list__label" htmlFor="min">
                max price
              </label>
              <input
                type="text"
                onChange={(e) => setMax(e.target.value)}
                className="list__input"
                max="9999"
              />
            </div>
            <button className="list__btn">Search</button>
          </form>
        </div>
        <div className="list__results">
          {/* {loading ? (
            "Loading..."
          ) : !data.length ? (
            <p>No result for your search</p>
          ) : (
            data?.map((item) => <SearchList key={item._id} item={item} />)
          )} */}
          {loading && <p className="list__loading">Loading...</p>}
          {/* {!data.length ? (
            <p>No result for your search</p>
          ) : (
            data.map((item) => <SearchList key={item._id} item={item} />)
          )} */}
          {!data.length ? (
            // ? newData?.map((item) => <SearchList key={item._id} item={item} />)
            <p className="list__no-search">
              There's no product with the name <span>{nam}</span>
            </p>
          ) : (
            data?.map((item) => <SearchList key={item._id} item={item} />)
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
