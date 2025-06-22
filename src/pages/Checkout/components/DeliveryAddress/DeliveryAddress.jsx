import "./DeliveryAddress.css";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { v4 as uuid } from "uuid";
import { addOrderService } from "../../../../services/order-services/addOrderService";
import { clearCartService } from "../../../../services/cart-services/clearCartService";
import React from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export const DeliveryAddress = () => {
  const { userDataState, dispatch, clearCartHandler } = useUserData();

  const {
    cartProducts,
    addressList,
    orders,
    orderDetails: { cartItemsDiscountTotal, orderAddress },
  } = userDataState;

  const totalAmount = cartItemsDiscountTotal;
  const navigate = useNavigate();

  const userContact = addressList?.find(
    ({ _id }) => _id === orderAddress?._id
  )?.phone;

  const { auth, setCurrentPage } = useAuth();

  // Direct order success handler (no payment required)
  const directOrderSuccessHandler = () => {
    const orderId = uuid();
    const order = {
      paymentId: "NO_PAYMENT_REQUIRED", // or generate a mock payment ID
      orderId,
      amountPaid: totalAmount,
      orderedProducts: [...cartProducts],
      deliveryAddress: { ...orderAddress },
      paymentStatus: "COMPLETED", // Set as completed
      orderStatus: "CONFIRMED", // Set order as confirmed
      orderDate: new Date().toISOString(),
    };

    dispatch({ type: "SET_ORDERS", payload: order });
    clearCartHandler(auth.token);
    setCurrentPage("orders");

    // Show success message
    toast.success("Order placed successfully!");

    navigate("/profile/orders");
  };

  // Updated place order handler (no payment gateway)
  const placeOrderHandler = () => {
    if (orderAddress) {
      // Check if cart has items
      if (cartProducts.length === 0) {
        toast.error("Your cart is empty!");
        return;
      }

      // Show loading toast
      toast.loading("Placing your order...", { duration: 1000 });

      // Simulate order processing delay (optional)
      setTimeout(() => {
        directOrderSuccessHandler();
      }, 1000);
    } else {
      toast.error("Please select an address!");
    }
  };

  return (
    <div className="delivery-address-container">
      <p>Delivering To</p>

      <div className="delivery-address-description">
        <span className="name">
          Name: {userDataState.orderDetails?.orderAddress?.name}
        </span>
        <span className="address">
          Address: {orderAddress?.street}, {orderAddress?.city},{" "}
          {orderAddress?.state}, {orderAddress?.country},{" "}
          {orderAddress?.pincode}
        </span>
        <span className="contact">Contact: {orderAddress?.phone}</span>

        {/* Order Summary */}
        <div className="order-summary">
          <span className="total-amount">Total Amount: ${totalAmount}</span>
          <span className="items-count">Items: {cartProducts.length}</span>
        </div>

        <button onClick={placeOrderHandler} className="place-order-btn">
          Place Order (No Payment Required)
        </button>
      </div>
    </div>
  );
};
