// import React, { useContext, useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import { clearPaymentSession } from "../Features/Slice";
// import { Context } from "./Context";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// // Replace with your Flutterwave verification endpoint URL
// const FLUTTERWAVE_VERIFY_ENDPOINT ="https://echobytepay.vercel.app/api/flutterwave_verify";

// const Container = styled.div`
//   min-height: 75vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 2rem;
//   background-color: #f8fafc;
// `;

// const Card = styled.div`
//   max-width: 480px;
//   width: 100%;
//   background: #ffffff;
//   border-radius: 0.75rem;
//   padding: 2.25rem;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
//   text-align: center;
// `;

// const Title = styled.h2`
//   margin: 0 0 0.75rem;
//   color: #0f172a;
//   font-size: 1.5rem;
// `;

// const Message = styled.p`
//   margin: 0 0 1.5rem;
//   color: #475569;
//   line-height: 1.6;
// `;

// const RetryButton = styled.button`
//   padding: 0.75rem 1.5rem;
//   background-color: #22c55e;
//   color: #ffffff;
//   border: none;
//   border-radius: 0.5rem;
//   font-weight: 600;
//   cursor: pointer;

//   &:hover {
//     background-color: #16a34a;
//   }
// `;

// const FlutterwavePaymentSuccess = () => {
//   const dispatch = useDispatch();
//   const { saveTransaction, setShowModal } = useContext(Context);

//   const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"
//   const [statusMessage, setStatusMessage] = useState(
//     "Verifying your payment and setting up your account. Please do not close this page..."
//   );

//   const hasVerifiedRef = useRef(false);

//   const verifyAndCompletePayment = async () => {
//     try {
//       setStatus("verifying");
//       setStatusMessage(
//         "Verifying your payment and setting up your account. Please do not close this page..."
//       );

//       // 1. Extract parameters returned by the central payment platform
//       const searchParams = new URLSearchParams(window.location.search);
//       const urlReference =
//         searchParams.get("transaction_reference") ||
//         searchParams.get("tx_ref");
//       const urlAmount = Number(
//         searchParams.get("paid_amount") || searchParams.get("amount") || 0
//       );
//       const urlCurrency = String(
//         searchParams.get("currency") || ""
//       ).toUpperCase();

//       if (!urlReference) {
//         throw new Error("Missing transaction reference in redirect URL.");
//       }

//       // 2. Check saved reference in localStorage
//       const savedLocalRef = localStorage.getItem("current_payment_ref");
//       let parsedVerificationRef = null;
//       try {
//         const rawVerif = localStorage.getItem("verificationNumber");
//         parsedVerificationRef = rawVerif ? JSON.parse(rawVerif) : null;
//       } catch {
//         parsedVerificationRef = localStorage.getItem("verificationNumber");
//       }

//       const localRef = savedLocalRef || parsedVerificationRef;

//       if (localRef && localRef !== urlReference) {
//         throw new Error(
//           "Transaction reference mismatch with your active browser session."
//         );
//       }

//       const transactionReference = localRef || urlReference;

//       // 3. Fetch saved pending transaction details from Firestore
//       const pendingDocRef = doc(db, "pending_transactions", transactionReference);
//       const pendingDocSnap = await getDoc(pendingDocRef);

//       if (!pendingDocSnap.exists()) {
//         throw new Error(
//           "Pending transaction record not found. It may have already been processed."
//         );
//       }

//       const pendingData = pendingDocSnap.data();
//       const expectedAmount = Number(pendingData.amount);
//       const expectedCurrency = String(pendingData.currency || "").toUpperCase();

//       // 4. Verify payment directly with your Flutterwave verify endpoint
//       const verifyUrl = `${FLUTTERWAVE_VERIFY_ENDPOINT}?tx_ref=${encodeURIComponent(
//         transactionReference
//       )}`;

//       const verifyResponse = await fetch(verifyUrl, {
//         method: "GET",
//         cache: "no-store",
//       });

//       const verifyResult = await verifyResponse.json();

//       // Support both { success: true, data: {...} } and { status: "success", data: {...} }
//       const verifiedTx = verifyResult?.data || verifyResult;
//       const isApiSuccess =
//         verifyResponse.ok &&
//         (verifyResult?.success === true ||
//           verifyResult?.status === "success" ||
//           verifiedTx?.status === "successful");

//       if (!isApiSuccess || !verifiedTx) {
//         throw new Error(
//           verifyResult?.message ||
//             "Payment could not be confirmed with Flutterwave."
//         );
//       }

//       // 5. Confirm payment status, reference, exact currency, and exact amount
//       const verifiedStatus = String(verifiedTx.status || "").toLowerCase();
//       const verifiedReference =
//         verifiedTx.tx_ref || verifiedTx.reference || transactionReference;
//       const verifiedAmount = Number(
//         verifiedTx.charged_amount ?? verifiedTx.amount
//       );
//       const verifiedCurrency = String(
//         verifiedTx.currency || ""
//       ).toUpperCase();

//       if (verifiedStatus !== "successful" && verifiedStatus !== "success") {
//         throw new Error(
//           `Payment status is "${verifiedTx.status}". Only successful payments can be completed.`
//         );
//       }

//       if (verifiedReference !== transactionReference) {
//         throw new Error("Verified transaction reference does not match.");
//       }

//       // Cross-check currency against Firestore (and URL params if provided)
//       if (
//         verifiedCurrency !== expectedCurrency ||
//         (urlCurrency && urlCurrency !== expectedCurrency)
//       ) {
//         throw new Error(
//           `Currency mismatch: expected ${expectedCurrency}, but received ${verifiedCurrency}.`
//         );
//       }

//       // Cross-check exact amount against Firestore (using small epsilon for float safety)
//       if (
//         !Number.isFinite(verifiedAmount) ||
//         Math.abs(verifiedAmount - expectedAmount) > 0.01 ||
//         (urlAmount > 0 && Math.abs(urlAmount - expectedAmount) > 0.01)
//       ) {
//         throw new Error(
//           `Amount mismatch: expected ${expectedCurrency} ${expectedAmount}, but verified ${verifiedCurrency} ${verifiedAmount}.`
//         );
//       }

//       // 6. All checks passed — run all post-payment logic from Context
//       Swal.fire({
//         text: "Payment confirmed! Creating your account and finalizing order...",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       const updatedTransaction = {
//         ...pendingData,
//         reference: transactionReference,
//         status: "successful",
//         flutterwaveTransactionId: verifiedTx.id || "",
//       };

//       await saveTransaction(updatedTransaction, pendingData.customerDetails);

//       // 7. Clean up local storage & Redux payment session
//       localStorage.removeItem("current_payment_ref");
//       localStorage.removeItem("verificationNumber");
//       dispatch(clearPaymentSession());
//       if (setShowModal) setShowModal(false);

//       setStatus("success");
//       setStatusMessage("Payment verified and account setup complete!");
//     } catch (error) {
//       console.error("Post-payment verification error:", error);
//       setStatus("error");
//       setStatusMessage(
//         error.message ||
//           "We could not verify your payment. Please contact support with your reference."
//       );

//       Swal.fire({
//         icon: "error",
//         title: "Verification Failed",
//         text:
//           error.message ||
//           "Could not verify transaction details. Please contact support.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (hasVerifiedRef.current) return;
//     hasVerifiedRef.current = true;
//     verifyAndCompletePayment();
//   }, []);

//   return (
//     <Container>
//       <Card>
//         <Title>
//           {status === "verifying" && "Confirming Your Payment..."}
//           {status === "success" && "Payment Confirmed!"}
//           {status === "error" && "Payment Verification Issue"}
//         </Title>
//         <Message>{statusMessage}</Message>
//         {status === "error" && (
//           <RetryButton type="button" onClick={verifyAndCompletePayment}>
//             Retry Verification
//           </RetryButton>
//         )}
//       </Card>
//     </Container>
//   );
// };

// export default FlutterwavePaymentSuccess;






import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { clearPaymentSession } from "../Features/Slice";
import { Context } from "./Context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FLUTTERWAVE_VERIFY_ENDPOINT ="https://echobytepay.vercel.app/api/flutterwave_verify";

