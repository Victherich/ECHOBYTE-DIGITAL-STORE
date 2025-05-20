
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const PageContainer = styled.div`
//   min-height: 100vh;
//   background-color: #111827;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   padding: 2rem;
// `;

// const Card = styled.div`
//   background-color: #1f2937;
//   border-radius: 1rem;
//   padding: 2rem;
//   max-width: 500px;
//   width: 100%;
//   text-align: center;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.3);
// `;

// const AvatarWrap = styled.div`
//     display:flex;
//     align-items: center;
//   justify-content: center;
//   width:100%;
// `

// const Avatar = styled.div`
//   background-color: #facc15; /* A yellow/gold tone */
//   color: #111827; /* Dark text */
//   font-weight: bold;
//   border-radius: 9999px;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.2rem;
//   text-transform: uppercase;
// `;

// const Heading = styled.h2`
//   font-size: 1.8rem;
//   color: #facc15;
//   margin-bottom: 0.5rem;
// `;

// const Text = styled.p`
//   color: #e5e7eb;
//   margin: 0.25rem 0;
//   font-size: 0.95rem;
// `;

// const Highlight = styled.span`
//   color: #facc15;
//   font-weight: 600;
// `;

// const AdminProfile = () => {
//   const [user, setUser] = useState(null);
// //   console.log(user);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   if (!user) {
//     return (
//       <PageContainer>
//         <Card>
//           <Heading>Loading User...</Heading>
//         </Card>
//       </PageContainer>
//     );
//   }

//   return (
//     <PageContainer>
//       <Card>
//         <AvatarWrap>
// <Avatar>{user?.displayName?.charAt(0) || 'U'}</Avatar>
//         </AvatarWrap>
        
//         <Heading>{user.displayName || 'No Name Provided'}</Heading>
//         <Text><Highlight>Email:</Highlight> {user.email}</Text>
//         <Text><Highlight>Phone:</Highlight> {user.phone}</Text>

//         <Text><Highlight>Joined:</Highlight> {new Date(user.metadata.creationTime).toLocaleString()}</Text>
//       </Card>
//     </PageContainer>
//   );
// };

// export default AdminProfile;




import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // adjust path as needed
import Swal from 'sweetalert2';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 2rem;
  width:100%;


  @media(max-width:428px){
    padding:1rem;
  }
`;

const Card = styled.div`
  background-color: #1f2937;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Avatar = styled.div`
  background-color: #facc15;
  color: #111827;
  font-weight: bold;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  color: #e5e7eb;
  margin: 0.25rem 0;
  font-size: 0.95rem;
`;

const Highlight = styled.span`
  color: #facc15;
  font-weight: 600;
`;

const PhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const EditInput = styled.input`
  padding: 0.4rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #9ca3af;
  background: #374151;
  color: white;
  font-size: 0.9rem;
`;

const EditButton = styled.button`
  background: #facc15;
  color: #111827;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #eab308;
  }
`;

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docSnap = await getDoc(doc(db, 'admins', currentUser.uid));
        if (docSnap.exists()) {
          setPhone(docSnap.data().phone || '');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhoneSave = async () => {
    try {
      await updateDoc(doc(db, 'admins', user.uid), {
        phone: phone,
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Phone number updated successfully.',
      });

      setIsEditing(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update phone number.',
      });
    }
  };

  if (!user) {
    return (
      <PageContainer>
        <Card>
          <Heading>Loading User...</Heading>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <AvatarWrap>
          <Avatar>{user?.displayName?.charAt(0) || 'U'}</Avatar>
        </AvatarWrap>

        <Heading>{user.displayName || 'No Name Provided'}</Heading>
        <Text><Highlight>Email:</Highlight> {user.email}</Text>

        <PhoneWrapper>
          <Highlight>Phone:</Highlight>
          {isEditing ? (
            <>
              <EditInput
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <EditButton onClick={handlePhoneSave}>Save</EditButton>
              <EditButton onClick={()=>setIsEditing(false)} style={{backgroundColor:"gray", color:"white"}}>Cancel</EditButton>
            </>
          ) : (
            <>
              <Text style={{ margin: 0 }}>{phone || 'Not Provided'}</Text>
              <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            </>
          )}
        </PhoneWrapper>

        <Text><Highlight>Joined:</Highlight> {new Date(user.metadata.creationTime).toLocaleString()}</Text>
      </Card>
    </PageContainer>
  );
};

export default AdminProfile;
