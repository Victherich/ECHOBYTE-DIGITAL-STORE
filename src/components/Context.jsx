import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = createContext();

const ContextProvider = ({ children }) => {

   
  const categories = [
    {
      id: "1",
      name: "📚 Ebooks",
      slug: "ebooks",
      image: "/ebook.jpg",
      description: "Explore a wide range of digital ebooks across genres, perfect for learning and entertainment."
    },
    {
      id: "2",
      name: "🖥️ Courses",
      slug: "courses",
      image: "/ecourse.jpg",
      description: "Upgrade your skills with our curated online courses created by industry experts."
    },
   
    // You can add more categories here...
  ];





  //  const [currency, setCurrency]=useState('USD');
  
  // Initialize currency from localStorage or default to 'USD'
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });

  // Save currency to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  
  
  // useEffect(() => {
  //   const detectCountry = async () => {
  //     try {
  //       const res = await fetch('https://ipapi.co/json');
  //       const data = await res.json();
  
  //       if (data.country === 'NG') {
  //         setCurrency('NGN');
  //       } else {
  //         setCurrency('USD');
  //       }
  //     } catch (error) {
  //       console.error('Geo IP failed, defaulting to USD');
  //       setCurrency('USD');
  //     }
  //   };
  
  //   detectCountry();
  // }, []);
  
  

  return (
    <Context.Provider value={{ categories, currency, setCurrency }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;


// APP UPGRADE
// DAHSBOARD ROUTING INSTEAD OF STATE SWITCHING
// USER REGISTARTION FOR POSTING PRODUCTS
// REFFERRAL PROGRAM