// import React, { createContext, useEffect, useState} from "react";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { clearPaymentSession } from "../Features/Slice";
// import {
//   collection,
//   addDoc,
//   doc,
//   setDoc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   // signInWithEmailAndPassword,
//   updateProfile
// } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import Swal from "sweetalert2";


// export const Context = createContext();

// const ContextProvider = ({ children }) => {
//   // const navigate = useNavigate();
// const dispatch = useDispatch();
   
//   const categories = [
//     {
//       id: "1",
//       // name: "📚 Ebooks",
//       name: "Ebooks",
//       link: "/category/1",
//       image: "/ebook.jpg",
//       description: "Explore a wide range of digital ebooks across genres, perfect for learning and entertainment."
//     },
//     {
//       id: "2",
//       // name: "🖥️ Courses",
//       name: "Courses",
//       link: "/category/2",
//       image: "/ecourse.jpg",
//       description: "Upgrade your skills with our curated online courses created by industry experts."
//     },
   
//     // You can add more categories here...
//   ];






  
//   // Initialize currency from localStorage or default to 'USD'
//   const [currency, setCurrency] = useState(() => {
//     return localStorage.getItem('currency') || 'USD';
//   });

//   // Save currency to localStorage every time it changes
//   useEffect(() => {
//     localStorage.setItem('currency', currency);
//   }, [currency]);
  
  


// const [searchResult, setSearchResult]=useState([])
// const [user, setUser] = useState(null);
// const[role, setRole]=useState(null);

// const [transactionSuccess, setTransactionSuccess]=useState(false)

//  const [showModal, setShowModal] = useState(false);


// //    dispatch(clearPaymentSession());
// // }


// // // ============================================
// // // 🔁 Poll Firestore for Payment Verification
// // // ============================================
// // const startPaymentPolling1 = (paymentType) => {
// //   const savedEmail = localStorage.getItem("userEmail");
// //   const userEmail = savedEmail ? JSON.parse(savedEmail) : null;

// //   if (!userEmail || !paymentType) {
// //     console.warn("⚠️ Missing email or paymentType for polling");
// //     return;
// //   }

// //   let pollingActive = true; // ✅ Controls when to stop polling

// //   const fetchPayment = async () => {
// //     if (!pollingActive) return; // prevents extra calls once stopped

// //     try {
// //       const paymentsRef = collection(db, "paystack_webhooks");
// //       const q = query(
// //         paymentsRef,
// //         where("data.customer.email", "==", userEmail),
// //         where("data.metadata.custom_payment_type", "==", paymentType)
// //       );

// //       const snapshot = await getDocs(q);

// //       if (!snapshot.empty) {
// //         const successful = snapshot.docs.find(
// //           (doc) => doc.data()?.data?.status === "success"
// //         );

// //         if (successful) {
// //           Swal.fire({
// //             text: "✅ Payment verified successfully!",
// //             icon: "success",
// //             allowOutsideClick: false,
// //             confirmButtonText:"Click here to proceed"
// //           });

// //           console.log("Payment Verified:", successful.data());

// //           // 🛑 Stop polling after success
// //           pollingActive = false;
// //           clearInterval(intervalId);
// //         }
// //       }
// //     } catch (err) {
// //       console.error("🔥 Firestore polling error:", err);
// //     }
// //   };

// //   // Run immediately once
// //   fetchPayment();

// //   // Continue polling every 10 seconds
// //   const intervalId = setInterval(fetchPayment, 10000);

// //   // ✅ Return cleanup to stop polling when needed
// //   return () => {
// //     pollingActive = false;
// //     clearInterval(intervalId);
// //   };
// // };

// // // ============================================
// // // 🪄 Example usage inside Context or useEffect
// // // ============================================
// // useEffect(() => {
// //   const stopPolling = startPaymentPolling1("payment1");

// //   // Cleanup when context/provider unmounts
// //   return () => {
// //     if (stopPolling) stopPolling();
// //   };
// // }, []);





// // ============================================
// // 🔁 Poll Firestore for Payment Verification
// // ============================================
// const startPaymentPolling1 = (paymentType) => {
//   const savedEmail = localStorage.getItem("userEmail");
//   const userEmail = savedEmail ? JSON.parse(savedEmail) : null;

//   if (!userEmail || !paymentType) {
//     console.warn("⚠️ Missing email or paymentType for polling");
//     return;
//   }

//   let pollingActive = true;
//   let intervalId;

//   const fetchPayment = async () => {
//     if (!pollingActive) return;

//     try {
//       const paymentsRef = collection(db, "paystack_webhooks");
//       const q = query(
//         paymentsRef,
//         where("data.customer.email", "==", userEmail),
//         where("data.metadata.custom_payment_type", "==", paymentType)
//       );

//       const snapshot = await getDocs(q);

//       if (!snapshot.empty) {
//         const successful = snapshot.docs.find(
//           (doc) => doc.data()?.data?.status === "success"
//         );

//         if (successful) {
//           const verifiedData = successful.data();
//           const actualReference = verifiedData?.data?.reference;

//           Swal.fire({
//             text: "...Please wait...",
//             // icon: "success",
//             allowOutsideClick: false,
//           });
//           Swal.showLoading();

//           console.log("✅ Verified payment:", verifiedData);

//           // 🟡 Retrieve pending transaction from localStorage
//           const pending = localStorage.getItem("pendingTransaction");

//           if (pending) {
//             try {
//               const { transaction, customerDetails } = JSON.parse(pending);

