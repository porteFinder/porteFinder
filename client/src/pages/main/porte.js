import React from "react";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }
}));

const Porte = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="body1">
        Coordonnées:{" "}
        <span style={{ color: "#f50057", fontWeight: "bold" }}>
          {props.porte.coo}
        </span>
      </Typography>
      <Typography variant="body1">
        Code:{" "}
        <span style={{ color: "#f50057", fontWeight: "bold" }}>
          {props.porte.code || "inconnu"}
        </span>
      </Typography>
    </Paper>
  );
};

export default Porte;
