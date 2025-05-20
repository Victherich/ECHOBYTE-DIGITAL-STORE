
// OutlineModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;

`;

const ModalContent = styled.div`
  background: #1f2937;
  padding: 2rem;
  border-radius: 0.75rem;
  max-width: 500px;
  width: 100%;
  color: white;
 
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  background: #111827;
  color: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  background: #111827;
  color: white;
  resize: none;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineModal = ({ productId, onClose , selectedProductTitle}) => {
  const [outline, setOutline] = useState('');
  const [outlineOrder, setOutlineOrder] = useState('');

  const handleSubmit = async () => {
    if (!outline || outlineOrder === '') {
      return Swal.fire('Error', 'Please fill in both fields.', 'error');
    }

    if (isNaN(outlineOrder)) {
      return Swal.fire('Invalid', 'Outline order must be a number.', 'warning');
    }

    try {
      Swal.fire({ title: 'Posting...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

      await addDoc(collection(db, 'outlines'), {
        productId,
        outline,
        outlineOrder: parseInt(outlineOrder),
        createdAt: new Date()
      });

      Swal.fire('Success', 'Outline posted successfully!', 'success');
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to post outline.', 'error');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2 style={{ marginBottom: '1rem' }}>Post Outline for {selectedProductTitle}</h2>

        <Label>Outline Content</Label>
        <TextArea
          rows="4"
          placeholder="Write the course outline here..."
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
        />

        <Label>Outline Order</Label>
        <Input
          type="number"
          placeholder="e.g. 1"
          value={outlineOrder}
          onChange={(e) => setOutlineOrder(e.target.value)}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={onClose} style={{ backgroundColor: '#ef4444' }}>Cancel</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OutlineModal;
