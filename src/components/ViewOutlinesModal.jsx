
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #1f2937;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  color: #f9fafb;
    overflow-y:scroll;
  height:90vh;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: gray;
  border: none;
  color: #f9fafb;
  font-size: 0.8rem;
  cursor: pointer;
  padding:5px;
`;

const OutlineList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OutlineItem = styled.li`
  background-color: #374151;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const OutlineText = styled.p`
  margin: 0 0 0.5rem 0;
`;

const OutlineOrder = styled.span`
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ variant }) =>
    variant === 'edit' ? '#3b82f6' :
    variant === 'delete' ? '#ef4444' :
    '#10b981'};
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #6b7280;
  border-radius: 0.375rem;
  background-color: #1f2937;
  color: #f9fafb;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ViewOutlineModal = ({ productId, onClose , selectedProductTitle }) => {
  const [outlines, setOutlines] = useState([]);
  const [editingOutlineId, setEditingOutlineId] = useState(null);
  const [editedOutline, setEditedOutline] = useState('');
  const [editedOrder, setEditedOrder] = useState('');

  useEffect(() => {
    const fetchOutlines = async () => {
      try {
        const q = query(
          collection(db, 'outlines'),
          where('productId', '==', productId),
          orderBy('outlineOrder', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const outlinesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOutlines(outlinesData);
      } catch (error) {
        console.error('Error fetching outlines:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch outlines.',
          icon: 'error',
          background: '#1f2937',
          color: '#f9fafb',
        });
      }
    };

    fetchOutlines();
  }, [productId]);

  const handleEdit = (outline) => {
    setEditingOutlineId(outline.id);
    setEditedOutline(outline.outline);
    setEditedOrder(outline.outlineOrder);
  };

  const handleSave = async (id) => {
    try {
      const outlineRef = doc(db, 'outlines', id);
      await updateDoc(outlineRef, {
        outline: editedOutline,
        outlineOrder: Number(editedOrder),
      });
      setOutlines(prevOutlines =>
        prevOutlines.map(outline =>
          outline.id === id
            ? { ...outline, outline: editedOutline, outlineOrder: Number(editedOrder) }
            : outline
        )
      );
      setEditingOutlineId(null);
      Swal.fire({
        title: 'Success!',
        text: 'Outline updated successfully.',
        icon: 'success',
        background: '#1f2937',
        color: '#f9fafb',
      });
    } catch (error) {
      console.error('Error updating outline:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update outline.',
        icon: 'error',
        background: '#1f2937',
        color: '#f9fafb',
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This outline will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#f9fafb',
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'outlines', id));
        setOutlines(prevOutlines => prevOutlines.filter(outline => outline.id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Outline has been deleted.',
          icon: 'success',
          background: '#1f2937',
          color: '#f9fafb',
        });
      } catch (error) {
        console.error('Error deleting outline:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete outline.',
          icon: 'error',
          background: '#1f2937',
          color: '#f9fafb',
        });
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Outlines for {selectedProductTitle}</ModalTitle>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalHeader>
        <OutlineList>
          {outlines.map(outline => (
            <OutlineItem key={outline.id}>
              {editingOutlineId === outline.id ? (
                <>
                  <Input
                    type="text"
                    value={editedOutline}
                    onChange={(e) => setEditedOutline(e.target.value)}
                    placeholder="Outline"
                  />
                  <Input
                    type="number"
                    value={editedOrder}
                    onChange={(e) => setEditedOrder(e.target.value)}
                    placeholder="Outline Order"
                  />
                  <SaveButton onClick={() => handleSave(outline.id)}>Save</SaveButton>
                  <SaveButton onClick={() => setEditingOutlineId(null)} style={{backgroundColor:"gray", marginLeft:"10px"}}>Cancel</SaveButton>
                </>
              ) : (
                <>
                  <OutlineText>{outline.outline}</OutlineText>
                  <OutlineOrder>Order: {outline.outlineOrder}</OutlineOrder>
                  <ActionButtons>
                    <ActionButton variant="edit" onClick={() => handleEdit(outline)}>Edit</ActionButton>
                    <ActionButton variant="delete" onClick={() => handleDelete(outline.id)}>Delete</ActionButton>
                  </ActionButtons>
                </>
              )}
            </OutlineItem>
          ))}
        </OutlineList>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ViewOutlineModal;
