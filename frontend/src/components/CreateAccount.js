import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import firebase from './api/Auth';
import { VerifyEmailAndPassword } from './api/VerifyEmailPassword';
import { InitUser } from './api/DatabaseActions';
import uidContextProvider from './api/UidContext';
import SubmitButton from './material_ui_hoc/SubmitButton';

export default function CreateAccount({ message }) {
  const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
  const [validCredentials, setValidCredentials] = useState(false);
  const [success, setSuccess] = useState(false);
  const [acctCreationError, setAcctCreationError] = useState({ dbError: null, authError: null });
  const [validSubmission, setValidSubmission] = useState(false);
  const [validationErrors, setValidationErrors] = useState({ email: false, password: false, user: false });
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
        password,
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
              setUidContext({ name: username, uid: newUser.user.uid });
              setCredentials({ ...credentials, email: '', password: '' });
              handleEmailVerification();
            })
            .catch((err) => {
              setAcctCreationError({ authError: true });
              console.error(`Dang. Something's not right: ${err}`);
            });
        })
        .catch(() => {
          setAcctCreationError({ dbError: true });
        });
    } else {
      // This will be called if there are validation errors.
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

  const loginInit = (
    <div className="create-acct-wrapper">
      <div className="create-acct-about">
        <div className="create-acct-text-holder">
          <h3>Why Create an Account?</h3>
          <p>
            Creating an account will allow you to receive once daily,
            email updates based upon the topics you have subscribed to.
            You will only receive an email if there are new articles for the
            topics you selected. Add or remove topics as often or infrequently as you like.
          </p>
        </div>
      </div>
      <div className="login-wrapper">
        {message && <div className="message">{message}</div>}
        <h3 className="login-headline">Create a New Account</h3>
        <div className="email-input">
          <p className="create-acct-space" htmlFor="username">
            Username
          </p>
          <input
            type="text"
            name="username"
            className="text-input"
            value={username}
            onChange={(e) => {
              handleCredentialChange(e);
            }}
          />
        </div>
        <div className="warning-dialog new-acct">
          {validSubmission && !validationErrors.user && (
            <p>
              Username must be between 3-35 characters.
              <br />
              {' '}
              Using letters and &apos;-&apos;, &apos;_&apos;, or &.
            </p>
          )}
        </div>
        <div className="email-input">
          <p className="create-acct-space" htmlFor="email">
            Email
          </p>
          <input
            type="text"
            name="email"
            className="text-input"
            value={email}
            onChange={(e) => {
              handleCredentialChange(e);
            }}
          />
        </div>
        <p className="warning-dialog new-acct">
          {validSubmission && !validationErrors.email && 'Email address is not valid.'}
        </p>
        <div className="email-input">
          <p className="create-acct-space" htmlFor="userPassword">
            Password
          </p>
          <input
            type="password"
            name="password"
            className="text-input"
            value={password}
            onChange={(e) => handleCredentialChange(e)}
          />
        </div>
        <div className="warning-dialog new-acct">
          {validSubmission && !validationErrors.password && (
            <p>
              Password must be 8 characters in length
              <br />
              with at least one capitalized letter and one number.
            </p>
          )}
        </div>

        <SubmitButton
          submitCallback={createUser}
          disabled={false}
          id="create-acct-submit"
        >
          Submit
        </SubmitButton>
        <div className="login-buttons">
          <Link
            className="have-account-button"
            aria-controls="have an account"
            to={{
              pathname: '/us',
              state: { locationFrom: true },
            }}
          >
            Already have an account?
          </Link>
        </div>
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
      </div>
    </div>
  );

  return (
    <div className="create-return-wrapper">
      {success
        ? (
          <Redirect to={{
            pathname: '/us',
            state: { newUser: credentials.username },
          }}
          />
        )
        : loginInit}
    </div>
  );
}

CreateAccount.propTypes = {
  message: PropTypes.string,
};
