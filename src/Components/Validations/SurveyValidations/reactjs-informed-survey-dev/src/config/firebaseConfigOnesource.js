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
  apiKey: "AIzaSyBNnuLzLRR0UyIxgFSS-VvZALfUUIAdHbw",
  authDomain: "onesource-2427e.firebaseapp.com",
  databaseURL: "https://onesource-2427e-default-rtdb.firebaseio.com",
  projectId: "onesource-2427e",
  storageBucket: "onesource-2427e.appspot.com",
  messagingSenderId: "318428279694",
  appId: "1:318428279694:web:3510333a27cb1771c5aadf"
}


const app1 = initializeApp(firebaseConfig,"second");
export const db = getFirestore(app1);
export const database = getDatabase(app1);
