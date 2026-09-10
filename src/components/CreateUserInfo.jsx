import React, { useState } from "react";
import styled from "styled-components";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
  max-width: 600px;
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
  height: 220px;
  background-color: #111827;
  border: 1px solid #374151;
  color: #f9fafb;
  font-family: monospace;
  font-size: 0.9rem;
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
export default function CreateUserPage() {
  const [jsonInput, setJsonInput] = useState(`{
  "uid": "AiTPRkey5rZfpFfqmxgmW858VjB2",
  "name": "EbubeChukwu Victor Ndu",
  "email": "victherich2022@gmail.com",
  "phone": "07063480314",
  "role": "user",
  "firstLogin": false,
  "createdAt": "July 11, 2026 at 11:15:27 AM UTC+1"
}`);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    if (!jsonInput.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Input",
        text: "Please paste the user JSON data first.",
        background: "#1f2937",
        color: "#f9fafb",
      });
      return;
    }

    setLoading(true);
    try {
      // Parse text area input into a JavaScript object
      const userData = JSON.parse(jsonInput);

      if (!userData.uid) {
        throw new Error("The JSON object must contain a 'uid' property to serve as the document ID.");
      }

      const userRef = doc(db, "users", userData.uid);

      // Check if user document already exists
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        Swal.fire({
          icon: "error",
          title: "User Already Exists",
          text: `A user with UID "${userData.uid}" already exists in the database.`,
          background: "#1f2937",
          color: "#f9fafb",
        });
        setLoading(false);
        return;
      }

      // Format payload
      const payload = {
        ...userData,
        createdAt: userData.createdAt || serverTimestamp(),
      };

      // Save to Firestore 'users' collection using the uid as document ID
      await setDoc(userRef, payload);

      Swal.fire({
        icon: "success",
        title: "User Created Successfully!",
        text: `User ${userData.name || userData.email} has been saved to the 'users' collection.`,
        background: "#1f2937",
        color: "#f9fafb",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create User",
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
      <Title>Create User in Firestore</Title>
      <FormContainer>
        <Label htmlFor="user-json">Paste User Data (JSON Format):</Label>
        <TextArea
          id="user-json"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste JSON here..."
        />
        <SubmitButton onClick={handleCreateUser} disabled={loading}>
          {loading ? "Checking & Creating..." : "Create User in Database"}
        </SubmitButton>
      </FormContainer>
    </PageWrapper>
  );
}