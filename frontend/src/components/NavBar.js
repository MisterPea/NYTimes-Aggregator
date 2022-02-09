import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/HomeSharp';
import {
  IconButton, Menu, MenuItem, Dialog, DialogContent, DialogActions,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { GetCurrentSubscriptions } from './api/DatabaseActions';
import uidContextProvider from './api/UidContext';
import firebase from './api/Auth';
import Login from './Login';
import SuccessSnackbar from './material_ui_hoc/SuccessSnackbar';

export default function NavBar() {
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState('');
  const [subscriptions, setSubscriptions] = useState(null);
  const [user] = useAuthState(firebase.auth());
  const auth = firebase.auth();
  const { setUidContext } = useContext(uidContextProvider);
  const [anchorElement, setAnchorElement] = useState(null);
  const [activeLogin, setActiveLogin] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('User');
  const { pathname } = useLocation();
  const uiButtonLockout = pathname === '/login' || pathname === '/sign-up';

  const StyledMenu = withStyles({
    paper: {
      margin: '0 12px',
    },
    list: {
      padding: '0px',
    },
  })(Menu);

  const StyledMenuItem = withStyles({
    root: {
      fontFamily: 'neue-haas-grotesk-display, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      justifyContent: 'center',
    },
  })(MenuItem);

  /**
   * This useEffect chain is pulling the info from auth and Firestore.
   * Before the query/writes were cascaded, Context was being set in stages
   * which led to a bug (memory leak?) with the subscriptions. Essentially,
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
      setUidContext({ name: username, uid, subscriptions });
    }
  }, [subscriptions]);

  const handleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleSnackBarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
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

  const handleOpenLogin = () => {
    setActiveLogin(true);
  };

  const handleCloseLogin = () => {
    setActiveLogin(false);
  };

  return (
    <div className="navbar-wrapper">
      <SuccessSnackbar
        onOpen={snackbarOpen}
        onClose={handleSnackBarClose}
        message={`Welcome back, ${snackbarMessage}`}
      />
      <Dialog
        open={activeLogin}
        onClose={handleCloseLogin}
      >
        <DialogContent>
          <DialogActions>
            <CancelIcon style={{ fontSize: 30 }} onClick={handleCloseLogin} className="modal-close-button" />
          </DialogActions>
          <Login modalClose={handleCloseLogin} postLogin={handleSnackbarOpen} />
        </DialogContent>
      </Dialog>
      <div className="site-title">
        the-times.page
        <span className="sub-title"> subscription/aggregation</span>
      </div>
      <nav className="navigation-wrapper">
        <div className={`home-icon-${pathname === '/us' ? 'deactive' : 'active'}`}>
          <IconButton aria-label="home button" disabled={pathname === '/us'} href="/">
            <HomeIcon />
          </IconButton>
        </div>
        <div className={`user-interface-logged-${uid ? 'in' : 'out'}`}>
          <IconButton
            aria-label="user info button"
            aria-haspopup="true"
            onClick={handleOpen}
            disabled={uiButtonLockout}
          >
            <AccountCircleIcon />
          </IconButton>
          <StyledMenu
            anchorEl={anchorElement}
            keepMounted
            open={!!anchorElement}
            onClose={handleClose}
            className="navbar-popover"
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
          >
            {pathname !== '/login' && pathname !== '/sign-up' && !uid && (
              <StyledMenuItem onClick={() => { handleClose(); handleOpenLogin(); }}>
                Login/Sign-up
              </StyledMenuItem>
            )}
            {uid && (
              <div>
                {pathname !== '/user-info' && (
                  <StyledMenuItem onClick={handleClose}>
                    <Link className="link-button" to="/user-info">
                      Account Info
                    </Link>
                  </StyledMenuItem>
                )}
                <StyledMenuItem onClick={signOut}>Logout</StyledMenuItem>
              </div>
            )}
          </StyledMenu>
        </div>
      </nav>
    </div>
  );
}
