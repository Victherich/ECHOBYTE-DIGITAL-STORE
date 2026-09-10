import React, { useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Context } from "./Context";

const PayPalButtonContainer = styled.div`
  margin-top: 1rem;
  z-index: 1001;
`;

const PayPalCheckout = ({
  amount,
  currency,
  productName,
  productId,
  productUrl,
  customerData,
  onClose,
}) => {
  const { saveTransaction } = useContext(Context);
  const PAYPAL_CLIENT_ID = "AY3JP-UI68WChZpC_0f7oTadUrItrOcSwqL2E4GVFJHfo-4QPabv308FQRUTfmDS4jfNFYi9AbLZh9iV";

  const createPayPalOrder = (data, actions) => {
    localStorage.setItem("pendingAmount", JSON.stringify(amount));
    localStorage.setItem("pendingProductName", JSON.stringify(productName));
    localStorage.setItem("pendingProductId", JSON.stringify(productId));
    localStorage.setItem("pendingProductUrl", JSON.stringify(productUrl));
    localStorage.setItem("pendingCurrency", JSON.stringify(currency));

    return actions.order.create({
      purchase_units: [
        {
          description: productName,
          amount: { currency_code: currency, value: amount },
        },
      ],
    });
  };

  const onApprovePayPal = async (data, actions) => {
    Swal.fire({ text: "Processing payment...", allowOutsideClick: false });
    Swal.showLoading();

    try {
      const order = await actions.order.capture();

      const paypalTransaction = {
        reference: order.id,
        status: order.status,
        amount: amount,
        currency: currency,
        customer: {
          email_address: customerData.email,
          name: customerData.name,
          phone_number: customerData.phone,
        },
        paypalDetails: order,
      };

      await saveTransaction(paypalTransaction, {
        name: customerData.name,
        email: customerData.email,
        password: customerData.password,
        phone: customerData.phone,
        paymentMethod: "PayPal",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `PayPal payment failed: ${error.message}`,
      });
    }
  };

  const onErrorPayPal = (err) => {
    Swal.fire({
      icon: "error",
      text: `PayPal error: ${err.message || "An unknown error occurred."}`,
    });
  };

  const onCancelPayPal = () => {
    Swal.fire({ icon: "info", text: "PayPal payment cancelled." });
  };

  return (
    <PayPalButtonContainer>
      <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: currency }}>
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
          createOrder={createPayPalOrder}
          onApprove={onApprovePayPal}
          onError={onErrorPayPal}
          onCancel={onCancelPayPal}
        />
      </PayPalScriptProvider>
    </PayPalButtonContainer>
  );
};

export default PayPalCheckout;