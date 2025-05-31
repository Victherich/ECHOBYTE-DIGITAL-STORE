
// import React, { useContext, useState } from 'react';
// import styled from 'styled-components';

// import {db} from '../firebaseConfig'
// import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import Swal from 'sweetalert2';
// import { Context } from './Context';


// const Container = styled.div`
//   min-height: 100vh;
//   background-color: #111827;
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;



//   @media(max-width:428px){
//     padding:5px;
//   }
// `;

// const FormWrapper = styled.div`
//   background-color: #1f2937;
//   padding: 2rem;
//   border-radius: 1rem;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
//   width: 100%;
//   max-width: 720px;

//   @media(max-width:428px){
//     padding:50px 10px;
//   }
// `;

// const Title = styled.h1`
//   text-align: center;
//   font-size: 1.8rem;
//   margin-bottom: 2rem;
//   color: #facc15;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: 600;
//   margin-bottom: 0.5rem;
//   color: #e5e7eb;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   background: #374151;
//   color: white;
//   border: 2px solid #4b5563;
//   border-radius: 8px;
//   margin-bottom: 1.5rem;
//   font-size: 1rem;

//   &:focus {
//     border-color: #facc15;
//     outline: none;
//   }

//   &::placeholder {
//     color: #9ca3af;
//   }
// `;

// const TextArea = styled.textarea`
//     width: 100%;
//   padding: 0.75rem;
//   background: #374151;
//   color: white;
//   border: 2px solid #4b5563;
//   border-radius: 8px;
//   margin-bottom: 1.5rem;
//   font-size: 1rem;

//   &:focus {
//     border-color: #facc15;
//     outline: none;
//   }

//   &::placeholder {
//     color: #9ca3af;
//   }
//   resize: vertical;
// `;

// const Select = styled.select`
//     width: 100%;
//   padding: 0.75rem;
//   background: #374151;
//   color: white;
//   border: 2px solid #4b5563;
//   border-radius: 8px;
//   margin-bottom: 1.5rem;
//   font-size: 1rem;
//   cursor:pointer;

//   &:focus {
//     border-color: #facc15;
//     outline: none;
//   }

//   &::placeholder {
//     color: #9ca3af;
//   }
// `;

// const Button = styled.button`
//   background-color: #facc15;
//   color: #111827;
//   font-weight: bold;
//   font-size: 1rem;
//   padding: 0.75rem;
//   border: none;
//   border-radius: 0.75rem;
//   width: 100%;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #eab308;
//   }
// `;

// export default function PostAProduct() {
//     const {categories}=useContext(Context); 
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     url: '',
//     categoryId: '',
//     coverImageUrl: '',
//     author:'ECHOBYTE CONCEPT'
//   });

//   const [image, setImage]=useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange= async (e)=>{
//     const file = e.target.files[0];
//     console.log(file);
// if(!file) return;

// const data = new FormData();
// data.append('file', file)
// data.append('upload_preset', 'echobyte_digital_store_upload')
// data.append('cloud_name', 'ddh4wrbok' )

// const res = await fetch('https://api.cloudinary.com/v1_1/ddh4wrbok/image/upload',{
//   method:'post',
//   body:data
// })

// const uploadedImageUrl = await res.json();
// console.log(uploadedImageUrl)

//   }


//   const handleSubmit1 = (e)=>{
//     e.preventDefault();




//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: 'Posting product...',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       await addDoc(collection(db, 'products'), {
//         ...formData,
//         price: Number(formData.price),
//         createdAt: Timestamp.now(),
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Product Posted!',
//         text: 'Your product was added successfully!',
//       });

//       setFormData({
//         title: '',
//         description: '',
//         price: '',
//         url: '',
//         categoryId: '',
//         coverImageUrl: '',
//       });
//     } catch (error) {
//       console.error('Error adding document: ', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Post',
//         text: 'Something went wrong while posting the product. Please try again!',
//       });
//     }
//   };

//   return (
//     <Container>
//       <FormWrapper>
//         <Title>Post a New Digital Course</Title>
//         <form onSubmit={handleSubmit1}>
//           <div>
//             <Label>Product Title</Label>
//             <Input
//               type="text"
//               name="title"
//               value={formData.title.toUpperCase()}
//               onChange={handleChange}
//               placeholder="Enter your product Title eg. Digital marketing course"
//               required
//             />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <TextArea
//               name="description"
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Detailed Description of your product"
//               required
//             />
//           </div>
//           <div>
//             <Label>Price ($)</Label>
//             <Input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="e.g., 29.99"
//               required
//             />
//           </div>
//           <div>
//             <Label>Product URL</Label>
//             <Input
//               type="url"
//               name="url"
//               value={formData.url}
//               onChange={handleChange}
//               placeholder="https://yourcourse.com"
//               required
//             />
//           </div>
//           <div>
//             <Label>Cover Image URL</Label>
//             <Input
//             type='file'
//             onChange={handleFileChange}
//             />
            
