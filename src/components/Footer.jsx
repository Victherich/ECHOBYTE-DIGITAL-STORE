import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  text-align: center;
  color: #d1d5db; /* Tailwind's 'text-gray-400' */
  padding: 1.5rem 1rem;
`;

const FooterText = styled.p`
  font-size: 0.875rem; /* Tailwind's 'text-sm' */
  margin-top: 0.5rem; /* Tailwind's 'mt-2' */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>📧 echobyteconcept@gmail.com</FooterText>
      <FooterText>📞 +234 706 348 0314</FooterText>
      <FooterText>&copy; {new Date().getFullYear()} ECHOBYTE CONCEPT.</FooterText>
      <FooterText>All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
