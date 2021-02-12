import React, { useEffect, useState } from "react";
import firebase from "../api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ChangeUsername from "./ChangeUsername"
import ChangeEmail from "./ChangeEmail"
import ChangePassword from "./ChangePassword"

export default function AccountInfo() {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (user) {
      setUserInfo({ username: user.displayName, email: user.email });
    }
  }, [user]);

  const handleSectionChange = (e) => {
    if (e.target.value === activeSection) {
      setActiveSection(null);
    } else {
      setActiveSection(e.target.value);
    }
  };

  const changeUsernameReference = (newUsername) => {
    setUserInfo({...userInfo, username:newUsername})
  }

  const changeEmailReference = (newEmail) => {
    setUserInfo({...userInfo, email:newEmail})
  }

  return (
    <div>
      <div className="email-block">
        <p>{`Current email: ${userInfo.email}`}</p>
        <div className="change-email">
          <label htmlFor="current"></label>
        </div>
        <menu>
          <button value="email" onClick={(e) => {handleSectionChange(e)}}>Change email</button>
          <button value="password" onClick={(e) => {handleSectionChange(e)}}>Change password</button>
        </menu>
        {activeSection === "email" && <ChangeEmail user={user} reference={changeEmailReference}/>}
        {activeSection === "password" && <ChangePassword user={user}/>}
        <p>{`Current username: ${userInfo.username}`}</p>
        <menu>
          <button
            value="username"
            onClick={(e) => {
              handleSectionChange(e);
            }}>
            Change username
          </button>
          {activeSection === "username" && <ChangeUsername user={user} reference={changeUsernameReference}/>}
        </menu>
      </div>
    </div>
  );
}
