import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const path = window.location.pathname;
  const [auth, setAuth] = useState(null);

  return (
    <div className="navbar-wrapper">
      <div className="site-title">NYT Aggregator</div>
      <div className="navigation">
        {path !== "/" 
        ? <Link to="/">Home</Link>
        : auth 
        ? <Link to="/user-info">User Info</Link>
        : <Link to="/login">Login</Link>}
      </div>
    </div>
  );
}
