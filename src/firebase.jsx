// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUiPsXAhyOm1VYIUa7nINI_ww0iu-ZG9g",
  authDomain: "freelancer-pro-96a53.firebaseapp.com",
  projectId: "freelancer-pro-96a53",
  storageBucket: "freelancer-pro-96a53.appspot.com",
  messagingSenderId: "1018800501104",
  appId: "1:1018800501104:web:8f185d730befaa81ebdfb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);