import React, { useContext, useEffect, useState } from "react";
import firebase from "./api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import uidContextProvider from "./api/UidContext";
import { GetCurrentSubscriptions } from "./api/DatabaseActions";

export default function NavBar() {
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [user] = useAuthState(firebase.auth());
  const auth = firebase.auth();
  const { uidContext, setUidContext } = useContext(uidContextProvider);
  let path = useLocation().pathname;

  // This split of the useEffect is to handle sign-outs from places that
  // recive user info from Context
  useEffect(() => {
    if (user) {
      setUidContext({ name: user.displayName, uid: user.uid, subscriptions: subscriptions });
    }
  }, [user, subscriptions]);

  useEffect(() => {
    if (uidContext.uid) {
      setUid(uidContext.uid);
      setUsername(uidContext.name);

      // I'm not sure this is the best approach to getting the db contents into the system. There must be a more elegant way!
      if (subscriptions === null) {
        GetCurrentSubscriptions(user.uid)
          .then((response) => {
            setSubscriptions(response);
          })
          .catch((err) => {
            console.error(`Error with fetching subscriptions. Error: ${err} in NavBar`);
          });
      }
    }
  }, [uidContext.uid]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUid(null);
        setUsername(null);
        setUidContext({ name: null, uid: null, subscriptions: [] });
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
