import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };