

// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig';
// import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
// import { FaArrowLeft, FaPlayCircle } from 'react-icons/fa';
// import { Context } from './Context';
// import CourseVideo from './CourseVideo'; // ✅ import the player

// // Styled components
// const Container = styled.div`
//   background-color: #111827;
//   color: white;
//   min-height: 100vh;
//   padding: 4rem 1.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content:center;
  
//   @media(max-width:428px){
//     padding:100px 5px;
//   }

// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   justify-content: center; /* center vertically */
//   align-items: center; /* center horizontally */
//   text-align: center;
//   max-width: 1200px;
//   width: 100%;
//   margin: 0 auto 2rem auto;
// gap:20px;

//   @media (max-width: 768px) {
//     flex-direction: column; /* keep vertical or switch to row if you prefer */
//   }
// `;

// const Image = styled.img`
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
//   margin-bottom: 1rem; /* space below the image */
// `;

// const Info = styled.div`
//   max-width: 600px;
//   margin-top: 0.5rem;
//   text-align: center;
// `;


// const Title = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
//   color: #facc15;
// `;

// const BuyButton = styled.button`
//   background-color: #374151;
//   color: white;
//   padding: 0.75rem 1.5rem;
//   font-weight: 600;
//   border-radius: 6px;
//   transition: background-color 0.3s;
//   cursor: pointer;
//   border: none;
//   margin-bottom: 30px;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:hover {
//     background-color: #3b82f6;
//   }
// `;

// const LessonList = styled.div`
//   background: #1f2937;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   max-width: 900px;
//   width: 100%;
//   margin-top: 2rem;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
// `;

// const LessonItem = styled.div`
//   background: ${({ active }) => (active ? '#374151' : 'transparent')};
//   border: 1px solid #374151;
//   border-radius: 0.5rem;
//   padding: 0.75rem 1rem;
//   margin-bottom: 0.5rem;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   &:hover {
//     background-color: #2d3748;
//   }
// `;

// const LessonTitle = styled.span`
//   font-weight: 500;
//   color: ${({ active }) => (active ? '#facc15' : '#f9fafb')};
// `;

// const EmptyMsg = styled.p`
//   color: #9ca3af;
//   text-align: center;
//   margin-top: 1.5rem;
// `;

// const VideoWrapper = styled.div`
//   width: 100%;
//   margin-top: 2rem;
//   display: flex;
//   justify-content: center;
// `;

// const UserAccessCoursePage = ({ id, onBack }) => {
//   const [product, setProduct] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const { currency } = useContext(Context);
//   const navigate = useNavigate();

//   // Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, 'products', id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.error('No such product!');
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     fetchProduct();
//     window.scrollTo(0, 0);
//   }, [id]);

//   // Fetch lessons for this product
//   useEffect(() => {
//     const fetchLessons = async () => {
//       try {
//         const lessonsRef = collection(db, 'lessons');
//         const q = query(lessonsRef, where('productId', '==', id), orderBy('lessonNumber', 'asc'));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((d) => ({
//           id: d.id,
//           ...d.data(),
//         }));
//         setLessons(data);
//       } catch (err) {
//         console.error('Error loading lessons:', err);
//       }
//     };
//     fetchLessons();
//   }, [id]);

//   if (!product) {
//     return <Container>Loading...</Container>;
//   }


// const currentVideoId = (selectedLesson?.url);


// const smoothScrollTo = (targetY, duration = 2000) => {
//   const startY = window.scrollY;
//   const distance = targetY - startY;
//   const startTime = performance.now();

//   const easeInOutQuad = (t) =>
//     t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // nice easing curve

//   const animate = (currentTime) => {
//     const elapsed = currentTime - startTime;
//     const progress = Math.min(elapsed / duration, 1);
//     const easedProgress = easeInOutQuad(progress);

//     window.scrollTo(0, startY + distance * easedProgress);

//     if (progress < 1) {
//       requestAnimationFrame(animate);
//     }
//   };

//   requestAnimationFrame(animate);
// };




//   return (
//     <Container>
//       <BuyButton onClick={onBack}>
//         <FaArrowLeft /> Back to My Courses
//       </BuyButton>
//             <ContentWrapper>
//         <Image
//           src={product.coverImageUrl}
//           alt={product.title}
//           onError={(e) => {
//             e.target.src =
//               'https://via.placeholder.com/300x200?text=Image+Not+Available';
//           }}
//         />
//         <Info>
//           <Title>{product.title}</Title>
//           <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
//             Select a lesson below to start watching.
//           </p>
//         </Info>
//       </ContentWrapper>

