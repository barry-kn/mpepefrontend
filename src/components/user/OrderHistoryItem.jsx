import React from 'react';
import styles from './OrderHistoryItem.module.css'; // optional CSS Module

const OrderHistoryItem = ({ item }) => {
  return (
    <div className="card mb-3">
      <div className={`card-body ${styles?.orderItem || ''}`}>
        
        <div className="row align-items-center">

          {/* Product Image */}
          <div className="col-md-2">
            <img
              src="assets/laptop1.jpg"
              alt="Order Item"
              className="img-fluid rounded"
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h6>{item.product.name}</h6>
            <p>{`Order Date: ${item.order_date}`}</p>
            <p>{`Order ID: ${item.order_id}`}</p>
          </div>

          {/* Quantity */}
          <div className="col-md-2 text-center">
            <h6 className="text-muted">{`Quantity: ${item.quantity}`}</h6>
          </div>

          {/* Price */}
          <div className="col-md-2 text-center">
            <h6 className="text-muted">{`$${item.product.price}`}</h6>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
