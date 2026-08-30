


// // ResourcesModal.jsx
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import Swal from 'sweetalert2';

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0; left: 0;
//   width: 100%; height: 100%;
//   background: rgba(0, 0, 0, 0.6);
//   display: flex; align-items: center; justify-content: center;
//   z-index: 999;
// `;

// const ModalContent = styled.div`
//   background: #1f2937;
//   padding: 2rem;
//   border-radius: 0.75rem;
//   max-width: 600px;
//   width: 100%;
//   color: white;
//   max-height: 90vh;
//   overflow-y: auto;
// `;

// const NestedModalContent = styled(ModalContent)`
//   max-width: 500px;
//   background: #111827;
//   border: 1px solid #374151;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-weight: 600;
//   font-size: 0.9rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   margin-bottom: 1rem;
//   border: 1px solid #374151;
//   border-radius: 0.5rem;
//   background: #1f2937;
//   color: white;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   margin-bottom: 1rem;
//   border: 1px solid #374151;
//   border-radius: 0.5rem;
//   background: #1f2937;
//   color: white;
//   resize: vertical;
//   min-height: 80px;
// `;

// const Button = styled.button`
//   padding: 0.6rem 1.2rem;
//   background-color: ${props => props.bgColor || '#10b981'};
//   color: white;
//   border: none;
//   border-radius: 0.5rem;
//   cursor: pointer;
//   font-weight: bold;
//   font-size: 0.85rem;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const ResourceCard = styled.div`
//   background: #111827;
//   border: 1px solid #374151;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   margin-bottom: 1rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 1rem;
// `;

// const ResourceInfo = styled.div`
//   word-break: break-all;
//   h4 { margin: 0 0 0.25rem 0; color: #34d399; }
//   p { margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #9ca3af; }
//   a { font-size: 0.85rem; color: #60a5fa; text-decoration: none; &:hover { text-decoration: underline; } }
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const ResourcesModal = ({ productId, onClose, selectedProductTitle }) => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Form states for Create/Edit
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [link, setLink] = useState('https://');
//   const [editIndex, setEditIndex] = useState(null); // null means adding a new one, number means editing

//   // Modal toggle state for the resource form
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);

//   // Fetch existing resources array from Firebase when modal opens
//   useEffect(() => {
//     const fetchProductResources = async () => {
//       try {
//         const productRef = doc(db, 'products', productId);
//         const productSnap = await getDoc(productRef);

//         if (productSnap.exists()) {
//           const data = productSnap.data();
//           // Load the 'resources' field if it exists (defaults to empty array)
//           setResources(data.resources || []);
//         }
//       } catch (error) {
//         console.error('Error fetching product resources:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProductResources();
//     }
//   }, [productId]);

//   // Handle forcing https:// persistence in the input field
//   const handleLinkChange = (e) => {
//     const val = e.target.value;
//     if (!val.startsWith('https://')) {
//       setLink('https://');
//     } else {
//       setLink(val);
//     }
//   };

//   // Save/Add or Update a single resource to local state and sync with Firestore
//   const handleSaveResource = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || link === 'https://') {
//       Swal.fire('Warning', 'Please provide a title and a valid link.', 'warning');
//       return;
//     }

//     let updatedResources = [...resources];
//     const newResource = { title, description, link };

//     if (editIndex !== null) {
//       // Update existing item
//       updatedResources[editIndex] = newResource;
//     } else {
//       // Add new item
//       updatedResources.push(newResource);
//     }

//     try {
//       Swal.fire({ title: 'Saving...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

//       const productRef = doc(db, 'products', productId);
//       await updateDoc(productRef, {
//         resources: updatedResources,
//         updatedAt: new Date()
//       });

//       setResources(updatedResources);
//       closeFormModal();
//       Swal.fire('Success', editIndex !== null ? 'Resource updated!' : 'Resource added!', 'success');
//     } catch (error) {
//       console.error(error);
//       Swal.fire('Error', 'Failed to save resource.', 'error');
//     }
//   };

//   // Open form modal for creating a new resource
//   const handleOpenAddModal = () => {
//     resetForm();
//     setIsFormModalOpen(true);
//   };

//   // Populate form fields for editing and open form modal
//   const handleEditClick = (index) => {
//     const res = resources[index];
//     setTitle(res.title);
//     setDescription(res.description);
//     setLink(res.link.startsWith('https://') ? res.link : 'https://' + res.link);
//     setEditIndex(index);
//     setIsFormModalOpen(true);
//   };

//   // Delete a resource from the list and update Firestore
//   const handleDeleteResource = async (index) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this resource?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         Swal.fire({ title: 'Deleting...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

//         const updatedResources = resources.filter((_, i) => i !== index);
//         const productRef = doc(db, 'products', productId);

