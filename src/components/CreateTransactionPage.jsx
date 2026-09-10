import React, { useState } from "react";
import styled from "styled-components";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";

// ---------- Styled Components ----------
const PageWrapper = styled.div`
  background-color: #111827;
  color: #f9fafb;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #facc15;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 650px;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  color: #d1d5db;
  font-size: 0.95rem;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 320px;
  background-color: #111827;
  border: 1px solid #374151;
  color: #f9fafb;
  font-family: monospace;
  font-size: 0.85rem;
  padding: 1rem;
  border-radius: 0.75rem;
  outline: none;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    border-color: #facc15;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.3);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const SubmitButton = styled.button`
  background-color: #facc15;
  color: #111827;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #eab308;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// ---------- Component ----------
export default function CreateTransactionPage() {
  const [jsonInput, setJsonInput] = useState(`{
  "amount": 5000,
  "amountPaid": 5000,
  "certificateDownloaded": true,
  "currency": "NGN",
  "customerEmail": "ejenavwohappiness@gmail.com",
  "customerName": "Babalola Oke Happiness ",
  "customerPhone": "+2348105887325",
  "paidAt": "2026-08-29T12:41:33.858Z",
  "paymentMethod": "Paystack",
  "productId": "NOb2qx3LBBMyYifQ2cnJ",
  "productName": "VIRTUAL ASSISTANT",
  "productUrl": "https://drive.google.com/drive/folders/1hC1T6SGVDhipSxK9v3ZQeit0CB2AHWUn",
  "sellerEmail": "echobyteconcept@gmail.com",
  "transactionReference": "T267845656214115",
  "userId": "lAJYmZTA8tby8UZLXwuYnsx1iZ82"
}`);
  const [loading, setLoading] = useState(false);

  const handleCreateTransaction = async () => {
    if (!jsonInput.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Input",
        text: "Please paste the transaction JSON data first.",
        background: "#1f2937",
        color: "#f9fafb",
      });
      return;
    }

    setLoading(true);
    try {
      // Parse text area input into a JavaScript object
      const txData = JSON.parse(jsonInput);

      if (!txData.transactionReference) {
        throw new Error("The JSON object must contain a 'transactionReference' property to serve as the unique document ID.");
      }

      // Use transactionReference as the Firestore document ID
      const txRef = doc(db, "transactions", txData.transactionReference);

      // Check for duplicates
      const txSnap = await getDoc(txRef);
      if (txSnap.exists()) {
        Swal.fire({
          icon: "error",
          title: "Transaction Already Exists",
          text: `A transaction with reference "${txData.transactionReference}" already exists in the database.`,
          background: "#1f2937",
          color: "#f9fafb",
        });
        setLoading(false);
        return;
      }

      // Save to Firestore 'transactions' collection
      await setDoc(txRef, txData);

      Swal.fire({
        icon: "success",
        title: "Transaction Created Successfully!",
        text: `Transaction ${txData.transactionReference} for ${txData.customerName} has been saved.`,
        background: "#1f2937",
        color: "#f9fafb",
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Transaction",
        text: error instanceof SyntaxError ? "Invalid JSON format. Please check your syntax." : error.message,
        background: "#1f2937",
        color: "#f9fafb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Title>Create Transaction in Firestore</Title>
      <FormContainer>
        <Label htmlFor="tx-json">Paste Transaction Data (JSON Format):</Label>
        <TextArea
          id="tx-json"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste JSON here..."
        />
        <SubmitButton onClick={handleCreateTransaction} disabled={loading}>
          {loading ? "Checking & Creating..." : "Create Transaction in Database"}
        </SubmitButton>
      </FormContainer>
    </PageWrapper>
  );
}