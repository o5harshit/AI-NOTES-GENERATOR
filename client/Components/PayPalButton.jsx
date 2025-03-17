import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE__PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: "5.00" } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
            onSuccess();
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
