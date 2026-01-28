import OrderSummary from "./OrderSummary";
import PaymentSection from "./PaymentSection";
import useCartData from "../../hooks/useCartData"; // ✅ Import your custom hook

const CheckoutPage = ({ setNumberCartItems }) => {
    const { cartitems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData();

    // Show loading while fetching cart data
    if (loading) {
        return (
            <div className="text-center my-5">
                <h5>Loading cart details...</h5>
            </div>
        );
    }

    // Handle empty cart
    if (!cartitems || cartitems.length === 0) {
        return (
            <div className="alert alert-warning my-5 text-center">
                Your cart is empty. Add items before checking out.
            </div>
        );
    }

    return (
        <div className="container my-3">
            <div className="row">
                {/* Order Summary */}
                <OrderSummary cartitems={cartitems} cartTotal={cartTotal} tax={tax} />

                {/* Payment Section with cart code access */}
                <PaymentSection setNumberCartItems={setNumberCartItems} />
            </div>
        </div>
    );
};

export default CheckoutPage;
