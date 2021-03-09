import React, { useState } from "react";
import { VerifyPassword } from "../api/VerifyEmailPassword";
import PropTypes from "prop-types";
import Reauthenticate from "./Reauthenticate";

export default function ChangePassword({ user, dialogRef }) {
  const [newPassword, setNewPassword] = useState("");
  const [submitDeactive, setSubmitDeactive] = useState(true);
  const [reauthSuccess, setReauthSuccess] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleUpdate = (e) => {
    setNewPassword(e.target.value);
    if (VerifyPassword(e.target.value)) {
      submitDeactive && setSubmitDeactive(false);
    } else {
      !submitDeactive && setSubmitDeactive(true);
    }
  };

  const handlePasswordChange = () => {
    user
      .updatePassword(newPassword)
      .then(() => {
        setPasswordChangeSuccess(true);
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

  const passwordChangeInit = (
    <div className="body-holder">
      <input
        value={newPassword}
        type="password"
        onChange={(e) => {
          handleUpdate(e);
        }}
        placeholder="Enter new password"
      />
      <button
        onClick={() => {
          handlePasswordChange();
        }}
        disabled={submitDeactive}>
        Submit
      </button>
    </div>
  );

  const passwordChangeConfirm = (
    <div className="body-holder input">
      <p>Your password has been updated.</p>
      <button onClick={dialogRef}>Close</button>
    </div>
  );

  return (
    <>
      {!reauthSuccess ? (
        <Reauthenticate user={user} reference={reauthRefrence} />
      ) : !passwordChangeSuccess ? (
        passwordChangeInit
      ) : (
        passwordChangeConfirm
      )}
    </>
  );
}

ChangePassword.propTypes = {
  user: PropTypes.object,
  dialogRef: PropTypes.func,
};
