// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Kxjqrox8XBy7y_pT-VdORAw5wDD06v0",
  authDomain: "lunch-3db37.firebaseapp.com",
  projectId: "lunch-3db37",
  storageBucket: "lunch-3db37.appspot.com",
  messagingSenderId: "977276409970",
  appId: "1:977276409970:web:c8d25ec73f68f6ebcfcaeb",
  measurementId: "G-2FZN74D0VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;