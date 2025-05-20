
import React from 'react';
import styled from 'styled-components';

import hero from '../Images/hero.jpg' // Ensure your logo image is in the public/assets folder or import correctly
import SearchBar from './SearchBar';

const HeroWrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-image: url(${hero}); // Ensure the image path is valid
  background-size: cover;
  background-position: center;
  color: white;
  height: 100vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); // Black overlay with 50% opacity
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
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

const HeroSection = () => {


  return (
    <HeroWrapper>
    
      <Heading>ECHOBYTE DIGITAL STORE</Heading>
      <Subheading>
  Discover premium digital products, tools, and templates designed to elevate your business, boost productivity, and bring your creative ideas to life — all in one place.
</Subheading>
<SearchBar/>


    </HeroWrapper>
  );
};

export default HeroSection;
