
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProductDetail from './components/ProductDetail';
import PrivateAdminDashboard from './components/PrivateAdminDashboard';
import AdminDashboard from './components/AdminDashborad';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignUp';
import AdminForgotPassword from './components/AdminForgotPassword';
import AdminResetPassword from './components/AdminResetPassword';
import ScrollToTop from './components/ScrollToTop';
import Menu from './components/Menu';
import CompanyCertificate from './components/CompanyCertificate';
import CategoryPage from './components/CategoryPage';
import AllProductsPage from './components/AllProductsPage';
import MenuItem2 from './components/MenuItem2';
import UpdateProductKeys from './components/UpdateProductKeys';
import DeleteProductKey from './components/DeleteProductKey';
import CurrencyToggle from './components/CurrencyToggle';

function App() {
  return (
   <BrowserRouter>
   <ScrollToTop/>
   <Menu/>
   <MenuItem2/>
   <CurrencyToggle/>
   {/* <DeleteProductKey/> */}
   {/* <UpdateProductKeys/> */}
   <Header/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/productdetail/:id' element={<ProductDetail/>}/>
        <Route path='/admindashboard' element={<PrivateAdminDashboard/>}>
          <Route path='' element={<AdminDashboard/>}/>
        </Route>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/adminsignup' element={<AdminSignup/>}/>
        <Route path='/adminforgotpassword' element={<AdminForgotPassword/>}/>
        <Route path='/adminresetpassword' element={<AdminResetPassword/>}/>
        <Route path='/category/:id' element={<CategoryPage/>}/>
        <Route path='/allproducts' element={<AllProductsPage/>}/>

      </Routes>
      {/* <CompanyCertificate/> */}
      <Footer/>
   </BrowserRouter>
  );
}

export default App;
