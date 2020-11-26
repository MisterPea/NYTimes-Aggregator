import React, { useContext, useEffect, useState } from "react";
import firebase from "./api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import uidContextProvider from "./api/UidContext";

export default function NavBar() {
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState(null);
  const [user] = useAuthState(firebase.auth());
  const auth = firebase.auth();
  let path = useLocation().pathname;
  const { setUidContext } = useContext(uidContextProvider);
 
  useEffect(() => {
    if (user) {
      setUid(user.uid);
      setUsername(user.displayName);
      setUidContext(user.uid)
    }
  }, [user]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUid(null);
        setUidContext(null)
        console.log("Signed out");
        // unmount modal - flush context
      })
      .catch((err) => {
        console.error(`Oh snap! A ${err} error has been thrown on sign-out.`);
      });
  };

  return (
    <div className="navbar-wrapper">
      <div className="site-title">NYT Aggregator</div>
      <div className="navigation">
        {path !== "/" && <Link to="/">Home</Link>}
        {path !== "/login" && path !== "/sign-up" && !uid && <Link to="/login">Login</Link>}
        {path !== "/user-info" && uid && <Link to="/user-info">{username}</Link>}
        {uid && <button onClick={signOut}>Logout</button>}
      </div>
    </div>
  );
}
