import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PaymentModal from './PaymentModal';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
// import logo from '../Images/logo.jpeg'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Context } from './Context';
// import CurrencyToggle from './CurrencyToggle';

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

// const Price = styled.p`
//   font-size: 1.5rem;
//   color: #facc15;
//   margin-bottom: 1rem;
// `;

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
`;

const Outline = styled.div`
  margin-bottom: 50px;
  /* Ensures the container respects boundaries and forces long words to break */
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
  color: #9ca3af; /* Tailwind gray-400 */
  font-size: 1rem;
  font-weight: 500;
`;





const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const {showModal, setShowModal} = useContext(Context);
  const { id } = useParams();
  const [productOutlines, setProductOutlines]=useState([]);
  // const [currency, setCurrency]=useState('NGN');
  const {currency, setCurrency}=useContext(Context);
  // const navigate = useNavigate();

  



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

    setProductOutlines( outlines);
    console.log(outlines);
  } catch (error) {
    console.error('Error fetching outlines:', error);
    throw error;
  }
};

useEffect(()=>{
  getOutlinesByProductId();
},[])


  if (!product) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {/* <CurrencyToggle/> */}
      {/* <ContentWrapper>
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
  <MainPrice>₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)}</MainPrice>
  <SubPrice>(${new Intl.NumberFormat('en-US').format(product.priceInUsd)})</SubPrice>
</PriceContainer>

          
          <Description>{product.description}</Description>
           <BuyButton onClick={() => {setShowModal(true);setCurrency('NGN')}}>Buy Now (₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)})</BuyButton><br/>
           <BuyButton onClick={() => {setShowModal(true);setCurrency('USD')}}>Buy Now (${new Intl.NumberFormat('en-US').format(product.priceInUsd)})</BuyButton>
          <Outline>
            <Title2>Outline:</Title2>
           {
            productOutlines.map((outline)=>(
               <ul key={outline.id}>
              <li>{outline.outline}</li>
          
            </ul>
            ))
           }
          </Outline>
                   
        </Info>
      </ContentWrapper> */}

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
      <MainPrice>₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)}</MainPrice>
      <SubPrice>(${new Intl.NumberFormat('en-US').format(product.priceInUsd)})</SubPrice>
    </PriceContainer>
    
    <Description>{product.description}</Description>
    <BuyButton onClick={() => {setShowModal(true); setCurrency('NGN')}}>
      Buy Now (₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)})
    </BuyButton><br/>
    <BuyButton onClick={() => {setShowModal(true); setCurrency('USD')}}>
      Buy Now (${new Intl.NumberFormat('en-US').format(product.priceInUsd)})
    </BuyButton>

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
          amount={currency==='NGN'?product.priceInNgn:product.priceInUsd}
          productName={product.title}
          productId={product.id}
          productUrl={product.url}
          currency={currency}
        />
      )}
      <BuyButton onClick={()=>window.history.back()} style={{backgroundColor:"gray", color:"white"}}>Back</BuyButton>
    </Container>
  );
};

export default ProductDetail;
