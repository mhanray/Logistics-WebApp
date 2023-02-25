// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdMwTR7ip3jJVPnuDyE-O95cWvM4Cglew",
  authDomain: "logistics-webapp.firebaseapp.com",
  projectId: "logistics-webapp",
  storageBucket: "logistics-webapp.appspot.com",
  messagingSenderId: "1084052470532",
  appId: "1:1084052470532:web:7a55c7b15faa4d37826e51",
  measurementId: "G-HLJPXQ35MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);