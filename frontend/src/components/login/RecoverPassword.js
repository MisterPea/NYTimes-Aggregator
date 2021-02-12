import React, { useState, useEffect } from "react";
import firebase from "../api/Auth";
import { VerifyEmail } from "../api/VerifyEmailPassword";

export default function setRecoverPassword(props) {
  const [emailRecover, setEmailRecover] = useState("");
  const [validEmailRecover, setValidEmailRecover] = useState(true);
  const [success, setSuccess] = useState(null);

  const auth = firebase.auth();

  useEffect(() => {
    setValidEmailRecover(VerifyEmail(emailRecover) ? false : true);
  }, [emailRecover]);

  const handlePasswordReset = () => {
    auth
      .sendPasswordResetEmail(emailRecover)
      .then(() => {
        setSuccess(true);
        setEmailRecover("");
      })
      .catch(() => {
        setSuccess(false);
        setEmailRecover("");
      });
  };

  const handleLoginReturn = () => {
    props.loginReturn();
  };
  const preSubmit = (
    <React.Fragment>
      <p>{"Enter your email address and we'll send you a link to reset your password."}</p>
      <label htmlFor="email-recover">Email</label>
      <input
        name="email-recover"
        value={emailRecover}
        placeholder="Email Address"
        onChange={(e) => {
          setEmailRecover(e.target.value);
        }}></input>
      <button
        disabled={validEmailRecover}
        className="submit-recover"
        onClick={() => {
          handlePasswordReset();
        }}>
        Submit
      </button>
      <button
        onClick={() => {
          setRecoverPassword(false);
        }}>
        Login
      </button>
    </React.Fragment>
  );

  const postSubmitSuccess = (
    <React.Fragment>
      <p>{"A password reset link has been sent to email."}</p>
      <button
        onClick={() => {
          handleLoginReturn();
        }}>
        Return to the login page.
      </button>
    </React.Fragment>
  );

  const postSubmitFailure = (
    <React.Fragment>
      <p>{"We don't have that email on file."}</p>
      <button
        onClick={() => {
          setSuccess(null);
        }}>
        Re-enter your email.
      </button>
    </React.Fragment>
  );

  return (
    <div className="login-wrapper">
      <h3>Forgot your password?</h3>
      {success === null ? preSubmit : success === true ? postSubmitSuccess : postSubmitFailure}
    </div>
  );
}
