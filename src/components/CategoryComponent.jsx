
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context";

// Styled Components
const Section = styled.section`
  background-color: #111827;
  padding: 5rem 1.5rem;
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: linear-gradient(to bottom right, #1f2937, #374151);
  border: 1px solid #4b5563;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    border-color: #facc15;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.2);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function Categories() {
  const navigate = useNavigate();
  const {categories} = useContext(Context);

  return (
    <Section>
      <Title>Explore Our Digital Categories</Title>
      <Grid>
        {categories.map((cat, idx) => (
          <Card key={idx} onClick={() => navigate(cat.link)}>
            <CategoryImage src={cat.image} alt={cat.name} />
            <CardTitle>{cat.name}</CardTitle>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
