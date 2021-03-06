import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import SectionMenu from "./SectionMenu";
import uidContextProvider from "./api/UidContext";
import FourOhFour from "./FourOhFour";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
const CreateAccount = lazy(() => import('./CreateAccount'));
const UserInfo = lazy(() => import("./UserInfo"));
import PropTypes from "prop-types";

/**
 * In order for the useLocation hook to work the App component
 * needs to be wrapped with the Router, and that hook cannot be
 * in the same component as the Router. So, index renders App and App renders
 * NavBar.
 */
export default function App() {
  const [uidContext, setUidContext] = useState({ name: null, uid: null, subscriptions: [] });
  const value = { uidContext, setUidContext };

  const theme = createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    typography: {
      textTransform: "none",
      textDecorationColor: "none",
      fontFamily: "neue-haas-grotesk-display, sans-serif",
      fontWeight: 400,
      fontStyle: "normal",
      color: "#000",
      button: {
        textTransform: "none",
        fontFamily: "neue-haas-grotesk-display, sans-serif",
        fontWeight: 600,
        fontStyle: "normal",
        color: "#000",
      },
    },
  });

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return uidContext.uid !== null ? children : <Redirect to="/home" />;
        }}
      />
    );
  }

  PrivateRoute.propTypes = {
    children: PropTypes.object,
  };

  return (
    <uidContextProvider.Provider value={value}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <Switch>
              <Route exact path="/sign-up" component={CreateAccount} />
              <PrivateRoute exact path="/user-info">
                <UserInfo />
              </PrivateRoute>
              <Route path="/:section/" component={SectionMenu} />
              <Redirect from="/" to="/home" />
              <Route component={FourOhFour} />
            </Switch>
          </MuiThemeProvider>
        </Suspense>
      </Router>
    </uidContextProvider.Provider>
  );
}
