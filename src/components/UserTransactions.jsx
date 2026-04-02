
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Context } from "./Context";
import UserAccessCoursePage from "./UserAccessCoursePage";

const Section = styled.section`
  background-color: #111827; /* Tailwind bg-gray-900 */
  min-height: 100vh;
  padding: 5rem 1.5rem;
  color: white;
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: linear-gradient(to bottom right, #1f2937, #374151);
  border: 1px solid #4b5563;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    border-color: #facc15;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const MainPrice = styled.span`
  color: #facc15;
  font-size: 1.25rem;
  font-weight: 700;
`;

const SubPrice = styled.span`
  color: #d1d5db;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  font-weight: 500;
  opacity: 0.8;
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: #d1d5db;
  margin-bottom: 0.25rem;
`;

const PaidAt = styled.p`
  color: #9ca3af;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const ViewButton = styled.a`
  display: inline-block;
  background-color: #22c55e;
  color: white;
  padding: 0.5rem 3rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
  margin-top: 0.75rem;

  &:hover {
    background-color: gray;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #d1d5db;
  font-size: 1.125rem;
  padding: 3rem 1rem;
`;

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(Context);
  const [courseId, setCourseId]=useState(null)

  console.log(transactions)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.uid) return;

      try {
        Swal.fire({
          title: "Loading transactions...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const transactionsData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const transaction = { id: docSnap.id, ...docSnap.data() };
            // Fetch the related product
            const productRef = doc(db, "products", transaction.productId);
            const productDoc = await getDoc(productRef);
            const productData = productDoc.exists() ? productDoc.data() : null;

            return { ...transaction, product: productData };
          })
        );

        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load transactions.",
          icon: "error",
          background: "#1f2937",
          color: "#f9fafb",
        });
      } finally {
        Swal.close();
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <>
        {courseId===null?<Section>
      <Title>My Courses</Title>

      {transactions.length === 0 ? (
        <EmptyState>No transactions found yet.</EmptyState>
      ) : (
        <Grid>
          {transactions.map((tx) => (
            <Card key={tx.id}>
              {tx.product?.coverImageUrl && (
                <ProductImage src={tx.product.coverImageUrl} alt={tx.product.title} />
              )}

              <CardTitle>{tx.productName || tx.product?.title}</CardTitle>

              <PriceContainer>
                <MainPrice>
                  {tx.currency === "NGN"
                    ? `₦${new Intl.NumberFormat("en-US").format(tx.amountPaid)}`
                    : `$${new Intl.NumberFormat("en-US").format(tx.amountPaid)}`}
                </MainPrice>
                {tx.currency === "NGN" && tx.product?.priceInUsd && (
                  <SubPrice>(${tx.product.priceInUsd})</SubPrice>
                )}
              </PriceContainer>

              <InfoText>Payment Method: {tx.paymentMethod}</InfoText>
              <InfoText>Transaction Ref: {tx.transactionReference}</InfoText>
              <PaidAt>
                Paid on {new Date(tx.paidAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
              </PaidAt>

              
                <ViewButton onClick={()=>setCourseId(tx.productId)}>
                  Access Course
                </ViewButton>
              
            </Card>
          ))}
        </Grid>
      )}
    </Section>:
    <UserAccessCoursePage id={courseId} onBack={()=>setCourseId(null)}/>}
    </>
  );
};

export default UserTransactions;
