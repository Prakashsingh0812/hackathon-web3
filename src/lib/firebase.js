// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDrAfMQMr4VZn7BXilDfeWPtEGbHk-lf6M",
    authDomain: "company-assignments.firebaseapp.com",
    databaseURL: "https://company-assignments-default-rtdb.firebaseio.com",
    projectId: "company-assignments",
    storageBucket: "company-assignments.firebasestorage.app",
    messagingSenderId: "689053147634",
    appId: "1:689053147634:web:abc6005d058d85f27d4b6b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };
