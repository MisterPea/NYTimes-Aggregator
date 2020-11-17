import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom"
import SectionMenu from "./components/SectionMenu"
import LoginDialog from "./components/LoginDialog"
import UserInfo from "./components/UserInfo"

function App() {
  return (
    <Router>
      <Route exact path="/" component={SectionMenu} />
      <Route exact path="/login" component={LoginDialog} />
      <Route exact path="/user-info" component={UserInfo} />
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
