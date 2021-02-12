import React, { useState } from "react";
import firebase from "../api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";

/**
 * Dialog component to reauthenticate credentials for email and password chnages.
 * @param {function} reference - reference to callback function.
 * @returns {jsx}
 * @returns {true} - passed to reference function on completed reauth
 */
export default function Reauthenticate({ reference }) {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const errorsCapture = (error) => {
    switch (error) {
      case "auth/user-mismatch":
      case "auth/user-not-found":
        return "User not found.";
      case "auth/invalid-credential":
        return "Invalid credentials.";
      case "auth/invalid-email":
        return "Invalid email.";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "There's been an error validating your credentials";
    }
  };

  const handleReferenceCallback = (callback) => {
    reference(callback);
  };

  const handleSubmit = () => {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
    user.reauthenticateWithCredential(credential)
      .then(() => {
        handleReferenceCallback(true);
        error && setError(false);
      })
      .catch((err) => {
        setError(errorsCapture(err));
      });
  };

  return (
    <div>
      {error && <p>{`Error: ${error}`}</p>}
      <h4>Verify account with your current password.</h4>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

Reauthenticate.propTypes = {
  reference: PropTypes.func,
};
