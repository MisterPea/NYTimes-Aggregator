import React, { useContext, useEffect, useState } from "react";
import firebase from "./api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import uidContextProvider from "./api/UidContext";
import { GetCurrentSubscriptions } from "./api/DatabaseActions";


export default function NavBar() {
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState("");
  const [subscriptions, setSubscriptions] = useState(null);
  const [user] = useAuthState(firebase.auth());
  const auth = firebase.auth();
  const { setUidContext } = useContext(uidContextProvider);
  let { pathname } = useLocation()

  /**
   * This useEffect chain is pulling the info from auth and Firestore.
   * Before the query/writes were cascaded Context was being set in stages
   * which led to a bug (memory leak?) with the subscriptions. Essentally, 
   * the context wasn't being update unless there was an additional render.
   * This was solved by just setting all context elements at the same time.
   * I'm still not totally sure why it wasn't updating...I think the update
   * was sitting in an un executed setState because the state was being updated
   * via useEffect. 
   */

  useEffect(() => {
    if(user){
      setUid(user.uid)
      setUsername(user.displayName)
    }
  },[user])

  useEffect(() => {
    if(uid){
      GetCurrentSubscriptions(uid)
        .then((result) => {
          setSubscriptions(result)
        })
        .catch((err) => {
          console.error(`Error with fetching subscriptions. Error: ${err} in NavBar`);
        });
    }
  },[uid])

  useEffect(() => {
    if(subscriptions){
      setUidContext({ name:username, uid:uid, subscriptions: subscriptions })
    }
  },[subscriptions])
  
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
      <div className="site-title">the-times.page<span className="sub-title"> subscription/aggregation</span></div>
      <div className="navigation">
        {pathname !== "/home" && <Link to="/">Home</Link>}
        {pathname !== "/login" && pathname !== "/sign-up" && !uid && <Link to="/login">Login</Link>}
        {pathname !== "/user-info" && uid && <Link to="/user-info">{username}</Link>}
        {pathname !== "/user-info" && uid && <button onClick={signOut}>Logout</button>}
      </div>
    </div>
  );
}