import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const makeUseStyles = drawerWidth => {
  const style = makeStyles(theme => ({
    spinnerContainer: {
      width: "100%",
      height: "100vh",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      margin: 0
    },
    spinner: {
      position: "absolute",
      right: 0,
      left: 0,
      top: -55,
      margin: "auto"
    },
    wrapper: {
      position: "relative"
    }
  }));
  return style();
};

const Spinner = props => {
  const classes = makeUseStyles(props.drawerWidth);
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.wrapper}>
        <CircularProgress disableShrink={true} className={classes.spinner} />
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom={true}
          className={classes.title}
        >
          {props.message}
        </Typography>
      </div>
    </div>
  );
};

export default Spinner;
