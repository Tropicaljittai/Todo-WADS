import React, { useEffect, useState } from "react";
import {db, auth} from '../firebase';
import {doc, getDoc} from 'firebase/firestore';
import Avatar from "@mui/material/Avatar";
import { useAuth, upload } from "../firebase";
import { CiLogout } from "react-icons/ci";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function ProfileDesc({editProfile}) 
  {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState([]);
    const [photoURL, setPhotoURL] = useState("");

    console.log(photoURL);

    function handleImageChange(e) {
      if (e.target.files[0]) {
        setPhoto(e.target.files[0])
      }
    }

    function handleSubmit() {
      upload(photo, currentUser, setLoading);
    }

    useEffect(() => {
      if (currentUser?.photoURL){
        setPhotoURL(currentUser.photoURL)
      }
    }, [currentUser])

    useEffect(() => {
      const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          setProfile(docSnap.data());
          return () => unsubscribeSnapshot();
        }
      });
      return () => unsubscribeAuth();
    }, []);

    const handleEdit = () => {
      if (profile['fName'].trim() !== "" && profile['lName'].trim() !== "" && profile['DOB'].trim() !== "") {
          editProfile(profile['fName'], profile['lName'], profile['DOB']);
          setEditing(false);
      }
    };

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    };

  return (
    <div>
      {editing ? (
        <div>
            <input
            className="input-edit fname"
            type="text"
            value={profile['fName']}
            onChange={(e) => setProfile({ ...profile, fName: e.target.value })}
            autoFocus
          />

          <input
            className="input-edit lname"
            type="text"
            value={profile['lName']}
            onChange={(e) => setProfile({ ...profile, lName: e.target.value })}
            autoFocus
          />

          <input
            className="input-edit DOB"
            type="date"
            value={profile['DOB']}
            onChange={(e) => setProfile({ ...profile, DOB: e.target.value })}
            autoFocus
          />
          <div className="saveEditCon">
            <button
              className="profileSaveBtn bg-black hover:bg-slate-500 py-2 px-2 rounded"
              onClick={handleEdit}>
              Save
            </button>
          </div>

        </div>
        
        
      ) : (
        <div className="profileDesc">
          <CiLogout onClick={handleSignOut} className="logout-icon" color="red" size={40}/>
          <div className="profilePic-ProfilePage">
            <Avatar src={photoURL} sx={{ width: 150, height: 150 }} />
            <input type="file" onChange={handleImageChange} />
            <button className="bg-black hover:bg-slate-500 disabled:hover:bg-black py-2 px-2 rounded"disabled={loading || !photo} onClick={handleSubmit}>Submit</button>
          </div>
          <div className="desciption-profile">
            <div className="item-todo">            
                <div>
                  <label className="labelList">
                    <p>First Name:</p>{profile['fName'] ? profile['fName'] : "None"}
                  </label>
                </div> 
            </div>

            <div className="item-todo">            
                <div>
                  <label className="labelList">
                    <p>Last Name:</p>{profile['lName'] ? profile['lName'] : "None"}
                  </label>
                </div> 
            </div>

            <div className="item-todo">            
                <div>
                  <label className="labelList">
                    <p>Date of Birth:</p>{profile['DOB'] ? profile['DOB'] : "None"}
                  </label>
                </div>
            </div>
            <div className="editProfileClass">
              <button
              className="profileEditBtn bg-black hover:bg-slate-500 py-2 px-2 rounded"
              onClick={() => setEditing(true)}>
              Edit
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}