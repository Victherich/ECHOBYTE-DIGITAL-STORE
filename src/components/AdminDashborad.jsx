


// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
//  import { signOut } from "firebase/auth";
// import { auth } from "../firebaseConfig"; // adjust the path to your config
// import { useNavigate } from "react-router-dom";

// import Swal from 'sweetalert2';
// // import { adminLogout } from '../Features/Slice';
// // import AdminDetailsPage from './AdminProfile';

// import AdminSignup from './AdminSignUp.jsx';


// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   overflow: hidden;
// `;

// const Sidebar = styled.div`
//   background:#F4F4F4;
//   color: white;
//   width: ${(props) => (props.isOpen ? '250px' : '0')};
//   overflow: hidden;
//   transition: width 0.3s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   height: 100%;
//   min-height:100vh;
//   z-index: 7;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

//   @media (min-width: 768px) {
//     width: 250px;
//     position: static;
//     transition: none;

//   }

//   @media(max-width:320px){
//     overflow-y:scroll;
//      overflow:scroll;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 20px;
//   font-size: 1.5rem;
//   text-align: center;
//   font-weight: bold;
//   color:#000050;

// `;

// const SidebarMenu = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const SidebarMenuItem = styled.li`
//   padding: 15px 20px;
//   cursor: pointer;
//   background: ${(props) => (props.active ? 'gray;' : 'transparent')};
//   color: ${(props)=>(props.active ? 'white':"#000050")};


//   font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
//   transition: all 0.3s ease-in-out;

//   &:hover {

//     background:gray;
//   }
// `;

// const ContentArea = styled.div`
//   flex-grow: 1;
//   margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
//   transition: margin-left 0.3s ease-in-out;
//   padding: 20px;
//   width:100%;

//   @media (min-width: 768px) {
//     // margin-left: 250px;
//   }

//   @media (max-width:428px){
//     padding:0px;
//   }
// `;

// const Hamburger = styled.div`
//   position: fixed;
//   top: 70px;
//   left: 20px;

//   background:#000050;
//   color: white;
//   padding: 10px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 1100;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const Overlay = styled.div`
//   display: ${(props) => (props.isOpen ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 6;
// `;

// // Content Components
// const HomeContent = () => <h1 style={{color:"purple"}}>Home Content</h1>;
// const ProfileContent = () => <h1>Profile Content</h1>;
// const SettingsContent = () => <h1>Settings Content</h1>;
// const HelpContent = () => <h1>Help Content</h1>;

// // Main Component
// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('profile');
//   const adminInfo = useSelector(state=>state.adminInfo);
//   const navigate = useNavigate();
  
//   console.log(adminInfo)

//   const dispatch = useDispatch();




// const handleLogout = () => {
//    // Call this inside a component

//   Swal.fire({
//     title: "Are you sure you want to log out?",
//     text: "You will need to log in again to access your account.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, log me out",
//     cancelButtonText: "Cancel",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       signOut(auth)
//         .then(() => {
//           Swal.fire({
//             title: "Logged Out",
//             text: "You have been logged out successfully.",
//             icon: "success",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           navigate("/adminlogin"); // Redirect to login
//         })
//         .catch((error) => {
//           Swal.fire("Error", error.message, "error");
//         });
//     }
//   });
// };



//   const handleMenuClick = (menu) => {
//     window.scroll(0,0);
//     setActiveMenu(menu);
//     setMenuOpen(false); // Close menu on mobile when a menu item is clicked
//   };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   const closeMenuOnOutsideClick = () => setMenuOpen(false);

//   // Map menu options to content
//   const renderContent = () => {
//     switch (activeMenu) {
//       // case 'profile':
//       //   return <AdminDetailsPage adminId={adminInfo.id}/>;
        

//         case 'adminsignup':
//         return <AdminSignup/>;
   
//       default:
//         return <h1 style={{color:"green",textAlign:"center",width:"100%"}}>Welcome to your Dashboard</h1>;
//     }
//   };

//   return (
//     <DashboardContainer>
//       <Hamburger onClick={toggleMenu}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </Hamburger>
//       <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
//       <Sidebar isOpen={menuOpen}>
//         <SidebarHeader>Admin Dashboard</SidebarHeader>
//         <SidebarMenu>
       