//               // 🔄 Replace null reference with the actual verified one
//               const updatedTransaction = {
//                 ...transaction,
//                 reference: actualReference,
//                 status: verifiedData?.data?.status,
//               };

//               console.log("💾 Saving verified transaction:", {
//                 updatedTransaction,
//                 customerDetails,
//               });

//               // ✅ Call your existing saveTransaction function
//               await saveTransaction(updatedTransaction, customerDetails);

//               // 🧹 Clean up localStorage after success
//               localStorage.removeItem("pendingTransaction");
//               localStorage.removeItem("userEmail");

//               console.log("🧹 Cleared pending transaction from localStorage.");
//                   const keysToClear = [
//       "pendingTransaction",
//       "pendingAmount",
//       "pendingProductName",
//       "pendingProductId",
//       "pendingProductUrl",
//       "pendingCurrency",
//       "userEmail",
//     ];
//     keysToClear.forEach((key) => localStorage.removeItem(key));
//     dispatch(clearPaymentSession());
//     setShowModal(false)

//             } catch (err) {
//               console.error("❌ Failed to parse or process pending transaction:", err);
//             }
//           } else {
//             console.warn("⚠️ No pending transaction found in localStorage.");
//           }

//           // 🛑 Stop polling after success
//           pollingActive = false;
//           clearInterval(intervalId);
//         }
//       }
//     } catch (err) {
//       console.error("🔥 Firestore polling error:", err);
//     }
//   };

//   // Run immediately
//   fetchPayment();

//   // Continue polling every 10 seconds
//   intervalId = setInterval(fetchPayment, 10000);

//   // ✅ Return cleanup
//   return () => {
//     pollingActive = false;
//     clearInterval(intervalId);
//   };
// };




// useEffect(() => {
//   // 🔹 Retrieve the verification number from localStorage
//   const savedVerificationNumber = JSON.parse(localStorage.getItem("verificationNumber"));


//   // 🔹 Start polling using the retrieved verification number
//   const stopPolling = startPaymentPolling1(savedVerificationNumber);

//   // 🔹 Cleanup on unmount
//   return () => {
//     if (stopPolling) stopPolling();
//   };
// }, []);








//   // ------------------- CORE FUNCTION -------------------
//   const saveTransaction = async (transaction, customerDetails) => {
//     Swal.fire({text:"Please wait..."});
//     Swal.showLoading();
//     try {
//       const { name, email, phone, paymentMethod,password } = customerDetails;

//          // ✅ Retrieve pending values from localStorage
//     const amount = JSON.parse(localStorage.getItem("pendingAmount"));
//     const productName = JSON.parse(localStorage.getItem("pendingProductName"));
//     const productId = JSON.parse(localStorage.getItem("pendingProductId"));
//     const productUrl = JSON.parse(localStorage.getItem("pendingProductUrl"));
//     const currency = JSON.parse(localStorage.getItem("pendingCurrency"));

//       // Step 1: Check if user exists
//       const usersRef = collection(db, "users");
//       const q = query(usersRef, where("email", "==", email));
//       const querySnapshot = await getDocs(q);

//       let userId;

//       if (querySnapshot.empty) {
//         console.log("User not found, creating new user...");
//         // const randomPassword = Math.random().toString(36).slice(-8);

//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         const user = userCredential.user;

//         await updateProfile(user, { displayName: name });

//         await setDoc(doc(db, "users", user.uid), {
//           uid: user.uid,
//           name,
//           email,
//           phone,
//           role: "user",
//           createdAt: new Date(),
//           // firstLogin: true, // 👈 Important!
//         });

//         userId = user.uid;
//       } else {
//         userId = querySnapshot.docs[0].data().uid;
//         console.log("Existing user found:", userId);
//       }

//       // Step 2: Save transaction
//       const transactionDetails = {
//         productName,
//         productId,
//         productUrl,
//         amount,
//         transactionReference: transaction.reference,
//         paidAt: new Date().toISOString(),
//         customerName: name,
//         customerEmail: email,
//         customerPhone: phone,
//         amountPaid: amount,
//         currency: currency,
//         paymentMethod,
//         userId,
//         sellerEmail: "echobyteconcept@gmail.com",
//       };

//       await addDoc(collection(db, "transactions"), transactionDetails);

//       // Step 3: Send emails
//       sendTransactionEmails(transactionDetails);

//       Swal.fire({
//         icon: "success",
//         text:
//           "Purchase successful! An email has been sent to you. Please proceed to your dashboard. ",
//       });
// // navigate('/dashboard');
// window.location.href = "/dashboard";
// setTransactionSuccess(true);
      
//     } catch (error) {
//       console.error("Error saving transaction:", error);
//       Swal.fire({
//         icon: "error",
//         text: "Failed to process transaction. Please contact support.",
//       });
//     }
//   };








//   // ------------------- EMAIL FUNCTION -------------------
//   const sendTransactionEmails = async (transactionDetails) => {
//     Swal.fire({ text: "Please wait...", allowOutsideClick: false });
//      Swal.showLoading();

//     try {
//       const response = await fetch(
//         "https://echobyteconcept.vercel.app/api/order",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(transactionDetails),
//         }
//       );

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.message);

//       console.log("Emails sent successfully");
//     } catch (error) {
//       console.error("Error sending emails:", error);
//       Swal.fire({
//         icon: "error",
//         text: "Transaction saved, but failed to send email notifications.",
//       });
//     }
//   };


