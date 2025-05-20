
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../Images/logo.webp'
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { use } from 'react';
import { Context } from './Context';

const Section = styled.section`
  background-color: #111827; // Tailwind bg-gray-900
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

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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

  &:hover {
    transform: scale(1.05);
    border-color: #facc15;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  color: #facc15;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: #22c55e;
  color: white;
  padding: 0.5rem 5rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor:pointer;

  &:hover {
    background-color: gray;
  }
`;

const SearchResults = () => {
 const {searchResult, setSearchResult} =useContext(Context);
  const navigate = useNavigate();
  const {currency}=useContext(Context);
  const location = useLocation();


useEffect(() => {
    if (location.state?.scrollToResults) {
      const target = document.getElementById("results");
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300); // small delay to wait for DOM render
      }
    }
  }, [location]);


  return (
    <Section id="results">
      <Title>Search Result: Found ({searchResult.length}) Products</Title>
      <Grid>
        {searchResult.map((product, index) => (
          <Card key={index}>
            <ProductImage src={product.coverImageUrl} alt={product.title} />
             <CardTitle>{product.title.toUpperCase().slice(0,50)}{product.title.length>50?'...':""}</CardTitle>
            {currency === 'NGN' ? (
  <Price>₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)}</Price>
) : (
  <Price>${new Intl.NumberFormat('en-US').format(product.priceInUsd)}</Price>
)}

            <CTAButton onClick={()=>navigate(`/productdetail/${product.id}`)}>View</CTAButton>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default SearchResults;
