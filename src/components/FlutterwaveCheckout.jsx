


import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setPaymentSession, clearPaymentSession } from "../Features/Slice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Replace with your central EchoPay checkout URL
const CENTRAL_PAYMENT_URL = "https://echobytepay.vercel.app/flutterwave";

// Replace with the route of your Success Page in this project
const SUCCESS_REDIRECT_URL = `${window.location.origin}/payment-success`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background-color: #22c55e;
  color: white;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #16a34a;
  }
`;

const FlutterwaveCheckout = ({
  amount,
  currency,
  paymentCurrency,
  productName,
  productId,
  productUrl,
  customerData,
}) => {
  const dispatch = useDispatch();

  const handleFlutterwavePayment = async () => {
    // dispatch(setPaymentSession("payment"));

    Swal.fire({
      text: "Preparing payment session...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Dynamic Reference Generation
    const customReference = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    // Bundle ALL transaction and customer data into Firestore
    const initialTransaction = {
      status: "initialized",
      amount: Number(amount),
      currency: String(currency || "NGN").toUpperCase(),
      email: customerData.email,
      reference: customReference,
      createdAt: new Date().toISOString(),

      customerDetails: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        password: customerData.password,
        paymentMethod: "Flutterwave",
      },

      metadata: {
        custom_payment_type: customReference,
        source: "Echobyte_Courses_Platform",
        productName,
        productId,
        productUrl,
      },
    };

    try {
      // 1. Save pending transaction to Firestore
      await setDoc(
        doc(db, "pending_transactions", customReference),
        initialTransaction
      );

      // 2. Keep reference pointer locally in localStorage
      localStorage.setItem("current_payment_ref", customReference);
      localStorage.setItem(
        "verificationNumber",
        JSON.stringify(customReference)
      );

      // 3. Build payload matching your central EchoPay platform's extractIncomingParams()
      const paymentParams = {
        tx_ref: customReference,
        amount: Number(amount),
        currency: String(currency || "NGN").toUpperCase(),
        success_url: SUCCESS_REDIRECT_URL,
        projectName: "Echobyte Courses Platform",
        customer: {
          email: customerData.email,
          name: customerData.name,
          phone_number: customerData.phone,
        },
        customizations: {
          title: "Echobyte Courses Platform",
          description: productName,
        },
        meta: {
          custom_payment_type: customReference,
          source: "Echobyte_Courses_Platform",
          productName,
          productId,
          productUrl,
        },
      };

      const redirectUrl = new URL(CENTRAL_PAYMENT_URL);
      redirectUrl.searchParams.set("params", JSON.stringify(paymentParams));

      Swal.close();

      // 4. Navigate to your central payment platform
      window.location.assign(redirectUrl.toString());
    } catch (error) {
      console.error("Error setting up central payment session:", error);

      Swal.fire({
        icon: "error",
        text: "Could not initialize payment session. Please try again.",
      });

      dispatch(clearPaymentSession());
    }
  };

  return (
    <Button type="button" onClick={handleFlutterwavePayment}>
      Start Payment Now
    </Button>
  );
};

export default FlutterwaveCheckout;


