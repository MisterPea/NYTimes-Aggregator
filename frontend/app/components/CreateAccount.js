import React, { useState } from "react";
import NavBar from "./NavBar";
import firebase from "./Auth";
import { Link } from "react-router-dom";

export default function CreateAccount({message}) {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const auth = firebase.auth();

  const createUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({ displayName: username });
      })
      .then(() => {
          setPassword("")
          setUsername("")
          setEmail("")
        ///post signup info
      })
      .catch((err) => {
        // TODO: set alert with info.
        let errorCode = err.code;
        let errorMessage = err.message;
      });
  };

  return (
    <div className="login-wrapper">
    <NavBar />
      {message && <div className="message">{message}</div>}
      <h3>Create a New Account</h3>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        className="text-input"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}></input>
      <label htmlFor="userEmail">Email</label>
      <input
        type="text"
        name="userEmail"
        className="text-input"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}></input>
      <label htmlFor="userPassword">Password</label>
      <input
        type="password"
        name="userPassword"
        className="text-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}></input>
      <button
        className="submit-button"
        onClick={() => {
          createUser();
        }}>
        Submit
      </button>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}
