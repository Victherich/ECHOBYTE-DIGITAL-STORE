// // CourseResources.jsx
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';

// const Container = styled.div`
//   background: #1f2937;
//   padding: 1.5rem;
//   border-radius: 0.75rem;
//   color: white;
//   width: 100%;
//   max-width: 800px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h3`
//   margin-top: 0;
//   margin-bottom: 1.25rem;
//   font-size: 1.25rem;
//   border-bottom: 2px solid #374151;
//   padding-bottom: 0.5rem;
//   color: #34d399;
// `;

// const ResourceGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const ResourceCard = styled.div`
//   background: #111827;
//   border: 1px solid #374151;
//   padding: 1.25rem;
//   border-radius: 0.5rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 1rem;
//   transition: border-color 0.2s;

//   &:hover {
//     border-color: #4b5563;
//   }
// `;

// const ResourceDetails = styled.div`
//   word-break: break-all;

//   h4 {
//     margin: 0 0 0.35rem 0;
//     color: #f3f4f6;
//     font-size: 1.05rem;
//   }

//   p {
//     margin: 0;
//     font-size: 0.9rem;
//     color: #9ca3af;
//     line-height: 1.4;
//   }
// `;

// const VisitButton = styled.a`
//   padding: 0.5rem 1rem;
//   background-color: #3b82f6;
//   color: white;
//   border-radius: 0.375rem;
//   text-decoration: none;
//   font-weight: 600;
//   font-size: 0.85rem;
//   white-space: nowrap;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.35rem;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

// const CourseResources = ({ courseId }) => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         if (!courseId) return;
//         const docRef = doc(db, 'products', courseId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setResources(data.resources || []);
//         }
//       } catch (error) {
//         console.error('Error fetching course resources:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, [courseId]);

//   if (loading) {
//     return <Container><p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading resources...</p></Container>;
//   }

//   if (resources.length === 0) {
//     return (
//       <Container>
//         <Title>Course Resources</Title>
//         <p style={{ color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>No resources available for this course yet.</p>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Title>Course Resources ({resources.length})</Title>
//       <ResourceGrid>
//         {resources.map((resource, index) => (
//           <ResourceCard key={index}>
//             <ResourceDetails>
//               <h4>{resource.title}</h4>
//               <p>{resource.description || 'No description provided.'}</p>
//             </ResourceDetails>
//             <VisitButton 
//               href={resource.link} 
//               target="_blank" 
//               rel="noopener noreferrer"
//             >
//               Access Link &rarr;
//             </VisitButton>
//           </ResourceCard>
//         ))}
//       </ResourceGrid>
//     </Container>
//   );
// };

// export default CourseResources;




// CourseResources.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Container = styled.div`
  background: #1f2937;
  padding: 1.5rem;
  border-radius: 0.75rem;
  color: white;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    padding: 1rem;
    border-radius: 0.5rem;
  }
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  border-bottom: 2px solid #374151;
  padding-bottom: 0.5rem;
  color: #34d399;

  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
`;

const ResourceGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResourceCard = styled.div`
  background: #111827;
  border: 1px solid #374151;
  padding: 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: #4b5563;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 0.75rem;
  }
`;

const ResourceDetails = styled.div`
  word-break: break-word;
  overflow-wrap: break-word;
  flex: 1;

  h4 {
    margin: 0 0 0.35rem 0;
    color: #f3f4f6;
    font-size: 1.05rem;

    @media (max-width: 640px) {
      font-size: 1rem;
    }
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #9ca3af;
    line-height: 1.4;

    @media (max-width: 640px) {
      font-size: 0.85rem;
    }
  }
`;

const VisitButton = styled.a`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;

  &:hover {
    background-color: #2563eb;
  }

  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
    padding: 0.6rem 1rem;
  }
`;

const CourseResources = ({ courseId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (!courseId) return;
        const docRef = doc(db, 'products', courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setResources(data.resources || []);
        }
      } catch (error) {
        console.error('Error fetching course resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [courseId]);

  if (loading) {
    return <Container><p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading resources...</p></Container>;
  }

  if (resources.length === 0) {
    return (
      <Container>
        <Title>Course Resources</Title>
        <p style={{ color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>No resources available for this course yet.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Course Resources ({resources.length})</Title>
      <ResourceGrid>
        {resources.map((resource, index) => (
          <ResourceCard key={index}>
            <ResourceDetails>
              <h4>{resource.title}</h4>
              <p>{resource.description || 'No description provided.'}</p>
            </ResourceDetails>
            <VisitButton 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Access Link &rarr;
            </VisitButton>
          </ResourceCard>
        ))}
      </ResourceGrid>
    </Container>
  );
};

export default CourseResources;