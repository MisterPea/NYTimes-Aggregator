import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "./Auth";

export default function Login({ message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [userName, setUserName] = useState(null)
  const auth = firebase.auth();

  useEffect(() => {
    loginError && setLoginError(null);
  }, [password, email]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setEmail("");
        setPassword("");
        setUserName(user.displayName)
      })
      .catch((error) => {
        handleWarning(error);
      });
  };

  const handleWarning = (error) => {
    const errorList = {
      "auth/user-not-found": "Incorrect email or password",
      "auth/invalid-email": "Invalid email address format",
      "auth/wrong-password": "Incorrect email or password",
    };
    setLoginError(errorList[error.code]);
  };

  const preLogin = (
    <div className="login-wrapper">
      {message && <div className="message">{message}</div>}
      <h3>Login to your Account</h3>
      <label htmlFor="userEmail">Email</label>
      <input
        type="text"
        name="userEmail"
        className="text-input"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}></input>
      <label htmlFor="userPassword">Password</label>
      <input
        type="password"
        name="userPassword"
        className="text-input"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}></input>
      <button
        id="login-submit-button"
        onClick={() => {
          handleLogin();
        }}>
        Submit
      </button>
      {loginError && <div className="warning-dialog">{loginError}</div>}
      <Link to="/sign-up">Create an Account</Link>
    </div>
  );

  const postLogin = (
    <div className="login-wrapper">
      <h4 className="welcome-back">Welcome back, {userName}!</h4>
      <Link to="/" >Continue to the Home Page</Link>
    </div>
  )

  return (
    <React.Fragment>
      {!userName ? preLogin : postLogin}
    </React.Fragment>
  )
}
