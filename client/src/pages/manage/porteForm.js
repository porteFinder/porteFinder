import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: ".9rem"
  },
  input: {
    marginTop: theme.spacing(6)
  }
}));

const PorteForm = props => {
  const classes = useStyles();
  return (
    <>
      <Typography
        className={classes.title}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        Gestion de Portes
      </Typography>
      <TextField
        onChange={props.handleChange}
        className={classes.input}
        label="Coordonnées de la porte"
        fullWidth
        margin="normal"
        autoComplete="off"
      ></TextField>
    </>
  );
};

export default PorteForm;
