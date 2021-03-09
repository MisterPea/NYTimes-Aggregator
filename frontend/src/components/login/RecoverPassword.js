import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import firebase from "../api/Auth";
import { VerifyEmail } from "../api/VerifyEmailPassword";
import { Dialog, DialogContentText } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton} from '@material-ui/core'
import { Button } from '@material-ui/core'

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

  const handleFailDialogClose = () => {
    setSuccess(null);
  }

  const preSubmit = (
    <div className="password-recover-wrapper">
      <p className="login-body-text">
        {"Enter your email address and we'll send you a link to reset your password."}
      </p>
      <label htmlFor="email-recover">Email</label>
      <input
        className="password-recover-input"
        name="email-recover"
        value={emailRecover}
        onChange={(e) => {
          setEmailRecover(e.target.value);
        }}></input>
      <div className="login-buttons">
        <button
          disabled={validEmailRecover}
          className={`submit-button-${validEmailRecover ? "disabled" : "active"}`}
          onClick={() => {
            handlePasswordReset();
          }}>
          Submit
        </button>
        <Link className="create-acct-button" to="/sign-up">Create an Account</Link>
      </div>
    </div>
  );

  const postSubmitSuccess = (
    <div>
      <DialogContentText>{"A password-reset link has been sent to your email."}</DialogContentText>
      <Button
        onClick={() => {
          handleLoginReturn();
        }}>
        Return to the login page.
      </Button>
    </div>
  );

  const postSubmitFailure = (
    <div>
      <IconButton 
        onClick={handleFailDialogClose}
        className="close-button"
        >
        <CancelIcon />
      </IconButton>
      <DialogContentText>{"Sorry, we can't seem to find that email in our files. Could you try again?"}</DialogContentText>
    </div>
  );

  return (
    <div className="login-wrapper">
      <h3 className="login-headline">Forgot your password?</h3>
      {preSubmit}
      <Dialog
        className="dialog-fail-wrapper"
        open={success === false}
        onClose={handleFailDialogClose}>
        {postSubmitFailure}
      </Dialog>

      <Dialog
        className="dialog-success-wrapper"
        open={success === true}
        onClose={handleFailDialogClose}>
        {postSubmitSuccess}
      </Dialog>
    </div>
  );
}
