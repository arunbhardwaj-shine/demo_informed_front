import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA88FEGjFrDuqHFZghzDIChHu3xk7tcv2Y",
  authDomain: "docintelpolls.firebaseapp.com",
  projectId: "docintelpolls",
  storageBucket: "docintelpolls.appspot.com",
  messagingSenderId: "82125078924",
  appId: "1:82125078924:web:6bdcc63abcd2b88baf96a9"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);