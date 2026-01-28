import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import api from "../../api";
import Spinner from "../ui/Spinner";
import useCartData from "../../hooks/useCartData"; // ✅ Custom hook

const CartPage = ({ setNumberCartItems }) => {
  // ✅ Match the variable name returned by your hook
  const { cartitems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData();

  if (loading) {
    return <Spinner loading={loading} />;
  }

  // ✅ Add safety check before accessing .length
  if (!cartitems || cartitems.length < 1) {
    return (
      <div className="alert alert-primary my-5 text-center" role="alert">
        You haven't added any item to your cart.
      </div>
    );
  }

  return (
    <div
      className="container my-3 py-3"
      style={{ height: "80vh", overflowY: "auto" }}
    >
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {cartitems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              cartitems={cartitems}
              setCartItems={setCartItems}
              setCartTotal={setCartTotal}
              setNumberCartItems={setNumberCartItems}
            />
          ))}
        </div>
        <CartSummary cartTotal={cartTotal} tax={tax} />
      </div>
    </div>
  );
};

export default CartPage;
