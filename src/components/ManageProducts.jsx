

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { Context } from './Context';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import OutlineModal from './PostOutlineModal';
import ViewOutlineModal from './ViewOutlinesModal';
import { use } from 'react';
import ProductEditModal from './ProductEditModal';
import logo from '../Images/logo.jpeg'

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #111827;
  padding: 2rem;
  color: #f9fafb;

  @media(max-width: 428px) {
    padding: 0.75rem;
  }
`;


const Title = styled.h3`
  font-size: 1.5rem;
  color: #facc15;
  margin-bottom: 0.5rem;
 text-align:center;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #1f2937;
  color: #f9fafb;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #1f2937;
  color: #f9fafb;
  margin-bottom:20px;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

// const ProductCard = styled.div`
//   background-color: #1f2937;
//   border-radius: 0.75rem;
//   padding: 1.5rem;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
// `;

const ProductCard = styled.div`
  background: linear-gradient(to bottom right, #1f2937, #374151);
  border: 1px solid #4b5563;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: #facc15;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.2);
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.25rem;
  color:#facc15;
  margin-bottom: 0.5rem;
`;



const ProductDescription = styled.p`
  font-size: 0.95rem;
  color: #d1d5db;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap:wrap;
  margin-bottom:20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #ffffff;
  transition: background-color 0.2s;

  background-color: ${({ variant }) =>
    variant === 'edit' ? '#3b82f6' :
    variant === 'delete' ? '#ef4444' :
    '#10b981'};

  &:hover {
    opacity: 0.85;
  }
`;



