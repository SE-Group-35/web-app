// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyByYle8TpnRXjLi-cBElEfVF7I-_la5tmM",
  authDomain: "check-d7c5b.firebaseapp.com",
  projectId: "check-d7c5b",
  storageBucket: "check-d7c5b.appspot.com",
  messagingSenderId: "1072117168491",
  appId: "1:1072117168491:web:e9af0571eb1b0dbc72b42e",
};

// react-redux-firebase config
export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

export const auth = firebase.auth();
export const database = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;

export const storage = getStorage(firebaseApp);
//export const storage = firebase.storage();
/*export const storageRef = storage.ref();
export const eventRef = storageRef.child("images/events");
export const destinationRef = storageRef.child("images/destinations");*/
export default firebase;

export { default as collections } from "./collections";
