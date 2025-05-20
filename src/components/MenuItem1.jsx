import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Context } from "./Context";

// Slide down animation
const slideDown = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Slide up animation
const slideUp = keyframes`
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  


  @media(max-width:768px){
    top:25px;

    span{
        display:none;
    }
  }

  
`;

const MenuButton = styled.div`
//   background: #ff5722;
  background:#3498db;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 5px 20px;
  border-radius: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;
  transition: 0.3s;

  @media(max-width:768px){
    // padding:6px 10px;
  }
  
  &:hover {
    background: #3498db;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  // background:rgba(255,255,255,0.5);
  background: white;
  width: 200px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  animation: ${({ isOpen }) => (isOpen ? slideDown : slideUp)} 0.4s ease-out;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const MenuItem = styled.li`
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: #333;
  
  &:hover {
    background: lightgray;
  }
`;

// Icons
// const menuItems = [
//   { name: "🏠 Home", link: "/" },
//   { name: "ℹ️ About Us", link: "/aboutus" },
//   { name: "🖼️ Gallery", link: "/gallery" },
//   { name: "💖 Donate", link: "/donate" },
//     { name: "📚 Blogs", link: "/blogs" },
   
//   { name: "📞 Contact us", link: "/contactus" },
// ];

const MenuItem1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {categories}=useContext(Context);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (!e.target.closest("#menu-container")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);



  const menuItems = [
  { name: "🏠 Home", link: "/" },
  { name: "ℹ️ About Us", link: "/aboutus" },
  { name: "📞 Contact us", link: "/contactus" },
];

  return (
    <MenuContainer id="menu-container">
      <MenuButton onClick={toggleMenu} onMouseEnter={()=>setIsOpen(true)}>📜 <span>View</span> Menu</MenuButton>
      <Dropdown isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => {setIsOpen(false);navigate(`${item.link}`)}} >
            {item.name}
          </MenuItem>
        ))}
        <h4 style={{textAlign:"center", textDecoration:"underline", color:"#000050", fontSize:"0.9rem"}}>PRODUCT CATEGORIES</h4>
        {categories.map((item, index) => (
          <MenuItem key={index} onClick={() => {setIsOpen(false);navigate(`/category/${item.id}`)}} >
            {item.name}
          </MenuItem>
        ))}
      </Dropdown>
    </MenuContainer>
  );
};

export default MenuItem1;

