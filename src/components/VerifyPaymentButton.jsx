import React, { useContext } from "react";
import styled from "styled-components";
import {Context} from './Context'
import Swal from "sweetalert2";

const VerifyPaymentButton = ({
  text = "I HAVE PAID",
  className,
}) => {
  const { startPaymentPolling1 } = useContext(Context);

  const handleVerifyPayment = () => {
    // Retrieve the verification number saved earlier
    const verificationNumber = JSON.parse(
      localStorage.getItem("verificationNumber")
    );

    if (!verificationNumber) {
      Swal.fire({
        icon: "warning",
        text: "Verification number not found. Please initiate the payment again.",
      });
      return;
    }

    // Start polling for payment verification
    startPaymentPolling1(verificationNumber);
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