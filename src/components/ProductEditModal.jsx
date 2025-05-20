
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { use } from 'react';
import { Context } from './Context';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #1f2937;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  color: #fff;
  overflow-y:scroll;
  height:95%;
`;

const Title = styled.h2`
  color: #facc15;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #4b5563;
  background-color: #111827;
  color: #fff;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #4b5563;
  background-color: #111827;
  color: #fff;
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor:pointer;
  background-color: ${({ variant }) =>
    variant === 'cancel' ? '#6b7280' : '#10b981'};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const Select = styled.select`
    width: 100%;
  padding: 0.75rem;
  background: #374151;
  color: white;
  border: 2px solid #4b5563;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  cursor:pointer;

  &:focus {
    border-color: #facc15;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ProductEditModal = ({ product, onClose, onUpdate, selectedProductTitle }) => {
  const [formData, setFormData] = useState({ ...product });
  const {categories}=useContext(Context);

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);



 const handleChange = (e) => {
  const { name, value } = e.target;

  const parsedValue =
    name === 'priceInNgn' || name === 'priceInUsd' ? Number(value) : value;

  setFormData((prev) => ({
    ...prev,
    [name]: parsedValue,
  }));
};




  const handleSubmit = async () => {
    try {
      Swal.fire({
        title: 'Updating...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        background: '#1f2937',
        color: '#f9fafb',
      });

      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, formData);
      onUpdate(formData); // update local list
      onClose();

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        background: '#1f2937',
        color: '#f9fafb',
      });
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: error.message,
        background: '#1f2937',
        color: '#f9fafb',
      });
    }
  };

  return (
    <Overlay>
      <ModalContent>
        <Title>Edit {selectedProductTitle}</Title>
        <Field>
          <Label>Title</Label>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Author</Label>
          <Input name="author" value={formData.author} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Cover Image URL</Label>
          <Input name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Description</Label>
          <TextArea name="description" value={formData.description} onChange={handleChange} />
        </Field>
        <Field>
          <Label>URL</Label>
          <Input name="url" value={formData.url} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Price in NGN (₦)</Label>
          <Input name="priceInNgn" type="number" value={formData.priceInNgn} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Price in USD ($)</Label>
          <Input name="priceInUsd" type="number" value={formData.priceInUsd} onChange={handleChange} />
        </Field>
        <Field>
          <Label>Category</Label>
          {/* <Input name="categoryId" value={formData.categoryId} onChange={handleChange} /> */}
          <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
        </Field>
        <ButtonGroup>
          <Button variant="cancel" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
};

export default ProductEditModal;
