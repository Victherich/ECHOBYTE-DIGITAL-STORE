
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: #111827;
  color: #f9fafb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Box = styled.div`
  background-color: #1f2937;
  padding: 3rem;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  color: #facc15;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #e5e7eb;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: ${({ variant }) =>
    variant === 'login'
      ? '#3b82f6'
      : variant === 'products'
      ? '#10b981'
      : '#374151'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

export default function AccountInfoPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Title>Access Your Account</Title>
        <Text>
          An account is created for you automatically when you purchase a product.
          <br />
             <Button variant="products" onClick={() => navigate('/allproducts')}>
            View Products
          </Button>
          <br />
          If you already purchased, please log in to access your products.
          <br />
          <br />
          If you are a returning customer, you can purchase again — your new products will be
          automatically added to your existing dashboard for easy access.
        </Text>

        <ButtonGroup>
          <Button variant="login" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
          <Button variant="products" onClick={() => navigate('/allproducts')}>
            View Products
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}
