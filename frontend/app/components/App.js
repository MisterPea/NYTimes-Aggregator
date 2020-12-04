import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import SectionMenu from "./SectionMenu";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import UserInfo from "./UserInfo";
import uidContextProvider from "./api/UidContext";
import FourOhFour from "./FourOhFour";

/**
 * In order for the useLocation hook to work the App component
 * needs to be wrapped with the Router, and that hook cannot be
 * in the same component as the Router. So, index renders App and App renders
 * NavBar.
*/

export default function App() {
  const [uidContext, setUidContext] = useState({ name: null, uid: null, subscriptions: [] });
  const value = { uidContext, setUidContext };

  return (
    <uidContextProvider.Provider value={value}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={CreateAccount} />
          <Route exact path="/user-info" component={UserInfo} />
          <Route exact path="/:section" component={SectionMenu} />
          <Redirect exact from="/" to="/home" />
          <Route component={FourOhFour} />
        </Switch>
      </Router>
    </uidContextProvider.Provider>
  );
}
