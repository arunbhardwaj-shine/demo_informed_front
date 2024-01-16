import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyA88FEGjFrDuqHFZghzDIChHu3xk7tcv2Y",
//   authDomain: "docintelpolls.firebaseapp.com",
//   projectId: "docintelpolls",
//   storageBucket: "docintelpolls.appspot.com",
//   messagingSenderId: "82125078924",
//   appId: "1:82125078924:web:6bdcc63abcd2b88baf96a9"
//   };
  const firebaseConfig = {
    apiKey: "AIzaSyD__r3UMJgmOrgW5-bGsEPDiROzuwKWVVA",
    authDomain: "onesource-dbb30.firebaseapp.com",
    projectId: "onesource-dbb30",
    storageBucket: "onesource-dbb30.appspot.com",
    messagingSenderId: "749099745733",
    appId: "1:749099745733:web:3bb71bb52a537681580bac",
    measurementId: "G-FQR3X48MQ1"
  };


const app1 = initializeApp(firebaseConfig,"second");
export const db = getFirestore(app1);
export const database = getDatabase(app1);