//   return (
//     <Context.Provider value={{ categories, currency, setCurrency, searchResult, setSearchResult , 
//     user, setUser, role, setRole, startPaymentPolling1, saveTransaction, showModal, setShowModal, 
//     transactionSuccess,
//     setTransactionSuccess}}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;


// // APP UPGRADE
// // DAHSBOARD ROUTING INSTEAD OF STATE SWITCHING
// // USER REGISTARTION FOR POSTING PRODUCTS
// // REFFERRAL PROGRAM


// //bro matthew paypal cred
// //test
// //client id : AVw5SK5QbcJalyLRwng7Dilfy3Wj16c8zzLmbX55Ff6TGs-7js8FdE8z7ZjWWEOknSyNfd9ITIf2pWEx
// //secrete : EPSbnJTckWOZud0-rarhdpZzrxkVUAQZW4NRvdRhEEmdReGyVdUGb1bZDiSmWGNjXYTZJDNxD3s_WWw1


// //lie
// // Matthew car wash ...bsite
// // client id: AR1Ldt_yAdcm_TJ4n3CsYtMifMQf0vy94zu4_NF5nLokGxZD0Xcd1loBsH9GfghivjUOjtsXKyOCh6ys
// //secrete: EPmU9utiBx-xJ7r_C-GGb6M9psoTCgPBt3dawjVMIlvxN9OJzKcCqwu9DopBPJ4gbXB6VEZ7yc4C86CV


// //teste credentials
// //email: sb-f6qlk44195645@personal.example.com
// //pw: 4ZB0Amb-












// import React, { createContext, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { clearPaymentSession } from "../Features/Slice";
// import {
//   collection,
//   addDoc,
//   doc,
//   setDoc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import Swal from "sweetalert2";

// export const Context = createContext();

// const ContextProvider = ({ children }) => {
//   const dispatch = useDispatch();
   
//   const categories = [
//     {
//       id: "1",
//       name: "Ebooks",
//       link: "/category/1",
//       image: "/ebook.jpg",
//       description: "Explore a wide range of digital ebooks across genres, perfect for learning and entertainment."
//     },
//     {
//       id: "2",
//       name: "Courses",
//       link: "/category/2",
//       image: "/ecourse.jpg",
//       description: "Upgrade your skills with our curated online courses created by industry experts."
//     },
//   ];

//   // Initialize currency from localStorage or default to 'USD'
//   const [currency, setCurrency] = useState(() => {
//     return localStorage.getItem('currency') || 'USD';
//   });

//   useEffect(() => {
//     localStorage.setItem('currency', currency);
//   }, [currency]);
  
//   const [searchResult, setSearchResult] = useState([]);
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [transactionSuccess, setTransactionSuccess] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // Helper for safe JSON parsing from localStorage
//   const getSafeLocalStorage = (key) => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : null;
//     } catch (err) {
//       console.warn(`⚠️ Error parsing localStorage key "${key}":`, err);
//       return null;
//     }
//   };

//   // ============================================
//   // 🔁 Poll Firestore for Payment Verification
//   // ============================================
//   const startPaymentPolling1 = (paymentType) => {
//     const userEmail = getSafeLocalStorage("userEmail");

//     if (!userEmail || !paymentType) {
//       console.warn("⚠️ Missing email or paymentType for polling");
//       return;
//     }

//     let pollingActive = true;
//     let intervalId;

//     const fetchPayment = async () => {
//       if (!pollingActive) return;

//       try {
//         const paymentsRef = collection(db, "paystack_webhooks");
//         const q = query(
//           paymentsRef,
//           where("data.customer.email", "==", userEmail),
//           where("data.metadata.custom_payment_type", "==", paymentType)
//         );

//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           const successful = snapshot.docs.find(
//             (doc) => doc.data()?.data?.status === "success"
//           );

//           if (successful) {
//             const verifiedData = successful.data();
//             const actualReference = verifiedData?.data?.reference;

//             Swal.fire({
//               text: "Verifying payment and setting up your account...",
//               allowOutsideClick: false,
//               didOpen: () => {
//                 Swal.showLoading();
//               },
//             });

//             console.log("✅ Verified payment:", verifiedData);

//             const pending = localStorage.getItem("pendingTransaction");

//             if (pending) {
//               try {
//                 const { transaction, customerDetails } = JSON.parse(pending);

//                 const updatedTransaction = {
//                   ...transaction,
//                   reference: actualReference || transaction?.reference || "REF_AUTO_" + Date.now(),
//                   status: verifiedData?.data?.status || "success",
//                 };

//                 // ✅ Execute transaction saving & account setup
//                 await saveTransaction(updatedTransaction, customerDetails);

//                 // 🧹 Clean up localStorage completely after everything succeeds
//                 const keysToClear = [
//                   "pendingTransaction",
//                   "pendingAmount",
//                   "pendingProductName",
//                   "pendingProductId",
//                   "pendingProductUrl",
//                   "pendingCurrency",
//                   "userEmail",
//                   "verificationNumber"
//                 ];
//                 keysToClear.forEach((key) => localStorage.removeItem(key));
                
//                 dispatch(clearPaymentSession());
//                 setShowModal(false);

//               } catch (err) {
//                 console.error("❌ Failed to process pending transaction workflow:", err);
//                 Swal.fire({
//                   icon: "error",
//                   title: "Processing Error",
//                   text: "Payment was successful, but automated account creation encountered an issue. Please contact support.",
//                 });
//               }
//             } else {
//               console.warn("⚠️ No pending transaction found in localStorage.");
//               Swal.fire({
//                 icon: "warning",
//                 text: "Payment confirmed, but session data was lost. Please contact support with reference: " + actualReference,
//               });
//             }

