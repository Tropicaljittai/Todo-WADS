import "../App.css";
import { useState, useEffect } from "react";
import {db, auth} from '../firebase';
import { CiLogout } from "react-icons/ci";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {collection, addDoc, Timestamp, query, onSnapshot, QuerySnapshot, updateDoc, doc, deleteDoc, setDoc, getDoc, where} from 'firebase/firestore';
import { IoArrowBack } from "react-icons/io5";
import { ProfileDesc } from "../components/ProfileDesc";

function Profile() {
    const navigate = useNavigate();
    const [profileDesc, setProfile] = useState([]);
    const [uid, setUid] = useState();

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUid(user.uid);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setProfile(docSnap.data());
            return () => unsubscribeSnapshot();
          }
        });
        return () => unsubscribeAuth();
      }, []);


    async function editProfile(fName, lName, DOB) {
        await updateDoc(doc(db, 'users', uid), {
            fName: fName,
            lName: lName,
            DOB: DOB,
        })
    }

    const back = () => {
        navigate("/todo");
      };
  
  return (
    <>  
        <br/>
        <IoArrowBack onClick={back} className="backButton" size={30}/>
        <ProfileDesc
        editProfile={editProfile}
      />
    </>
  );
}

export default Profile;
