import React, { useState } from 'react';
import styled from 'styled-components';
import certificateImage from '../Images/certificate.jpeg'; // Adjust the path as needed

// Styled Components
const Thumbnail = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 0.5rem;
  cursor: pointer;
  z-index: 50;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
`;

const CompanyCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating thumbnail */}
      <Thumbnail onClick={toggleModal}>
        <img
          src={certificateImage}
          alt="Company Registration Certificate"
          width={50}
          height={50}
          style={{ borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
        />
      </Thumbnail>

      {/* Modal */}
      {isOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <img
              src={certificateImage}
              alt="Company Registration Certificate"
              width={320}
              height={550}
              style={{ borderRadius: '0.5rem' }}
            />
            <CloseButton onClick={toggleModal}>X</CloseButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default CompanyCertificate;


// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import certificateImage from '../../assets/certificate.jpeg';

// const CompanyCertificate: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleModal = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Floating thumbnail */}
//       <div
//         onClick={toggleModal}
//         className="fixed bottom-20 right-2 z-50 cursor-pointer"
//       >
//         <Image
//           src={certificateImage}
//           alt="Company Registration Certificate"
//           width={50}
//           height={50}
//           priority
//           className="rounded-md shadow-lg"
//         />
//       </div>

//       {/* Modal */}
//       {isOpen && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="certificate-modal-title"
//           onClick={toggleModal}
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="relative rounded-xl bg-white p-6 animate-scaleIn"
//           >
//             <h2 id="certificate-modal-title" className="sr-only">
//               Company Registration Certificate
//             </h2>
//             <Image
//               src={certificateImage}
//               alt="Company Registration Certificate"
//               width={320}
//               height={550}
//               className="max-w-full rounded-md h-auto"
//             />
//             <button
//               aria-label="Close Modal"
//               onClick={toggleModal}
//               className="absolute top-4 right-4 rounded-full bg-red-500 px-2 py-1 text-white font-bold text-lg hover:bg-red-600"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CompanyCertificate;
