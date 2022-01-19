// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMxTyPnfykb74comdD84M4fm2afFIltgE",
  authDomain: "shopifybackendchallenge-ab775.firebaseapp.com",
  projectId: "shopifybackendchallenge-ab775",
  storageBucket: "shopifybackendchallenge-ab775.appspot.com",
  messagingSenderId: "992090491720",
  appId: "1:992090491720:web:2e0a86d835baafeecf017d",
  measurementId: "G-T4GR4026RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);