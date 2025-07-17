

//   // const verifyTransaction = async (reference) => {
//   //   Swal.fire({ title: 'Confirming payment', text: 'Please wait...', showConfirmButton: false });
//   //   Swal.showLoading();

//   //   try {
//   //     const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
//   //       headers: {
//   //         Authorization: `Bearer sk_live_a4b90817cbddf701c55ab1936d43ef666a6dc220`,
//   //       },
//   //     });

//   //     if (response.data.status === true) {
//   //       Swal.fire({ icon: 'success', text: 'Payment successful!', timer: 2000 });
//   //       handleOrderNow2(reference);
//   //     } else {
//   //       Swal.fire({ icon: 'error', text: response.data.message });
//   //     }
//   //   } catch (error) {
//   //     Swal.fire({
//   //       icon: 'error',
//   //       text: error.response?.data?.message || 'Error verifying payment!',
//   //     });
//   //   }
//   // };

//   // const handleOrderNow2 = async (reference) => {
//   //   try {
//   //     const response = await fetch('/api/paymentconfirmation', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ name, email, productName, amount, reference }),
//   //     });

//   //     const data = await response.json();
//   //     if (!response.ok) throw new Error(data.message);

//   //     Swal.fire({ icon: 'success', text: `Order confirmed! Reference: ${reference}` });
//   //     onClose();
//   //   } catch (error) {
//   //     Swal.fire({ icon: 'error', text: `Failed to process order: ${error.message}` });
//   //   }
//   // };

  
// //   const saveTransaction = async (transaction, customerDetails) => {
// //   try {
// //     await addDoc(collection(db, 'transactions'), {
// //       productName,
// //       productId: productId, // use your actual product ID if you have one
// //       productUrl:productUrl,
// //       amount: amount,
// //       transactionReference: transaction.reference,
// //       paidAt: Timestamp.now(),
// //       customerName: customerDetails.name,
// //       customerEmail: customerDetails.email,
// //       customerPhone: customerDetails.phone,
// //       amountPaid: amount,
// //       sellerEmail: 'echobyteconcept@gmail.com',
// //     });

// //     console.log('Transaction saved successfully');

// //   } catch (error) {
// //     console.error('Error saving transaction:', error);
// //     Swal.fire({ icon: 'error', text: 'Failed to save transaction to database.' });
// //   }
// // };








// import React, { useState } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';
// import PaystackPop from '@paystack/inline-js';
// import axios from 'axios';
// import { db } from '../firebaseConfig';
// import { collection, addDoc, Timestamp } from 'firebase/firestore';





// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background-color: rgba(0, 0, 0, 0.85);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalWrapper = styled.div`
//   background: #1f2937;
//   color: #f9fafb;
//   padding: 2.5rem;
//   border-radius: 1.25rem;
//   width: 100%;
//   max-width: 540px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
//   border: 1px solid #374151;
// `;

// const Title = styled.h2`
//   font-size: 1.75rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 1.5rem;
//   color: #facc15;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const Input = styled.input`
//   padding: 0.85rem 1rem;
//   border-radius: 0.5rem;
//   border: 1px solid #374151;
//   background: #111827;
//   color: #f9fafb;
//   font-size: 1rem;
//   width:100%;
//   margin-bottom:10px;

//   &:focus {
//     outline: none;
//     border-color: #facc15;
//     box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.4);
//   }

//   &::placeholder {
//     color: #9ca3af;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 0.85rem;
//   background-color: #22c55e;
//   color: white;
//   border-radius: 0.5rem;
//   font-size: 1rem;
//   font-weight: 600;
//   border: none;
//   margin-top: 1rem;
//   cursor: pointer;
//   transition: background 0.3s;

//   &:hover {
//     background-color: #16a34a;
//   }
// `;

// const CancelButton = styled.button`
//   width: 100%;
//   margin-top: 0.75rem;
//   background: transparent;
//   color: #9ca3af;
//   text-align: center;
//   font-weight: 500;
//   font-size: 0.95rem;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     color: #f87171;
//   }
// `;


// const PaymentModal = ({ onClose, amount, productName, productId, productUrl, currency}) => {
//   const [email, setEmail] = useState('');
//   const [confirmEmail, setConfirmEmail] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');

//   const payWithPaystack = () => {
  
//     if (email !== confirmEmail) {
//       Swal.fire({ text: 'Emails do not match!' });
//       return;
//     }

