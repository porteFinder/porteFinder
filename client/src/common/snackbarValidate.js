import React from "react";

import Snackbar from "@material-ui/core/Snackbar";

import SlideTransition from "./slideTransition";
import MySnackbarContentWrapper from "./snackbarContent";

import WithContext from "../withContext";

const SnackbarValidate = props => {
  const state = { Transition: SlideTransition };
  return (
    <Snackbar
      open={props.value.snackbar.hasValidate}
      autoHideDuration={6000}
      onClose={props.value.resetSnackbar}
      TransitionComponent={state.SlideTransition}
    >
      <MySnackbarContentWrapper
        onClose={props.value.resetSnackbar}
        variant="success"
        message={props.value.snackbar.validateMessage}
      />
    </Snackbar>
  );
};

export default WithContext(SnackbarValidate);
