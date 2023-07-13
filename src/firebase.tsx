
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlnxMofRMUd7PXct0vzm1HQd4HLq0qGd8",
  authDomain: "anime-watch-list-efa71.firebaseapp.com",
  projectId: "anime-watch-list-efa71",
  storageBucket: "anime-watch-list-efa71.appspot.com",
  messagingSenderId: "888236052350",
  appId: "1:888236052350:web:6d9449cd9bdccdebdfad2f",
  measurementId: "G-VXSRE71X29"
};
const provider = new GoogleAuthProvider();


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
