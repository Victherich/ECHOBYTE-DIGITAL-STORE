
import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// 🌟 Subtle fade-up animation
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  background-color: #111827;;
  color: #f9fafb;
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
  text-align: center;
  flex-direction: column;
  overflow: hidden;
`;

const Heading = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #facc15;
  margin-bottom: 1rem;
  animation: ${fadeUp} 1s ease forwards;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  color: #d1d5db;
  max-width: 700px;
  margin-bottom: 2rem;
  line-height: 1.7;
  animation: ${fadeUp} 1.2s ease forwards;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeUp} 1.4s ease forwards;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#facc15" : "transparent")};
  color: ${(props) => (props.primary ? "#111827" : "#facc15")};
  font-weight: 700;
  border: 2px solid #facc15;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => (props.primary ? "#eab308" : "#facc15")};
    color: ${(props) => (props.primary ? "#111827" : "#111827")};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(250, 204, 21, 0.2);
  }
`;

const Glow = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 0;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export default function AccessCoursesCTA() {
  const navigate = useNavigate();

  return (
    <Section>
      <Glow />
      <ContentWrapper>
        <Heading>Unlock Your Learning Journey 🚀</Heading>
        <SubText>
       Log in to access your purchased courses and continue building the skills that shape your future.
        </SubText>

        <ButtonGroup>
          <Button primary onClick={() => navigate("/login")}>
            Login to My Courses
          </Button>
    
        </ButtonGroup>
      </ContentWrapper>
    </Section>
  );
}
