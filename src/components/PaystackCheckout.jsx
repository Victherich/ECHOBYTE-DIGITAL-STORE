import React, { useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import PaystackPop from "@paystack/inline-js";
import { useDispatch } from "react-redux";
import { setPaymentSession, clearPaymentSession } from "../Features/Slice";
import { Context } from "./Context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

const PaystackCheckout = ({
  amount,
  currency,
  productName,
  productId,
  productUrl,
  customerData,
}) => {
  const dispatch = useDispatch();
  const { startPaymentPolling1 } = useContext(Context);

  const handlePaystackPayment = async () => {
    dispatch(setPaymentSession("payment"));
    Swal.fire({ text: "Preparing payment session...", allowOutsideClick: false });
    Swal.showLoading();

    const paystack = new PaystackPop();
    const [firstName, lastName] = (customerData.name || "").split(" ");
    
    // Dynamic Reference Generation
    const customReference = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    // Bundle ALL transaction and customer data into a single source of truth for Firestore
    const initialTransaction = {
      status: "initialized",
      amount,
      currency,
      email: customerData.email,
      reference: customReference,
      createdAt: new Date().toISOString(),
      customerDetails: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        password: customerData.password, // handled securely on your backend/polling logic
        paymentMethod: "Paystack"
      },
      metadata: { 
        custom_payment_type: customReference,
        source:"Echobyte_Courses_Platform",
        productName,
        productId,
        productUrl
      },  
    };

    try {
      // Save everything directly to Firestore under the pending_transactions collection
      await setDoc(doc(db, "pending_transactions", customReference), initialTransaction);

      // Keep only the reference pointer locally for tracking the current flow
      localStorage.setItem("current_payment_ref", customReference);
      localStorage.setItem("verificationNumber", JSON.stringify(customReference));

      Swal.close();

      // Launch Paystack Pop
      paystack.newTransaction({
        key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170",
        amount: amount * 100,
        email: customerData.email,
        reference: customReference,
        firstname: firstName || customerData.name,
        lastname: lastName || "",
        metadata: {
          custom_payment_type: customReference,
          source:"Echobyte_Courses_Platform",
        },
        onSuccess: () => {
          Swal.fire({ text: "Payment processing..., Please wait", showConfirmButton: false });
          Swal.showLoading();
          
          // Trigger polling; your backend/polling handler can now fetch the document 
          // from `pending_transactions` by `customReference` and copy it straight to `transactions`!
          startPaymentPolling1(customReference);
        },
        onCancel: () => {
          Swal.fire({ icon: "error", text: "Payment cancelled." });
          dispatch(clearPaymentSession());
        },
        onError: (error) => {
          Swal.fire({ icon: "error", text: `Payment failed: ${error.message}` });
          dispatch(clearPaymentSession());
        },
      });
    } catch (error) {
      console.error("Error setting up transaction:", error);
      Swal.fire({ icon: "error", text: "Could not initialize payment session." });
      dispatch(clearPaymentSession());
    }
  };

  return (
    <Button type="button" onClick={handlePaystackPayment}>
      {/* Start Now and Pay {currency} {amount} with Paystack */}
      Start Payment Now
    </Button>
  );
};

export default PaystackCheckout;