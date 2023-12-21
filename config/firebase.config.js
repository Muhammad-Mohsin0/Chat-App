import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2o5Wp3GERE-DJtu9RMh0Z9dOUArsAytM",
  authDomain: "chat-app-cfd5c.firebaseapp.com",
  projectId: "chat-app-cfd5c",
  storageBucket: "chat-app-cfd5c.appspot.com",
  messagingSenderId: "412349282677",
  appId: "1:412349282677:web:119f43f548ad248b583b3c",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export { app, firebaseAuth, firestoreDB };