const POLL_INTERVAL_MS = 3000; // Check every 3 seconds
const MAX_ATTEMPTS = 20; // Up to 60 seconds total

const Container = styled.div`
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8fafc;
`;

const Card = styled.div`
  max-width: 480px;
  width: 100%;
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 2.25rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 0.75rem;
  color: #0f172a;
  font-size: 1.5rem;
`;

const Message = styled.p`
  margin: 0 0 1rem;
  color: #475569;
  line-height: 1.6;
`;

const SubNote = styled.p`
  margin: 0 0 1.5rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #22c55e;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #16a34a;
  }
`;

const FlutterwavePaymentSuccess = () => {
  const dispatch = useDispatch();
  const { saveTransaction, setShowModal } = useContext(Context);

  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"
  const [statusMessage, setStatusMessage] = useState(
    "Confirming your payment with Flutterwave..."
  );
  const [attemptCount, setAttemptCount] = useState(0);

  const isCompletedRef = useRef(false);
  const timerRef = useRef(null);

  const runVerificationFlow = async () => {
    // Clear any existing timer before starting
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setStatus("verifying");
    setAttemptCount(0);

    // 1. Read URL params once
    const searchParams = new URLSearchParams(window.location.search);
    const urlReference =
      searchParams.get("transaction_reference") || searchParams.get("tx_ref");
    const urlTransactionId = searchParams.get("transaction_id") || "";
    const urlAmount = Number(
      searchParams.get("paid_amount") || searchParams.get("amount") || 0
    );
    const urlCurrency = String(
      searchParams.get("currency") || ""
    ).toUpperCase();

    if (!urlReference) {
      setStatus("error");
      setStatusMessage("Missing transaction reference in redirect URL.");
      return;
    }

    // 2. Validate against localStorage reference
    const savedLocalRef = localStorage.getItem("current_payment_ref");
    let parsedVerificationRef = null;
    try {
      const rawVerif = localStorage.getItem("verificationNumber");
      parsedVerificationRef = rawVerif ? JSON.parse(rawVerif) : null;
    } catch {
      parsedVerificationRef = localStorage.getItem("verificationNumber");
    }

    const localRef = savedLocalRef || parsedVerificationRef;

    if (localRef && localRef !== urlReference) {
      setStatus("error");
      setStatusMessage(
        "Transaction reference mismatch with your active browser session."
      );
      return;
    }

    const transactionReference = localRef || urlReference;

    // 3. Fetch saved pending transaction details from Firestore once
    let pendingData;
    try {
      const pendingDocRef = doc(db, "pending_transactions", transactionReference);
      const pendingDocSnap = await getDoc(pendingDocRef);

      if (!pendingDocSnap.exists()) {
        setStatus("error");
        setStatusMessage(
          "Pending transaction record not found. It may have already been processed."
        );
        return;
      }

      pendingData = pendingDocSnap.data();
    } catch (err) {
      console.error("Error reading pending transaction:", err);
      setStatus("error");
      setStatusMessage("Could not load transaction record from database.");
      return;
    }

    const expectedAmount = Number(pendingData.amount);
    const expectedCurrency = String(pendingData.currency || "").toUpperCase();

    // 4. Poll Flutterwave verify endpoint until data is ready
    let attempts = 0;

    const checkWithFlutterwave = async () => {
      if (isCompletedRef.current) return;
      attempts += 1;
      setAttemptCount(attempts);

      if (attempts === 1) {
        setStatusMessage("Confirming your payment with Flutterwave...");
      } else if (attempts <= 4) {
        setStatusMessage(
          "Payment received! Waiting for Flutterwave to finalize confirmation..."
        );
      } else {
        setStatusMessage(
          "Still syncing with payment network — please keep this tab open, almost done..."
        );
      }

      try {
        const query = new URLSearchParams({
          tx_ref: transactionReference,
          ...(urlTransactionId ? { transaction_id: urlTransactionId } : {}),
        });

        const verifyResponse = await fetch(
          `${FLUTTERWAVE_VERIFY_ENDPOINT}?${query.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const verifyResult = await verifyResponse.json();
        const verifiedTx = verifyResult?.data;
        const verifiedStatus = String(verifiedTx?.status || "").toLowerCase();

        // If Flutterwave hasn't indexed/settled it yet or status is still pending -> retry silently
        if (
          !verifyResult?.success ||
          !verifiedTx ||
          verifiedStatus === "pending"
        ) {
          if (attempts < MAX_ATTEMPTS) {
            timerRef.current = setTimeout(checkWithFlutterwave, POLL_INTERVAL_MS);
            return;
          }
          throw new Error(
            "Flutterwave confirmation is taking longer than usual. Click retry below to check again."
          );
        }

        // Hard failure from Flutterwave (failed / cancelled) -> stop immediately
        if (verifiedStatus !== "successful" && verifiedStatus !== "success") {
          throw new Error(
            `Payment status is "${verifiedTx.status}". Only successful payments can be completed.`
          );
        }

        // 5. Cross-check reference, currency, and exact amount against Firestore
        const verifiedReference =
          verifiedTx.tx_ref || verifiedTx.reference || transactionReference;
        const verifiedAmount = Number(
          verifiedTx.charged_amount ?? verifiedTx.amount
        );
        const verifiedCurrency = String(
          verifiedTx.currency || ""
        ).toUpperCase();

        if (verifiedReference !== transactionReference) {
          throw new Error("Verified transaction reference does not match.");
        }

        if (
          verifiedCurrency !== expectedCurrency ||
          (urlCurrency && urlCurrency !== expectedCurrency)
        ) {
          throw new Error(
            `Currency mismatch: expected ${expectedCurrency}, but received ${verifiedCurrency}.`
          );
        }

        if (
          !Number.isFinite(verifiedAmount) ||
          Math.abs(verifiedAmount - expectedAmount) > 0.01 ||
          (urlAmount > 0 && Math.abs(urlAmount - expectedAmount) > 0.01)
        ) {
          throw new Error(
            `Amount mismatch: expected ${expectedCurrency} ${expectedAmount}, but verified ${verifiedCurrency} ${verifiedAmount}.`
          );
        }

        // 6. Lock completion & execute all post-payment logic
        isCompletedRef.current = true;

        Swal.fire({
          text: "Payment confirmed! Creating your account and finalizing order...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const updatedTransaction = {
          ...pendingData,
          reference: transactionReference,
          status: "successful",
          flutterwaveTransactionId: verifiedTx.id || urlTransactionId || "",
        };

        await saveTransaction(updatedTransaction, pendingData.customerDetails);

        // 7. Clean up local storage & Redux session
        localStorage.removeItem("current_payment_ref");
        localStorage.removeItem("verificationNumber");
        dispatch(clearPaymentSession());
        if (setShowModal) setShowModal(false);

        setStatus("success");
        setStatusMessage("Payment verified and account setup complete!");
      } catch (error) {
        console.error("Post-payment verification error:", error);
        setStatus("error");
        setStatusMessage(
          error.message ||
            "We could not verify your payment. Please click retry or contact support."
        );

        Swal.fire({
          icon: "error",
          title: "Verification Issue",
          text:
            error.message ||
            "Could not verify transaction details. Please retry.",
        });
      }
    };

    checkWithFlutterwave();
  };

  useEffect(() => {
    runVerificationFlow();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Container>
      <Card>
        <Title>
          {status === "verifying" && "Confirming Your Payment..."}
          {status === "success" && "Payment Confirmed!"}
          {status === "error" && "Verification Delayed"}
        </Title>
        <Message>{statusMessage}</Message>
        {status === "verifying" && attemptCount > 1 && (
          <SubNote>
            Verification check {attemptCount} of {MAX_ATTEMPTS} — this happens automatically.
          </SubNote>
        )}
        {status === "error" && (
          <RetryButton type="button" onClick={runVerificationFlow}>
            Check Again Now
          </RetryButton>
        )}
      </Card>
    </Container>
  );
};

export default FlutterwavePaymentSuccess;