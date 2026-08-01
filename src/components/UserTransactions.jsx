



// import React, { useEffect, useState, useContext } from "react";
// import styled from "styled-components";
// import { db } from "../firebaseConfig";
// import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
// import Swal from "sweetalert2";
// import { Context } from "./Context";
// import UserAccessCoursePage from "./UserAccessCoursePage";
// import jsPDF from "jspdf";
// import cert_temp from '../Images/cert_temp.jpeg'

// const Section = styled.section`
//   background-color: #111827;
//   min-height: 100vh;
//   padding: 5rem 1.5rem;
//   color: white;
// `;

// const Title = styled.h2`
//   color: white;
//   font-size: 2rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 3rem;
//   letter-spacing: -0.025em;

//   @media (min-width: 768px) {
//     font-size: 2.5rem;
//   }
// `;

// const Grid = styled.div`
//   display: grid;
//   gap: 2rem;
//   grid-template-columns: 1fr;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const Card = styled.div`
//   background: linear-gradient(to bottom right, #1f2937, #374151);
//   border: 1px solid #4b5563;
//   padding: 1.5rem;
//   border-radius: 1rem;
//   text-align: center;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
//   transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: scale(1.03);
//     border-color: #facc15;
//     box-shadow: 0 0 20px rgba(250, 204, 21, 0.2);
//   }
// `;

// const ProductImage = styled.img`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 0.5rem;
//   margin-bottom: 1rem;
// `;

// const CardTitle = styled.h3`
//   color: white;
//   font-size: 1.25rem;
//   font-weight: 600;
//   margin-bottom: 0.5rem;
// `;

// const PriceContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 0.75rem;
// `;

// const MainPrice = styled.span`
//   color: #facc15;
//   font-size: 1.25rem;
//   font-weight: 700;
// `;

// const InfoText = styled.p`
//   font-size: 0.95rem;
//   color: #d1d5db;
//   margin-bottom: 0.25rem;
// `;

// const PaidAt = styled.p`
//   color: #9ca3af;
//   font-size: 0.85rem;
//   margin-top: 0.5rem;
//   margin-bottom: 1rem;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const ViewButton = styled.button`
//   display: block;
//   width: 100%;
//   background-color: #22c55e;
//   color: white;
//   padding: 0.6rem 0;
//   border-radius: 9999px;
//   font-weight: 600;
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #16a34a;
//   }
// `;

// const CertButton = styled.button`
//   display: block;
//   width: 100%;
//   background-color: #eab308;
//   color: #111827;
//   padding: 0.6rem 0;
//   border-radius: 9999px;
//   font-weight: 600;
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #ca8a04;
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   color: #d1d5db;
//   font-size: 1.125rem;
//   padding: 3rem 1rem;
// `;

// /* Modal Styled Components */
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.7);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: #1f2937;
//   padding: 2rem;
//   border-radius: 1rem;
//   width: 90%;
//   max-width: 400px;
//   border: 1px solid #4b5563;
//   text-align: center;
// `;

// const ModalTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
//   color: white;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border-radius: 0.5rem;
//   border: 1px solid #4b5563;
//   background: #111827;
//   color: white;
//   margin-bottom: 1.5rem;
//   font-size: 1rem;

//   &:focus {
//     outline: none;
//     border-color: #facc15;
//   }
// `;

// const ModalActions = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const ModalButton = styled.button`
//   flex: 1;
//   padding: 0.6rem;
//   border-radius: 0.5rem;
//   font-weight: 600;
//   cursor: pointer;
//   border: none;

//   &.cancel {
//     background: #4b5563;
//     color: white;
//     &:hover { background: #374151; }
//   }

//   &.generate {
//     background: #22c55e;
//     color: white;
//     &:hover { background: #16a34a; }
//   }
// `;

// const UserTransactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const { user } = useContext(Context);
//   const [courseId, setCourseId] = useState(null);

//   // Certificate Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTx, setSelectedTx] = useState(null);
//   const [fullName, setFullName] = useState("");

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       if (!user?.uid) return;

//       try {
//         Swal.fire({
//           title: "Loading transactions...",
//           allowOutsideClick: false,
//           didOpen: () => Swal.showLoading(),
//         });

//         const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
//         const querySnapshot = await getDocs(q);

//         const transactionsData = await Promise.all(
//           querySnapshot.docs.map(async (docSnap) => {
//             const transaction = { id: docSnap.id, ...docSnap.data() };
//             const productRef = doc(db, "products", transaction.productId);
//             const productDoc = await getDoc(productRef);
//             const productData = productDoc.exists() ? productDoc.data() : null;

