// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "b591ank.firebaseapp.com",
  databaseURL: "https://b591ank-default-rtdb.firebaseio.com",
  projectId: "b591ank",
  storageBucket: "b591ank.appspot.com",
  messagingSenderId: "168046625985",
  appId: "1:168046625985:web:6aa51d671df69bcfcdc040",
  measurementId: "G-814K8TVST4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth };
