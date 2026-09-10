import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "./Context";
import Swal from "sweetalert2";

const VerifyPaymentButton = ({
  text = "I HAVE PAID",
  className,
}) => {
  const { startPaymentPolling1 } = useContext(Context);

  const handleVerifyPayment = () => {
    let customReference = null;
    
    // ✅ Safely retrieve the reference matching how it was saved in PaystackCheckout
    try {
      const raw = localStorage.getItem("current_payment_ref");
      customReference = raw ? JSON.parse(raw) : null;
    } catch (e) {
      // Fallback if it was stored as a raw unquoted string
      customReference = localStorage.getItem("current_payment_ref");
    }

    if (!customReference) {
      Swal.fire({
        icon: "warning",
        text: "Payment reference not found. Please initiate the payment again.",
      });
      return;
    }

    Swal.fire({
      text: "Checking payment status...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // Manually start polling using the exact customReference
    startPaymentPolling1(customReference);
  };

  return (
    <Button className={className} onClick={handleVerifyPayment}>
      {text}
    </Button>
  );
};

export default VerifyPaymentButton;

const Button = styled.button`
  width: 100%;
  padding: 14px 20px;
  border: none;
  outline: none;
  border-radius: 8px;
  background: #0d6efd;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0b5ed7;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;