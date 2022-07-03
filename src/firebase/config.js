import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaAHetc90mmrVuo64CnU9OnDqoRG7Turg",
  authDomain: "cen-auth-dev.firebaseapp.com",
  databaseURL: "https://cen-auth-dev-default-rtdb.firebaseio.com",
  projectId: "cen-auth-dev",
  storageBucket: "cen-auth-dev.appspot.com",
  messagingSenderId: "619127705449",
  appId: "1:619127705449:web:93f77f2fa3ee5886df77f8",
  measurementId: "G-3E9C28CLYD"
};

// init firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
// timestamp
const timestamp = firebase.firestore.Timestamp

export {  projectFirestore, projectAuth, timestamp, projectStorage }