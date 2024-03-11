// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile, GoogleAuthProvider  } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxRBGK-X7m4fjQM0Bgn-rxjTdrRIsbA1A",
  authDomain: "todo-app-c207a.firebaseapp.com",
  projectId: "todo-app-c207a",
  storageBucket: "todo-app-c207a.appspot.com",
  messagingSenderId: "446776564207",
  appId: "1:446776564207:web:831de8c46fb1932292be1a",
  measurementId: "G-9L9GZCPGDF"
};

function refreshPage() {
  window.location.reload(false);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
  refreshPage();
}