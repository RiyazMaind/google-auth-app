import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5yxU0La8ishp3Xbp0Tw6bdFY9wTNKqZE",
  authDomain: "auth-app-85c15.firebaseapp.com",
  projectId: "auth-app-85c15",
  storageBucket: "auth-app-85c15.appspot.com",
  messagingSenderId: "738023096430",
  appId: "1:738023096430:web:5bf352e4c074b17685667f",
  measurementId: "G-64FX6F92M1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
