import React, { useState, useEffect, useContext} from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import firebase from "./api/Auth";
import uidContextProvider from "./api/UidContext";
import RecoverPassword from "./login/RecoverPassword"
import Success from "./login/Success"
import {SubmitButton} from "./material_ui_hoc/SubmitButton"

export default function Login({ message, modalClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [recoverPassword, setRecoverPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { uidContext } = useContext(uidContextProvider);
  
  const auth = firebase.auth();

  useEffect(() => {
    !userName && setUserName(uidContext.name);
    loginError && setLoginError(null);
    if(email !== "" && password !== "") {
      setSubmitDisabled(false);
    } else {
      !submitDisabled && setSubmitDisabled(true);
    }
  }, [password, email, uidContext.name]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setEmail("");
        setPassword("");
        setUserName(user.displayName);
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

  const handleReturnToLogin = () => {
    setRecoverPassword(false)
  }

  const preLogin = (
    <div className="login-wrapper">
      {message && <div className="message">{message}</div>}
      <h3 className="login-headline">Login to your Account</h3>
      <div className="warning-dialog">{loginError}</div>
      <div className="email-input">
        <label htmlFor="userEmail">Email</label>
        <input
          type="text"
          name="userEmail"
          className="text-input"
          // placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}></input>
      </div>
      <div className="password-input">
        <label htmlFor="userPassword">Password</label>
        <input
          type="password"
          name="userPassword"
          className="text-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}></input>
      </div>
      <SubmitButton
        disabled={submitDisabled}
        id="login-submit-button"
        onClick={() => {
          handleLogin();
        }}>
        Submit
      </SubmitButton>
      <div className="login-buttons">
        <button className="forgot-password" onClick={() => setRecoverPassword(true)}>
          Forgot password?
        </button>
        <Link className="create-acct-button" onClick={modalClose} to="/sign-up">
          Create an Account
        </Link>
      </div>
    </div>
  );

  return (
    <div className="login-return-wrapper">
      {userName ? <Success userName={userName} /> : recoverPassword ? <RecoverPassword loginReturn={handleReturnToLogin} modalClose={modalClose} /> : preLogin}
    </div>
  );
}

Login.propTypes = {
  message: PropTypes.string,
  modalClose: PropTypes.func,
}
