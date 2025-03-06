// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//temporary souls firebase
const firebaseConfig = {
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // apiKey: "AIzaSyBD0q3UTHbLdNPmji0bTmIHQOcNPnZV6LY",
    // authDomain: "mern-travel-tourism-5cdeb.firebaseapp.com",
    // projectId: "mern-travel-tourism-5cdeb",
    // storageBucket: "mern-travel-tourism-5cdeb.firebasestorage.app",
    // messagingSenderId: "853791627365",
    // appId: "1:853791627365:web:b211c1c66ebc4274a88e8c",
    // measurementId: "G-RSHSKB8Z37"



    // apiKey: "AIzaSyDhrn9cHMSW6-4s4nqa0o6IaEH-wLhP-4g",
    // authDomain: "travel-tourism-mern-f07b2.firebaseapp.com",
    // projectId: "travel-tourism-mern-f07b2",
    // storageBucket: "travel-tourism-mern-f07b2.firebasestorage.app",
    // messagingSenderId: "136602756623",
    // appId: "1:136602756623:web:a83a4966cbc2b955a4a57a",
    // measurementId: "G-JPNFWF0552"


    apiKey: "AIzaSyCBNKkAV2oT46cCRV1CduOrT05YCtMv-N8",
  authDomain: "travel-92f6f.firebaseapp.com",
  projectId: "travel-92f6f",
  storageBucket: "travel-92f6f.firebasestorage.app",
  messagingSenderId: "713865614140",
  appId: "1:713865614140:web:9a0d334b5db426b591c439",
  measurementId: "G-LX4V6Z7XBS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
