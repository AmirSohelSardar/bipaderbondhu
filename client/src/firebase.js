// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDVq1naVjcTLafJ3Zi_7Ah3XJ5__DJ0LBM",
//   authDomain: "mern-blog-app-1ac27.firebaseapp.com",
//   projectId: "mern-blog-app-1ac27",
//   storageBucket: "mern-blog-app-1ac27.firebasestorage.app",
//   messagingSenderId: "736109984278",
//   appId: "1:736109984278:web:439c918e7ee87f63b01337",
//   measurementId: "G-GNT1C6EM82"
// };


// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);



// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// ✅ SECURITY FIX: Use environment variables instead of hardcoded values
// This way, credentials aren't exposed in the source code

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Validate Firebase configuration
if (!firebaseConfig.apiKey) {
  console.error('❌ Firebase API Key is missing!');
  console.error('Make sure you have a .env file with VITE_FIREBASE_API_KEY');
}

if (!firebaseConfig.projectId) {
  console.error('❌ Firebase Project ID is missing!');
  console.error('Make sure you have a .env file with VITE_FIREBASE_PROJECT_ID');
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Optional: Initialize Analytics (only in production)
// import { getAnalytics } from "firebase/analytics";
// if (import.meta.env.PROD) {
//   const analytics = getAnalytics(app);
// }

// ✅ Export auth instance for use in components
// import { getAuth } from 'firebase/auth';
// export const auth = getAuth(app);