import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useAuth, upload } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export function ProfilePic() 
  {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    
    function handleImageChange(e) {
      if (e.target.files[0]) {
        setPhoto(e.target.files[0])
      }
    }

    const back = () => {
        navigate("/profile");
      };

    function handleSubmit() {
      currentUser.photoURL = upload(photo, currentUser, setLoading);
      navigate("/profile");
    }

    useEffect(() => {
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
      }
    }, [currentUser])

  return (
    <div>
        <IoArrowBack onClick={back} className="backButton" size={30}/>
        <div className="picturePage">
        <Avatar src={photoURL} sx={{ width: 150, height: 150 }} />
        <input type="file" onChange={handleImageChange} />
        <button className="bg-black hover:bg-slate-500 disabled:hover:bg-black py-2 px-2 rounded"disabled={loading || !photo} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
}