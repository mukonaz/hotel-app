import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// API
const firebaseConfig = {
    apiKey: "AIzaSyAppwrJqMEXYZoujNT4HIi5pNZEA1Tsg5Y",
    authDomain: "hotel-app-688af.firebaseapp.com",
    projectId: "hotel-app-688af",
    storageBucket: "hotel-app-688af.appspot.com",
    messagingSenderId: "1021865749840",
    appId: "1:1021865749840:web:20b705ad6785a6d5369055",
    measurementId: "G-BSPQCVQ3YH"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
