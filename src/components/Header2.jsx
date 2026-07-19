import React, { useState , useEffect, useRef} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpeg";
// import { useSelector } from "react-redux";
import { auth } from "../firebaseConfig"; // Import your firebase auth instance
import { onAuthStateChanged } from "firebase/auth"; // Import listener

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const containerRef = useRef(null);
const [user, setUser] = useState(null);
  // Sync with Firebase Auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside the containerRef
      if (menuOpen && containerRef.current && !containerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);



  // Determine navigation based on auth state
  const loginPath = user ? "/dashboard" : "/login";
  const loginLabel = user ? "Dashboard" : "Login";
  

  return (
    <Container ref={containerRef}>
      <Wrapper>
        <LogoSection to="/" onClick={closeMenu}>
          <Logo src={logo} alt="Logo" />
          <LogoText>EchoByte Courses</LogoText>
        </LogoSection>

        <DesktopNav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allproducts">All Courses</NavLink>
          <NavLink to="/contactus">Contact Us</NavLink>
          <LoginButton to={loginPath}>{loginLabel}</LoginButton>
        </DesktopNav>

        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>
      </Wrapper>

      <MobileMenu open={menuOpen}>
        <MobileLink to="/" onClick={closeMenu}>
          Home
        </MobileLink>

        <MobileLink to="/allproducts" onClick={closeMenu}>
          All Courses
        </MobileLink>

        <MobileLink to="/contactus" onClick={closeMenu}>
          Contact Us
        </MobileLink>

        <MobileLogin to={loginPath} onClick={closeMenu}>
          {loginLabel}
        </MobileLogin>
      </MobileMenu>
    </Container>
  );
};

export default Header2;

/* =================== STYLES ==================== */

const Container = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;

  background: #111827;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);
`;

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 25px;
  height: 75px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const LogoText = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 35px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 15px;
  transition: 0.3s;

  &:hover {
    color: #22c55e;
  }
`;

const LoginButton = styled(Link)`
  text-decoration: none;

  background: #22c55e;
  color: white;

  padding: 10px 22px;

  border-radius: 6px;
  font-weight: 600;

  transition: 0.3s;

  &:hover {
    background: #16a34a;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  span {
    display: block;
    width: 28px;
    height: 3px;
    background: white;
    margin: 5px 0;
    border-radius: 2px;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  overflow: hidden;

  max-height: ${({ open }) => (open ? "300px" : "0")};

  transition: max-height 0.35s ease;

  background: #111827;

  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileLink = styled(Link)`
  color: white;
  text-decoration: none;

  padding: 18px 25px;

  border-top: 1px solid rgba(255, 255, 255, 0.06);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #22c55e;
  }
`;

const MobileLogin = styled(Link)`
  margin: 20px;
  text-decoration: none;

  background: #22c55e;
  color: white;

  padding: 14px;
  text-align: center;

  border-radius: 6px;

  font-weight: bold;

  &:hover {
    background: #16a34a;
  }
`;