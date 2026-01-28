import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';

const OrderHistoryItemContainer = ({ orderitems }) => {
  return (
    <div className="row" style={{ height: "300px", overflowY: "auto" }}>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
            <h5>Order History</h5>
          </div>

          <div className="card-body">
            {orderitems?.length > 0 ? (
              orderitems.map((item) => (
                <OrderHistoryItem key={item.id} item={item} />
              ))
            ) : (
              <p>No order history found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
