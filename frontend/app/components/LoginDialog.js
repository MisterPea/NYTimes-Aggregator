import React, { useState } from "react";

/*  This function is called if the user is not logged in.
    They are first presented with a create account login,
    and an option to login. It might be better to have the login
    option presented first. 
    @ props: message: which is presented at the top of the login. 
    */

export default function LoginDialog(props) {
  const [login, setLogin] = useState(false);

  const createAccount = (
    <div className="login-wrapper">
      {props.message && <div className="message">{props.message}</div>}
      <h3>Create a New Account</h3>
      <label htmlFor="userEmail">Email</label>
      <input type="text" name="userEmail" className="text-input" placeholder="Email"></input>
      <label htmlFor="userPassword">Password</label>
      <input
        type="password"
        name="userPassword"
        className="text-input"
        placeholder="Password"></input>
      <button className="submit-button">Submit</button>
      <p
        onClick={() => {
          !login && setLogin(true);
        }}>
        Already have an account?
      </p>
    </div>
  );

  const loginToAccount = (
    <div className="login-wrapper">
      <h3>Login to your Account</h3>
      <label htmlFor="userEmail">Email</label>
      <input type="text" name="userEmail" className="text-input" placeholder="Email"></input>
      <label htmlFor="userPassword">Password</label>
      <input
        type="password"
        name="userPassword"
        className="text-input"
        placeholder="Password"></input>
      <button className="submit-button">Submit</button>
      <p
        onClick={() => {
          login && setLogin(false);
        }}>
        Create a new account?
      </p>
    </div>
  );

  return <div>{login ? loginToAccount : createAccount}</div>;
}
