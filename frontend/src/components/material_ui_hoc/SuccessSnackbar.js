import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PropTypes from "prop-types";

function SuccessSnackbar({ message, onOpen, onClose }) {
  return (
    <Snackbar
      open={onOpen}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
      >
      <Alert onClose={onClose} severity="success" variant="filled">
        {message}
      </Alert>
    </Snackbar> 
  );
}
SuccessSnackbar.propTypes = {
  message: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  root: PropTypes.object,
};

export default SuccessSnackbar
