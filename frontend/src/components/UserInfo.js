import React, { useState } from "react";
import AccountInfo from "./userInfo/AccountInfo";
import SubscriptionInfo from "./userInfo/SubscriptionInfo";
import { ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core"

export default function UserInfo() {
  const doubleWide = useMediaQuery('(min-width: 960px)');


  const useStyles = makeStyles({
    root: {
      display:"flex",
      flexDirection: "column",
      alignItems:"center",
      textTransform:"unset",
      margin: "15px 0 25px",
    },
    button: {
      "&.MuiButton-root": {
        background:"#FFF",
        color: "#000",
        "&:hover":{
          backgroundColor: "rgba(197, 235, 197, 0.705)",
        },
        "&:active":{
          backgroundColor: "rgba(197, 235, 197, 0.705)",
        },
      },
      "&.Mui-disabled": {
        background: "#d5dbd3",
        color:"#adb3ab"
      },
    }
  });

  
  const classes = useStyles();

  const DoubleWide = () => {
    return (
      <div className="control-panel">
        <div className="info-holder">
          <AccountInfo />
        </div>
        <div className="info-holder">
          <SubscriptionInfo />
        </div>
      </div>
    );
  }

  const SingleWide = () => {
    const [currentPanel, setCurrentPanel] = useState("sub");

    const handleClick = (btn) => {
      setCurrentPanel(btn);
    };
    
    return (
      <React.Fragment>
        <div className="control-panel">
          <div className={classes.root}>
            <ButtonGroup variant="contained" fullWidth={true}>
              <Button
                className={classes.button}
                disabled={currentPanel === "sub"}
                onClick={() => {
                  handleClick("sub");
                }}>
                Subscription Info
              </Button>
              <Button
                className={classes.button}
                disabled={currentPanel === "info"}
                onClick={() => {
                  handleClick("info");
                }}>
                Account Info
              </Button>
            </ButtonGroup>
          </div>
          <div className="info-holder">
            {currentPanel === "info" ? <AccountInfo /> : <SubscriptionInfo />}
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment >
      {doubleWide === true ? <DoubleWide /> : <SingleWide />}
    </React.Fragment>
  )
}
