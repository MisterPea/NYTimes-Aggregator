import React, { useState } from "react";
import AccountInfo from "./userInfo/AccountInfo";
import SubscriptionInfo from "./userInfo/SubscriptionInfo";
import { ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"

export default function UserInfo() {
  const [currentPanel, setCurrentPanel] = useState("sub");

  const handleClick = (btn) => {
    setCurrentPanel(btn);
  };

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
  // const {root, button} = useStyles();

  return (
    <div className="control-panel">
      <div className={classes.root}>
        <ButtonGroup  variant="contained" fullWidth={true}>
          <Button
            className={classes.button}
            disabled={currentPanel === "sub"} 
            onClick={() => {handleClick("sub")}}
            >
            Subscription Info
          </Button>
          <Button
            className={classes.button}
            disabled={currentPanel === "info"}
            onClick={() => {handleClick("info")}}
            >
            Account Info
          </Button>
        </ButtonGroup>
        </div>
      <div className="info-holder">
        {currentPanel === "info" ? <AccountInfo /> : <SubscriptionInfo />}
      </div>
    </div>
  );
}
