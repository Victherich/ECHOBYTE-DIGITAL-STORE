
import React from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { deleteField } from 'firebase/firestore';

const DeleteProductKey = () => {
  const handleDelete = async () => {
    const productsRef = collection(db, 'products');

    try {
      const snapshot = await getDocs(productsRef);

      const deletions = snapshot.docs.map(async (productDoc) => {
        const data = productDoc.data();

        // Only delete if 'price' exists
        if (data.price !== undefined) {
          const productRef = doc(db, 'products', productDoc.id);
          await updateDoc(productRef, {
            price: deleteField(),
          });
        }
      });

      await Promise.all(deletions);

      alert('Old "price" fields deleted successfully!');
    } catch (error) {
      console.error('Error deleting price fields:', error);
      alert('Failed to delete old price fields. Check console.');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete "price" Fields
      </button>
    </div>
  );
};

export default DeleteProductKey;
