// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import Swal from "sweetalert2";

// // ---------- Styled Components (reuse your existing ones) ----------
// const PageWrapper = styled.div`
//   background-color: #111827;
//   color: #f9fafb;
//   min-height: 100vh;
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h1`
//   color: #facc15;
//   font-size: 2rem;
//   font-weight: 700;
//   margin-bottom: 1.5rem;
//   text-align: center;
// `;

// const SearchBar = styled.input`
//   width: 100%;
//   max-width: 400px;
//   background-color: #1f2937;
//   border: 1px solid #374151;
//   color: #f9fafb;
//   font-size: 1rem;
//   padding: 0.75rem 1rem;
//   border-radius: 0.75rem;
//   margin-bottom: 2rem;
//   outline: none;
//   transition: all 0.3s ease;

//   &:focus {
//     border-color: #facc15;
//     box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.3);
//   }

//   &::placeholder {
//     color: #9ca3af;
//   }
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
//   width: 100%;
//   max-width: 1200px;
// `;

// const Card = styled.div`
//   background-color: #1f2937;
//   border: 1px solid #374151;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-4px);
//     border-color: #facc15;
//   }
// `;

// const Amount = styled.h2`
//   font-size: 1.4rem;
//   font-weight: 700;
//   color: #22c55e;
//   margin-bottom: 0.5rem;
// `;

// const Info = styled.p`
//   color: #d1d5db;
//   font-size: 0.95rem;
//   margin: 0.3rem 0;
//   word-break: break-word;
// `;

// const Loader = styled.div`
//   color: #facc15;
//   margin-top: 3rem;
//   font-size: 1.1rem;
//   font-weight: 500;
// `;

// // ---------- Component ----------
// export default function PaystackWebhooksPage() {
//   const [webhooks, setWebhooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   console.log("Rendering PaystackWebhooksPage with webhooks:", webhooks);

//   useEffect(() => {
//     const fetchWebhooks = async () => {
//       try {
//         // Query Firestore, ordering by createdAt descending so latest is on top natively
//         const q = query(collection(db, "paystack_webhooks"), orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);
        
//         const webhookList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
        
//         setWebhooks(webhookList);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching webhooks:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error loading webhooks",
//           text: error.message,
//           background: "#1f2937",
//           color: "#f9fafb",
//         });
//         setLoading(false);
//       }
//     };
//     fetchWebhooks();
//   }, []);

//   // Frontend search filter matching name and email across nested Paystack payload fields
//   const filtered = webhooks.filter((item) => {
//     const paystackData = item.data?.data || {};
//     const customer = paystackData.customer || {};
    
//     const email = customer.email || "";
//     const firstName = customer.first_name || "";
//     const lastName = customer.last_name || "";
//     const senderName = paystackData.sender_name || "";
//     const fullName = `${firstName} ${lastName} ${senderName}`;

//     const queryText = searchQuery.toLowerCase();
//     return (
//       email.toLowerCase().includes(queryText) ||
//       fullName.toLowerCase().includes(queryText)
//     );
//   });

//   return (
//     <PageWrapper>
//       <Title>Paystack Webhooks</Title>

//       <SearchBar
//         type="text"
//         placeholder="Search by name or email..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {loading ? (
//         <Loader>Loading webhooks...</Loader>
//       ) : filtered.length > 0 ? (
//         <Grid>
//        {filtered.map((item) => {
//             // Handle different possible nesting levels automatically
//             const raw = item.data || item; 
//             const paystackData = raw.data || raw; 
//             const customer = paystackData.customer || {};
            
//             const amountKobo = paystackData.amount || 0;
//             const actualAmount = amountKobo / 100;

//             const customerName = 
//               [customer.first_name, customer.last_name].filter(Boolean).join(" ") || 
//               paystackData.sender_name || 
//               "Unknown User";

