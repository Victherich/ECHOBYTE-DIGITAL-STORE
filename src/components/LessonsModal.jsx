
// // src/components/LessonsModal.jsx
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { db } from '../firebaseConfig';
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   serverTimestamp,
// } from 'firebase/firestore';
// import Swal from 'sweetalert2';

// const Backdrop = styled.div`
//   position: fixed;
//   top: 0; left: 0;
//   width: 100vw; height: 100vh;
//   background-color: rgba(0, 0, 0, 0.85);
//   display: flex; justify-content: center; align-items: center;
//   z-index: 1000;
// `;

// const ModalBox = styled.div`
//   background: #1f2937;
//   color: white;
//   padding: 2rem;
//   border-radius: 1rem;
//   width: 90%;
//   max-width: 650px;
//   max-height: 85vh;
//   overflow-y: auto;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   margin-bottom: 1rem;
//   border-radius: 0.5rem;
//   border: 1px solid #374151;
//   background: #111827;
//   color: white;
//   &:focus {
//     outline: none;
//     border-color: #facc15;
//   }
// `;

// const Button = styled.button`
//   padding: 0.75rem 1.25rem;
//   border: none;
//   border-radius: 0.5rem;
//   background-color: ${({ variant }) =>
//     variant === 'danger'
//       ? '#ef4444'
//       : variant === 'edit'
//       ? '#3b82f6'
//       : '#10b981'};
//   color: white;
//   cursor: pointer;
//   font-weight: bold;
//   margin-right: 0.5rem;

//   &:hover {
//     opacity: 0.85;
//   }
// `;

// const LessonCard = styled.div`
//   background: #374151;
//   padding: 1rem;
//   border-radius: 0.75rem;
//   margin-bottom: 0.75rem;
// `;

// export default function LessonsModal({ productId, selectedProductTitle, onClose }) {
//   const [lessons, setLessons] = useState([]);
//   const [newLesson, setNewLesson] = useState({ title: '', url: '' });
//   const [editingLesson, setEditingLesson] = useState(null);

//   // ✅ Fetch lessons for this product only
//   const fetchLessons = async () => {
//     try {
//       const lessonsRef = collection(db, 'lessons');
//       const q = query(lessonsRef, where('productId', '==', productId));
//       const snapshot = await getDocs(q);
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setLessons(data);
//     } catch (err) {
//       console.error('Error fetching lessons:', err);
//       Swal.fire('Error', 'Failed to load lessons', 'error');
//     }
//   };

//   useEffect(() => {
//     fetchLessons();
//   }, [productId]);

//   // ✅ Add or update lesson
//   const handleSaveLesson = async () => {
//     if (!newLesson.title.trim() || !newLesson.url.trim()) {
//       return Swal.fire({ icon: 'warning', text: 'Title and URL are required!' });
//     }

//     try {
//       if (editingLesson) {
//         const ref = doc(db, 'lessons', editingLesson.id);
//         await updateDoc(ref, newLesson);
//         setLessons((prev) =>
//           prev.map((l) => (l.id === editingLesson.id ? { ...l, ...newLesson } : l))
//         );
//         Swal.fire('Updated!', 'Lesson updated successfully', 'success');
//       } else {
//         const lessonsRef = collection(db, 'lessons');
//         const docRef = await addDoc(lessonsRef, {
//           ...newLesson,
//           productId,
//           createdAt: serverTimestamp(),
//         });
//         setLessons((prev) => [...prev, { id: docRef.id, ...newLesson }]);
//         Swal.fire('Added!', 'Lesson added successfully', 'success');
//       }

//       setNewLesson({ title: '', url: '' });
//       setEditingLesson(null);
//     } catch (err) {
//       Swal.fire('Error', err.message, 'error');
//     }
//   };

//   // ✅ Delete lesson
//   const handleDeleteLesson = async (id) => {
//     const result = await Swal.fire({
//       title: 'Delete lesson?',
//       text: 'This action cannot be undone.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#ef4444',
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await deleteDoc(doc(db, 'lessons', id));
//       setLessons((prev) => prev.filter((l) => l.id !== id));
//       Swal.fire('Deleted!', 'Lesson removed', 'success');
//     } catch (err) {
//       Swal.fire('Error', err.message, 'error');
//     }
//   };

//   const handleEdit = (lesson) => {
//     setEditingLesson(lesson);
//     setNewLesson({ title: lesson.title, url: lesson.url });
//   };