//             <Input
//               type="url"
//               name="coverImageUrl"
//               value={formData.coverImageUrl}
//               onChange={handleChange}
//               placeholder="https://image.url/cover.png"
//               required
//             />
//           </div>
//           <div>
//             <Label>Select Category</Label>
//             <Select
//               name="categoryId"
//               value={formData.categoryId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a Category</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </Select>


//           </div>

//            <div>
//             <Label>AUTHOR</Label>
//             <Input
//               type="url"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               placeholder="Author"
//             //   required
//             disabled
//             />
//           </div>
//           <Button type="submit">Post Course</Button>
//         </form>
//       </FormWrapper>
//     </Container>
//   );
// }




import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Context } from './Context';

const Container = styled.div`
  min-height: 100vh;
  background-color: #111827;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media (max-width: 428px) {
    padding: 5px;
  }
`;

const FormWrapper = styled.div`
  background-color: #1f2937;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 720px;
  @media (max-width: 428px) {
    padding: 50px 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #facc15;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #e5e7eb;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: #374151;
  color: white;
  border: 2px solid #4b5563;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  &:focus {
    border-color: #facc15;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: #374151;
  color: white;
  border: 2px solid #4b5563;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  &:focus {
    border-color: #facc15;
    outline: none;
  }
  &::placeholder {
    color: #9ca3af;
  }
  resize: vertical;
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
  cursor: pointer;
  &:focus {
    border-color: #facc15;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #facc15;
  color: #111827;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 0.75rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #eab308;
  }
`;

export default function PostAProduct() {
  const { categories } = useContext(Context);


 

  const [formData, setFormData] = useState({
  title: '',
  description: '',
  priceInNgn: '',
  priceInUsd:'',
  url: '',
  categoryId: '',
  coverImageUrl: '',
  author: 'ECHOBYTE CONCEPT',
});

const [imageFile, setImageFile] = useState(null); // store file here
const [previewUrl, setPreviewUrl] = useState(null); // local preview

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Just store the image


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // this generates a preview link
  }
};

// Submit: upload image THEN upload form
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!imageFile) {
    return Swal.fire({ icon: 'warning', text: 'Please select a cover image.' });
  }

  Swal.fire({ title: 'Uploading image...', allowOutsideClick: false });
  Swal.showLoading();

  try {
    // Upload image to Cloudinary
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'echobyte_digital_store_upload');
    data.append('cloud_name', 'ddh4wrbok');
    data.append('folder', 'digital_products');

    const res = await fetch('https://api.cloudinary.com/v1_1/ddh4wrbok/image/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    const imageUrl = result.secure_url;

    // Now upload form data to Firestore
    await addDoc(collection(db, 'products'), {
      ...formData,
      coverImageUrl: imageUrl,
      priceInNgn: Number(formData.priceInNgn),
      priceInUsd:Number(formData.priceInUsd),
      createdAt: Timestamp.now(),
    });

    Swal.fire({
      icon: 'success',
      title: 'Product Posted!',
      text: 'Your product was added successfully!',
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      priceInNgn: '',
      priceInUsd:'',
      url: '',
      categoryId: '',
      coverImageUrl: '',
      author: 'ECHOBYTE CONCEPT',
    });
    setImageFile(null);
    setPreviewUrl(null);
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({ icon: 'error', title: 'Upload Failed', text: 'Try again.' });
  }
};


  return (
    <Container>
      <FormWrapper>
        <Title>Post a New Digital Course</Title>
        <form onSubmit={handleSubmit}>
          <Label>Product Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title.toUpperCase()}
            onChange={handleChange}
            placeholder="Enter your product Title"
            required
          />

          <Label>Description</Label>
          <TextArea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description"
            required
          />

          <Label>Price in NGN (₦)</Label>
          <Input
            type="number"
            name="priceInNgn"
            value={formData.priceInNgn}
            onChange={handleChange}
            placeholder="e.g. 29.99"
            required
          />

           <Label>Price in USD ($)</Label>
          <Input
            type="number"
            name="priceInUsd"
            value={formData.priceInUsd}
            onChange={handleChange}
            placeholder="e.g. 29.99"
            required
          />

          <Label>Product URL</Label>
          Upload your digital product, to a public accessible link like Google drive and enter the link here:
          <Input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://yourproductlink.com"
            required
          />

          <Label>Upload Cover Image</Label>
          Upload the image you want to display as the product cover image:
<Input type="file" onChange={handleFileChange} required />

{previewUrl && (
  <img
    src={previewUrl}
    alt="Cover Preview"
    style={{
      width: '300px',
      marginBottom: '1rem',
      borderRadius: '8px',
      objectFit: 'cover',
    }}
  />
)}


          <Label>Select Category</Label>
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

          <Label>Author</Label>
          <Input type="text" name="author" value={formData.author} disabled />

          <Button type="submit">Post Course</Button>
        </form>
      </FormWrapper>
    </Container>
  );
}

