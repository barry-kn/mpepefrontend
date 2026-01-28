import { useState, useEffect } from "react";
import api from "../api";

function useCartData() {
  const cart_code = localStorage.getItem("cart_code");
  const [cartitems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const tax = 4.0;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cart_code) return; // ✅ avoid API call if cart_code is missing

    setLoading(true);
    api
      .get(`get_cart?cart_code=${cart_code}`)
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data.items || []); // ✅ handle missing data safely
        setCartTotal(res.data.sum_total || 0.0);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cart_code]); // ✅ run only when cart_code changes

  return {cartitems, setCartItems, cartTotal, setCartTotal, loading, tax };
}

export default useCartData; // ✅ export the hook