//   return (
//     <Backdrop>
//       <ModalBox>
//         <h2 style={{ color: '#facc15', marginBottom: '1rem' }}>
//           Manage Lessons for {selectedProductTitle}
//         </h2>

//         {/* Add/Edit Form */}
//         <Input
//           placeholder="Lesson Title"
//           value={newLesson.title}
//           onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
//         />
//         <Input
//           placeholder="Lesson URL"
//           value={newLesson.url}
//           onChange={(e) => setNewLesson({ ...newLesson, url: e.target.value })}
//         />

//         <div style={{ marginBottom: '1rem' }}>
//           <Button onClick={handleSaveLesson}>
//             {editingLesson ? 'Update Lesson' : 'Add Lesson'}
//           </Button>
//           {editingLesson && (
//             <Button
//               variant="danger"
//               onClick={() => {
//                 setEditingLesson(null);
//                 setNewLesson({ title: '', url: '' });
//               }}
//             >
//               Cancel
//             </Button>
//           )}
//         </div>

//         <hr style={{ borderColor: '#374151', marginBottom: '1rem' }} />

//         {/* Lessons List */}
//         {lessons.length === 0 ? (
//           <p>No lessons yet.</p>
//         ) : (
//           lessons.map((lesson) => (
//             <LessonCard key={lesson.id}>
//               <h3 style={{ color: '#facc15' }}>{lesson.title}</h3>
//               <p style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{lesson.url}</p>
//               <div style={{ marginTop: '0.5rem' }}>
//                 <Button variant="edit" onClick={() => handleEdit(lesson)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDeleteLesson(lesson.id)}>
//                   Delete
//                 </Button>
//               </div>
//             </LessonCard>
//           ))
//         )}

//         <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
//           <Button variant="danger" onClick={onClose}>
//             Close
//           </Button>
//         </div>
//       </ModalBox>
//     </Backdrop>
//   );
// }




// src/components/LessonsModal.jsx
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import Swal from 'sweetalert2';

const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #1f2937;
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 650px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #111827;
  color: white;
  &:focus {
    outline: none;
    border-color: #facc15;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ variant }) =>
    variant === 'danger'
      ? '#ef4444'
      : variant === 'edit'
      ? '#3b82f6'
      : '#10b981'};
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.85;
  }
`;

const LessonCard = styled.div`
  background: #374151;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
