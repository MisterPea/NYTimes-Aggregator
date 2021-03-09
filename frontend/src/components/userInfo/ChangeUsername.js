import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ChangeUsername({ user, reference, dialogRef }) {
  const [newUsername, setNewUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };
 
  const handleClick = () => {
    user
      .updateProfile({ displayName: newUsername })
      .then(() => {
        setSubmitted(true);
        setError(false);
        reference(newUsername);
      })
      .catch((err) => {
        setError(err);
        setSubmitted(true);
      });
  };

  const changeUsernamePre = (
    <div className="body-holder input">
      <input
        type="text"
        value={newUsername}
        onChange={(e) => {
          handleChange(e);
        }}
        placeholder="Enter new username"
      />
      <button
        onClick={() => {
          handleClick();
        }}>
        Submit
      </button>
    </div>
  );

  const changeUsernamePost = (
    <div className="body-holder input">
      {!error ? (
        <div className="body-holder">
          <p>Your username has been updated.</p>
          <button onClick={dialogRef}>Close</button>
        </div>
      ) : (
        <div className="body-holder">
          <p>{`There has been an error: ${error}`}</p>
          <button onClick={dialogRef}>Close</button>
        </div>
      )}
    </div>
  );

  return <>{!submitted ? changeUsernamePre : changeUsernamePost}</>;
}

ChangeUsername.propTypes = {
  user: PropTypes.object,
  reference: PropTypes.func,
  dialogRef: PropTypes.func,
};
