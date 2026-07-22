


import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import PaystackPop from "@paystack/inline-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


import { useDispatch } from "react-redux";
import { setPaymentSession, clearPaymentSession } from "../Features/Slice";
import { Context } from "./Context";

import { query, collection, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebaseConfig";

// ------------------- STYLES -------------------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
  width:100%;
`;

const ModalWrapper = styled.div`
  background: #1f2937;
  color: #f9fafb;
  padding: 2.5rem;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 540px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid #374151;
  // height:90%;
  overflow-y:scroll;

  @media (max-width: 768px) {
  max-width: 300px;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #facc15;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #111827;
  color: #f9fafb;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #facc15;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.4);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PasswordContainer = styled.div`
  position: relative; 

  button {
    position: absolute;
    right: 1rem;
    top: 40%;
    transform: translateY(-50%);
    cursor: pointer;
    background: none; 
    border: none;
    color: #f9fafb;

  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background-color: #22c55e;
  color: white;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #16a34a;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  margin-top: 0.75rem;
  background: transparent;
  color: #9ca3af;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;

  &:hover {
    color: #f87171;
  }
`;

const PayPalButtonContainer = styled.div`
  margin-top: 1rem;
  z-index: 1001;
`;

// ------------------- COMPONENT -------------------
const PaymentModal = ({
  onClose,
  amount,
  productName,
  productId,
  productUrl,
  currency,
}) => {
  // const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const {startPaymentPolling1, saveTransaction}= useContext(Context)
 const [openPayPal, setOpenPayPal] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [formStep, setFormStep] = useState("initial"); // 'initial', 'new_user', 'existing_user'


 const [email, setEmail] = useState(() => {
    const saved = localStorage.getItem("userEmail");
    return saved ? JSON.parse(saved) : "";
  });

   // ✅ Always save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("userEmail", JSON.stringify(email));
  }, [email]);

  const PAYPAL_CLIENT_ID =
    "AY3JP-UI68WChZpC_0f7oTadUrItrOcSwqL2E4GVFJHfo-4QPabv308FQRUTfmDS4jfNFYi9AbLZh9iV";

  // ------------------- PAYSTACK -------------------
  const payWithPaystack = () => {
  

    dispatch(setPaymentSession("payment"));
    Swal.fire({ text: "Please wait...", allowOutsideClick: false });
    Swal.showLoading();

    const paystack = new PaystackPop();
    const [firstName, lastName] = name.split(" ");

     // ✅ Prepare and store the customer details & pre-transaction info
  const customerDetails = {
    name,
    email,
    phone,
    password,
    paymentMethod: "Paystack",
  };

  // ✅ Create a placeholder transaction object (since we don’t have reference yet)
  const initialTransaction = {
    status: "initialized",
    amount,
    email,
    reference: null,
    createdAt: new Date().toISOString(),
    metadata: { custom_payment_type: "payment1" },

    
  };

  // ✅ Save both to localStorage immediately before Paystack popup opens
  localStorage.setItem(
    "pendingTransaction",
    JSON.stringify({ transaction: initialTransaction, customerDetails })
  );

    localStorage.setItem("pendingAmount", JSON.stringify(amount));
  localStorage.setItem("pendingProductName", JSON.stringify(productName));
  localStorage.setItem("pendingProductId", JSON.stringify(productId));
  localStorage.setItem("pendingProductUrl", JSON.stringify(productUrl));
  localStorage.setItem("pendingCurrency", JSON.stringify(currency));

 // Generate a unique verification number
const verificationNumber = `${Date.now()}E${Math.floor(Math.random() * 1000000000)}`;
// Save it to localStorage
localStorage.setItem("verificationNumber", JSON.stringify(verificationNumber));

    paystack.newTransaction({
      key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170",
      // key:"pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
      amount: amount * 100,
      email,
      firstname: firstName || name,
      lastname: lastName || "",
       metadata: {
          custom_payment_type: verificationNumber,
        },
      onSuccess: (transaction) => {
        Swal.fire({ text: "Payment processing..., Please wait" , showConfirmButton:false});
        Swal.showLoading();

        startPaymentPolling1(verificationNumber);

  
      },
      onCancel: () => {
        Swal.fire({ icon: "error", text: "Payment cancelled." });
         dispatch(clearPaymentSession());
      },
      onError: (error) => {
        Swal.fire({ icon: "error", text: `Payment failed: ${error.message}` });
      },
    });
  };







  // ------------------- PAYPAL -------------------
  const createPayPalOrder = (data, actions) => {
    if (email !== confirmEmail) {
      Swal.fire({ text: "Emails do not match!" });
      return actions.reject();
    }

        localStorage.setItem("pendingAmount", JSON.stringify(amount));
  localStorage.setItem("pendingProductName", JSON.stringify(productName));
  localStorage.setItem("pendingProductId", JSON.stringify(productId));
  localStorage.setItem("pendingProductUrl", JSON.stringify(productUrl));
  localStorage.setItem("pendingCurrency", JSON.stringify(currency));

    return actions.order.create({
      purchase_units: [
        {
          description: productName,
          amount: { currency_code: currency, value: amount },
        },
      ],
    });
  };

  const onApprovePayPal = async (data, actions) => {
    Swal.fire({ text: "Processing payment...", allowOutsideClick: false });
    Swal.showLoading();

    try {
      const order = await actions.order.capture();

      const paypalTransaction = {
        reference: order.id,
        status: order.status,
        amount: amount,
        currency: currency,
        customer: {
          email_address: email,
          name: name,
          phone_number: phone,
        },
        paypalDetails: order,
      };

      await saveTransaction(paypalTransaction, {
        name,
        email,
        password,
        phone,
        paymentMethod: "PayPal",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `PayPal payment failed: ${error.message}`,
      });
    }
  };

  const onErrorPayPal = (err) => {
    Swal.fire({
      icon: "error",
      text: `PayPal error: ${err.message || "An unknown error occurred."}`,
    });
  };

  const onCancelPayPal = () => {
    Swal.fire({ icon: "info", text: "PayPal payment cancelled." });
  };








  // ------------------- RENDER -------------------
  const handlePaymentFormSubmit = (e) => {
    e.preventDefault();
      if (email !== confirmEmail) {
      Swal.fire({ text: "Emails do not match!" });
      return;
    }
     if (password !== confirmPassword) {
      Swal.fire({ text: "Passwords do not match!" });
      return;
    }
  
 const alphanumericRegex = /^[a-zA-Z0-9]+$/;

if (password.length < 6) {
  Swal.fire({ text: "Password must be at least 6 characters long!" });
  return;
}

if (!alphanumericRegex.test(password)) {
  Swal.fire({ text: "Password can only contain letters and numbers (no special characters)!" });
  return;
}

    if (currency === "NGN") {payWithPaystack();}
    else {
      setOpenPayPal(true);
    }
  };




const checkUserExists = async () => {
  if (email !== confirmEmail) {
    Swal.fire({ text: "Emails do not match!" });
    return;
  }
  
  Swal.fire({ text: "Checking account...", allowOutsideClick: false });
  Swal.showLoading();

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setFormStep("new_user"); // Show full registration form
      Swal.fire({ icon: "success", text: "A new account will be created for you." });
    } else {
      setFormStep("existing_user"); // Show login/password form
      Swal.fire({ icon: "success", text: "An account with this email exists. Please log in." });
    }
    // Swal.close();
  } catch (err) {
    Swal.fire({ icon: "error", text: "Error checking user." });
  }
};

// const handleLoginExistingUser = async () => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     Swal.fire({ icon: "success", text: "Login successful!" });
//     // After success, trigger the payment
//     handlePaymentFormSubmit();
//   } catch (err) {
//     Swal.fire({ icon: "error", text: "Incorrect password." });
//   }
// };

// 1. Create a function specifically for starting the payment
const triggerPayment = () => {
  if (currency === "NGN") {
    payWithPaystack();
  } else {
    setOpenPayPal(true);
  }
};


// 2. Update your Login function
const handleLoginExistingUser = async () => {
  Swal.fire({ text: "Logging in...", allowOutsideClick: false });
  Swal.showLoading();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Swal.fire({ icon: "success", text: "Login successful!" });
    
    // Call the payment trigger, NOT the form handler
    triggerPayment(); 
  } catch (err) {
    console.error(err);
    Swal.fire({ icon: "error", text: "Login failed: " + err.message });
  }
};





  return (
    <Overlay>
      <ModalWrapper>
        <Title>Proceed with Payment</Title>
       {!openPayPal && 
         <FormGroup>
            {/* <form onSubmit={handlePaymentFormSubmit}>
           
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />


               <Input
                type="text"
                placeholder="Full Name"
                value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

          <PasswordContainer>
  <Input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your prefered password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button type="button" onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? "Hide" : "Show"}
  </button>
</PasswordContainer>

<PasswordContainer>
  <Input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Enter your password again to confirm"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
    {showConfirmPassword ? "Hide" : "Show"}
  </button>
</PasswordContainer>
<Button type="button">Proceed</Button>
            <Button type="submit">Pay {currency} {amount}</Button>

          </form> */}

          <form onSubmit={handlePaymentFormSubmit}>
  {/* Step 1: Email Only */}
  {formStep === "initial" && (
    <>
      <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
      <Button type="button" onClick={checkUserExists}>Proceed</Button>
    </>
  )}

  {/* Step 2: Full Registration (New User) */}
  {formStep === "new_user" && (
    <>
      <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <PasswordContainer>
        <Input type={showPassword ? "text" : "password"} placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
      </PasswordContainer>
      <PasswordContainer>
  <Input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Enter your password again to confirm"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
    {showConfirmPassword ? "Hide" : "Show"}
  </button>
</PasswordContainer>
      <Button type="submit">Pay {currency} {amount}</Button>
    </>
  )}

  {/* Step 3: Login (Existing User) */}
  {formStep === "existing_user" && (
    <>
      <p style={{textAlign: 'center', marginBottom: '10px'}}>Welcome back! Enter your password to continue.</p>
      <PasswordContainer>
        <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
      </PasswordContainer>
      <Button type="button" onClick={handleLoginExistingUser}>Login and Pay</Button>
    </>
  )}
</form>
        </FormGroup>}
   {openPayPal && (
              <PayPalButtonContainer>
                <PayPalScriptProvider
                  options={{ clientId: PAYPAL_CLIENT_ID, currency: currency }}
                >
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "gold",
                      shape: "rect",
                      label: "paypal",
                    }}
                    createOrder={createPayPalOrder}
                    onApprove={onApprovePayPal}
                    onError={onErrorPayPal}
                    onCancel={onCancelPayPal}
                  />
                </PayPalScriptProvider>
              </PayPalButtonContainer>)}
       
        

        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </ModalWrapper>
    </Overlay>
  );
};

export default PaymentModal;




            //  {currency === "NGN"? (
            //   <Button type="submit">Pay NGN {amount}</Button>
            // ) : (
            //   <PayPalButtonContainer>
            //     <PayPalScriptProvider
            //       options={{ clientId: PAYPAL_CLIENT_ID, currency: currency }}
            //     >
            //       <PayPalButtons
            //         style={{
            //           layout: "vertical",
            //           color: "gold",
            //           shape: "rect",
            //           label: "paypal",
            //         }}
            //         createOrder={createPayPalOrder}
            //         onApprove={onApprovePayPal}
            //         onError={onErrorPayPal}
            //         onCancel={onCancelPayPal}
            //       />
            //     </PayPalScriptProvider>
            //   </PayPalButtonContainer>
            // )} 