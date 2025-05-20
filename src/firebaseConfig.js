// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB4o9Novs9l_htjfwa9SCi_1vPjfS5LDyo",
//   authDomain: "digital-store-c5a11.firebaseapp.com",
//   projectId: "digital-store-c5a11",
//   storageBucket: "digital-store-c5a11.firebasestorage.app",
//   messagingSenderId: "158469298026",
//   appId: "1:158469298026:web:86ec2028167d5c01ac7713",
//   measurementId: "G-3RP5H3VS22"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get Firebase services
// export const auth = getAuth(app);   // For authentication
// export const db = getFirestore(app); // For Firestore database





// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4o9Novs9l_htjfwa9SCi_1vPjfS5LDyo",
  authDomain: "digital-store-c5a11.firebaseapp.com",
  projectId: "digital-store-c5a11",
  storageBucket: "digital-store-c5a11.appspot.com", // ✅ fixed
  messagingSenderId: "158469298026",
  appId: "1:158469298026:web:86ec2028167d5c01ac7713",
  measurementId: "G-3RP5H3VS22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