//         <VideoWrapper>
//           <CourseVideo videoId={currentVideoId} />
//         </VideoWrapper>
    


//       {/* ✅ Lessons Section */}
//       <LessonList>
//         <h2 style={{ color: '#facc15', marginBottom: '1rem' }}>Lessons</h2>
//         {lessons.length === 0 ? (
//           <EmptyMsg>No lessons available yet.</EmptyMsg>
//         ) : (
//           lessons.map((lesson) => (
//        <LessonItem
//   key={lesson.id}
//   active={selectedLesson?.id === lesson.id}
//   onClick={() => {
//     setSelectedLesson(lesson);
//     smoothScrollTo(350, 1500); // scrolls smoothly over 2 seconds
//   }}
// >
//   <LessonTitle active={selectedLesson?.id === lesson.id}>
//     Lesson {lesson.lessonNumber}: {lesson.title}
//   </LessonTitle>
//   <FaPlayCircle/>
// </LessonItem>
//           ))
//         )}
//       </LessonList>

    
//     </Container>
//   );
// };

// export default UserAccessCoursePage;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { FaArrowLeft, FaPlayCircle } from 'react-icons/fa';
import CourseVideo from './CourseVideo'; // ✅ video player

// Styled components
const Container = styled.div`
  background-color: #111827;
  color: white;
  min-height: 100vh;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 428px) {
    padding: 100px 5px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 2rem auto;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;

const Info = styled.div`
  max-width: 600px;
  margin-top: 0.5rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #facc15;
`;

const BuyButton = styled.button`
  background-color: #374151;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.3s;
  cursor: pointer;
  border: none;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #3b82f6;
  }
`;

const LessonList = styled.div`
  background: #1f2937;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 900px;
  width: 100%;
  margin-top: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
`;

const LessonItem = styled.div`
  background: ${({ active }) => (active ? '#374151' : 'transparent')};
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #2d3748;
  }
`;

const LessonTitle = styled.span`
  font-weight: 500;
  color: ${({ active }) => (active ? '#facc15' : '#f9fafb')};
`;

const EmptyMsg = styled.p`
  color: #9ca3af;
  text-align: center;
  margin-top: 1.5rem;
`;

const VideoWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const UserAccessCoursePage = ({ id, onBack }) => {
  const [product, setProduct] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);


  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch lessons for this product
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsRef = collection(db, 'lessons');
        const q = query(
          lessonsRef,
          where('productId', '==', id),
          orderBy('lessonNumber', 'asc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setLessons(data);
      } catch (err) {
        console.error('Error loading lessons:', err);
      }
    };
    fetchLessons();
  }, [id]);

  const currentVideoId = selectedLesson?.url;

  const smoothScrollTo = (targetY, duration = 2000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // ✅ Handle next lesson
  const handleNext = () => {
    if (!selectedLesson) return;
    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      setSelectedLesson(nextLesson);
      smoothScrollTo(350, 1500);
    }
  };

  // ✅ Handle previous lesson
  const handlePrevious = () => {
    if (!selectedLesson) return;
    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );
    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      setSelectedLesson(prevLesson);
      smoothScrollTo(350, 1500);
    }
  };

  return (
    <Container>
      <BuyButton onClick={onBack}>
        <FaArrowLeft /> Back to My Courses
      </BuyButton>

      <ContentWrapper>
        <Image
          src={product?.coverImageUrl}
          alt={product?.title}
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/300x200?text=Image+Not+Available';
          }}
        />
        <Info>
          <Title>{product?.title}</Title>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Select a lesson below to start watching.
          </p>
        </Info>
      </ContentWrapper>

      {/* ✅ Video Player with Next/Previous */}
      {selectedLesson && (
        <VideoWrapper>
          <CourseVideo
            videoId={currentVideoId}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </VideoWrapper>
      )}

      {/* ✅ Lessons Section */}
      <LessonList>
        <h2 style={{ color: '#facc15', marginBottom: '1rem' }}>Lessons</h2>
        {lessons.length === 0 ? (
          <EmptyMsg>No lessons available yet.</EmptyMsg>
        ) : (
          lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              active={selectedLesson?.id === lesson.id}
              onClick={() => {
                setSelectedLesson(lesson);
                smoothScrollTo(350, 1500);
              }}
            >
              <LessonTitle active={selectedLesson?.id === lesson.id}>
                Lesson {lesson.lessonNumber}: {lesson.title}
              </LessonTitle>
              <FaPlayCircle />
            </LessonItem>
          ))
        )}
      </LessonList>
    </Container>
  );
};

export default UserAccessCoursePage;
