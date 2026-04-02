import React, { useState } from "react";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

// ---------- Styled Components ----------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background: #1f2937;
  color: #f9fafb;
  padding: 2.5rem;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid #374151;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #facc15;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #d1d5db;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #111827;
  color: #f9fafb;
  font-size: 1rem;
  margin-bottom: 1.25rem;

  &:focus {
    outline: none;
    border-color: #facc15;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.4);
  }

  &::placeholder {
    color: #9ca3af;
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
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #16a34a;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  margin-top: 0.75rem;
  background: transparent;
  color: #9ca3af;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;

  &:hover {
    color: #f87171;
  }
`;

// ---------- Component ----------
export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
        background: "#1f2937",
        color: "#f9fafb",
      });
      return;
    }

    try {
      setLoading(true);

      // 🔍 1. Check if user exists in Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email.trim().toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Email Not Found",
          text: "No account is registered with this email address.",
          background: "#1f2937",
          color: "#f9fafb",
        });
        return;
      }

      // 📧 2. Send password reset email
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Reset Email Sent",
        text: "Please check your inbox and follow the link to reset your password.",
        background: "#1f2937",
        color: "#f9fafb",
      });

      onClose();
    } catch (error) {
      console.error("Error sending reset email:", error);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Error Sending Email",
        text:
          error.code === "auth/invalid-email"
            ? "The email address is invalid."
            : "Something went wrong. Please try again.",
        background: "#1f2937",
        color: "#f9fafb",
      });
    }
  };

  return (
    <Overlay>
      <ModalWrapper>
        <Title>Reset Password</Title>
        <Description>
          Enter your registered email address. We'll send you a password reset link.
        </Description>

        <form onSubmit={handleReset}>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </ModalWrapper>
    </Overlay>
  );
}
