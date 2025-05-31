import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterText>📧 echobyteconcept@gmail.com</FooterText>
      <FooterText>📞 +234 706 348 0314</FooterText>
      <FooterText onClick={() => window.open("https://echobyteconcept.vercel.app/termsandconditions", "_self")} style={{color:"#facc15", cursor:"pointer", fontSize:"1.1rem", textDecoration:"underline", fontWeight:"500" }}>Terms and Conditions</FooterText>
      <FooterText onClick={() => window.open("https://echobyteconcept.vercel.app/privacypolicy", "_self")} style={{color:"#facc15", cursor:"pointer", fontSize:"1.1rem", textDecoration:"underline", fontWeight:"500" }}>Privacy Policy</FooterText>
      <FooterText>&copy; {new Date().getFullYear()} ECHOBYTE CONCEPT.</FooterText>
      <FooterText>All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