//             pollingActive = false;
//             clearInterval(intervalId);
//           }
//         }
//       } catch (err) {
//         console.error("🔥 Firestore polling error:", err);
//       }
//     };

//     // Run immediately
//     fetchPayment();

//     // Continue polling every 10 seconds
//     intervalId = setInterval(fetchPayment, 10000);

//     return () => {
//       pollingActive = false;
//       clearInterval(intervalId);
//     };
//   };

//   useEffect(() => {
//     const savedVerificationNumber = getSafeLocalStorage("verificationNumber");
//     if (!savedVerificationNumber) return;

//     const stopPolling = startPaymentPolling1(savedVerificationNumber);

//     return () => {
//       if (stopPolling) stopPolling();
//     };
//   }, []);


// // ------------------- CORE FUNCTION -------------------
//   const saveTransaction = async (transaction, customerDetails) => {
//     try {
//       const rawEmail = customerDetails?.email || getSafeLocalStorage("userEmail");
//       const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
//       let name = customerDetails?.name;
//       const phone = customerDetails?.phone || "";
//       const paymentMethod = customerDetails?.paymentMethod || "paystack";

//       // ✅ Retrieve pending values safely with fallbacks
//       const amount = getSafeLocalStorage("pendingAmount") || transaction?.amount || 0;
//       const productName = getSafeLocalStorage("pendingProductName") || transaction?.productName || "Digital Product";
//       const productId = getSafeLocalStorage("pendingProductId") || transaction?.productId || "";
//       const productUrl = getSafeLocalStorage("pendingProductUrl") || transaction?.productUrl || "";
//       const currencyVal = getSafeLocalStorage("pendingCurrency") || transaction?.currency || "NGN";

//       if (!email) {
//         throw new Error("Customer email is required for transaction processing.");
//       }

//       // Step 1: Check if user exists in Firestore
//       const usersRef = collection(db, "users");
//       const q = query(usersRef, where("email", "==", email));
//       const querySnapshot = await getDocs(q);

//       let userId;
//       let existingUserData = null;

//       if (!querySnapshot.empty) {
//         existingUserData = querySnapshot.docs[0].data();
//         userId = existingUserData.uid;
//         // Fallback to stored Firestore name if checkout name wasn't passed
//         if (!name) {
//           name = existingUserData.name || "Valued Customer";
//         }
//         console.log("Existing user found, skipping Auth creation:", userId);
//       } else {
//         console.log("User not found, creating new Firebase Auth user...");
        
//         if (!name) name = "Valued Customer";

//         const safePassword = customerDetails?.password && customerDetails.password.trim().length >= 6 
//           ? customerDetails.password 
//           : Math.random().toString(36).slice(-8) + "A1!";

//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           safePassword
//         );
//         const newUser = userCredential.user;

//         await updateProfile(newUser, { displayName: name });

//         await setDoc(doc(db, "users", newUser.uid), {
//           uid: newUser.uid,
//           name,
//           email,
//           phone,
//           role: "user",
//           createdAt: new Date(),
//         });

//         userId = newUser.uid;
//       }

//       // Step 2: Save transaction record
//       const transactionDetails = {
//         productName,
//         productId,
//         productUrl,
//         amount,
//         transactionReference: transaction.reference || "REF_" + Date.now(),
//         paidAt: new Date().toISOString(),
//         customerName: name,
//         customerEmail: email,
//         customerPhone: phone || existingUserData?.phone || "",
//         amountPaid: amount,
//         currency: currencyVal,
//         paymentMethod,
//         userId,
//         sellerEmail: "echobyteconcept@gmail.com",
//       };

//       await addDoc(collection(db, "transactions"), transactionDetails);

//       // Step 3: Send emails asynchronously
//       await sendTransactionEmails(transactionDetails);

//       Swal.fire({
//         icon: "success",
//         text: "Purchase successful! An email has been sent to you. Please proceed to your dashboard.",
//         confirmButtonText: "Go to Dashboard",
//         allowOutsideClick: false,
//       }).then(() => {
//         window.location.href = "/dashboard";
//       });

//       setTransactionSuccess(true);
      
//     } catch (error) {
//       console.error("Error saving transaction or handling user:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Transaction Completion Failed",
//         text: error.message || "Failed to process transaction. Please contact support.",
//       });
//       throw error; 
//     }
//   };
  

//   // ------------------- EMAIL FUNCTION -------------------
//   const sendTransactionEmails = async (transactionDetails) => {
//     try {
//       const response = await fetch(
//         "https://echobyteconcept.vercel.app/api/order",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(transactionDetails),
//         }
//       );

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.message || "Email server error");

//       console.log("Emails sent successfully");
//     } catch (error) {
//       console.error("Error sending emails:", error);
//       // Non-blocking for user flow, but logged
//     }
//   };

//   return (
//     <Context.Provider value={{ 
//       categories, 
//       currency, 
//       setCurrency, 
//       searchResult, 
//       setSearchResult, 
//       user, 
//       setUser, 
//       role, 
//       setRole, 
//       startPaymentPolling1, 
//       saveTransaction, 
//       showModal, 
//       setShowModal, 
//       transactionSuccess,
//       setTransactionSuccess
//     }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;









// import React, { createContext, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { clearPaymentSession } from "../Features/Slice";
// import {
//   collection,
//   addDoc,
//   doc,
//   getDoc,
//   setDoc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import Swal from "sweetalert2";

// export const Context = createContext();

// const ContextProvider = ({ children }) => {
//   const dispatch = useDispatch();
   