const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Price = styled.h3`
  font-size: 1.25rem;
  color:#facc15;
  margin-bottom: 0.5rem;
`

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const {categories}=useContext(Context);
  const navigate = useNavigate();
  const [showOutlineModal, setShowOutlineModal]=useState(false);
   const [showOutlineModal2, setShowOutlineModal2]=useState(false);
  const [selectedProductId, setSelectedProductId]=useState(null);
  const [selectedProductTitle, setSelectedProductTitle]=useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('') ;
   const [expandedProduct, setExpandedProduct] = useState(null); // new state

   console.log(products)



 

  const fetchByCategory = async () => {
    if (!selectedCategory) return Swal.fire({text:'Please select a category.'});

     Swal.fire({
          title: 'Please wait...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

    try {
      const q = query(collection(db, 'products'), where('categoryId', '==', selectedCategory));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }finally{
      Swal.close();
    }
  };



// const handleDelete = async (id) => {
//   const result = await Swal.fire({
//     title: 'Are you sure?',
//     text: 'This product will be permanently deleted.',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#ef4444',
//     cancelButtonColor: '#6b7280',
//     confirmButtonText: 'Yes, delete it!',
//     background: '#1f2937',
//     color: '#f9fafb'
//   });

//   if (result.isConfirmed) {
//     try {
//       Swal.fire({
//         title: 'Deleting...',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//         background: '#1f2937',
//         color: '#f9fafb'
//       });

//       await deleteDoc(doc(db, 'products', id));
//       setProducts(prev => prev.filter(p => p.id !== id));

//       Swal.fire({
//         title: 'Deleted!',
//         text: 'Product has been deleted.',
//         icon: 'success',
//         background: '#1f2937',
//         color: '#f9fafb'
//       });

//     } catch (error) {
//       console.error('Error deleting product:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to delete the product.',
//         icon: 'error',
//         background: '#1f2937',
//         color: '#f9fafb'
//       });
//     }
//   }
// };





// const handleDelete = async (product) => {
//   const result = await Swal.fire({
//     title: 'Are you sure?',
//     text: 'This product will be permanently deleted.',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#ef4444',
//     cancelButtonColor: '#6b7280',
//     confirmButtonText: 'Yes, delete it!',
//     background: '#1f2937',
//     color: '#f9fafb'
//   });

//   if (!result.isConfirmed) return;

//   try {
//     Swal.fire({
//       title: 'Deleting...',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//       background: '#1f2937',
//       color: '#f9fafb'
//     });

//     // 🧠 Extract public ID from image URL
//     const urlParts = product.coverImageUrl.split('/');
//     const fileName = urlParts[urlParts.length - 1];
//     const publicId = fileName.split('.')[0];

//     // ✅ Call your Next.js delete-image API
//     // const res = await fetch('https://echobyteconcept.vercel.app/api/deleteproductimage', {
//        const res = await fetch('http://localhost:3000/api/deleteproductimage', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ public_id:publicId }),
//     });

//     if (!res.ok) {
//       throw new Error('Failed to delete image from Cloudinary');
//     }

//     // ✅ Delete the product from Firestore
//     await deleteDoc(doc(db, 'products', product.id));
//     setProducts(prev => prev.filter(p => p.id !== product.id));

//     Swal.fire({
//       title: 'Deleted!',
//       text: 'Product and image deleted.',
//       icon: 'success',
//       background: '#1f2937',
//       color: '#f9fafb'
//     });
//   } catch (error) {
//     console.error('Deletion error:', error);
//     Swal.fire({
//       title: 'Error!',
//       text: 'Something went wrong during deletion.',
//       icon: 'error',
//       background: '#1f2937',
//       color: '#f9fafb'
//     });
//   }
// };




const handleDelete = async (product) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This product will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!',
    background: '#1f2937',
    color: '#f9fafb'
  });

  if (!result.isConfirmed) return;

  try {
    Swal.fire({
      title: 'Deleting...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: '#1f2937',
      color: '#f9fafb'
    });

    // Extract public ID correctly from URL
    const urlParts = product.coverImageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const publicId = fileName.split('.')[0]; // e.g., "abc123"

    console.log(publicId);


    // Call your API endpoint with the expected JSON body key
    const res = await fetch('http://localhost:3000/api/deleteproductimage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId }),
    });

    if (!res.ok) {
      throw new Error('Failed to delete image from Cloudinary');
    }

    // Delete Firestore document and update local state
    await deleteDoc(doc(db, 'products', product.id));
    setProducts(prev => prev.filter(p => p.id !== product.id));

    Swal.fire({
      title: 'Deleted!',
      text: 'Product and image deleted.',
      icon: 'success',
      background: '#1f2937',
      color: '#f9fafb'
    });
  } catch (error) {
    console.error('Deletion error:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong during deletion.',
      icon: 'error',
      background: '#1f2937',
      color: '#f9fafb'
    });
  }
};






 const handleView = (id) => {
  window.open(`/productdetail/${id}`, '_blank');
};


  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );




  useEffect(()=>{
    const obj = categories.find((e)=>e.id===selectedCategory);
    setSelectedCategoryName(obj?.name);
  },[products])

  





  const handleEdit = (id) => {
  const selected = products.find(p => p.id === id);
  if (selected) {
    setCurrentProduct(selected);
    setEditModalOpen(true);
  }
};

const handleProductUpdate = (updatedProduct) => {
  setProducts((prev) =>
    prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  );
};


 const handleExpand = (id) => {
    setExpandedProduct(prev => prev === id ? null : id);
  };





  // changuing product image