//             return { ...transaction, product: productData };
//           })
//         );

//         setTransactions(transactionsData);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//         Swal.fire({
//           title: "Error!",
//           text: "Failed to load transactions.",
//           icon: "error",
//           background: "#1f2937",
//           color: "#f9fafb",
//         });
//       } finally {
//         Swal.close();
//       }
//     };

//     fetchTransactions();
//   }, [user]);

//   const handleOpenModal = (tx) => {
//     setSelectedTx(tx);
//     setFullName(""); // Reset or prepopulate if user name exists in context
//     setIsModalOpen(true);
//   };

//   const handleGenerateCertificate = () => {
//     if (!fullName.trim()) {
//       Swal.fire("Error", "Please enter your full name", "error");
//       return;
//     }

//     try {
//       // Initialize jsPDF in landscape mode (certificates are usually landscape: 'l', 'pt' or 'mm')
//       const docPdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: "a4",
//       });

//       const pageWidth = docPdf.internal.pageSize.getWidth(); // ~297 mm
//       const pageHeight = docPdf.internal.pageSize.getHeight(); // ~210 mm

//       // 1. Add Certificate Background Image
//       // Replace with your certificate background image URL or imported asset variable
//       const bgImageUrl = cert_temp
      
//       // Note: For best results with CORS, use a base64 string or an image hosted on the same domain/configured storage.
//       // Assuming it's a standard image link:
//       docPdf.addImage(bgImageUrl, "PNG", 0, 0, pageWidth, pageHeight);


//       // 2. Configure and Write User Full Name (Beautified & Colorful)
//     docPdf.setFont("helvetica", "bolditalic");
//     docPdf.setFontSize(32); // Slightly larger for prominence
    
//     // Optional: Add a subtle colorful drop-shadow/glow effect underneath the main text
//     docPdf.setTextColor(220, 220, 225); // Light silver/blue accent shadow
//     docPdf.text(fullName, (pageWidth / 2) + 0.8, 93.8, { align: "center" });

//     // Main vibrant text color (e.g., Deep Royal Blue / Indigo with a luxurious feel)
//     // You can customize these RGB values to match your certificate theme (e.g., Gold: 212, 175, 55)
//     docPdf.setTextColor(41, 82, 227); 
//     docPdf.text(fullName, pageWidth / 2, 93, { align: "center" });





//       // 3. Configure and Write Course Title
//       const courseTitle = selectedTx?.productName || selectedTx?.product?.title || "Course Completion";
//       docPdf.setFont("helvetica", "normal");
//       docPdf.setFontSize(18);
//       docPdf.setTextColor(0, 0, 0); 
//       docPdf.text(`${courseTitle.toUpperCase()} TRAINING`, pageWidth / 2, 125, { align: "center" });

//       // 4. Configure and Write Issue Date (Current Date)
//       const currentDate = new Date().toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//       docPdf.setFontSize(12);
//        docPdf.setTextColor(0, 0, 0); 
//       docPdf.text(`Issued on: ${currentDate}`, 250, 160, { align: "center" });

//       // 5. Save/Download the PDF
//       docPdf.save(`${fullName}_Certificate.pdf`);

//       setIsModalOpen(false);
//       Swal.fire({
//         title: "Success!",
//         text: "Your certificate has been downloaded. You can check the download folder of your computer or phone",
//         icon: "success",
//         background: "#1f2937",
//         color: "#f9fafb",
//       });
//     } catch (err) {
//       console.error("PDF Generation error:", err);
//       Swal.fire("Error", "Could not generate certificate. Check image URL permissions.", "error");
//     }
//   };

//   return (
//     <>
//       {courseId === null ? (
//         <Section>
//           <Title>My Courses</Title>

//           {transactions.length === 0 ? (
//             <EmptyState>No transactions found yet.</EmptyState>
//           ) : (
//             <Grid>
//               {transactions.map((tx) => (
//                 <Card key={tx.id}>
//                   {tx.product?.coverImageUrl && (
//                     <ProductImage src={tx.product.coverImageUrl} alt={tx.product.title} />
//                   )}

//                   <CardTitle>{tx.productName || tx.product?.title}</CardTitle>

