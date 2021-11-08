// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firebase-functions-compat";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAmtcxwa4fcX_e05jdNGweqx7_kj4izPHk",
  authDomain: "smart-travel-sri-lanka.firebaseapp.com",
  projectId: "smart-travel-sri-lanka",
  storageBucket: "smart-travel-sri-lanka.appspot.com",
  messagingSenderId: "987318358913",
  appId: "1:987318358913:web:503e69f607ce6fa33e0e80",
  measurementId: "G-4S90CEYG8Y",
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
export const functions = firebase.functions();
export const FieldValue = firebase.firestore.FieldValue;

export const storage = getStorage(firebaseApp);
//export const storage = firebase.storage();
/*export const storageRef = storage.ref();
export const eventRef = storageRef.child("images/events");
export const destinationRef = storageRef.child("images/destinations");*/
export default firebase;
export const getDestinations = functions.httpsCallable('getPreferedDestinations');
export { default as collections } from "./collections";
