import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDK_Dk__QJeUjUlGz2PZpWJbWYiym0heQY",
  authDomain: "insta-clone-bf5b6.firebaseapp.com",
  projectId: "insta-clone-bf5b6",
  storageBucket: "insta-clone-bf5b6.appspot.com",
  messagingSenderId: "357218635139",
  appId: "1:357218635139:web:6f1c406dc18fe8704e7ab6",
  measurementId: "G-Z0VGN9B5RH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { app, auth, firestore, storage, messaging };