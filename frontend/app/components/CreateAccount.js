/* **************************************************************************** 
TODO: Update context .... on logout return to differnt area
**************************************************************************** */

import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types'
import firebase from "./api/Auth";
import { Link } from "react-router-dom";
import {VerifyEmailAndPassword} from "./api/VerifyEmailPassword";
import { InitUser } from "./api/DatabaseActions";
import uidContextProvider from "./api/UidContext";

export default function CreateAccount({ message }) {
  const [credentials, setCredentials] = useState({ email: "", password: "", username: "" });
  const [validCredentials, setValidCredentials] = useState(false);
  const [success, setSuccess] = useState(false);
  const [acctCreationError, setAcctCreationError] = useState({dbError: null, authError: null });
  const [validSubmission, setValidSubmission] = useState(false);
  const [validationErrors, setValidationErrors] = useState({email: false, password: false, user: false});
  const auth = firebase.auth();
  const { email, password, username } = credentials;
  const { dbError, authError } = acctCreationError;
  const { setUidContext } = useContext(uidContextProvider);

  useEffect(() => {
    // Check the validity of the username, email, and password.
    setValidCredentials(VerifyEmailAndPassword(username, email, password).valid);
    if (validSubmission) {
      const { validEmail, validPassword, validUser } = VerifyEmailAndPassword(
        username,
        email,
        password
      );
      setValidationErrors({ email: validEmail, password: validPassword, user: validUser });
    }
  }, [username, email, password, validSubmission]);

  const createUser = () => {
    if (validCredentials) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((newUser) => {
          newUser.user.updateProfile({ displayName: username });
          InitUser(newUser.user.uid)
            .then(() => {
              setUidContext({name:username, uid:newUser.user.uid})
              setCredentials({...credentials, email: "", password: "" });
              handleEmailVerification();
            })
            .catch(() => {
              setAcctCreationError({ dbError: true });
            });
        })
        .catch(() => {
          setAcctCreationError({ authError: true });
        });
    } else {
      // This will be set if there are validation errors.
      // Then it will be updated through useEffect.
      // This is done to allow one submission.
      setValidSubmission(true);
    }
  };

  const handleCredentialChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleEmailVerification = () => {
    const user = auth.currentUser;
    user.sendEmailVerification()
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        console.error(`There's been an error: ${err}`);
      });
  };

  const welcome = (
    <div className="welcome-wagon">
      <p>{`Hi, ${username}! Your account has been created.`}</p>
      <p>Check your email...some verbage</p>
    </div>
  );

  const loginInit = (<>
    {message && <div className="message">{message}</div>}
      <h3>Create a New Account</h3>
      {validSubmission && !validationErrors.email && <li>Email address is not valid.</li>}
      {validSubmission && !validationErrors.password && (
        <li>Password must be 8 characters in length with one capitalized letter and one number</li>
      )}
      {validSubmission && !validationErrors.user && (
        <li>Username must be between 3-35 characters. Using letters and &apos;-&apos;, &apos;_&apos;, or &.</li>
      )}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        className="text-input"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          handleCredentialChange(e);
        }}></input>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        className="text-input"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          handleCredentialChange(e);
        }}></input>
      <label htmlFor="userPassword">Password</label>
      <input
        type="password"
        name="password"
        className="text-input"
        placeholder="Password"
        value={password}
        onChange={(e) => handleCredentialChange(e)}></input>
      <button
        className={validCredentials ? "valid submit-button" : "not-valid submit-button"}
        onClick={() => {
          createUser();
        }}>
        Submit
      </button>
      <Link to="/login">Already have an account?</Link>
      {dbError && (
        <div>
          <p>Email already in use.</p>
        </div>
      )}
      {authError && (
        <div>
          <p>There was a problem provisioning the database.</p>
        </div>
      )}
  </>)

  return (
    <div className="login-wrapper">
      {success ? welcome : loginInit}
    </div>
  );
}

CreateAccount.propTypes = {
  message: PropTypes.string
}