//   const categories = [
//     {
//       id: "1",
//       name: "Ebooks",
//       link: "/category/1",
//       image: "/ebook.jpg",
//       description: "Explore a wide range of digital ebooks across genres, perfect for learning and entertainment."
//     },
//     {
//       id: "2",
//       name: "Courses",
//       link: "/category/2",
//       image: "/ecourse.jpg",
//       description: "Upgrade your skills with our curated online courses created by industry experts."
//     },
//   ];

//   // Initialize currency from localStorage or default to 'USD'
//   const [currency, setCurrency] = useState(() => {
//     return localStorage.getItem('currency') || 'USD';
//   });

//   useEffect(() => {
//     localStorage.setItem('currency', currency);
//   }, [currency]);
  
//   const [searchResult, setSearchResult] = useState([]);
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [transactionSuccess, setTransactionSuccess] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // Helper for safe JSON parsing from localStorage
//   const getSafeLocalStorage = (key) => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : null;
//     } catch (err) {
//       console.warn(`⚠️ Error parsing localStorage key "${key}":`, err);
//       return null;
//     }
//   };

//   // ============================================
//   // 🔁 Poll Firestore for Payment Verification
//   // ============================================
//   const startPaymentPolling1 = (paymentType) => {
//     const userEmail = getSafeLocalStorage("userEmail");

//     if (!paymentType) {
//       console.warn("⚠️ Missing paymentType for polling");
//       return;
//     }

//     let pollingActive = true;
//     let intervalId;

//     const fetchPayment = async () => {
//       if (!pollingActive) return;

//       try {
//         const paymentsRef = collection(db, "paystack_webhooks");
//         // Query matching the reference or custom payment type
//         const q = query(
//           paymentsRef,
//           where("data.metadata.custom_payment_type", "==", paymentType)
//         );

//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           const successful = snapshot.docs.find(
//             (docItem) => docItem.data()?.data?.status === "success"
//           );

//           if (successful) {
//             const verifiedData = successful.data();
//             const actualReference = verifiedData?.data?.reference || paymentType;

//             Swal.fire({
//               text: "Verifying payment and setting up your account...",
//               allowOutsideClick: false,
//               didOpen: () => {
//                 Swal.showLoading();
//               },
//             });

//             console.log("✅ Verified payment from webhook:", verifiedData);

//             try {
//               // 🛡️ Bulletproof Fallback: Fetch pending record straight from Firestore if localStorage lost it
//               let transactionPayload = null;
//               let customerPayload = null;

//               const pendingLocal = localStorage.getItem("pendingTransaction");
//               if (pendingLocal) {
//                 const parsed = JSON.parse(pendingLocal);
//                 transactionPayload = parsed.transaction;
//                 customerPayload = parsed.customerDetails;
//               } else {
//                 // Fetch direct from pending_transactions collection using reference key
//                 const pendingDocRef = doc(db, "pending_transactions", paymentType);
//                 const pendingDocSnap = await getDoc(pendingDocRef);
//                 if (pendingDocSnap.exists()) {
//                   const pendingData = pendingDocSnap.exists() ? pendingDocSnap.data() : null;
//                   if (pendingData) {
//                     transactionPayload = pendingData;
//                     customerPayload = pendingData.customerDetails;
//                   }
//                 }
//               }

//               if (!transactionPayload) {
//                 throw new Error("Transaction session details could not be retrieved from local storage or Firestore.");
//               }

//               const updatedTransaction = {
//                 ...transactionPayload,
//                 reference: actualReference,
//                 status: verifiedData?.data?.status || "success",
//               };

//               // ✅ Execute bulletproof user account creation and transaction logging
//               await saveTransaction(updatedTransaction, customerPayload);

//               // 🧹 Clean up localStorage completely after everything succeeds
//               const keysToClear = [
//                 "pendingTransaction",
//                 "pendingAmount",
//                 "pendingProductName",
//                 "pendingProductId",
//                 "pendingProductUrl",
//                 "pendingCurrency",
//                 "userEmail",
//                 "verificationNumber",
//                 "current_payment_ref"
//               ];
//               keysToClear.forEach((key) => localStorage.removeItem(key));
              
//               dispatch(clearPaymentSession());
//               setShowModal(false);

//             } catch (err) {
//               console.error("❌ Failed to process pending transaction workflow:", err);
//               Swal.fire({
//                 icon: "error",
//                 title: "Processing Error",
//                 text: err.message || "Payment was successful, but automated account creation encountered an issue. Please contact support.",
//               });
//             }

//             pollingActive = false;
//             clearInterval(intervalId);
//           }
//         }
//       } catch (err) {
//         console.error("🔥 Firestore polling error:", err);
//       }
//     };

//     // Run immediately
//     fetchPayment();

//     // Continue polling every 10 seconds
//     intervalId = setInterval(fetchPayment, 10000);

//     return () => {
//       pollingActive = false;
//       clearInterval(intervalId);
//     };
//   };

//   useEffect(() => {
//     const savedVerificationNumber = getSafeLocalStorage("verificationNumber");
//     if (!savedVerificationNumber) return;

//     const stopPolling = startPaymentPolling1(savedVerificationNumber);

//     return () => {
//       if (stopPolling) stopPolling();
//     };
//   }, []);