//         await updateDoc(productRef, {
//           resources: updatedResources,
//           updatedAt: new Date()
//         });

//         setResources(updatedResources);
//         Swal.fire('Deleted!', 'Resource has been removed.', 'success');
//       } catch (error) {
//         console.error(error);
//         Swal.fire('Error', 'Failed to delete resource.', 'error');
//       }
//     }
//   };

//   const resetForm = () => {
//     setTitle('');
//     setDescription('');
//     setLink('https://');
//     setEditIndex(null);
//   };

//   const closeFormModal = () => {
//     resetForm();
//     setIsFormModalOpen(false);
//   };

//   return (
//     <ModalOverlay>
//       <ModalContent>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//           <h2 style={{ margin: 0 }}>
//             Manage Resources for {selectedProductTitle}
//           </h2>
//           <Button onClick={handleOpenAddModal}>+ Add Resource</Button>
//         </div>

//         {loading ? (
//           <p style={{ textAlign: 'center', margin: '2rem 0' }}>Loading resources...</p>
//         ) : (
//           <>
//             {/* List of Existing Resources */}
//             <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Existing Resources ({resources.length})</h3>
//             {resources.length === 0 ? (
//               <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem' }}>No resources added yet.</p>
//             ) : (
//               resources.map((res, index) => (
//                 <ResourceCard key={index}>
//                   <ResourceInfo>
//                     <h4>{res.title}</h4>
//                     <p>{res.description}</p>
//                     <a href={res.link} target="_blank" rel="noopener noreferrer">{res.link}</a>
//                   </ResourceInfo>
//                   <ActionButtons>
//                     <Button bgColor="#3b82f6" onClick={() => handleEditClick(index)}>Edit</Button>
//                     <Button bgColor="#ef4444" onClick={() => handleDeleteResource(index)}>Delete</Button>
//                   </ActionButtons>
//                 </ResourceCard>
//               ))
//             )}

//             {/* Close Main Modal Button */}
//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
//               <Button bgColor="#4b5563" onClick={onClose}>Close Modal</Button>
//             </div>
//           </>
//         )}

//         {/* Nested Modal for Adding/Editing a Resource */}
//         {isFormModalOpen && (
//           <ModalOverlay style={{ zIndex: 1000 }}>
//             <NestedModalContent>
//               <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#34d399' }}>
//                 {editIndex !== null ? 'Edit Resource' : 'Add New Resource'}
//               </h3>

//               <form onSubmit={handleSaveResource}>
//                 <Label>Title</Label>
//                 <Input
//                   type="text"
//                   placeholder="Resource title..."
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />

//                 <Label>Description</Label>
//                 <TextArea
//                   placeholder="Short description of the resource..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />

//                 <Label>Link (Must start with https://)</Label>
//                 <Input
//                   type="text"
//                   value={link}
//                   onChange={handleLinkChange}
//                   required
//                 />

//                 <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
//                   <Button type="submit">{editIndex !== null ? 'Update Resource' : 'Save Resource'}</Button>
//                   <Button type="button" bgColor="#6b7280" onClick={closeFormModal}>Cancel</Button>
//                 </div>
//               </form>
//             </NestedModalContent>
//           </ModalOverlay>
//         )}
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default ResourcesModal;






// ResourcesModal.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #1f2937;
  padding: 2rem;
  border-radius: 0.75rem;
  max-width: 600px;
  width: 100%;
  color: white;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 640px) {
    padding: 1.25rem;
    border-radius: 0.5rem;
    max-height: 95vh;
  }
