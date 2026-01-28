import React, { useState, useEffect } from 'react';   
import Header from "./Header";
import CardContainer from "./CardContainer";
import api from '../../api';
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import { randomValue } from "../../GenerateCartCode";

const HomePage = () => {
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);

  // Initialize cart_code if not present
  useEffect(() => {
    if (!localStorage.getItem("cart_code")) {
      localStorage.setItem("cart_code", randomValue());
    }
  }, []);

  // Fetch products from backend
  useEffect(() => {
    setLoading(true);

    // ✅ Use trailing slash
    api.get("/products/")
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Error fetching products:", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <PlaceHolderContainer />
      ) : (
        <CardContainer products={products} />
      )}
    </>
  );
};

export default HomePage;
