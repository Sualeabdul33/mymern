import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../hook/api";

const CreateProduct = () => {
  // const product = createProduct()

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [rating, setRating] = useState("");
  const [files, setFiles] = useState([]);

  // useEffect(() => {
  //   const files = await createProduct()
  // })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("type", type);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("cheapestPrice", cheapestPrice);
    formData.append("distance", distance);
    for (const file of Object(files)) {
      formData.append("photos", file);
      // console.log(file);
    }
    await createProduct(formData);
    // navigate("/");
    // console.log(formData);
  };
  // console.log(type);

  return (
    <div className="product">
      <h2 className="product__heading">Create a Product</h2>
      <form
        action="#"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="product__form"
      >
        <input
          type="text"
          className="product__input"
          placeholder="product name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <select
          name="title"
          onChange={(e) => setType(e.target.value)}
          className="product__input"
        >
          <option>choose type</option>
          <option>phone</option>
          <option>fruit</option>
          <option>sneaker</option>
          <option>electronic</option>
          <option>computer</option>
          <option>dress</option>
          <option>others</option>
        </select>
        <input
          type="number"
          className="product__input"
          placeholder="product rating"
          name="rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          className="product__input"
          placeholder="product address"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          className="product__input"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          placeholder="product city"
        />
        <input
          type="text"
          className="product__input"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="product description"
        />
        <input
          type="number"
          className="product__input"
          placeholder="product price"
          name="cheapestPrice"
          onChange={(e) => setCheapestPrice(e.target.value)}
        />

        <input
          type="text"
          className="product__input"
          placeholder="product title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="photos" className="product__label">
          Choose photos
        </label>
        <input
          type="file"
          className="product__input product__photo"
          multiple
          placeholder="product type"
          name="photos"
          id="photos"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button className="product__create">create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
