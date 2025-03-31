import { initializeApp } from "firebase/app";
import { data } from "react-router-dom";


const firebaseConfig = {
  apiKey: "AIzaSyAqDUNNsCr5ZGY8Xq20_WXCaxz3LptY9e8",
  authDomain: "elevated-web-395908.firebaseapp.com",
  projectId: "elevated-web-395908",
  storageBucket: "elevated-web-395908.firebasestorage.app",
  messagingSenderId: "992768799961",
  appId: "1:992768799961:web:c2c87d7c7fb3392426fac8",
  measurementId: "G-C6VQ198CQ2",
  databaseURL:"https://fir-a57de-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
