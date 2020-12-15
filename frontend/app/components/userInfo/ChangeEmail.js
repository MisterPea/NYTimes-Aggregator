import React, { useState } from "react";
import { VerifyEmail } from "../api/VerifyEmailPassword";
import PropTypes from "prop-types";
import Reauthenticate from "./Reauthenticate";

export default function ChangeEmail({ user, reference }) {
  const [newEmail, setNewEmail] = useState("");
  const [submitDeactive, setSubmitDeactive] = useState(true);
  const [reauthSuccess, setReauthSuccess] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);

  const handleUpdate = (e) => {
    setNewEmail(e.target.value);
    if (VerifyEmail(e.target.value)) {
      submitDeactive && setSubmitDeactive(false);
    } else {
      !submitDeactive && setSubmitDeactive(true);
    }
  };

  const handleEmailUpdateReference = (email) => {
    reference(email)
  }

  const handleEmailChange = () => {
    user.updateEmail(newEmail)
      .then(() => {
        setEmailChangeSuccess(true);
        handleEmailUpdateReference(newEmail)
      })
      .catch((err) => {
        if (err.code === "auth/requires-recent-login") {
          console.error(err);
        }
      });
  };

  const reauthRefrence = (reauthStatus) => {
    setReauthSuccess(reauthStatus);
  };

  const emailChangeInit = (
    <>
      <input
        value={newEmail}
        onChange={(e) => {
          handleUpdate(e);
        }}
        placeholder="Enter new email"
      />
      <button
        onClick={() => {
          handleEmailChange();
        }}
        disabled={submitDeactive}>
        Submit
      </button>
    </>
  );

  const emailChangeConfirm = (
    <>
      <p>Your email address has been updated.</p>
    </>
  );

  return (
    <>
      {!reauthSuccess ? (
        <Reauthenticate user={user} reference={reauthRefrence} />
      ) : !emailChangeSuccess ? (
        emailChangeInit
      ) : (
        emailChangeConfirm
      )}
    </>
  );
}

ChangeEmail.propTypes = {
  user: PropTypes.object,
  reference: PropTypes.func
};
