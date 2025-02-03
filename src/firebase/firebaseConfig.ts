import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1aJY5JgCgoW0BjEbyZLdXxQaJPdGbd5k",
  authDomain: "inventory-management-sys-3b5e8.firebaseapp.com",
  projectId: "inventory-management-sys-3b5e8",
  storageBucket: "inventory-management-sys-3b5e8.firebasestorage.app",
  messagingSenderId: "692323364250",
  appId: "1:692323364250:web:1701cd2e72736de2cf9e23",
  measurementId: "G-D6MD26PRKF"
};


// Export Firebase services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// Enable persistent login (users stay logged in)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Firebase session persistence enabled"))
  .catch((error) => console.error("Error enabling persistence:", error));

