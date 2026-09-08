import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";

// ---------- Styled Components (reuse your existing ones) ----------
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

// ---------- Component ----------
export default function PaystackWebhooksPage() {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  console.log("Rendering PaystackWebhooksPage with webhooks:", webhooks);

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        // Query Firestore, ordering by createdAt descending so latest is on top natively
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
    const paystackData = item.data?.data || {};
    const customer = paystackData.customer || {};
    
    const email = customer.email || "";
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
            // Handle different possible nesting levels automatically
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
              <Card key={item.id}>
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
    </PageWrapper>
  );
}