//     Swal.fire({ text: 'Please wait...', allowOutsideClick: false });
//     Swal.showLoading();

//     const paystack = new PaystackPop();
//     const [firstName, lastName] = name.split(' ');

//     paystack.newTransaction({
//       // key: 'pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170',
//        key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
//       amount: amount * 100,
//       email,
//       firstname: firstName || name,
//       lastname: lastName || '',
//       onSuccess: (transaction) => {
//         // verifyTransaction(transaction.reference);
//         Swal.fire({text:"Payment successful"});

//          saveTransaction(transaction, {
//     name,
//     email,
//     phone,
//   });

//         onClose();

//       },
//       onCancel: () => {
//         Swal.fire({ icon: 'error', text: 'Payment cancelled.' });
//       },
//       onError: (error) => {
//         Swal.fire({ icon: 'error', text: `Payment failed: ${error.message}` });
//       },
//     });
//   };





// const saveTransaction = async (transaction, customerDetails) => {
//   const transactionDetails = {
//     productName,
//     productId,
//     productUrl,
//     amount,
//     transactionReference: transaction.reference,
//     paidAt: new Date().toISOString(),
//     customerName: customerDetails.name,
//     customerEmail: customerDetails.email,
//     customerPhone: customerDetails.phone,
//     amountPaid: amount,
//     currency:currency,
//     sellerEmail: 'echobyteconcept@gmail.com', // Replace with dynamic seller email if needed
//   };

//   try {
//     await addDoc(collection(db, 'transactions'), transactionDetails);
//     console.log('Transaction saved successfully');
//  Swal.fire({
//       icon: 'success',
//       text: 'Purchase successful! Details and access to the product have been sent to your email. Thanks for your patronage.',
//     });
//     await sendTransactionEmails(transactionDetails);
//   } catch (error) {
//     console.error('Error saving transaction:', error);
//     Swal.fire({ icon: 'error', text: 'Failed to save transaction or send emails.' });
//   }
// };




// // sending email after saing trsansaction
// const sendTransactionEmails = async (transactionDetails) => {
//   try {
//     const response = await fetch('https://echobyteconcept.vercel.app/api/order', {
//       // const response = await fetch('http://localhost:3000/api/order', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(transactionDetails),
//     });

//     const result = await response.json();
//     if (!response.ok) throw new Error(result.message);

//     console.log('Emails sent successfully');
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     Swal.fire({ icon: 'error', text: 'Transaction saved, but failed to send email notifications.' });
//   }
// };



// const payWithPaypal =()=>{
// // run flutter ewafe functiuonalitt or any dollr payment
// alert('usd payment')
// }


// const handlePayment = (e)=>{
//   e.preventDefault();

//   if(currency==='NGN'){
//     payWithPaystack(e);
//   }else{
//     payWithPaypal();
//   }
// }
  
  
//   return (
//     <Overlay>
//       <ModalWrapper>
//         <Title>Complete Payment</Title>
//         <FormGroup>
//           <form onSubmit={handlePayment}>
//           <Input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <Input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <Input
//             type="email"
//             placeholder="Confirm Email"
//             value={confirmEmail}
//             onChange={(e) => setConfirmEmail(e.target.value)}
//             required
//           />
//           <Input
//             type="tel"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <Button type='submit'>Pay {currency} {amount}</Button>
//           </form>
//         </FormGroup>
        
//         <CancelButton onClick={onClose}>Cancel</CancelButton>
//       </ModalWrapper>
//     </Overlay>
//   );
// };

// export default PaymentModal;


import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import PaystackPop from '@paystack/inline-js';
import axios from 'axios';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Import PayPal components
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
  z-index: 1001; /* Ensure PayPal buttons are above other elements if needed */
