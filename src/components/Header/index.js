import React from 'react'
import './styles.css'
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg"
const Header = () => {
  const[user,loading]=useAuthState(auth);
  const navigate=useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/dashboard");
    }
  },[user,loading]);

  
  function logOutFunc(){
    alert("Log Out");
    try{
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully !");
          navigate("/")
        })
        .catch((error) => {
          // An error happened.
        });
    }catch(e){
      toast.error(e.message);
    }
  }
  return (
    <div class="navbar">
      <p class="logo">Being Baniya .</p>
      {user && (
        <div style={{display:"flex" , alignItems:"center", gap:"0.75rem"}}>
          <img src={user.photoURL? user.photoURL : userImg} alt="" style={{borderRadius:"50%", height:"2rem" , width:"2rem"}}/>
          <p class="logo link" onClick={logOutFunc}>
            LogOut
          </p>
        </div>
      )}
    </div>
  );
}

export default Header
