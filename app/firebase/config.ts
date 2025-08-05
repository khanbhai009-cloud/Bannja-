// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfrd2gvEhS4TEY2RrqL2ftYz9g5_Cupcs",
  authDomain: "weby-44491.firebaseapp.com",
  projectId: "weby-44491",
  storageBucket: "weby-44491.firebasestorage.app",
  messagingSenderId: "814932604590",
  appId: "1:814932604590:web:92685964ce5e2e75961f3f",
  measurementId: "G-0LKL7H849G",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };