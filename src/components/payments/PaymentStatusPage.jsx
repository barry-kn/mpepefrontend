import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api';

const PaymentStatusPage = ({ setNumberCartItems }) => {
  const [statusMessage, setStatusMessage] = useState('Verifying payment...');
  const [statusSubMessage, setStatusSubMessage] = useState(
    'Please wait while we verify your payment.'
  );

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('paymentStatus');
    const ref = queryParams.get('ref');
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');

    if (paymentStatus === 'success' && ref && paymentId && payerId) {
      api
        .get(`/paypal/callback/?paymentId=${paymentId}&PayerID=${payerId}&ref=${ref}`)
        .then((res) => {
          setStatusMessage(res.data.message);
          setStatusSubMessage(res.data.subMessage);
          localStorage.removeItem('cart_code');
          setNumberCartItems(0);
        })
        .catch((err) => console.error(err));
    } else {
      setStatusMessage('Payment Failed');
      setStatusSubMessage('Your PayPal purchase was canceled or failed.');
    }
  }, [location.search, setNumberCartItems]);

  return (
    <header className="py-5" style={{ backgroundColor: '#6858DC' }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h2 className="display-4 fw-bold">{statusMessage}</h2>
          <p className="lead fw-normal text-white-75 mb-4">{statusSubMessage}</p>
          <div>
            <Link to="/profile" className="btn btn-light btn-lg px-4 py-2 mx-3">
              View Order Details
            </Link>
            <Link to="/" className="btn btn-light btn-lg px-4 py-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PaymentStatusPage;
