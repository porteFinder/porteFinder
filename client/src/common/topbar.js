import React from "react";
import { Link } from "react-router-dom";
import WithContext from "../withContext";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  username: {
    fontWeight: "bold"
  }
}));

const Topbar = props => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link
            to="/"
            style={{
              animation: "none",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Celestus porte finder
          </Link>
        </Typography>
        {
          <Typography variant="subtitle1">
            Bon retour,{" "}
            <span className={classes.username}>
              {props.value.user && props.value.user.username
                ? props.value.user.username
                : "Inconnu"}
            </span>
          </Typography>
        }
      </Toolbar>
    </AppBar>
  );
};

export default WithContext(Topbar);
