
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
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

const SortButton = styled.button`
  background: transparent;
  border: 1px solid #374151;
  color: #facc15;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #facc15;
    color: #111827;
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

const Badge = styled.span`
  display: inline-block;
  margin-top: 0.75rem;
  background-color: ${(props) =>
    props.status === "success"
      ? "#22c55e"
      : props.status === "pending"
      ? "#facc15"
      : "#ef4444"};
  color: #111827;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
`;

const Loader = styled.div`
  color: #facc15;
  margin-top: 3rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

// ---------- Component ----------
export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  console.log(transactions)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "transactions"));
        const txList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(txList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        Swal.fire({
          icon: "error",
          title: "Error loading transactions",
          text: error.message,
          background: "#1f2937",
          color: "#f9fafb",
        });
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filtered = transactions
    .filter((tx) =>
      `${tx.userEmail || ""} ${tx.productName || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? (a.paidAt || 0) - (b.paidAt || 0)
        : (b.paidAt || 0) - (a.paidAt || 0)
    );

  return (
    <PageWrapper>
      <Title>All Transactions</Title>

      <SearchBar
        type="text"
        placeholder="Search by email or product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
{/* 
      <SortButton onClick={() => setSortAsc(!sortAsc)}>
        Sort by Date {sortAsc ? "▲" : "▼"}
      </SortButton> */}

      {loading ? (
        <Loader>Loading transactions...</Loader>
      ) : filtered.length > 0 ? (
        <Grid>
          {filtered.map((tx) => (
            <Card key={tx.id}>
                
              <Amount>
{tx.currency }
              {tx.amount
  ? `${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  : "No Amount"}

              </Amount>
              <Info>
                🛒 Product:{" "}
                <strong>{tx.productName || "Unknown Product"}</strong>
              </Info>
              <Info>
                👤 User Name: <strong>{tx.customerName || "Unknown User"}</strong>
              </Info>
              <Info>
                📧 User Email: <strong>{tx.customerEmail || "Unknown User"}</strong>
              </Info>
              <Info>
                📱 User Phone: <strong>{tx.customerPhone || "Unknown User"}</strong>
              </Info>
              {tx.transactionId && (
                <Info>💳 ID: {tx.transactionId}</Info>
              )}
              {tx.paidAt && (
                <Info>
                  🕓 Date:{" "} {tx.paidAt}
                  {/* {new Date(
                    tx.createdAt.seconds
                      ? tx.createdAt.seconds * 1000
                      : tx.createdAt
                  ).toLocaleString()} */}
                </Info>
              )}
              {/* <Badge status={tx.status || "pending"}>
                {tx.status || "pending"}
              </Badge> */}
            </Card>
          ))}
        </Grid>
      ) : (
        <Loader>No transactions found</Loader>
      )}
    </PageWrapper>
  );
}
