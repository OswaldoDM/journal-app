// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUEQigCYS8PsHEleBaEql1a8ltnQQaHUA",
  authDomain: "react-cursos-5ac43.firebaseapp.com",
  projectId: "react-cursos-5ac43",
  storageBucket: "react-cursos-5ac43.appspot.com",
  messagingSenderId: "130855422280",
  appId: "1:130855422280:web:6a04299c1a25468cc60b7d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp )