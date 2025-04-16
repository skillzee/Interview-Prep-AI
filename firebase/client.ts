
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWWflPe4L-3Vz5OQYoO3YFWvnGM20GlUo",
  authDomain: "interview-prep-7c14b.firebaseapp.com",
  projectId: "interview-prep-7c14b",
  storageBucket: "interview-prep-7c14b.firebasestorage.app",
  messagingSenderId: "930157293895",
  appId: "1:930157293895:web:afcbfd882c70bb37d11c62",
  measurementId: "G-MH4VSEZS5E"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);