`;

const PaymentModal = ({ onClose, amount, productName, productId, productUrl, currency }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // IMPORTANT: Replace with your actual PayPal Client ID.
  // For production, this should be an environment variable.
  const PAYPAL_CLIENT_ID = 'ATbZWnQPtN92C7JSvyZ49Qi9Y-5E571scEwxjsqoxfbp-vTuegC67g-m5Dx081k-P99I_Y9JfqsMnLSp'; // Use your live PayPal Client ID

  const payWithPaystack = () => {
    if (email !== confirmEmail) {
      Swal.fire({ text: 'Emails do not match!' });
      return;
    }

    Swal.fire({ text: 'Please wait...', allowOutsideClick: false });
    Swal.showLoading();

    const paystack = new PaystackPop();
    const [firstName, lastName] = name.split(' ');

    paystack.newTransaction({
       // key: 'pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170',
       key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
      amount: amount * 100, // Paystack amount is in kobo (cents)
      email,
      firstname: firstName || name,
      lastname: lastName || '',
      onSuccess: (transaction) => {
        Swal.fire({ text: 'Payment successful' });
        saveTransaction(transaction, { name, email, phone, paymentMethod: 'Paystack' });
        onClose();
      },
      onCancel: () => {
        Swal.fire({ icon: 'error', text: 'Payment cancelled.' });
      },
      onError: (error) => {
        Swal.fire({ icon: 'error', text: `Payment failed: ${error.message}` });
      },
    });
  };

  const createPayPalOrder = (data, actions) => {
    // This function is called when the PayPal button is clicked
    if (email !== confirmEmail) {
      Swal.fire({ text: 'Emails do not match!' });
      return actions.reject(); // Prevent order creation
    }

    return actions.order.create({
      purchase_units: [
        {
          description: productName,
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
    });
  };

  const onApprovePayPal = async (data, actions) => {
    // This function is called when the buyer approves the payment on PayPal
    Swal.fire({ text: 'Processing payment...', allowOutsideClick: false });
    Swal.showLoading();

    try {
      const order = await actions.order.capture();
      console.log('PayPal Order:', order);

      // Construct a transaction object similar to Paystack's for consistency
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
        // Add other PayPal specific details if needed
        paypalDetails: order,
      };

      await saveTransaction(paypalTransaction, {
        name,
        email,
        phone,
        paymentMethod: 'PayPal',
      });
      // Swal.fire({ icon: 'success', text: 'PayPal payment successful!' });
      onClose();
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      Swal.fire({ icon: 'error', text: `PayPal payment failed: ${error.message}` });
    }
  };

  const onErrorPayPal = (err) => {
    console.error('PayPal error:', err);
    Swal.fire({ icon: 'error', text: `PayPal error: ${err.message || 'An unknown error occurred.'}` });
  };

  const onCancelPayPal = (data) => {
    console.log('PayPal payment cancelled:', data);
    Swal.fire({ icon: 'info', text: 'PayPal payment cancelled.' });
  };

  const saveTransaction = async (transaction, customerDetails) => {
    const transactionDetails = {
      productName,
      productId,
      productUrl,
      amount,
      transactionReference: transaction.reference,
      paidAt: new Date().toISOString(),
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      amountPaid: amount,
      currency: currency,
      sellerEmail: 'echobyteconcept@gmail.com', // Replace with dynamic seller email if needed
      paymentMethod: customerDetails.paymentMethod, // Add the payment method
    };

    try {
      await addDoc(collection(db, 'transactions'), transactionDetails);
      console.log('Transaction saved successfully');
      Swal.fire({
        icon: 'success',
        text: 'Purchase successful! Details and access to the product have been sent to your email. Thanks for your patronage.',
      });
      await sendTransactionEmails(transactionDetails);
    } catch (error) {
      console.error('Error saving transaction:', error);
      Swal.fire({ icon: 'error', text: 'Failed to save transaction or send emails.' });
    }
  };

  const sendTransactionEmails = async (transactionDetails) => {
    try {
      const response = await fetch('https://echobyteconcept.vercel.app/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionDetails),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
      Swal.fire({ icon: 'error', text: 'Transaction saved, but failed to send email notifications.' });
    }
  };

  const handlePaymentFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (currency === 'NGN') {
      payWithPaystack();
    }
    // PayPal button handles its own submission
  };

  return (
    <Overlay>
      <ModalWrapper>
        <Title>Complete Payment</Title>
        <FormGroup>
          <form onSubmit={handlePaymentFormSubmit}>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {currency === 'NGN' ? (
              <Button type="submit">Pay NGN {amount}</Button>
            ) : (
              // Render PayPal buttons only if currency is not NGN and PayPal Client ID is set
              (
                <PayPalButtonContainer>
                  <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: currency }}>
                    <PayPalButtons
                      style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
                      createOrder={createPayPalOrder}
                      onApprove={onApprovePayPal}
                      onError={onErrorPayPal}
                      onCancel={onCancelPayPal}
                    />
                  </PayPalScriptProvider>
                </PayPalButtonContainer>
              )
            )}
          </form>
        </FormGroup>

        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </ModalWrapper>
    </Overlay>
  );
};

export default PaymentModal;