`;

const NestedModalContent = styled(ModalContent)`
  max-width: 500px;
  background: #111827;
  border: 1px solid #374151;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;

  h2 {
    margin: 0;
    font-size: 1.25rem;

    @media (max-width: 640px) {
      font-size: 1.05rem;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  background: #1f2937;
  color: white;

  @media (max-width: 640px) {
    padding: 0.65rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  background: #1f2937;
  color: white;
  resize: vertical;
  min-height: 80px;

  @media (max-width: 640px) {
    padding: 0.65rem;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.bgColor || '#10b981'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
    padding: 0.65rem 1rem;
  }
`;

const ResourceCard = styled.div`
  background: #111827;
  border: 1px solid #374151;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const ResourceInfo = styled.div`
  word-break: break-word;
  overflow-wrap: break-word;
  flex: 1;

  h4 { 
    margin: 0 0 0.25rem 0; 
    color: #34d399; 
    font-size: 1rem;
  } 
  p { 
    margin: 0 0 0.5rem 0; 
    font-size: 0.9rem; 
    color: #9ca3af; 
  } 
  a { 
    font-size: 0.85rem; 
    color: #60a5fa; 
    text-decoration: none; 
    &:hover { text-decoration: underline; } 
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 640px) {
    flex-direction: row;
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

const FormButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

const ResourcesModal = ({ productId, onClose, selectedProductTitle }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for Create/Edit
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('https://');
  const [editIndex, setEditIndex] = useState(null); // null means adding a new one, number means editing

  // Modal toggle state for the resource form
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Fetch existing resources array from Firebase when modal opens
  useEffect(() => {
    const fetchProductResources = async () => {
      try {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          // Load the 'resources' field if it exists (defaults to empty array)
          setResources(data.resources || []);
        }
      } catch (error) {
        console.error('Error fetching product resources:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductResources();
    }
  }, [productId]);

  // Handle forcing https:// persistence in the input field
  const handleLinkChange = (e) => {
    const val = e.target.value;
    if (!val.startsWith('https://')) {
      setLink('https://');
    } else {
      setLink(val);
    }
  };

  // Save/Add or Update a single resource to local state and sync with Firestore
  const handleSaveResource = async (e) => {
    e.preventDefault();
    if (!title.trim() || link === 'https://') {
      Swal.fire('Warning', 'Please provide a title and a valid link.', 'warning');
      return;
    }

    let updatedResources = [...resources];
    const newResource = { title, description, link };

    if (editIndex !== null) {
      // Update existing item
      updatedResources[editIndex] = newResource;
    } else {
      // Add new item
      updatedResources.push(newResource);
    }

    try {
      Swal.fire({ title: 'Saving...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        resources: updatedResources,
        updatedAt: new Date()
      });

      setResources(updatedResources);
      closeFormModal();
      Swal.fire('Success', editIndex !== null ? 'Resource updated!' : 'Resource added!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to save resource.', 'error');
    }
  };

  // Open form modal for creating a new resource
  const handleOpenAddModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  // Populate form fields for editing and open form modal
  const handleEditClick = (index) => {
    const res = resources[index];
    setTitle(res.title);
    setDescription(res.description);
    setLink(res.link.startsWith('https://') ? res.link : 'https://' + res.link);
    setEditIndex(index);
    setIsFormModalOpen(true);
  };

  // Delete a resource from the list and update Firestore
  const handleDeleteResource = async (index) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this resource?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({ title: 'Deleting...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

        const updatedResources = resources.filter((_, i) => i !== index);
        const productRef = doc(db, 'products', productId);

        await updateDoc(productRef, {
          resources: updatedResources,
          updatedAt: new Date()
        });

        setResources(updatedResources);
        Swal.fire('Deleted!', 'Resource has been removed.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to delete resource.', 'error');
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLink('https://');
    setEditIndex(null);
  };

  const closeFormModal = () => {
    resetForm();
    setIsFormModalOpen(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Manage Resources for {selectedProductTitle}</h2>
          <Button onClick={handleOpenAddModal}>+ Add Resource</Button>
        </ModalHeader>

        {loading ? (
          <p style={{ textAlign: 'center', margin: '2rem 0' }}>Loading resources...</p>
        ) : (
          <>
            {/* List of Existing Resources */}
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Existing Resources ({resources.length})</h3>
            {resources.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem' }}>No resources added yet.</p>
            ) : (
              resources.map((res, index) => (
                <ResourceCard key={index}>
                  <ResourceInfo>
                    <h4>{res.title}</h4>
                    <p>{res.description}</p>
                    <a href={res.link} target="_blank" rel="noopener noreferrer">{res.link}</a>
                  </ResourceInfo>
                  <ActionButtons>
                    <Button bgColor="#3b82f6" onClick={() => handleEditClick(index)}>Edit</Button>
                    <Button bgColor="#ef4444" onClick={() => handleDeleteResource(index)}>Delete</Button>
                  </ActionButtons>
                </ResourceCard>
              ))
            )}

            {/* Close Main Modal Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <Button bgColor="#4b5563" onClick={onClose}>Close Modal</Button>
            </div>
          </>
        )}

        {/* Nested Modal for Adding/Editing a Resource */}
        {isFormModalOpen && (
          <ModalOverlay style={{ zIndex: 1000 }}>
            <NestedModalContent>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#34d399' }}>
                {editIndex !== null ? 'Edit Resource' : 'Add New Resource'}
              </h3>

              <form onSubmit={handleSaveResource}>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Resource title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Label>Description</Label>
                <TextArea
                  placeholder="Short description of the resource..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Label>Link (Must start with https://)</Label>
                <Input
                  type="text"
                  value={link}
                  onChange={handleLinkChange}
                  required
                />

                <FormButtonContainer>
                  <Button type="submit">{editIndex !== null ? 'Update Resource' : 'Save Resource'}</Button>
                  <Button type="button" bgColor="#6b7280" onClick={closeFormModal}>Cancel</Button>
                </FormButtonContainer>
              </form>
            </NestedModalContent>
          </ModalOverlay>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResourcesModal;