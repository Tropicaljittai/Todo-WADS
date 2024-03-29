import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, provider } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import TodoSVG from '../assets/todo-svg.svg'
import { FcGoogle } from "react-icons/fc";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const [value,setValue] = useState('')
  const handleClick =()=>{
      signInWithPopup(auth,provider).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem("email",data.user.email)
      })
  }

  useEffect(()=>{
      setValue(localStorage.getItem('email'))
  })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/Todo");
      }
    });
  }, []);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/Todo");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = async () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/Todo");
      })
      .catch((err) => alert(err.message));
  };
  
  return (
    <div className="login-register-container">
      {isRegistering ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={registerInformation.email}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                email: e.target.value
              })
            }
          />
          <input
            type="email"
            placeholder="Confirm Email"
            value={registerInformation.confirmEmail}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                confirmEmail: e.target.value
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={registerInformation.password}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                password: e.target.value
              })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={registerInformation.confirmPassword}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                confirmPassword: e.target.value
              })
            }
          />
          <button className="sign-in-register-button" onClick={handleRegister}>Register</button>
          <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
        </>
      ) : (
        <>
          <input type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
          />
          <button className="sign-in-register-button" onClick={handleSignIn}>
            Sign In
          </button>
          <button
            className="create-account-button"
            onClick={() => setIsRegistering(true)}
          >
            Create an account
          </button>
          <br/>
          <p className="orSignIn">or sign in with</p>
          <FcGoogle className="google" onClick={handleClick}/>
        </>
      )}
    </div>
  );
}
