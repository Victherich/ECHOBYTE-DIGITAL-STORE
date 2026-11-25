// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import PaymentModal from './PaymentModal';
// import { useParams } from 'react-router-dom';
// import { db } from '../firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';

// import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
// import { Context } from './Context';


// // Styled components
// const Container = styled.div`
//   background-color: #111827;
//   color: white;
//   min-height: 100vh;
//   padding: 4rem 1.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 1200px;
//   width: 100%;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     gap: 4rem;
//   }
// `;

// const Image = styled.img`
//   width: 100%;
//   max-height: 400px;
//   object-fit: cover;
//   border-radius: 1rem;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);

//   @media (min-width: 768px) {
//     width: 50%;
//   }
// `;

// const Info = styled.div`
//   flex: 1;
//   margin-top: 2rem;

//   @media (min-width: 768px) {
//     margin-top: 0;
//   }
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
// `;

// const Title2 = styled.h1`
//   font-size: 1.5rem;
//   font-weight: bold;
//   text-decoration:underline;
 
// `;


// const Description = styled.p`
//   line-height: 1.6;
//   color: #d1d5db;
//   margin-bottom: 2rem;
// `;

// const BuyButton = styled.button`
//   background-color: #22c55e;
//   color: white;
//   padding: 0.75rem 2rem;
//   font-weight: 600;
//   border-radius: 5px;
//   transition: background-color 0.3s;
//   cursor:pointer;
//   border:none;
//   margin-bottom:30px;
//   width:200px;

//   &:hover {
//     background-color: gray;
//   }
// `;

// const Outline = styled.div`
//   margin-bottom: 50px;
//   /* Ensures the container respects boundaries and forces long words to break */
//   max-width: 100%;
//   overflow-wrap: break-word;
//   word-break: break-word;
//   hyphens: auto;

//   ul { 
//     padding-left: 20px;
//   }
// `;


// const PriceContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: baseline;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
// `;

// const MainPrice = styled.span`
//   color: #facc15;
//   font-size: 1rem;
//   font-weight: 700;
// `;

// const SubPrice = styled.span`
//   color: #9ca3af; /* Tailwind gray-400 */
//   font-size: 1rem;
//   font-weight: 500;
// `;





// const ProductDetail = () => {
//   const [product, setProduct] = useState(null);
//   const {showModal, setShowModal} = useContext(Context);
//   const { id } = useParams();
//   const [productOutlines, setProductOutlines]=useState([]);
//   // const [currency, setCurrency]=useState('NGN');
//   const {currency, setCurrency}=useContext(Context);
//   // const navigate = useNavigate();

  



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






//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, 'products', id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.error('No such product!');
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);



//   const getOutlinesByProductId = async () => {
//   try {
//     const outlinesRef = collection(db, 'outlines');
//     const q = query(
//       outlinesRef,
//       where('productId', '==', id),
//       orderBy('outlineOrder', 'asc')
//     );
    
//     const querySnapshot = await getDocs(q);
//     const outlines = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     setProductOutlines( outlines);
//     console.log(outlines);
//   } catch (error) {
//     console.error('Error fetching outlines:', error);
//     throw error;
//   }
// };

// useEffect(()=>{
//   getOutlinesByProductId();
// },[])


//   if (!product) {
//     return <Container>Loading...</Container>;
//   }

//   return (
//     <Container>
  

//       <ContentWrapper>
//   <Image
//     src={product.coverImageUrl}
//     alt={product.title}
//     onError={(e) => {
//       e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
//     }}
//   />
//   <Info>
//     <Title>{product.title.toUpperCase()}</Title>
//     <PriceContainer>
//       <MainPrice>₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)}</MainPrice>
//       <SubPrice>(${new Intl.NumberFormat('en-US').format(product.priceInUsd)})</SubPrice>
//     </PriceContainer>
    
//     <Description>{product.description}</Description>
//     <BuyButton onClick={() => {setShowModal(true); setCurrency('NGN')}}>
//      CLICK TO BUY IN NAIRA (₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)})
//     </BuyButton><br/>
//     <BuyButton onClick={() => {setShowModal(true); setCurrency('FLWAVE')}}>
//       CLICK TO BUY IN OTHER CURENCIES
//     </BuyButton><br/>
//     {/* <BuyButton onClick={() => {setShowModal(true); setCurrency('USD')}}>
//       Buy Now - Paypal (${new Intl.NumberFormat('en-US').format(product.priceInUsd)})
//     </BuyButton> */}

//     <Outline>
//       <Title2>What you will Learn:</Title2>
    
//         <ul>
//           {product?.outlines?.split('\n').map((line, index) => (
//             line.trim() !== '' && <li key={index}>{line}</li>
//           ))}
//         </ul>
 
//     </Outline>

//     <p style={{ margin: "15px 0", fontSize: "0.95rem", color: "white", lineHeight: "1.5" }}>
//   DO YOU WANT TO BUILD YOUR PORTFOLIO?{" "}
//   <a 
//     href="https://myportfolioechobyte.vercel.app/" 
//     target="_blank" 
//     rel="noopener noreferrer" 
//     style={{ color: "#6366f1", fontWeight: "700", textDecoration: "underline" }}
//   >
//     CLICK HERE TO START
//   </a>
// </p>
// <p style={{ margin: "15px 0", fontSize: "0.95rem", color: "white", lineHeight: "1.5" }}>
//   TO START SELLING DIGITAL PRODUCTS AND SERVICES?{" "}
//   <a 
//     href="https://echobytedigitalmarketplace.vercel.app/" 
//     target="_blank" 
//     rel="noopener noreferrer" 
//     style={{ color: "#6366f1", fontWeight: "700", textDecoration: "underline" }}
//   >
//     CLICK HERE TO START
//   </a>
// </p>
//   </Info>
// </ContentWrapper>

//       {showModal && (
//         <PaymentModal
//           onClose={() => setShowModal(false)}
//           // amount={currency==='NGN'?product.priceInNgn:product.priceInUsd}
//           amount={product.priceInNgn}
//           productName={product.title}
//           productId={product.id}
//           productUrl={product.url}
//           currency={currency}
//         />
//       )}
//       <BuyButton onClick={()=>window.history.back()} style={{backgroundColor:"gray", color:"white"}}>Back</BuyButton>
//     </Container>
//   );
// };

// export default ProductDetail;







import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PaymentModal from './PaymentModal';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Context } from './Context';


// Styled components
const Container = styled.div`
  background-color: #111827;
  color: white;
  min-height: 100vh;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Info = styled.div`
  flex: 1;
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Title2 = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration:underline;
`;

const Description = styled.p`
  line-height: 1.6;
  color: #d1d5db;
  margin-bottom: 2rem;
`;

const BuyButton = styled.button`
  background-color: #22c55e;
  color: white;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor:pointer;
  border:none;
  margin-bottom:30px;
  width:200px;

  &:hover {
    background-color: gray;
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const CurrencyControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
  max-width: 350px;
  width: 100%;
`;

const CurrencyLabel = styled.label`
  color: #d1d5db;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const CurrencySelect = styled.select`
  width: 100%;
  padding: 13px 15px;
  border-radius: 5px;
  border: 1px solid #374151;
  background: #1f2937;
  color: white;
  font-size: 1rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #22c55e;
  }

  option {
    background: #1f2937;
    color: white;
  }
`;

const SelectedAmount = styled.div`
  color: #facc15;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 5px 0;
`;

const Outline = styled.div`
  margin-bottom: 50px;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;

  ul {
    padding-left: 20px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MainPrice = styled.span`
  color: #facc15;
  font-size: 1rem;
  font-weight: 700;
`;

const SubPrice = styled.span`
  color: #9ca3af;
  font-size: 1rem;
  font-weight: 500;
`;


// Flutterwave-supported card currencies
const FLUTTERWAVE_CURRENCIES = [
  { code: 'NGN', name: 'Nigerian Naira' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'EUR', name: 'Euro' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'XAF', name: 'Central African CFA Franc' },
  { code: 'COP', name: 'Colombian Peso' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'GHS', name: 'Ghanaian Cedi' },
  { code: 'KES', name: 'Kenyan Shilling' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'RWF', name: 'Rwandan Franc' },
  { code: 'SLL', name: 'Sierra Leonean Leone' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'TZS', name: 'Tanzanian Shilling' },
  { code: 'UGX', name: 'Ugandan Shilling' },
  { code: 'XOF', name: 'West African CFA Franc' },
  { code: 'ZMW', name: 'Zambian Kwacha' },
];


const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { showModal, setShowModal } = useContext(Context);
  const { id } = useParams();
  const [productOutlines, setProductOutlines] = useState([]);

  const { currency, setCurrency } = useContext(Context);

  // Selected Flutterwave payment currency
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');

  // Exchange rates with NGN as the base currency
  const [exchangeRates, setExchangeRates] = useState({ NGN: 1 });
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState(false);


  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const data = await res.json();

        if (data.country === 'NG') {
          setCurrency('NGN');
        } else {
          setCurrency('USD');
        }
      } catch (error) {
        console.error('Geo IP failed, defaulting to USD');
        setCurrency('USD');
      }
    };

    detectCountry();
  }, []);


  // Fetch live exchange rates using NGN as the base
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setRatesLoading(true);
        setRatesError(false);

        const response = await fetch(
          'https://open.er-api.com/v6/latest/NGN'
        );

        if (!response.ok) {
          throw new Error('Unable to fetch exchange rates');
        }

        const data = await response.json();

        if (data.result !== 'success') {
          throw new Error('Exchange rate request failed');
        }

        setExchangeRates({
          ...data.rates,
          NGN: 1
        });

      } catch (error) {
        console.error('Exchange rate error:', error);
        setRatesError(true);
      } finally {
        setRatesLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);


  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);


  const getOutlinesByProductId = async () => {
    try {
      const outlinesRef = collection(db, 'outlines');

      const q = query(
        outlinesRef,
        where('productId', '==', id),
        orderBy('outlineOrder', 'asc')
      );

      const querySnapshot = await getDocs(q);

      const outlines = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProductOutlines(outlines);
      console.log(outlines);

    } catch (error) {
      console.error('Error fetching outlines:', error);
      throw error;
    }
  };


  useEffect(() => {
    getOutlinesByProductId();
  }, []);


  // Calculate product price in selected currency
  const getConvertedAmount = () => {
    if (!product) return 0;

    const rate = exchangeRates[selectedCurrency];

    if (rate === undefined) return null;

    const convertedAmount = product.priceInNgn * rate;

    return selectedCurrency === 'NGN'
      ? Math.round(convertedAmount)
      : Number(convertedAmount.toFixed(2));
  };


  const convertedAmount = getConvertedAmount();

  // Format selected currency amount
  const formattedAmount = convertedAmount !== null
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency,
        maximumFractionDigits: 2
      }).format(convertedAmount)
    : 'Unavailable';


  // Open existing payment modal
  const handleBuyNow = () => {
    if (convertedAmount === null || ratesLoading || ratesError) {
      return;
    }

    // Keep FLWAVE as the payment provider identifier.
    // Pass the actual selected currency separately.
    // setCurrency('FLWAVE');
    setShowModal(true);
  };


  if (!product) {
    return <Container>Loading...</Container>;
  }


  return (
    <Container>

      <ContentWrapper>

        <Image
          src={product.coverImageUrl}
          alt={product.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
          }}
        />

        <Info>

          <Title>{product.title.toUpperCase()}</Title>

          <PriceContainer>
            {/* <MainPrice>
              ₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)}
            </MainPrice>

            <SubPrice>
              (${new Intl.NumberFormat('en-US').format(product.priceInUsd)})
            </SubPrice> */}
             <SelectedAmount>
              {ratesLoading
                ? 'Loading exchange rate...'
                : `Amount: ${formattedAmount}`}
            </SelectedAmount>
          </PriceContainer>

          <Description>{product.description}</Description>


          {/* Currency selector and Buy Now button */}
          <CurrencyControls>

            <CurrencyLabel htmlFor="flutterwave-currency">
              CHANGE CURRENCY
            </CurrencyLabel>

            <CurrencySelect
              id="flutterwave-currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {FLUTTERWAVE_CURRENCIES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name} ({item.code})
                </option>
              ))}
            </CurrencySelect>

            <SelectedAmount>
              {ratesLoading
                ? 'Loading exchange rate...'
                : `Amount: ${formattedAmount}`}
            </SelectedAmount>

            {ratesError && (
              <p style={{ color: '#f87171', fontSize: '0.85rem' }}>
                Unable to load exchange rates. Please refresh the page.
              </p>
            )}

            <BuyButton
              onClick={handleBuyNow}
              disabled={
                ratesLoading ||
                ratesError ||
                convertedAmount === null
              }
              style={{ width: '100%', marginBottom: 0 }}
            >
              BUY NOW
            </BuyButton>

          </CurrencyControls>


          <Outline>

            <Title2>What you will Learn:</Title2>

            <ul>
              {product?.outlines?.split('\n').map((line, index) => (
                line.trim() !== '' && <li key={index}>{line}</li>
              ))}
            </ul>

          </Outline>


          <p style={{ margin: "15px 0", fontSize: "0.95rem", color: "white", lineHeight: "1.5" }}>
            DO YOU WANT TO BUILD YOUR PORTFOLIO?{" "}
            <a
              href="https://myportfolioechobyte.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6366f1", fontWeight: "700", textDecoration: "underline" }}
            >
              CLICK HERE TO START
            </a>
          </p>


          <p style={{ margin: "15px 0", fontSize: "0.95rem", color: "white", lineHeight: "1.5" }}>
            TO START SELLING DIGITAL PRODUCTS AND SERVICES?{" "}
            <a
              href="https://echobytedigitalmarketplace.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6366f1", fontWeight: "700", textDecoration: "underline" }}
            >
              CLICK HERE TO START
            </a>
          </p>

        </Info>

      </ContentWrapper>


      {showModal && (
        <PaymentModal
          onClose={() => setShowModal(false)}
          amount={convertedAmount}
          productName={product.title}
          productId={product.id}
          productUrl={product.url}
          currency={selectedCurrency}
          paymentCurrency={selectedCurrency}
        />
      )}


      <BuyButton
        onClick={() => window.history.back()}
        style={{ backgroundColor: "gray", color: "white" }}
      >
        Back
      </BuyButton>

    </Container>
  );
};

export default ProductDetail;
