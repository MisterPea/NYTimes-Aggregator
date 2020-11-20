import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import NavBar from "./NavBar";
import firebase from "./Auth";

export default function Login({message}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = firebase.auth()

    useEffect(()=>{
        document.getElementById("submit-button").disabled = true
    })

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email,password)
            .then((user) => {
                ///
            })
            .catch((err) => {
                // TODO: set alert with info.
                let errorCode = err.code;
                let errorMessage = err.message;
              });
    }

    return (
        <div className="login-wrapper">
        {window.location.pathname !== "/" && <NavBar />}
        {message && <div className="message">{message}</div>}
          <h3>Login to your Account</h3>
          <label htmlFor="userEmail">Email</label>
          <input
            type="text"
            name="userEmail"
            className="text-input"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}></input>
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            name="userPassword"
            className="text-input"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}></input>
          <button id="submit-button">Submit</button>
          <Link to="/sign-up">Create an Account</Link>
        </div>
      );
}