//   // ------------------- CORE FUNCTION -------------------
//   const saveTransaction = async (transaction, customerDetails) => {
//     try {
//       const rawEmail = customerDetails?.email || getSafeLocalStorage("userEmail") || transaction?.email;
//       const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
//       let name = customerDetails?.name || transaction?.customerDetails?.name;
//       const phone = customerDetails?.phone || transaction?.customerDetails?.phone || "";
//       const paymentMethod = customerDetails?.paymentMethod || transaction?.customerDetails?.paymentMethod || "Paystack";

//       // ✅ Retrieve pending values safely with fallbacks from Firestore transaction payload
//       const amount = transaction?.amount || getSafeLocalStorage("pendingAmount") || 0;
//       const productName = transaction?.metadata?.productName || getSafeLocalStorage("pendingProductName") || "Digital Product";
//       const productId = transaction?.metadata?.productId || getSafeLocalStorage("pendingProductId") || "";
//       const productUrl = transaction?.metadata?.productUrl || getSafeLocalStorage("pendingProductUrl") || "";
//       const currencyVal = transaction?.currency || getSafeLocalStorage("pendingCurrency") || "NGN";
//       const transactionReference = transaction?.reference || "REF_" + Date.now();

//       if (!email) {
//         throw new Error("Customer email is required for transaction processing.");
//       }

//       // 🛡️ Idempotency Check: Prevent duplicate transaction writing if already processed
//       const existingTxQuery = query(collection(db, "transactions"), where("transactionReference", "==", transactionReference));
//       const existingTxSnap = await getDocs(existingTxQuery);
//       if (!existingTxSnap.empty) {
//         console.log("⚠️ Transaction already processed for reference:", transactionReference);
//         return;
//       }

//       // Step 1: Check if user exists in Firestore by email
//       const usersRef = collection(db, "users");
//       const q = query(usersRef, where("email", "==", email));
//       const querySnapshot = await getDocs(q);

//       let userId;
//       let existingUserData = null;

//       if (!querySnapshot.empty) {
//         existingUserData = querySnapshot.docs[0].data();
//         userId = existingUserData.uid;
//         if (!name) {
//           name = existingUserData.name || "Valued Customer";
//         }
//         console.log("✅ Existing user found, attaching transaction to UID:", userId);
//       } else {
//         console.log("👤 User not found, creating new Firebase Auth user & profile...");
        
//         if (!name) name = "Valued Customer";

//         const safePassword = customerDetails?.password && customerDetails.password.trim().length >= 6 
//           ? customerDetails.password 
//           : Math.random().toString(36).slice(-8) + "A1!";

//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           safePassword
//         );
//         const newUser = userCredential.user;

//         await updateProfile(newUser, { displayName: name });

//         await setDoc(doc(db, "users", newUser.uid), {
//           uid: newUser.uid,
//           name,
//           email,
//           phone,
//           role: "user",
//           createdAt: new Date(),
//         });

//         userId = newUser.uid;
//         console.log("✅ New user created successfully with UID:", userId);
//       }

//       // Step 2: Save transaction record to 'transactions' collection
//       const transactionDetails = {
//         productName,
//         productId,
//         productUrl,
//         amount,
//         transactionReference,
//         paidAt: new Date().toISOString(),
//         customerName: name,
//         customerEmail: email,
//         customerPhone: phone || existingUserData?.phone || "",
//         amountPaid: amount,
//         currency: currencyVal,
//         paymentMethod,
//         userId,
//         sellerEmail: "echobyteconcept@gmail.com",
//       };

//       await addDoc(collection(db, "transactions"), transactionDetails);

//       // Step 3: Send confirmation emails asynchronously
//       await sendTransactionEmails(transactionDetails);

//       Swal.fire({
//         icon: "success",
//         text: "Purchase successful! An email has been sent to you. Please proceed to your dashboard.",
//         confirmButtonText: "Go to Dashboard",
//         allowOutsideClick: false,
//       }).then(() => {
//         window.location.href = "/dashboard";
//       });

//       setTransactionSuccess(true);
      
//     } catch (error) {
//       console.error("Error saving transaction or handling user:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Transaction Completion Failed",
//         text: error.message || "Failed to process transaction. Please contact support.",
//       });
//       throw error; 
//     }
//   };

//   // ------------------- EMAIL FUNCTION -------------------
//   const sendTransactionEmails = async (transactionDetails) => {
//     try {
//       const response = await fetch(
//         "https://echobyteconcept.vercel.app/api/order",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(transactionDetails),
//         }
//       );

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.message || "Email server error");

//       console.log("Emails sent successfully");
//     } catch (error) {
//       console.error("Error sending emails:", error);
//     }
//   };

//   return (
//     <Context.Provider value={{ 
//       categories, 
//       currency, 
//       setCurrency, 
//       searchResult, 
//       setSearchResult, 
//       user, 
//       setUser, 
//       role, 
//       setRole, 
//       startPaymentPolling1, 
//       saveTransaction, 
//       showModal, 
//       setShowModal, 
//       transactionSuccess,
//       setTransactionSuccess
//     }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;










import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearPaymentSession } from "../Features/Slice";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import Swal from "sweetalert2";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
   
  const categories = [
    {
      id: "1",
      name: "Ebooks",
      link: "/category/1",
      image: "/ebook.jpg",
      description: "Explore a wide range of digital ebooks across genres, perfect for learning and entertainment."
    },
    {
      id: "2",
      name: "Courses",
      link: "/category/2",
      image: "/ecourse.jpg",
      description: "Upgrade your skills with our curated online courses created by industry experts."
    },
  ];

  // Initialize currency from localStorage or default to 'USD'
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Helper for safe JSON parsing from localStorage
  const getSafeLocalStorage = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.warn(`⚠️ Error parsing localStorage key "${key}":`, err);
      return null;
    }
  };





