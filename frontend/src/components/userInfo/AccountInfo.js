import React, { useEffect, useState } from "react";
import firebase from "../api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { Dialog, DialogContent } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import ContainedButton from "../material_ui_hoc/ContainedButton"

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
    if (e === activeSection) {
      setActiveSection(null);
    } else {
      setActiveSection(e);
    }
  };

  const changeUsernameReference = (newUsername) => {
    setUserInfo({ ...userInfo, username: newUsername });
  };

  const changeEmailReference = (newEmail) => {
    setUserInfo({ ...userInfo, email: newEmail });
  };

  const handleCloseReauth = () => {
    setActiveSection(null);
  };

  return (
    <div>
      <Dialog open={!!activeSection} onClose={handleCloseReauth}>
        <DialogContent className="account-change-dialog">
          <div className="account-change-wrapper">
            {activeSection === "email" && (
              <ChangeEmail
                user={user}
                dialogRef={handleCloseReauth}
                reference={changeEmailReference}
              />
            )}
            {activeSection === "password" && (
              <ChangePassword user={user} dialogRef={handleCloseReauth} />
            )}
            {activeSection === "username" && (
              <ChangeUsername
                user={user}
                dialogRef={handleCloseReauth}
                reference={changeUsernameReference}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      <h4>Your account info.</h4>
      <div className="email-block">
        <p>
          Current email: <span className="current-info">{userInfo.email}</span>
        </p>
        <div className="change-email">
          <label htmlFor="current"></label>
        </div>
        <ButtonGroup>
          <ContainedButton
            onClick={() => {
              handleSectionChange("email");
            }}>
            Change Email
          </ContainedButton>
          <ContainedButton
            onClick={() => {
              handleSectionChange("password");
            }}>
            Change Password
          </ContainedButton>
        </ButtonGroup>
        <p className="current-username">
          Current username: <span className="current-info">{userInfo.username}</span>
        </p>
          <ContainedButton
            onClick={() => {
              handleSectionChange("username");
            }}>
            Change Username
          </ContainedButton>      
      </div>
    </div>
  );
}
