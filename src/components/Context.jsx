



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