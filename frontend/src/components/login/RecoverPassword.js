import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import firebase from "../api/Auth";
import { VerifyEmail } from "../api/VerifyEmailPassword";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton} from '@material-ui/core'
import SubmitButton from "../material_ui_hoc/SubmitButton"
import  ContainedButton from "../material_ui_hoc/ContainedButton"
import { makeStyles } from "@material-ui/styles"

export default function setRecoverPassword({loginReturn, modalClose}) {
  const [emailRecover, setEmailRecover] = useState("");
  const [validEmailRecover, setValidEmailRecover] = useState(true);
  const [success, setSuccess] = useState(null);

  const auth = firebase.auth();

  const useStyles = makeStyles({
    closeButton:{
      color:'red',
      position:'absolute',
      top:"2px",
      right:"2px",
      height: "25px",
      width: "25px"
    },
    notifyText:{
      margin: "20px 0",
      color: "#000",
      fontSize: "1.1rem"
    }
  });

  const {closeButton,notifyText} = useStyles();

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
    loginReturn();
    modalClose && modalClose();
  };

  const handleFailDialogClose = () => {
    setSuccess(null);
  }

  const preSubmit = (
    <div className="password-recover-wrapper">
      <div className="login-body-text-wrapper">
        <p className="login-body-text">
          {"Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>
      <label htmlFor="email-recover">Email</label>
      <input
        className="password-recover-input"
        name="email-recover"
        value={emailRecover}
        onChange={(e) => {
          setEmailRecover(e.target.value);
        }}></input>
        <SubmitButton
          disabled={validEmailRecover}
          onClick={() => {
            handlePasswordReset();
          }}>
          Submit
        </SubmitButton>
      <div className="login-buttons">
        <Link className="create-acct-button" to="/sign-up" onClick={handleLoginReturn}>Create an Account</Link>
      </div>
    </div>
  );

  const postSubmitSuccess = (
    <div>
    <DialogContent>
      <DialogContentText className={notifyText}>
        {"A password-reset link has been sent to your email."}
        </DialogContentText>
      <ContainedButton
        onClick={() => {
          handleLoginReturn();
        }}>
        Return to the login page.
      </ContainedButton>
      </DialogContent>
    </div>
  );

  const postSubmitFailure = (
    <div>
      <IconButton 
        onClick={handleFailDialogClose}
        className={closeButton}
        >
        <CancelIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText className={notifyText}>
          {"Sorry, we can't seem to find that email in our files. Could you try again?"}
        </DialogContentText>
      </DialogContent>
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
