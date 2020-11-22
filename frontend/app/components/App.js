import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "./NavBar";
import SectionMenu from "./SectionMenu";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import UserInfo from "./UserInfo";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={SectionMenu} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={CreateAccount} />
      <Route exact path="/user-info" component={UserInfo} />
    </Router>
  );
}