const handleChangeProductImage = async (product) => {
  const { value: file } = await Swal.fire({
    title: 'Select new product image',
    input: 'file',
    inputAttributes: {
      accept: 'image/*',
      'aria-label': 'Upload new product image'
    },
    background: '#1f2937',
    color: '#f9fafb',
    showCancelButton: true,
    confirmButtonText: 'Upload',
  });

  if (!file) return;

  try {
    Swal.fire({
      title: 'Updating image...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#1f2937',
      color: '#f9fafb'
    });

    // Extract public ID correctly from URL
    const urlParts = product.coverImageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const publicId = fileName.split('.')[0]; // e.g., "abc123"

    console.log(publicId);
    

    // Call your API endpoint with the expected JSON body key
    const res = await fetch('http://localhost:3000/api/deleteproductimage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId }),
    });

    if (!res.ok) {
      throw new Error('Failed to delete image from Cloudinary');
    }




    // ✅ Upload new image to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'echobyte_digital_store_upload');
    formData.append('cloud_name', 'ddh4wrbok');

    const uploadRes = await fetch('https://api.cloudinary.com/v1_1/ddh4wrbok/image/upload', {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) throw new Error('Failed to upload new image');

    const newImageUrl = uploadData.secure_url;

    // ✅ Update Firestore with new image URL
    await updateDoc(doc(db, 'products', product.id), {
      coverImageUrl: newImageUrl,
    });

    // Optional: refresh product state
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, coverImageUrl: newImageUrl } : p))
    );

    Swal.fire({
      title: 'Success!',
      text: 'Product image updated successfully.',
      icon: 'success',
      background: '#1f2937',
      color: '#f9fafb'
    });

  } catch (error) {
    console.error('Image update error:', error);
    Swal.fire({
      title: 'Error!',
      text: error.message || 'Something went wrong.',
      icon: 'error',
      background: '#1f2937',
      color: '#f9fafb'
    });
  }
};



  return (
    <PageContainer>
      <Title style={{color:"white"}}>Manage Products</Title>
      <Controls>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>

        <Button onClick={fetchByCategory}>Get Products</Button>
      </Controls>


      {products.length>0&&<Title>{selectedCategoryName}</Title>}

      {products.length > 0 && (

        
        <SearchInput
          type="text"
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {products.length<=0?
   
 <h3>
      No product found for this category
    </h3>
  :
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.coverImageUrl} alt={product.title.slice(0,10)}/>
            <ProductTitle style={{color:"white"}}>{product.title.toUpperCase()}</ProductTitle>
            <ProductDescription>{product.description.slice(0,50)}...</ProductDescription>
       

          
  <Price>₦{new Intl.NumberFormat('en-US').format(product.priceInNgn)}</Price>

  <Price>${new Intl.NumberFormat('en-US').format(product.priceInUsd)}</Price>

<p onClick={() => handleExpand(product.id)}
  style={{cursor:"pointer", textDecoration:"underline", fontStyle:"italic", marginBottom:"20px"}}>
                {expandedProduct === product.id ? 'Collapse' : 'Expand'}
              </p>
            {expandedProduct === product.id && <>
            <ButtonGroup>
              <ActionButton variant="edit" onClick={() => {handleEdit(product.id);setSelectedProductTitle(product.title)}}>Edit</ActionButton>
              <ActionButton variant="delete" onClick={() => handleDelete(product)}>Delete</ActionButton>
              <ActionButton variant="view" onClick={() => handleView(product.id)}>View in new tab</ActionButton>
              

            </ButtonGroup>
            <ButtonGroup>
            <ActionButton variant="view" onClick={() => handleChangeProductImage(product)}>
  Change Product Image
</ActionButton>
 </ButtonGroup>
            <h3 style={{textDecoration:"underline"}}>Outlines</h3>
            <ButtonGroup>
              <ActionButton variant="view" onClick={() => {setShowOutlineModal(true);setSelectedProductId(product.id);setSelectedProductTitle(product.title)}}>Post Outline</ActionButton>
               <ActionButton variant="view" onClick={() => {setShowOutlineModal2(true);setSelectedProductId(product.id);setSelectedProductTitle(product.title)}}>Veiw / Edit Outline</ActionButton>
           
            </ButtonGroup>
            </>}
          </ProductCard>
        ))}
      </ProductGrid>}

      {showOutlineModal && (
  <OutlineModal
    productId={selectedProductId}
     selectedProductTitle={selectedProductTitle}
    onClose={() => {
      setShowOutlineModal(false);
      setSelectedProductId(null);
    }}
  />
)}

 
      {showOutlineModal2 && (
        <ViewOutlineModal
          productId={selectedProductId}
          onClose={() => setShowOutlineModal2(false)}
          selectedProductTitle={selectedProductTitle}
        />
      )}



      {editModalOpen && currentProduct && (
  <ProductEditModal
    product={currentProduct}
    onClose={() => setEditModalOpen(false)}
    onUpdate={handleProductUpdate}
    selectedProductTitle={selectedProductTitle}
  />
)}



    </PageContainer>
  );
};

export default ManageProducts;