//                   <PriceContainer>
//                     <MainPrice>
//                       {tx.currency === "NGN"
//                         ? `₦${new Intl.NumberFormat("en-US").format(tx.amountPaid)}`
//                         : `$${new Intl.NumberFormat("en-US").format(tx.amountPaid)}`}
//                     </MainPrice>
//                   </PriceContainer>

//                   <InfoText>Payment Method: {tx.paymentMethod}</InfoText>
//                   <InfoText>Transaction Ref: {tx.transactionReference}</InfoText>
//                   <PaidAt>
//                     Paid on {new Date(tx.paidAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
//                   </PaidAt>

//                   <ButtonGroup>
//                     <ViewButton onClick={() => setCourseId(tx.productId)}>
//                       Access Course
//                     </ViewButton>
//                     <CertButton onClick={() => handleOpenModal(tx)}>
//                       Get Certificate
//                     </CertButton>
//                   </ButtonGroup>
//                 </Card>
//               ))}
//             </Grid>
//           )}

//           {/* Full Name Input Modal */}
//           {isModalOpen && (
//             <ModalOverlay>
//               <ModalContent>
//                 <ModalTitle>Generate Certificate</ModalTitle>
//                 <InfoText style={{ marginBottom: "1rem" }}>
//                   Enter your full name as it should appear on the certificate:
//                 </InfoText>
//                 <Input
//                   type="text"
//                   placeholder="e.g. John Doe"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//                 <ModalActions>
//                   <ModalButton className="cancel" onClick={() => setIsModalOpen(false)}>
//                     Cancel
//                   </ModalButton>
//                   <ModalButton className="generate" onClick={handleGenerateCertificate}>
//                     Download PDF
//                   </ModalButton>
//                 </ModalActions>
//               </ModalContent>
//             </ModalOverlay>
//           )}
//         </Section>
//       ) : (
//         <UserAccessCoursePage id={courseId} onBack={() => setCourseId(null)} />
//       )}
//     </>
//   );
// };

// export default UserTransactions;





import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Context } from "./Context";
import UserAccessCoursePage from "./UserAccessCoursePage";
import jsPDF from "jspdf";
import cert_temp from '../Images/cert_temp.jpeg';

const Section = styled.section`
  background-color: #111827;
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

const InfoText = styled.p`
  font-size: 0.95rem;
  color: #d1d5db;
  margin-bottom: 0.25rem;
  text-align: left;
`;

const PaidAt = styled.p`
  color: #9ca3af;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  display: block;
  width: 100%;
  background-color: #22c55e;
  color: white;
  padding: 0.6rem 0;
  border-radius: 9999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #16a34a;
  }
`;

const CertButton = styled.button`
  display: block;
  width: 100%;
  background-color: #eab308;
  color: #111827;
  padding: 0.6rem 0;
  border-radius: 9999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ca8a04;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #d1d5db;
  font-size: 1.125rem;
  padding: 3rem 1rem;
`;

/* Modal Styled Components */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1f2937;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 420px;
  border: 1px solid #4b5563;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #4b5563;
  background: #111827;
  color: white;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #facc15;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 0.6rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  border: none;

  &.cancel {
    background: #4b5563;
    color: white;
    &:hover { background: #374151; }
  }

  &.generate {
    background: #22c55e;
    color: white;
    &:hover { background: #16a34a; }
  }
`;

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(Context);
  const [courseId, setCourseId] = useState(null);

  // Certificate Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [fullName, setFullName] = useState("");
  const [confirmFullName, setConfirmFullName] = useState("");

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

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const handleOpenModal = async (tx) => {
    try {
      // Direct Firestore check to strictly enforce single-download limit
      const txDocRef = doc(db, "transactions", tx.id);
      const txSnap = await getDoc(txDocRef);

      if (txSnap.exists() && txSnap.data().certificateDownloaded === true) {
        Swal.fire({
          title: "Already Downloaded",
          text: "You have already generated and downloaded your certificate.",
          icon: "warning",
          background: "#1f2937",
          color: "#f9fafb",
        });
        return;
      }

      setSelectedTx(tx);
      setFullName("");
      setConfirmFullName("");
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error verifying download status:", err);
      Swal.fire("Error", "Could not check download status. Please try again.", "error");
    }
  };

  const handleGenerateCertificate = async () => {
    if (!fullName.trim() || !confirmFullName.trim()) {
      Swal.fire("Error", "Please fill in both name fields", "error");
      return;
    }

    if (fullName.trim() !== confirmFullName.trim()) {
      Swal.fire("Error", "The full names do not match. Please check for spelling mistakes.", "error");
      return;
    }

    try {
      // Check Firestore once more before triggering download
      const txRef = doc(db, "transactions", selectedTx.id);
      const latestSnap = await getDoc(txRef);

      if (latestSnap.exists() && latestSnap.data().certificateDownloaded === true) {
        setIsModalOpen(false);
        Swal.fire({
          title: "Already Downloaded",
          text: "You have already generated and downloaded your certificate.",
          icon: "warning",
          background: "#1f2937",
          color: "#f9fafb",
        });
        return;
      }

      // Initialize jsPDF in landscape mode
      const docPdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = docPdf.internal.pageSize.getWidth();
      const pageHeight = docPdf.internal.pageSize.getHeight();

      // 1. Add Certificate Background Image
      const bgImageUrl = cert_temp;
      docPdf.addImage(bgImageUrl, "PNG", 0, 0, pageWidth, pageHeight);

      // 2. Write User Full Name (Italic & Bold, Colorful)
      docPdf.setFont("helvetica", "bolditalic");
      docPdf.setFontSize(32);
      docPdf.setTextColor(220, 220, 225); // Accent Shadow
      docPdf.text(fullName.trim(), (pageWidth / 2) + 0.8, 93.8, { align: "center" });

      docPdf.setTextColor(41, 82, 227); // Royal Blue Color
      docPdf.text(fullName.trim(), pageWidth / 2, 93, { align: "center" });

      // 3. Write Course Title
      const courseTitle = selectedTx?.productName || selectedTx?.product?.title || "Course Completion";
      docPdf.setFont("helvetica", "normal");
      docPdf.setFontSize(18);
      docPdf.setTextColor(0, 0, 0); 
      docPdf.text(`${courseTitle.toUpperCase()} TRAINING`, pageWidth / 2, 125, { align: "center" });

      // 4. Write Issue Date
      const currentDate = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      docPdf.setFontSize(12);
      docPdf.setTextColor(0, 0, 0); 
      docPdf.text(`Issued on: ${currentDate}`, 250, 160, { align: "center" });

      // 5. Download the PDF
      docPdf.save(`${fullName.trim()}_Certificate.pdf`);

      // 6. Strictly update Firestore field
      await updateDoc(txRef, { certificateDownloaded: true });

      // Refresh list to update UI
      await fetchTransactions();

      setIsModalOpen(false);
      Swal.fire({
        title: "Success!",
        text: "Your certificate has been downloaded. You can check the download folder of your computer or phone.",
        icon: "success",
        background: "#1f2937",
        color: "#f9fafb",
      });
    } catch (err) {
      console.error("PDF Generation error:", err);
      Swal.fire("Error", "Could not generate certificate. Please check network connection.", "error");
    }
  };

  return (
    <>
      {courseId === null ? (
        <Section>
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
                  </PriceContainer>

                  <InfoText>Payment Method: {tx.paymentMethod}</InfoText>
                  <InfoText>Transaction Ref: {tx.transactionReference}</InfoText>
                  <PaidAt>
                    Paid on {new Date(tx.paidAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                  </PaidAt>

                  <ButtonGroup>
                    <ViewButton onClick={() => setCourseId(tx.productId)}>
                      Access Course
                    </ViewButton>
                    <CertButton onClick={() => handleOpenModal(tx)}>
                      {tx.certificateDownloaded ? "Certificate Downloaded" : "Get Certificate"}
                    </CertButton>
                  </ButtonGroup>
                </Card>
              ))}
            </Grid>
          )}

          {/* Full Name Input Modal */}
          {isModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <ModalTitle>Generate Certificate</ModalTitle>
                <InfoText style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  Enter your full name as it should appear on the certificate:
                </InfoText>
                <Input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value.toUpperCase())}
                />

                <InfoText style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  Confirm your full name:
                </InfoText>
                <Input
                  type="text"
                  placeholder="Re-enter full name to match"
                  value={confirmFullName}
                  onChange={(e) => setConfirmFullName(e.target.value.toUpperCase())}
                />

                <ModalActions>
                  <ModalButton className="cancel" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </ModalButton>
                  <ModalButton className="generate" onClick={handleGenerateCertificate}>
                    Download PDF
                  </ModalButton>
                </ModalActions>
              </ModalContent>
            </ModalOverlay>
          )}
        </Section>
      ) : (
        <UserAccessCoursePage id={courseId} onBack={() => setCourseId(null)} />
      )}
    </>
  );
};

export default UserTransactions;