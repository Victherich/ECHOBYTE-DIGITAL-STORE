
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';
 import Swal from 'sweetalert2';




const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  width:100%;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  width:100%;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  border: 1px solid #4b5563;
  background-color: white;
  color:#1f2937 ;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #facc15;
  }
`;

const SearchButton = styled.button`
  background-color: #facc15;
  border: none;
  border-radius: 9999px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  color: #111827;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
    color:white;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {searchResult, setSearchResult} =useContext(Context);
  const navigate = useNavigate();
  

 

const searchProductsByTitle = async () => {
  const searchText = searchTerm.trim().toLowerCase();
  if (!searchText) {
    setSearchResult([]); // Clear results if empty search
    return;
  }

  try {
    // Show loading alert
    Swal.fire({
      title: 'Searching products...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const querySnapshot = await getDocs(collection(db, 'products'));
    const filtered = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(prod => prod.title.toLowerCase().includes(searchText));

    setSearchResult(filtered);

    // Close loading
    Swal.close();

    // Show success message with number of results
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Search complete',
    //   text: `${filtered.length} product(s) found`,
    //   timer: 2000,
    //   showConfirmButton: false,
    //   background: '#1f2937',
    //   color: '#facc15',
    // });

    // navigate('/searchresults')
    navigate('/searchresults', { state: { scrollToResults: true } });

  } catch (err) {
    console.error('Search failed:', err);
    setSearchResult([])

    // Close loading if open
    Swal.close();

    // Show error alert
    Swal.fire({
      icon: 'error',
      title: 'Search failed',
      text: 'There was an error searching products. Please try again.',
      background: '#1f2937',
      color: '#facc15',
    });
  }
};


  const scrollToResults = () => {
    const servicesSection = document.getElementById("results");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Search products by title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            searchProductsByTitle();
          }
        }}
      />
      <SearchButton onClick={searchProductsByTitle}>Search</SearchButton>
    </SearchWrapper>
  );
};

export default SearchBar;
