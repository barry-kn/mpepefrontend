import React, { useState } from 'react';
import api from "../../api";
import styles from './PaymentSection.module.css';

const PaymentSection = ({ setNumberCartItems }) => {
  const cart_code = localStorage.getItem("cart_code");
  const [loading, setLoading] = useState(false);
  const [mpesaLoading, setMpesaLoading] = useState(false);

  // ---------------- PAYPAL ----------------
  const handlePaypalPayment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken"); // if using JWT
      const res = await api.post(
        "initiate_paypal_payment/",
        { cart_code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.approval_url) {
        // Redirect user to PayPal Sandbox
        window.location.href = res.data.approval_url;
      } else {
        console.error("PayPal approval URL not found", res.data);
        alert("Unable to initiate PayPal payment. Try again.");
      }
    } catch (err) {
      console.error("Error initiating PayPal payment:", err.message);
      alert("Error initiating payment. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- M-PESA ----------------
  const handleMpesaPayment = async () => {
    try {
      const phone_number = prompt("Enter your phone number for M-Pesa (e.g., 2547XXXXXXXX):");
      if (!phone_number) return;

      setMpesaLoading(true);
      const token = localStorage.getItem("authToken"); // if using JWT
      const res = await api.post(
        "initiate_mpesa_payment/",
        { cart_code, phone_number },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);
      if (res.data.ResponseCode === "0" || res.data.ResponseDescription) {
        alert("STK Push sent! Complete the payment on your phone.");
      } else {
        alert("Failed to initiate M-Pesa payment. Check console for details.");
      }
    } catch (err) {
      console.error("M-Pesa payment error:", err.message);
      alert("Error initiating M-Pesa payment. Check console for details.");
    } finally {
      setMpesaLoading(false);
    }
  };

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div
          className="card-header"
          style={{ backgroundColor: '#605BDC', color: 'white' }}
        >
          <h5>Payment Options</h5>
        </div>

        <div className="card-body">
          {/* PayPal Button */}
          <button
            className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
            onClick={handlePaypalPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : <><i className="bi bi-paypal"></i> Pay with PayPal</>}
          </button>

          {/* M-Pesa Button */}
          <button
            className={`btn btn-success w-100 ${styles.mpesaButton}`}
            onClick={handleMpesaPayment}
            disabled={mpesaLoading}
          >
            {mpesaLoading ? "Processing..." : "Pay with M-Pesa (Ksh)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
