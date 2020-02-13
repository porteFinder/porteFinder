import React from "react";

import Snackbar from "@material-ui/core/Snackbar";

import SlideTransition from "./slideTransition";
import MySnackbarContentWrapper from "./snackbarContent";

import WithContext from "../withContext";

const SnackbarError = props => {
  const state = { Transition: SlideTransition };
  return (
    <Snackbar
      open={props.value.snackbar.hasError}
      autoHideDuration={6000}
      onClose={props.value.resetSnackbar}
      TransitionComponent={state.SlideTransition}
    >
      <MySnackbarContentWrapper
        onClose={props.value.resetSnackbar}
        variant="error"
        message={props.value.snackbar.errorMessage}
      />
    </Snackbar>
  );
};

export default WithContext(SnackbarError);
