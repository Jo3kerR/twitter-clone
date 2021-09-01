import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVWmbpzB0UTKGXxXMcxA5i-q_unxdtzfg",
  authDomain: "twitter-clone-10719.firebaseapp.com",
  projectId: "twitter-clone-10719",
  storageBucket: "twitter-clone-10719.appspot.com",
  messagingSenderId: "493438407599",
  appId: "1:493438407599:web:21f24ccf6c26fb48d6155a",
  measurementId: "G-JRRM3ZEZVV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
