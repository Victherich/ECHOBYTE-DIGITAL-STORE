// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';
// import { adminLogin } from '../Features/Slice';
// import { UseDispatch, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: white;
//   color:#000050;
// `;

// const Form = styled.form`
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 400px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 10px 0;
//   border-radius: 5px;
//   border: 1px solid #ddd;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: #000050;
//   color: white;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   border: none;
  
//   &:hover {
//     background-color: gray;
//   }
// `;

// const Label = styled.label`
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 5px;
  
// `;

// const Title = styled.h2`
//   text-align: center;
  
// `;

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'email') setEmail(value);
//     if (name === 'password') setPassword(value);
//   };

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing fields',
//         text: 'Email and password are required.',
//       });
//       return;
//     }

//     // Show loading
//     Swal.fire({
//       title: 'Loading...',
//       text: 'Please wait while we log you in...',
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const response = await axios.post('https://elitewealthglobal.com/api/admin_login.php', { email, password });

//       if (response.data.success) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Login Successful',
//           text: response.data.message,
//         });
//         console.log(response.data)
        
//         const adminInfo = response.data.user;
//         const adminToken = response.data.token;

//         // Dispatch login action with a single object containing both adminInfo and adminToken
//         dispatch(adminLogin({ adminInfo, adminToken }));

//         navigate('/admin');

//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Login Failed',
//           text: response.data.error,
//         });
//       }
//     } catch (error) {

//       console.error(error)
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'There was an error connecting to the server.',
//       });
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleLogin}>
//         <Title>Admin Login</Title>
        
//         <div>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             required
//           />
//         </div>
        
//         <div>
//           <Label>Password</Label>
//           <Input
//             type="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             required
//           />
//         </div>
       
        
//         <Button type="submit">Login</Button>
//         {/* <p 
//         style={{marginTop:"10px", cursor:"pointer"}}
//         onClick={()=>navigate('/adminsignup')}>Don't have an account? Sign Up</p> */}
//         <p 
//         style={{marginTop:"10px", cursor:"pointer"}}
//         onClick={()=>navigate('/adminforgotpassword')}>Forgot Password</p>
//       </Form>
//     </Container>
//   );
// };

// export default AdminLogin;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #111827;
`;

const FormWrapper = styled.div`
  background: linear-gradient(to bottom right, #1f2937, #374151);
  border: 1px solid #4b5563;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  color: #facc15;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #d1d5db;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #111827;
  color: white;
  border: 2px solid #4b5563;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: #facc15;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #facc15;
  color: #000;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fde047;
  }
`;

const RegisterText = styled.p`
  color: #d1d5db;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    text-decoration: underline;
    color: #facc15;
  }
`;

const AdminLogin = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Please wait...",
      text: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { email, password } = form;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success ✅", "Logged in successfully", "success");
      navigate("/admindashboard");
    } catch (error) {
      Swal.fire("Login Failed ❌", error.message, "error");
    }
  };


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setAuthenticated(!!user); // true if user is logged in
        setLoading(false);
      });
  
      return () => unsubscribe(); // Cleanup listener on unmount
    }, []);


    if(authenticated){
      navigate('/admindashboard');
      return;
    }





  return (
    <Container>
      <FormWrapper>
        <Title>Admin Login</Title>
        <form onSubmit={handleLogin}>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <RegisterText onClick={() => navigate("/adminsignup")}>
          Don't have an account? Register
        </RegisterText>
      </FormWrapper>
    </Container>
  );
};

export default AdminLogin;
