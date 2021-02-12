import React, { useState, useEffect, useContext} from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import firebase from "./api/Auth";
import uidContextProvider from "./api/UidContext";
import RecoverPassword from "./login/RecoverPassword"
import Success from "./login/Success"

export default function Login({ message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [recoverPassword, setRecoverPassword] = useState(false);
  const { uidContext } = useContext(uidContextProvider);
  const auth = firebase.auth();
  
  useEffect(() => {
    !userName && setUserName(uidContext.name);
    loginError && setLoginError(null);
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
      <button className="forgot-password" onClick={() => setRecoverPassword(true)}>
        Forgot your password?
      </button>
      <Link to="/sign-up">Create an Account</Link>
    </div>
  );

  return (
    <React.Fragment>
      {userName ? <Success userName={userName} /> : recoverPassword ? <RecoverPassword loginReturn={handleReturnToLogin} /> : preLogin}
    </React.Fragment>
  );
}

Login.propTypes = {
  message: PropTypes.string
}
