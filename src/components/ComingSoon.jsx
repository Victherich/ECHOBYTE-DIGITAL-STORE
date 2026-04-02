
 import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Main = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    #111827,
    #4c1d95,
    #000000
  );
  color: white;
  position: relative;
  overflow: hidden;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/noise-bg.png");
  background-size: cover;
  opacity: 0.1;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 600px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  color: #d1d5db;
  margin-bottom: 2rem;
`;

const HomeButton = styled.button`
  background-color: #facc15;
  color: black;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fde047;
  }
`;

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <Main>
      <NoiseOverlay />
      <Content>
        <Heading>🚧 Coming Soon</Heading>
        <Paragraph>
          We’re working hard to bring something amazing to life. Stay tuned!
        </Paragraph>
        <HomeButton onClick={() => navigate("/")}>Home</HomeButton>
      </Content>
    </Main>
  );
}
