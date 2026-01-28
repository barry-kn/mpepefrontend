import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8002";  // ✅ exported now

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------- PRODUCT ENDPOINTS ----------------
export const getProducts = () => api.get("/products/");
export const getProductDetail = (slug) => api.get(`/product_detail/${slug}/`);

// ---------------- CART ENDPOINTS ----------------
export const addItemToCart = (cart_code, product_id) => 
  api.post("/add_item/", { cart_code, product_id });

export const getCart = (cart_code) => api.get(`/get_cart/?cart_code=${cart_code}`);
export const getCartStat = (cart_code) => api.get(`/get_cart_stat/?cart_code=${cart_code}`);
export const updateCartItemQuantity = (item_id, quantity) => 
  api.patch("/update_quantity/", { item_id, quantity });
export const deleteCartItem = (item_id) => api.post("/delete_cartitem/", { item_id });
export const productInCart = (cart_code, product_id) =>
  api.get(`/product_in_cart/?cart_code=${cart_code}&product_id=${product_id}`);

// ---------------- USER ENDPOINTS ----------------
export const getUsername = (token) =>
  api.get("/get_username/", { headers: { Authorization: `Bearer ${token}` } });

export const getUserInfo = (token) =>
  api.get("/user_info/", { headers: { Authorization: `Bearer ${token}` } });

// ---------------- PAYMENTS ----------------
export const initiatePaypalPayment = (cart_code, token) =>
  api.post("/initiate_paypal_payment/", { cart_code }, {
    headers: { Authorization: `Bearer ${token}` }
  });

// ---------------- M-PESA ----------------
// KSH currency, requires phone_number
export const initiateMpesaPayment = (cart_code, phone_number, token) =>
  api.post("/initiate_mpesa_payment/", { cart_code, phone_number }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export default api;
