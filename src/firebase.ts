// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5ik1NOX1j12cVjxkL6IK0sNQqoJ7QJUI",
    authDomain: "sudoku-solver-b7f35.firebaseapp.com",
    projectId: "sudoku-solver-b7f35",
    storageBucket: "sudoku-solver-b7f35.appspot.com",
    messagingSenderId: "180858341900",
    appId: "1:180858341900:web:c11702e431ade894adfc29",
    measurementId: "G-VDZDVQ1E8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
