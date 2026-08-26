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












import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearPaymentSession } from "../Features/Slice";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
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
  const startPaymentPolling1 = (paymentType) => {
    const userEmail = getSafeLocalStorage("userEmail");

    if (!userEmail || !paymentType) {
      console.warn("⚠️ Missing email or paymentType for polling");
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
          where("data.customer.email", "==", userEmail),
          where("data.metadata.custom_payment_type", "==", paymentType)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const successful = snapshot.docs.find(
            (doc) => doc.data()?.data?.status === "success"
          );

          if (successful) {
            const verifiedData = successful.data();
            const actualReference = verifiedData?.data?.reference;

            Swal.fire({
              text: "Verifying payment and setting up your account...",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            console.log("✅ Verified payment:", verifiedData);

            const pending = localStorage.getItem("pendingTransaction");

            if (pending) {
              try {
                const { transaction, customerDetails } = JSON.parse(pending);

                const updatedTransaction = {
                  ...transaction,
                  reference: actualReference || transaction?.reference || "REF_AUTO_" + Date.now(),
                  status: verifiedData?.data?.status || "success",
                };

                // ✅ Execute transaction saving & account setup
                await saveTransaction(updatedTransaction, customerDetails);

                // 🧹 Clean up localStorage completely after everything succeeds
                const keysToClear = [
                  "pendingTransaction",
                  "pendingAmount",
                  "pendingProductName",
                  "pendingProductId",
                  "pendingProductUrl",
                  "pendingCurrency",
                  "userEmail",
                  "verificationNumber"
                ];
                keysToClear.forEach((key) => localStorage.removeItem(key));
                
                dispatch(clearPaymentSession());
                setShowModal(false);

              } catch (err) {
                console.error("❌ Failed to process pending transaction workflow:", err);
                Swal.fire({
                  icon: "error",
                  title: "Processing Error",
                  text: "Payment was successful, but automated account creation encountered an issue. Please contact support.",
                });
              }
            } else {
              console.warn("⚠️ No pending transaction found in localStorage.");
              Swal.fire({
                icon: "warning",
                text: "Payment confirmed, but session data was lost. Please contact support with reference: " + actualReference,
              });
            }

            pollingActive = false;
            clearInterval(intervalId);
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
    const savedVerificationNumber = getSafeLocalStorage("verificationNumber");
    if (!savedVerificationNumber) return;

    const stopPolling = startPaymentPolling1(savedVerificationNumber);

    return () => {
      if (stopPolling) stopPolling();
    };
  }, []);

  // ------------------- CORE FUNCTION -------------------
// ------------------- CORE FUNCTION -------------------
// ------------------- CORE FUNCTION -------------------
  const saveTransaction = async (transaction, customerDetails) => {
    try {
      const rawEmail = customerDetails?.email || getSafeLocalStorage("userEmail");
      const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
      let name = customerDetails?.name;
      const phone = customerDetails?.phone || "";
      const paymentMethod = customerDetails?.paymentMethod || "paystack";

      // ✅ Retrieve pending values safely with fallbacks
      const amount = getSafeLocalStorage("pendingAmount") || transaction?.amount || 0;
      const productName = getSafeLocalStorage("pendingProductName") || transaction?.productName || "Digital Product";
      const productId = getSafeLocalStorage("pendingProductId") || transaction?.productId || "";
      const productUrl = getSafeLocalStorage("pendingProductUrl") || transaction?.productUrl || "";
      const currencyVal = getSafeLocalStorage("pendingCurrency") || transaction?.currency || "NGN";

      if (!email) {
        throw new Error("Customer email is required for transaction processing.");
      }

      // Step 1: Check if user exists in Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      let userId;
      let existingUserData = null;

      if (!querySnapshot.empty) {
        existingUserData = querySnapshot.docs[0].data();
        userId = existingUserData.uid;
        // Fallback to stored Firestore name if checkout name wasn't passed
        if (!name) {
          name = existingUserData.name || "Valued Customer";
        }
        console.log("Existing user found, skipping Auth creation:", userId);
      } else {
        console.log("User not found, creating new Firebase Auth user...");
        
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
      }

      // Step 2: Save transaction record
      const transactionDetails = {
        productName,
        productId,
        productUrl,
        amount,
        transactionReference: transaction.reference || "REF_" + Date.now(),
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

      // Step 3: Send emails asynchronously
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
      // Non-blocking for user flow, but logged
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