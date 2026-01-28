import React, { useState } from "react";
import api, { BASE_URL } from "../../api";
import { toast } from "react-toastify";

const CartItem = ({ item, cartitems, setCartItems, setCartTotal, setNumberCartItems }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  // ✅ Prevent runtime errors if cartitems is undefined
  if (!cartitems) return null;

  // 🗑 Delete item
  function deleteCartItem() {
    const confirmDelete = window.confirm("Are you sure you want to delete this cart item?");
    if (!confirmDelete) return;

    setLoading(true);
    api.post("delete_cartitem/", { item_id: item.id })
      .then((res) => {
        console.log(res.data);
        toast.success("Item deleted successfully");

        // ✅ Update UI
        const updatedItems = cartitems.filter((c) => c.id !== item.id);
        setCartItems(updatedItems);
        setCartTotal(updatedItems.reduce((acc, curr) => acc + curr.total, 0));
        setNumberCartItems(updatedItems.reduce((acc, curr) => acc + curr.quantity, 0));
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to delete item");
      })
      .finally(() => setLoading(false));
  }

  // 🔄 Update quantity
  function updateCartItem() {
    setLoading(true);
    const itemData = { quantity, item_id: item.id };

    api.patch("update_quantity/", itemData)
      .then((res) => {
        console.log(res.data);
        toast.success("Cart item updated successfully! ✅");

        const updatedItems = cartitems.map((cartItem) =>
          cartItem.id === item.id ? res.data.data : cartItem
        );

        setCartItems(updatedItems);
        setCartTotal(updatedItems.reduce((acc, curr) => acc + curr.total, 0));
        setNumberCartItems(updatedItems.reduce((acc, curr) => acc + curr.quantity, 0));
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to update cart item ❌");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="col-md-12">
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
      >
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt={item.product.name}
          className="img-fluid"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="mb-0 text-muted">${item.product.price}</p>
        </div>

        <div className="d-flex align-items-center">
          <input
            type="number"
            min="1"
            className="form-control me-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "70px" }}
          />

          <button
            className="btn btn-sm mx-2"
            onClick={updateCartItem}
            style={{ backgroundColor: "#4b3bcb", color: "white" }}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={deleteCartItem}
            disabled={loading}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
