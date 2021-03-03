import React, { useContext, useEffect, useState } from "react";
import firebase from "./api/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import uidContextProvider from "./api/UidContext";
import { GetCurrentSubscriptions } from "./api/DatabaseActions";
import HomeIcon from "@material-ui/icons/HomeSharp";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem, Button } from "@material-ui/core";

export default function NavBar() {
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState("");
  const [subscriptions, setSubscriptions] = useState(null);
  const [user] = useAuthState(firebase.auth());
  const auth = firebase.auth();
  const { setUidContext } = useContext(uidContextProvider);
  const [anchorElement, setAnchorElement] = useState(null);
  let { pathname } = useLocation();
  const uiButtonLockout = pathname === "/login" || pathname === "/sign-up";

  /**
   * This useEffect chain is pulling the info from auth and Firestore.
   * Before the query/writes were cascaded, Context was being set in stages
   * which led to a bug (memory leak?) with the subscriptions. Essentally,
   * the context wasn't being update unless there was an additional render.
   * This was solved by just setting all context elements at the same time.
   * I'm still not totally sure why it wasn't updating...I think the update
   * was sitting in an un executed setState because the state was being updated
   * via useEffect.
   */

  useEffect(() => {
    if (user) {
      setUid(user.uid);
      setUsername(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (uid) {
      GetCurrentSubscriptions(uid)
        .then((result) => {
          setSubscriptions(result);
        })
        .catch((err) => {
          console.error(`Error with fetching subscriptions. Error: ${err} in NavBar`);
        });
    }
  }, [uid]);

  useEffect(() => {
    if (subscriptions) {
      setUidContext({ name: username, uid: uid, subscriptions: subscriptions });
    }
  }, [subscriptions]);

  const handleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

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
      <div className="site-title">
        the-times.page<span className="sub-title"> subscription/aggregation</span>
      </div>
      <nav className="navigation-wrapper">
        <div className={`home-icon-${pathname === "/home"}`}>
          <IconButton disabled={pathname === "/home"} href="/">
            <HomeIcon />
          </IconButton>
        </div>
        <div className="user-interface">
          <IconButton
            aria-controls="user-info-button"
            aria-haspopup="true"
            onClick={handleOpen}
            disabled={uiButtonLockout}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElement}
            keepMounted
            open={!!anchorElement}
            onClose={handleClose}
            className="navbar-popover"
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getContentAnchorEl={null}>
            {pathname !== "/login" && pathname !== "/sign-up" && !uid && (
              <MenuItem onClick={handleClose}>
                <Link to="/login">Login/Sign-up</Link>
              </MenuItem>
            )}
            {uid && (
              <div>
                {pathname !== "/user-info" && (
                  <MenuItem onClick={handleClose}>
                    <Link to="/user-info">Account Info</Link>
                  </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                  <Button onClick={signOut}>Logout</Button>
                </MenuItem>
              </div>
            )}
          </Menu>
        </div>
      </nav>
    </div>
  );
}
