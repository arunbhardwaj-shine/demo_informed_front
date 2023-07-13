import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2_IAe4G4Y8U9D-27X3atKhUGWs1M1RuM",
    authDomain: "triggers-ba47e.firebaseapp.com",
    projectId: "triggers-ba47e",
    storageBucket: "triggers-ba47e.appspot.com",
    messagingSenderId: "743778002151",
    appId: "1:743778002151:web:1077ccea556b954a906e42",
    measurementId: "G-6DCCEYH7P1"
  };
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);