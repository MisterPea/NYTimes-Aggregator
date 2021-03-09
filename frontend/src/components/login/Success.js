import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function Success({ userName }) {
    const [counter, setCounter] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
          setCounter(counter => counter-1);
        }, 1000); 
        return () => clearInterval(interval);
      }, []);
      
  return (
    <div className="login-wrapper">
      <h4 className="welcome-back">Welcome back, {userName}!</h4>
      <Link className="continue-button" to="/">Continue to the Home Page</Link>
      <p className="welcome-back">{`You will be redircted in ${counter} seconds`}</p>
      {counter <= -1 ? <Redirect to="/" /> : null}
    </div>
  );
}

Success.propTypes = {
  userName: PropTypes.string,
};
