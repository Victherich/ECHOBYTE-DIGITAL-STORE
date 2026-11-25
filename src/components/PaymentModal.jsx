


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { query, collection, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebaseConfig";

import PaystackCheckout from "./PaystackCheckout";
import PayPalCheckout from "./PayPalCheckout";
import FlutterwaveCheckout from "./FlutterwaveCheckout";

// ------------------- STYLES -------------------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
  width: 100%;
`;

const ModalWrapper = styled.div`
  background: #1f2937;
  color: #f9fafb;
  padding: 10px;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 540px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid #374151;
  overflow-y: scroll;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #facc15;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #111827;
  color: #f9fafb;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #facc15;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.4);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PasswordContainer = styled.div`
  position: relative; 

  button {
    position: absolute;
    right: 1rem;
    top: 40%;
    transform: translateY(-50%);
    cursor: pointer;
    background: none; 
    border: none;
    color: #f9fafb;
  }
`;

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

const CancelButton = styled.button`
  width: 100%;
  margin-top: 0.75rem;
  background: transparent;
  color: #9ca3af;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;

  &:hover {
    color: #f87171;
  }
`;

// ------------------- COMPONENT -------------------
const PaymentModal = ({
  onClose,
  amount,
  productName,
  productId,
  productUrl,
  currency,
}) => {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStep, setFormStep] = useState("initial"); // 'initial', 'new_user', 'existing_user', 'ready_to_pay'

  const [email, setEmail] = useState(() => {
    const saved = localStorage.getItem("userEmail");
    return saved ? JSON.parse(saved) : "";
  });

  useEffect(() => {
    localStorage.setItem("userEmail", JSON.stringify(email));
  }, [email]);

  const customerData = { name, email, phone, password };

  const checkUserExists = async () => {
    if (!email || email !== confirmEmail) {
      Swal.fire({ text: "Emails do not match or field is empty!" });
      return;
    }
    
    Swal.fire({ text: "Checking account...", allowOutsideClick: false });
    Swal.showLoading();

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setFormStep("new_user");
        Swal.fire({ text: "A new account will be created for you." });
      } else {
        setFormStep("existing_user");
        Swal.fire({ text: "An account with this email exists. Please log in." });
      }
    } catch (err) {
      Swal.fire({ icon: "error", text: "Error checking user." });
    }
  };

  const handleNewUserValidation = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({ text: "Passwords do not match!" });
      return;
    }

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (password.length < 6) {
      Swal.fire({ text: "Password must be at least 6 characters long!" });
      return;
    }

    if (!alphanumericRegex.test(password)) {
      Swal.fire({ text: "Password can only contain letters and numbers (no special characters)!" });
      return;
    }

    setFormStep("ready_to_pay");
  };

  const handleLoginExistingUser = async (e) => {
    e.preventDefault();
    Swal.fire({ text: "Logging in...", allowOutsideClick: false });
    Swal.showLoading();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFormStep("ready_to_pay");
      Swal.fire({ icon: "success", text: "Login successful!" });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", text: "Login failed: " + err.message });
    }
  };

  console.log(currency)

  return (
    <Overlay>
      <ModalWrapper>
        <Title>Proceed with Payment</Title>
        
        <FormGroup>
          {formStep === "initial" && (
            <>
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
              <Button type="button" onClick={checkUserExists}>Proceed</Button>
            </>
          )}

          {formStep === "new_user" && (
            <form onSubmit={handleNewUserValidation}>
              <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <PasswordContainer>
                <Input type={showPassword ? "text" : "password"} placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
              </PasswordContainer>
              <PasswordContainer>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </PasswordContainer>
              <Button type="submit">Continue to Payment</Button>
            </form>
          )}

          {formStep === "existing_user" && (
            <form onSubmit={handleLoginExistingUser}>
              <p style={{textAlign: 'center', marginBottom: '10px'}}>Welcome back! Enter your password to continue.</p>
              <PasswordContainer>
                <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
              </PasswordContainer>
              <Button type="submit">Login and Continue</Button>
            </form>
          )}

          {formStep === "ready_to_pay" && (
            <>
              <p style={{textAlign: "center", color: "#22c55e", fontWeight: "600"}}>Ready to complete your payment.</p>
              {currency === "NGN" ? (
                <PaystackCheckout
                  amount={amount}
                  currency={currency}
                  productName={productName}
                  productId={productId}
                  productUrl={productUrl}
                  customerData={customerData}
                />
              ): (
                <FlutterwaveCheckout
                  amount={amount}
                  currency={currency}
                  productName={productName}
                  productId={productId}
                  productUrl={productUrl}
                  customerData={customerData}
                />
              )}
              
              {/* :(
                <PayPalCheckout
                  amount={amount}
                  currency={currency}
                  productName={productName}
                  productId={productId}
                  productUrl={productUrl}
                  customerData={customerData}
                  onClose={onClose}
                />
              )} */}
            </>
          )}
        </FormGroup>

        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </ModalWrapper>
    </Overlay>
  );
};

export default PaymentModal;