//           <SidebarMenuItem
//             active={activeMenu === 'profile'}
//             onClick={() => handleMenuClick('profile')}
//           >
//            {/* <FaUserCircle/> Hi, {adminInfo.name.slice(0,6)} */}
//           </SidebarMenuItem>

//          <SidebarMenuItem
//             active={activeMenu === 'allusers'}
//             onClick={() => handleMenuClick('allusers')}
//           >
//             All Users
//           </SidebarMenuItem>

//           <SidebarMenuItem
//             active={activeMenu === 'pendingdeposits'}
//             onClick={() => handleMenuClick('pendingdeposits')}
//           >
//             Pending Deposits
//           </SidebarMenuItem>
 
//           <SidebarMenuItem
//             active={activeMenu === 'pendingwithdrawals'}
//             onClick={() => handleMenuClick('pendingwithdrawals')}
//           >
//             Pending Withdrawals
//           </SidebarMenuItem>
   

//           <SidebarMenuItem
//             active={activeMenu === 'pendinginvestments'}
//             onClick={() => handleMenuClick('pendinginvestments')}
//           >
//             Pending Investments
//           </SidebarMenuItem>
 
  

//           <SidebarMenuItem
//             active={activeMenu === 'adminsignup'}
//             onClick={() => handleMenuClick('adminsignup')}
//           >
//             Register Admin
//           </SidebarMenuItem>


          
//           <SidebarMenuItem
//             onClick={handleLogout}
//           >
//             Logout
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </Sidebar>
//       <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
//     </DashboardContainer>
//   );
// };

// export default AdminDashboard;


import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminSignup from './AdminSignUp.jsx';
import PostAProduct from './PostAProduct.jsx';
import AdminProfile from './AdminProfile.jsx';
import AllProducts2 from './ManageProducts.jsx';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #111827;
  color: white;
  overflow: hidden;
`;

const Sidebar = styled.div`
  background: #1f2937;
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  z-index: 7;
  border-right: 1px solid #374151;

  @media (min-width: 768px) {
    width: 250px;
    position: static;
    transition: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  color: #facc15;
  border-bottom: 1px solid #374151;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SidebarMenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#374151' : 'transparent')};
  color: ${(props) => (props.active ? '#facc15' : '#d1d5db')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #4b5563;
    color: #facc15;
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease-in-out;
  padding: 2rem;
  width: 100%;

  @media(max-width:428px){
    padding:5px;
  }
`;

const Hamburger = styled.div`
  position: fixed;
  top: 50px;
  left: 5px;
  background: #facc15;
  color: #111827;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 6;
`;

// Main Component
const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: 'You will need to log in again to access your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#facc15',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: 'Logged Out',
              text: 'You have been logged out successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate('/adminlogin');
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error');
          });
      }
    });
  };

  const handleMenuClick = (menu) => {
    window.scrollTo(0, 0);
    setActiveMenu(menu);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return <AdminProfile/>;
         case 'postaproduct':
        return <PostAProduct/>;
         case 'manageproducts':
        return <AllProducts2/>;
      case 'adminsignup':
        return <AdminSignup />;
      default:
        return <h1 style={{ color: '#facc15' }}>Dashboard Home</h1>;
    }
  };

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Admin Dashboard</SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            active={activeMenu === 'profile'}
            onClick={() => handleMenuClick('profile')}
          >
            Hi, Admin
          </SidebarMenuItem>
           <SidebarMenuItem
            active={activeMenu === 'postaproduct'}
            onClick={() => handleMenuClick('postaproduct')}
          >
            Post A Product
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeMenu === 'manageproducts'}
            onClick={() => handleMenuClick('manageproducts')}
          >
            Manage Products
          </SidebarMenuItem>
          <SidebarMenuItem
            active={activeMenu === 'adminsignup'}
            onClick={() => handleMenuClick('adminsignup')}
          >
            Register Admin
          </SidebarMenuItem>
          <SidebarMenuItem onClick={handleLogout}>Logout</SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
    </DashboardContainer>
  );
};

export default AdminDashboard;
