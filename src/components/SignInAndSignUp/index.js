import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth , provider ,db } from "../../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useLocation } from "react-router-dom";

const SignUpSignInComponent = () => {
  const location = useLocation();
  const { myValue } = location.state || {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm,setLoginForm] = useState(myValue);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function signUpWithEmail() {
    if (
      name.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim()
    ) {
      if (password === confirmPassword) {
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long!");
          return;
        }
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            toast.error(error.message);
          })
          .finally(() => setLoading(false));
      } else {
        toast.error("Password and Confirm Password don't match!");
      }
    } else {
      toast.error("All Fields are mandatory!");
    }
  }

  function signInWithEmail(){
    if(email.trim() && password.trim()){
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Logged In Successfully");
          setLoading(false);
          setName("");
          setPassword("");
          navigate("/dashboard");
          createDoc(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }else{
      toast.error("All Fields are Mandatory !");
    }
  }
  
  function googleAuth(){
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        createDoc(user);
        navigate("/dashboard")
        toast.success("Account Authenticated successfully !");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }
  async function createDoc(user) {
    setLoading(true);
    //make sure user is new ie the doc with the Uid doesn't exists
    
    if(!user)return; // if user does not exists return 
    const userRef = doc(db,"users",user.uid);
    const userData =await getDoc(userRef);
    if(!(userData).exists()){
      try{
        await setDoc(doc(db,"users",user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL? user.photoURL : "",
          createdAt : new Date(),
        });
        toast.success("Doc created !");
        setLoading(false);
      }catch(e){
        toast.error(e.message);
        setLoading(false);
      }
    }
  }
  
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Log In on{" "}
            <span style={{ color: "var(--theme)", fontWeight: 600 }}>
              Being Baniya
            </span>
          </h2>
          <form>
            <Input
              label="Email"
              placeholder="billuneedsahoodie@gmail.com"
              state={email}
              setState={setEmail}
              type="email"
            />
            <Input
              label="Password"
              placeholder="Example@123"
              state={password}
              setState={setPassword}
              type="password"
            />
          </form>
          <Button
            disabled={loading}
            text={loading ? "Processing..." : "SignIn using Email and Password"}
            onClick={signInWithEmail}
          />
          <p style={{ textAlign: 'center' }}>OR</p>
          <Button disabled={loading} text="SignIn using Google" blue onClick={googleAuth} />
          <p class="p-login" onClick={() => setLoginForm(!loginForm)}>
            Or Don't Have An Account? Click Here
          </p>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up with{" "}
            <span style={{ color: "var(--theme)", fontWeight: 600 }}>
              Being Baniya
            </span>
          </h2>
          <form>
            <Input
              label="Fullname"
              placeholder="Gunjan Agrawal"
              state={name}
              setState={setName}
              type="text"
            />
            <Input
              label="Email"
              placeholder="billuneedsahoodie@gmail.com"
              state={email}
              setState={setEmail}
              type="email"
            />
            <Input
              label="Password"
              placeholder="Example@123"
              state={password}
              setState={setPassword}
              type="password"
            />
            <Input
              label="Confirm Password"
              placeholder="Example@123"
              state={confirmPassword}
              setState={setConfirmPassword}
              type="password"
            />
          </form>
          <Button
            disabled={loading}
            text={loading ? "Processing..." : "SignUp using Email and Password"}
            onClick={signUpWithEmail}
          />
          <p style={{textAlign:'center'}}>OR</p>
          <Button disabled={loading} text="SignUp using Google" blue onClick={googleAuth}/>
          <p class="p-login" onClick={() => setLoginForm(!loginForm)}>
            Or Already Have An Account ? Click Here
          </p>
        </div>
      )}
    </>
  );
};

export default SignUpSignInComponent;
