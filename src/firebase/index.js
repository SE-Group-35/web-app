// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmtcxwa4fcX_e05jdNGweqx7_kj4izPHk",
    authDomain: "smart-travel-sri-lanka.firebaseapp.com",
    projectId: "smart-travel-sri-lanka",
    storageBucket: "smart-travel-sri-lanka.appspot.com",
    messagingSenderId: "987318358913",
    appId: "1:987318358913:web:503e69f607ce6fa33e0e80",
    measurementId: "G-4S90CEYG8Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;
export default firebase;

//Collections
export const usersCollection = database.collection('users');