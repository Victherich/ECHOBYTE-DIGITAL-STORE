

import React, { useState, useEffect, useContext } from 'react';
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
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // adjust path as needed
import { Context } from './Context.jsx';
import UserTransactions from './UserTransactions.jsx';
import FirstLoginPasswordModal from './FirstLoginPasswordModal.jsx';
import AllUsersPage from './AllUsersPage.jsx';
import AllTransactionsPage from './AllTransactionsPage.jsx';

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
   padding-top:50px;

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
  top: 80px;
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
    const {user, role} = useContext(Context);
      const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);


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
            navigate('/login');
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
        return   <AdminProfile
         onNavigateCourses={() => handleMenuClick('transactions')}
         onNavigateReferral={() => handleMenuClick('referral')}
         onLogout={handleLogout}
       />;
         case 'postaproduct':
        return <PostAProduct/>;
         case 'manageproducts':
        return <AllProducts2/>;
      case 'adminsignup':
        return <AdminSignup />;
         case 'transactions':
        return <UserTransactions />;
          case 'allusers':
        return <AllUsersPage />;
          case 'alltransactions':
        return <AllTransactionsPage />;
      default:
        return <h1 style={{ color: '#facc15' }}>Dashboard Home</h1>;
    }
  };


  
 

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);

        // 👇 Show modal only if firstLogin is true
        if (data.firstLogin) {
          setShowModal(true);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <DashboardContainer>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      <Sidebar isOpen={menuOpen}>
        <SidebarHeader>Dashboard</SidebarHeader>
        <SidebarMenu>
        <SidebarMenuItem
  active={activeMenu === 'profile'}
  onClick={() => handleMenuClick('profile')}
>
  Hi, {user?.displayName?.split(' ')[0] || ''}
</SidebarMenuItem>

        {role==='admin'?<SidebarMenuItem
            active={activeMenu === 'postaproduct'}
            onClick={() => handleMenuClick('postaproduct')}
          >
            Post A Product
          </SidebarMenuItem>:''}
          {role==='admin'?<SidebarMenuItem
            active={activeMenu === 'manageproducts'}
            onClick={() => handleMenuClick('manageproducts')}
          >
            Manage Products
          </SidebarMenuItem>:""}
          {role==='admin'?<SidebarMenuItem
            active={activeMenu === 'adminsignup'}
            onClick={() => handleMenuClick('adminsignup')}
          >
            Register Admin
          </SidebarMenuItem>:''}

  <SidebarMenuItem
            active={activeMenu === 'transactions'}
            onClick={() => handleMenuClick('transactions')}
          >
          My Courses
          </SidebarMenuItem>

             {role==='admin'?<SidebarMenuItem
            active={activeMenu === 'allusers'}
            onClick={() => handleMenuClick('allusers')}
          >
            All Users
          </SidebarMenuItem>:''}

           {role==='admin'?<SidebarMenuItem
            active={activeMenu === 'alltransactions'}
            onClick={() => handleMenuClick('alltransactions')}
          >
            All Transactions
          </SidebarMenuItem>:''}


          <SidebarMenuItem onClick={handleLogout}>Logout</SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>

       {/* Modal that blocks everything */}
      {showModal && (
        <FirstLoginPasswordModal
          userId={userData?.uid}
          onClose={() => setShowModal(false)}
        />
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
