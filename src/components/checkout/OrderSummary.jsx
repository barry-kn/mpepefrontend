import React from "react";
import OrderItem from "./OrderItem";
import styles from "./OrderSummary.module.css"; 

const OrderSummary = ({ cartitems, cartTotal, tax }) => {
  // Convert to Ksh (you can add currency formatting if needed)
  const total = cartTotal + tax;

  return (
    <div className="col-md-8">
      <div className="card mb-4" style={{ borderRadius: "10px", overflow: "hidden" }}>
        <div
          className="card-header"
          style={{ backgroundColor: "#605BDC", color: "white" }}
        >
          <h5>Cart Summary</h5>
        </div>

        <div className="card-body">
          {/* List of items */}
          <div className="px-3" style={{ height: "300px", overflowY: "auto" }}>
            {cartitems && cartitems.length > 0 ? (
              cartitems.map((cartitem) => (
                <OrderItem key={cartitem.id} cartitem={cartitem} />
              ))
            ) : (
              <p className="text-muted text-center">No items in cart.</p>
            )}
          </div>

          <hr />

          {/* Totals */}
          <div className="d-flex justify-content-between">
            <h6>Tax</h6>
            <h6>{`Ksh ${tax.toFixed(2)}`}</h6>
          </div>

          <div className="d-flex justify-content-between">
            <h6>Total</h6>
            <h6>{`Ksh ${total.toFixed(2)}`}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
