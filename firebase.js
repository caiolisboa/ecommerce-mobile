// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuyEHeWZdqGLTvReHVti6_gOMCuN90_fk",
  authDomain: "proj-mobile-85951.firebaseapp.com",
  projectId: "proj-mobile-85951",
  storageBucket: "proj-mobile-85951.appspot.com",
  messagingSenderId: "1065315241172",
  appId: "1:1065315241172:web:e8c8287dcf970cf3147f41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth,db}
