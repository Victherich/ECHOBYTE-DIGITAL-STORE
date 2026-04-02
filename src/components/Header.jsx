import React, { useContext, useEffect } from 'react'
import { Context } from './Context'
import styled from 'styled-components';
import logo from '../Images/logo.webp';
import { useNavigate } from 'react-router-dom';




  
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  position:fixed;
  top:10px;
  left:10px;
  z-index:99999999999999999999;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  cursor:pointer;
`;


const Header = () => {
  const navigate = useNavigate();

    const { transactionSuccess, setTransactionSuccess } = useContext(Context);


  useEffect(() => {
    if (transactionSuccess) {
      navigate("/dashboard");

          // ✅ Reset after navigating
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 500);
    }
  }, [transactionSuccess]);

    // console.log(yes)
  return (
    <div>
       <LogoWrapper>
        <LogoImage src={logo} alt="Echobyte Concept Logo" onClick={()=>navigate('/')}/>
      </LogoWrapper>
    </div>
  )
}

export default Header
