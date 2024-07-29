// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Votre configuration Firebase (remplacez par vos propres valeurs)
const firebaseConfig = {
    apiKey: "AIzaSyCCz24LPI-8Wyu58qVL_vtZyz7iFbTpOtk",
    authDomain: "speak-algerian.firebaseapp.com",
    projectId: "speak-algerian",
    storageBucket: "speak-algerian.appspot.com",
    messagingSenderId: "1003461914547",
    appId: "1:1003461914547:web:cd70ea4ff42cebebd6a5c6",
    measurementId: "G-3QMK99C8FC"
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);

// Exportez les instances nécessaires
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