`;

export default function LessonsModal({ productId, selectedProductTitle, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ lessonNumber: '', title: '', url: '' });
  const [editingLesson, setEditingLesson] = useState(null);
  const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);

  // Fetch lessons for this product only (client-side ordering to avoid index errors)
  const fetchLessons = async () => {
    if (!productId) {
      setLessons([]);
      return;
    }

    setLoading(true);
    try {
      const lessonsRef = collection(db, 'lessons');
      const q = query(lessonsRef, where('productId', '==', productId));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((d) => {
        const dat = d.data() || {};
        return {
          id: d.id,
          title: dat.title || '',
          url: dat.url || '',
          // coerce lessonNumber to a number (default 0 if missing)
          lessonNumber: dat.lessonNumber !== undefined ? Number(dat.lessonNumber) : 0,
          createdAt: dat.createdAt || null,
          productId: dat.productId || '',
        };
      });

      // sort by lessonNumber ascending
      data.sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
      setLessons(data);
    } catch (err) {
      console.error('Fetch lessons error:', err);
      // show the error message to help debugging
      Swal.fire({
        icon: 'error',
        title: 'Failed to load lessons',
        text: err?.message || 'An unknown error occurred while fetching lessons.',
        background: '#1f2937',
        color: '#f9fafb',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (!productId) {
      setLessons([]);
      return;
    }

    // fetch
    if (mounted) fetchLessons();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Add or update lesson
  const handleSaveLesson = async () => {
    const trimmedTitle = (newLesson.title || '').trim();
    const trimmedUrl = (newLesson.url || '').trim();
    const lnStr = (newLesson.lessonNumber || '').toString().trim();

    if (!trimmedTitle || !trimmedUrl || !lnStr) {
      return Swal.fire({ icon: 'warning', text: 'Lesson number, title, and URL are required!' });
    }

    const lessonNumberInt = parseInt(lnStr, 10);
    if (isNaN(lessonNumberInt) || lessonNumberInt < 1) {
      return Swal.fire({ icon: 'warning', text: 'Lesson number must be a valid positive integer!' });
    }

    try {
      if (editingLesson) {
        const ref = doc(db, 'lessons', editingLesson.id);
        await updateDoc(ref, {
          title: trimmedTitle,
          url: trimmedUrl,
          lessonNumber: lessonNumberInt,
        });

        setLessons((prev) => {
          const updated = prev.map((l) =>
            l.id === editingLesson.id
              ? { ...l, title: trimmedTitle, url: trimmedUrl, lessonNumber: lessonNumberInt }
              : l
          );
          updated.sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
          return updated;
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Lesson updated successfully.',
          background: '#1f2937',
          color: '#f9fafb',
        });
      } else {
        const lessonsRef = collection(db, 'lessons');
        const docRef = await addDoc(lessonsRef, {
          title: trimmedTitle,
          url: trimmedUrl,
          lessonNumber: lessonNumberInt,
          productId,
          createdAt: serverTimestamp(),
        });

        const newDoc = {
          id: docRef.id,
          title: trimmedTitle,
          url: trimmedUrl,
          lessonNumber: lessonNumberInt,
          productId,
        };

        setLessons((prev) => {
          const arr = [...prev, newDoc];
          arr.sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
          return arr;
        });

        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Lesson added successfully.',
          background: '#1f2937',
          color: '#f9fafb',
        });
      }

      setNewLesson({ lessonNumber: '', title: '', url: '' });
      setEditingLesson(null);
    } catch (err) {
      console.error('Save lesson error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Could not save lesson',
        text: err?.message || 'Unknown error.',
        background: '#1f2937',
        color: '#f9fafb',
      });
    }
  };

  // Delete lesson
  const handleDeleteLesson = async (id) => {
    const result = await Swal.fire({
      title: 'Delete lesson?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      background: '#1f2937',
      color: '#f9fafb',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDoc(doc(db, 'lessons', id));
      setLessons((prev) => prev.filter((l) => l.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Lesson removed.',
        background: '#1f2937',
        color: '#f9fafb',
      });
    } catch (err) {
      console.error('Delete lesson error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: err?.message || 'Unknown error.',
        background: '#1f2937',
        color: '#f9fafb',
      });
    }
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      lessonNumber: lesson.lessonNumber?.toString() || '',
      title: lesson.title || '',
      url: lesson.url || '',
    });


     // ✅ Scroll the modal to the top
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Backdrop>
      <ModalBox ref={modalRef}>
        <h2 style={{ color: '#facc15', marginBottom: '1rem' }}>
          Manage Lessons for {selectedProductTitle}
        </h2>

        {/* Add/Edit Form */}
        <Input
          type="number"
          placeholder="Lesson Number (e.g. 1)"
          value={newLesson.lessonNumber}
          onChange={(e) => setNewLesson({ ...newLesson, lessonNumber: e.target.value })}
        />
        <Input
          placeholder="Lesson Title"
          value={newLesson.title}
          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
        />
        <Input
          placeholder="Lesson URL"
          value={newLesson.url}
          onChange={(e) => setNewLesson({ ...newLesson, url: e.target.value })}
        />

        <div style={{ marginBottom: '1rem' }}>
          <Button onClick={handleSaveLesson}>
            {editingLesson ? 'Update Lesson' : 'Add Lesson'}
          </Button>
          {editingLesson && (
            <Button
              variant="danger"
              onClick={() => {
                setEditingLesson(null);
                setNewLesson({ lessonNumber: '', title: '', url: '' });
              }}
            >
              Cancel
            </Button>
          )}
        </div>

        <hr style={{ borderColor: '#374151', marginBottom: '1rem' }} />

        {/* Lessons List */}
        {loading ? (
          <p>Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p>No lessons yet.</p>
        ) : (
          lessons.map((lesson) => (
            <LessonCard key={lesson.id}>
              <h3 style={{ color: '#facc15' }}>
                Lesson {lesson.lessonNumber}: {lesson.title}
              </h3>
              <p style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{lesson.url}</p>
              <div style={{ marginTop: '0.5rem' }}>
                <Button variant="edit" onClick={() => handleEdit(lesson)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteLesson(lesson.id)}>
                  Delete
                </Button>
              </div>
            </LessonCard>
          ))
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
        </div>
      </ModalBox>
    </Backdrop>
  );
}
