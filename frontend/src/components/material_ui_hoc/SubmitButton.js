import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"

const styles = {
    root:{
        backgroundColor:"#7cb342",
        color:"#fff",
        fontFamily: "neue-haas-grotesk-display, sans-serif",
        fontSize:"20px",
        fontWeight: 500,
        fontStyle: "normal",
        margin: "20px auto 30px",
        display: "block",
        padding: "5px 30px",
        textTransform:"none",
        "&:hover" : {
            backgroundColor: "red",
        }
    },
    disabled: {
        backgroundColor:"#aed581",
        color:"#c5e1a5",
        cursor: "none"
    }
}

function SubmitButton(props) {
  const { classes } = props;
  return (
    <Button
      className={classes.root}
      type={"submit"}
      id={props.id}
      disabled={props.disabled}
      onClick={props.submitCallback}>
      {props.children}
    </Button>
  );
}

SubmitButton.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.string,
    root: PropTypes.object,
    id:PropTypes.string,
    disabled: PropTypes.bool,
    submitCallback: PropTypes.func
}

export default withStyles(styles)(SubmitButton)

