import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBimbmapQChWnVSlpAJFXFL5VknHPhYLEU",
    authDomain: "olx-clone-912a6.firebaseapp.com",
    projectId: "olx-clone-912a6",
    storageBucket: "olx-clone-912a6.firebasestorage.app",
    messagingSenderId: "80434204593",
    appId: "1:80434204593:web:a5b0af3f12f9647acaf790",
    measurementId: "G-6SJ8LN0RK4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
