

import React from 'react';
import styled from 'styled-components';
import logo from '../Images/logo.webp';
import hero from '../Images/allproduct.jpg' // Ensure your logo image is in the public/assets folder or import correctly

const HeroWrapper = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background-image: url(${hero}); // Make sure this path matches your actual image
  background-size: cover;
  background-position: center;
  color: white;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subheading = styled.p`
  font-size: 1.125rem;
  max-width: 900px;
  margin: 0 auto;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const ActionButton = styled.button`
  background-color: #facc15;
  color: black;
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fde047;
  }
`;

const AllProductsHero = () => {


  return (
    <HeroWrapper>
      <LogoWrapper>
        <LogoImage src={logo} alt="Echobyte Concept Logo" />
      </LogoWrapper>
      <Heading>ALL DIGITAL PRODUCTS</Heading>
      <Subheading>
  Discover premium digital products, tools, and templates designed to elevate your business, boost productivity, and bring your creative ideas to life — all in one place.
</Subheading>


    </HeroWrapper>
  );
};

export default AllProductsHero;
