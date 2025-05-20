

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Adjust the path

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #111827;
  color: white;
  width:100%;

  @media(max-width:428px){
      padding:5px;
  }
`;

const FormWrapper = styled.div`
  background: #1f2937;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  @media(max-width:428px){
      padding:50px 10px;
  }
`;

const Title = styled.h2`
  color: #facc15;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #e5e7eb;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: #374151;
  color: white;
  border: 2px solid #4b5563;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: #facc15;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #facc15;
  color: #1f2937;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #eab308;
  }
`;

const LinkText = styled.p`
  margin-top: 10px;
  cursor: pointer;
  color: #facc15;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email !== form.confirmEmail) {
      return Swal.fire("Error", "Emails do not match", "error");
    }

    if (form.password !== form.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    Swal.fire({
      title: "Please wait...",
      text: "Creating account...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const { name, email, phone, password } = form;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "admins", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        createdAt: new Date(),
      });

      Swal.fire("Success 🎉", "Account created successfully", "success");
      navigate("/adminlogin");

      setForm({
        name: "",
        email: "",
        confirmEmail: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      Swal.fire("Error ❌", err.message, "error");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register Admin</Title>
        <form onSubmit={handleSubmit}>
          <Label>Full Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />

          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Label>Confirm Email</Label>
          <Input
            name="confirmEmail"
            type="email"
            value={form.confirmEmail}
            onChange={handleChange}
            required
          />

          <Label>Phone Number</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} required />

          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit">Create Account</Button>
          <LinkText onClick={() => navigate("/adminlogin")}>
            Already have an account? Login
          </LinkText>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default AdminSignup;
