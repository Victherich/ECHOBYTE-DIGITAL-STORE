import React from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const UpdateProductKeys = () => {
  const handleRename = async () => {
    const productsRef = collection(db, 'products');

    try {
      const snapshot = await getDocs(productsRef);

      const updates = snapshot.docs.map(async (productDoc) => {
        const data = productDoc.data();

        // Only update if 'price' exists and 'priceInNgn' doesn't
        if (data.price !== undefined && data.priceInNgn === undefined) {
          const productRef = doc(db, 'products', productDoc.id);
          await updateDoc(productRef, {
            priceInNgn: data.price,
            price: null, // You can remove it or leave it if needed
          });
        }
      });

      await Promise.all(updates);

      alert('All price fields renamed to priceInNgn!');
    } catch (error) {
      console.error('Error renaming price field:', error);
      alert('Failed to update products. See console for details.');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleRename}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Rename 'price' to 'priceInNgn'
      </button>
    </div>
  );
};

export default UpdateProductKeys;