// ============================================
// 🔁 Poll Firestore for Payment Verification
// ============================================
// const startPaymentPolling1 = (customReference) => {
//   if (!customReference) {
//     console.warn("⚠️ Missing customReference for polling");
//     return;
//   }

//   let pollingActive = true;
//   let intervalId;

//   const fetchPayment = async () => {
//     if (!pollingActive) return;

//     try {
//       const paymentsRef = collection(db, "paystack_webhooks");
//       const q = query(
//         paymentsRef,
//         where("data.reference", "==", customReference)
//       );

//       const snapshot = await getDocs(q);

//       if (!snapshot.empty) {
//         const successful = snapshot.docs.find(
//           (docItem) => docItem.data()?.data?.status === "success"
//         );

//         if (successful) {
//           const verifiedData = successful.data();
//           const actualReference = verifiedData?.data?.reference || customReference;

//           Swal.fire({
//             text: "Verifying payment and setting up your account...",
//             allowOutsideClick: false,
//             didOpen: () => {
//               Swal.showLoading();
//             },
//           });

//           console.log("✅ Verified payment from webhook:", verifiedData);

//           try {
//             // 🛡️ Fetch transaction payload directly from Firestore pending_transactions collection
//             const pendingDocRef = doc(db, "pending_transactions", customReference);
//             const pendingDocSnap = await getDoc(pendingDocRef);

//             if (!pendingDocSnap.exists()) {
//               throw new Error("Transaction session details could not be found in Firestore.");
//             }

//             const pendingData = pendingDocSnap.data();
//             const transactionPayload = pendingData;
//             const customerPayload = pendingData.customerDetails;

//             const updatedTransaction = {
//               ...transactionPayload,
//               reference: actualReference,
//               status: verifiedData?.data?.status || "success",
//             };

//             // ✅ Execute user account creation and transaction logging
//             await saveTransaction(updatedTransaction, customerPayload);

//             // 🧹 Clean up local references
//             localStorage.removeItem("current_payment_ref");
//             localStorage.removeItem("verificationNumber");
            
//             dispatch(clearPaymentSession());
//             setShowModal(false);

//           } catch (err) {
//             console.error("❌ Failed to process pending transaction workflow:", err);
//             Swal.fire({
//               icon: "error",
//               title: "Processing Error",
//               text: err.message || "Payment was successful, but automated account creation encountered an issue. Please contact support.",
//             });
//           }

//           pollingActive = false;
//           clearInterval(intervalId);
//         }
//       }
//     } catch (err) {
//       console.error("🔥 Firestore polling error:", err);
//     }
//   };

//   // Run immediately
//   fetchPayment();

//   // Continue polling every 10 seconds
//   intervalId = setInterval(fetchPayment, 10000);

//   return () => {
//     pollingActive = false;
//     clearInterval(intervalId);
//   };
// };


// ============================================
// 🔁 Poll Firestore for Payment Verification
// ============================================
const startPaymentPolling1 = (customReference) => {
  if (!customReference) {
    console.warn("⚠️ Missing customReference for polling");
    return;
  }

  let pollingActive = true;
  let intervalId;

  const fetchPayment = async () => {
    if (!pollingActive) return;

    try {
      const paymentsRef = collection(db, "paystack_webhooks");
      const q = query(
        paymentsRef,
        where("data.reference", "==", customReference)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const successful = snapshot.docs.find(
          (docItem) => docItem.data()?.data?.status === "success"
        );

        if (successful) {
          const verifiedData = successful.data();
          const actualReference = verifiedData?.data?.reference || customReference;

          // 🛡️ FIRST: Try fetching the pending document with a patient retry loop 
          // BEFORE showing any loading screens or throwing errors prematurely.
          let pendingDocSnap = null;
          let retries = 5; // Give it up to 5 attempts (5 seconds) to sync
          
          while (retries > 0) {
            const pendingDocRef = doc(db, "pending_transactions", customReference);
            pendingDocSnap = await getDoc(pendingDocRef);
            
            if (pendingDocSnap.exists()) break;
            
            console.log(`⏳ Waiting for pending transaction sync... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
            retries--;
          }

          // If after 5 retries it's still missing, THEN handle it gracefully
          if (!pendingDocSnap || !pendingDocSnap.exists()) {
            console.warn("⚠️ Webhook is successful, but pending transaction document is missing.");
            return; // Exit quietly and let the next poll try, rather than crashing with an error!
          }

          // Stop polling completely now that we found everything we need
          pollingActive = false;
          clearInterval(intervalId);

          Swal.fire({
            text: "Verifying payment and setting up your account...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          console.log("✅ Verified payment from webhook and found pending session:", verifiedData);

          try {
            const pendingData = pendingDocSnap.data();
            const transactionPayload = pendingData;
            const customerPayload = pendingData.customerDetails;

            const updatedTransaction = {
              ...transactionPayload,
              reference: actualReference,
              status: verifiedData?.data?.status || "success",
            };

            // ✅ Execute user account creation and transaction logging
            await saveTransaction(updatedTransaction, customerPayload);

            // 🧹 Clean up local references
            localStorage.removeItem("current_payment_ref");
            localStorage.removeItem("verificationNumber");
            
            dispatch(clearPaymentSession());
            setShowModal(false);

          } catch (err) {
            console.error("❌ Failed to process pending transaction workflow:", err);
            Swal.fire({
              icon: "error",
              title: "Processing Error",
              text: err.message || "Payment was successful, but automated account creation encountered an issue. Please contact support.",
            });
          }
        }
      }
    } catch (err) {
      console.error("🔥 Firestore polling error:", err);
    }
  };

  // Run immediately
  fetchPayment();

  // Continue polling every 10 seconds
  intervalId = setInterval(fetchPayment, 10000);

  return () => {
    pollingActive = false;
    clearInterval(intervalId);
  };
};




useEffect(() => {
    const rawRef = getSafeLocalStorage("current_payment_ref");
    if (!rawRef) return;

    // Clean up potential JSON stringification quotes if present
    let savedVerificationNumber = rawRef;
    try {
      savedVerificationNumber = JSON.parse(rawRef);
    } catch (e) {
      savedVerificationNumber = rawRef;
    }

    if (!savedVerificationNumber) return;

    console.log("🔄 Resuming payment polling for reference:", savedVerificationNumber);
    const stopPolling = startPaymentPolling1(savedVerificationNumber);

    return () => {
      if (stopPolling) stopPolling();
    };
  }, []);


  // ------------------- CORE FUNCTION -------------------
// ------------------- CORE FUNCTION -------------------
  const saveTransaction = async (transaction, customerDetails) => {
    try {
      const rawEmail = customerDetails?.email || transaction?.email;
      const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
      let name = customerDetails?.name || transaction?.customerDetails?.name;
      const phone = customerDetails?.phone || transaction?.customerDetails?.phone || "";
      const paymentMethod = customerDetails?.paymentMethod || transaction?.customerDetails?.paymentMethod || "Paystack";

      // ✅ Retrieve transaction values directly from the structured Firestore payload
      const amount = transaction?.amount || 0;
      const productName = transaction?.metadata?.productName || "Digital Product";
      const productId = transaction?.metadata?.productId || "";
      const productUrl = transaction?.metadata?.productUrl || "";
      const currencyVal = transaction?.currency || "NGN";
      const transactionReference = transaction?.reference || "REF_" + Date.now();

      if (!email) {
        throw new Error("Customer email is required for transaction processing.");
      }

      // 🛡️ Idempotency Check: Prevent duplicate transaction writing if already processed
      const existingTxQuery = query(
        collection(db, "transactions"), 
        where("transactionReference", "==", transactionReference)
      );
      const existingTxSnap = await getDocs(existingTxQuery);
      if (!existingTxSnap.empty) {
        console.log("⚠️ Transaction already processed for reference:", transactionReference);
        return;
      }

      // Step 1: Check if user exists in Firestore by email
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      let userId;
      let existingUserData = null;

      if (!querySnapshot.empty) {
        existingUserData = querySnapshot.docs[0].data();
        userId = existingUserData.uid;
        if (!name) {
          name = existingUserData.name || "Valued Customer";
        }
        console.log("✅ Existing user found, attaching transaction to UID:", userId);
      } else {
        console.log("👤 User not found, creating new Firebase Auth user & profile...");
        
        if (!name) name = "Valued Customer";

        const safePassword = customerDetails?.password && customerDetails.password.trim().length >= 6 
          ? customerDetails.password 
          : Math.random().toString(36).slice(-8) + "A1!";

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          safePassword
        );
        const newUser = userCredential.user;

        await updateProfile(newUser, { displayName: name });

        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          name,
          email,
          phone,
          role: "user",
          createdAt: new Date(),
        });

        userId = newUser.uid;
        console.log("✅ New user created successfully with UID:", userId);
      }

      // Step 2: Save transaction record to 'transactions' collection
      const transactionDetails = {
        productName,
        productId,
        productUrl,
        amount,
        transactionReference,
        paidAt: new Date().toISOString(),
        customerName: name,
        customerEmail: email,
        customerPhone: phone || existingUserData?.phone || "",
        amountPaid: amount,
        currency: currencyVal,
        paymentMethod,
        userId,
        sellerEmail: "echobyteconcept@gmail.com",
      };

      await addDoc(collection(db, "transactions"), transactionDetails);

      // Step 3: Clean up the pending transaction document from Firestore
      try {
        const pendingDocRef = doc(db, "pending_transactions", transactionReference);
        await deleteDoc(pendingDocRef);
      } catch (cleanupErr) {
        console.warn("⚠️ Could not clean up pending transaction doc from Firestore:", cleanupErr);
      }

      // Step 4: Send confirmation emails asynchronously
      await sendTransactionEmails(transactionDetails);

      Swal.fire({
        icon: "success",
        text: "Purchase successful! An email has been sent to you. Please proceed to your dashboard.",
        confirmButtonText: "Go to Dashboard",
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = "/dashboard";
      });

      setTransactionSuccess(true);
      
    } catch (error) {
      console.error("Error saving transaction or handling user:", error);
      Swal.fire({
        icon: "error",
        title: "Transaction Completion Failed",
        text: error.message || "Failed to process transaction. Please contact support.",
      });
      throw error; 
    }
  };



  // ------------------- EMAIL FUNCTION -------------------
  const sendTransactionEmails = async (transactionDetails) => {
    try {
      const response = await fetch(
        "https://echobyteconcept.vercel.app/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionDetails),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Email server error");

      console.log("Emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <Context.Provider value={{ 
      categories, 
      currency, 
      setCurrency, 
      searchResult, 
      setSearchResult, 
      user, 
      setUser, 
      role, 
      setRole, 
      startPaymentPolling1, 
      saveTransaction, 
      showModal, 
      setShowModal, 
      transactionSuccess,
      setTransactionSuccess
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;