//             return (
//               <Card key={item.id}>
//                 <Amount>
//                   {paystackData.currency || "NGN"}{" "}
//                   {actualAmount.toLocaleString(undefined, {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </Amount>
//                 <Info>
//                   👤 Name: <strong>{customerName}</strong>
//                 </Info>
//                 <Info>
//                   📧 Email: <strong>{customer.email || paystackData.email || "No Email"}</strong>
//                 </Info>
//                 <Info>
//                   💳 Channel: <strong>{paystackData.channel || "N/A"}</strong>
//                 </Info>
//                 <Info>
//                   📌 Reference: <strong>{paystackData.reference || "N/A"}</strong>
//                 </Info>
//                 {(paystackData.paidAt || paystackData.paid_at || item.createdAt) && (
//                   <Info>
//                     🕓 Date: {new Date(paystackData.paidAt || paystackData.paid_at || item.createdAt).toLocaleString()}
//                   </Info>
//                 )}
//               </Card>
//             );
//           })}
//         </Grid>
//       ) : (
//         <Loader>No webhook entries found</Loader>
//       )}
//     </PageWrapper>
//   );
// }









import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";

// ---------- Styled Components ----------
const PageWrapper = styled.div`
  background-color: #111827;
  color: #f9fafb;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #facc15;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  background-color: #1f2937;
  border: 1px solid #374151;
  color: #f9fafb;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #facc15;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #facc15;
  }
`;

const Amount = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #22c55e;
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  color: #d1d5db;
  font-size: 0.95rem;
  margin: 0.3rem 0;
  word-break: break-word;
`;

const Loader = styled.div`
  color: #facc15;
  margin-top: 3rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

// ---------- Modal Styles ----------
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: #1f2937;
  border: 1px solid #374151;
  color: #f9fafb;
  width: 100%;
  max-width: 700px;
  max-height: 85vh;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #374151;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: #facc15;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #f9fafb;
  }
`;

const SectionTitle = styled.h3`
  color: #38bdf8;
  font-size: 1.1rem;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px dashed #374151;
  padding-bottom: 0.3rem;
`;

const JsonBlock = styled.div`
  background-color: #111827;
  border: 1px solid #374151;
  color: #a7f3d0;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  overflow-x: auto;
  min-height: 250px;
  margin-top: 1rem;
`;

// ---------- Component ----------
export default function PaystackWebhooksPage() {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWebhook, setSelectedWebhook] = useState(null); // Controls modal visibility & content

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        const q = query(collection(db, "paystack_webhooks"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        
        const webhookList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setWebhooks(webhookList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching webhooks:", error);
        Swal.fire({
          icon: "error",
          title: "Error loading webhooks",
          text: error.message,
          background: "#1f2937",
          color: "#f9fafb",
        });
        setLoading(false);
      }
    };
    fetchWebhooks();
  }, []);

  // Frontend search filter matching name and email across nested Paystack payload fields
  const filtered = webhooks.filter((item) => {
    const paystackData = item.data?.data || item.data || {};
    const customer = paystackData.customer || {};
    
    const email = customer.email || paystackData.email || "";
    const firstName = customer.first_name || "";
    const lastName = customer.last_name || "";
    const senderName = paystackData.sender_name || "";
    const fullName = `${firstName} ${lastName} ${senderName}`;

    const queryText = searchQuery.toLowerCase();
    return (
      email.toLowerCase().includes(queryText) ||
      fullName.toLowerCase().includes(queryText)
    );
  });

  return (
    <PageWrapper>
      <Title>Paystack Webhooks</Title>

      <SearchBar
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <Loader>Loading webhooks...</Loader>
      ) : filtered.length > 0 ? (
        <Grid>
          {filtered.map((item) => {
            const raw = item.data || item; 
            const paystackData = raw.data || raw; 
            const customer = paystackData.customer || {};
            
            const amountKobo = paystackData.amount || 0;
            const actualAmount = amountKobo / 100;

            const customerName = 
              [customer.first_name, customer.last_name].filter(Boolean).join(" ") || 
              paystackData.sender_name || 
              "Unknown User";

            return (
              <Card key={item.id} onClick={() => setSelectedWebhook(item)}>
                <Amount>
                  {paystackData.currency || "NGN"}{" "}
                  {actualAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Amount>
                <Info>
                  👤 Name: <strong>{customerName}</strong>
                </Info>
                <Info>
                  📧 Email: <strong>{customer.email || paystackData.email || "No Email"}</strong>
                </Info>
                <Info>
                  💳 Channel: <strong>{paystackData.channel || "N/A"}</strong>
                </Info>
                <Info>
                  📌 Reference: <strong>{paystackData.reference || "N/A"}</strong>
                </Info>
                {(paystackData.paidAt || paystackData.paid_at || item.createdAt) && (
                  <Info>
                    🕓 Date: {new Date(paystackData.paidAt || paystackData.paid_at || item.createdAt).toLocaleString()}
                  </Info>
                )}
              </Card>
            );
          })}
        </Grid>
      ) : (
        <Loader>No webhook entries found</Loader>
      )}

      {/* ---------- Detail Modal ---------- */}
      {selectedWebhook && (() => {
        const raw = selectedWebhook.data || selectedWebhook;
        const paystackData = raw.data || raw;
        const customer = paystackData.customer || {};
        const auth = paystackData.authorization || {};

        const customerName = 
          [customer.first_name, customer.last_name].filter(Boolean).join(" ") || 
          paystackData.sender_name || 
          "Unknown User";

        const amountValue = (paystackData.amount || 0) / 100;

        return (
          <ModalOverlay onClick={() => setSelectedWebhook(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Transaction Details</ModalTitle>
                <CloseButton onClick={() => setSelectedWebhook(null)}>&times;</CloseButton>
              </ModalHeader>

              <SectionTitle>Summary & Financials</SectionTitle>
              <Info>💰 <strong>Amount:</strong> {paystackData.currency || "NGN"} {amountValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Info>
              <Info>💸 <strong>Fees:</strong> {paystackData.currency || "NGN"} {((paystackData.fees || 0) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Info>
              <Info>🟢 <strong>Status:</strong> {paystackData.status || "N/A"}</Info>
              <Info>📌 <strong>Reference:</strong> {paystackData.reference || "N/A"}</Info>
              <Info>💳 <strong>Channel / Method:</strong> {paystackData.channel || "N/A"}</Info>
              <Info>🌐 <strong>Domain:</strong> {paystackData.domain || "N/A"}</Info>
              <Info>🕓 <strong>Paid At:</strong> {paystackData.paidAt || paystackData.paid_at || "N/A"}</Info>

              <SectionTitle>Customer Information</SectionTitle>
              <Info>👤 <strong>Name:</strong> {customerName}</Info>
              <Info>📧 <strong>Email:</strong> {customer.email || paystackData.email || "N/A"}</Info>
              <Info>📱 <strong>Phone:</strong> {customer.phone || "N/A"}</Info>
              <Info>🆔 <strong>Customer ID:</strong> {customer.id || "N/A"}</Info>
              <Info>🏷️ <strong>Customer Code:</strong> {customer.customer_code || "N/A"}</Info>

              {paystackData.channel === "bank_transfer" && (
                <>
                  <SectionTitle>Bank Transfer Details</SectionTitle>
                  <Info>🏦 <strong>Sender Bank:</strong> {auth.sender_bank || paystackData.sender_bank || "N/A"}</Info>
                  <Info>🔢 <strong>Sender Account No:</strong> {auth.sender_bank_account_number || paystackData.sender_bank_account_number || "N/A"}</Info>
                  <Info>👤 <strong>Sender Name:</strong> {auth.sender_name || paystackData.sender_name || "N/A"}</Info>
                  <Info>📥 <strong>Receiver Bank:</strong> {auth.receiver_bank || paystackData.receiver_bank || "N/A"}</Info>
                  <Info>📝 <strong>Narration:</strong> {auth.narration || paystackData.narration || "N/A"}</Info>
                </>
              )}

              <SectionTitle>Raw Payload (JSON)</SectionTitle>
              <JsonBlock>{JSON.stringify(selectedWebhook, null, 2)}</JsonBlock>
            </ModalContent>
          </ModalOverlay>
        );
      })()}
    </PageWrapper>
  );
}