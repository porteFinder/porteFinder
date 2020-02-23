import React, { createRef, useState } from "react";
import { Helmet } from "react-helmet";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import WithContext from "../../withContext";

const useStyle = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  title: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  username: {
    fontWeight: "bold"
  }
}));

const Login = props => {
  const [state, setState] = useState({
    error: null,
    hasError: false
  });

  const classes = useStyle();
  const username = createRef();
  const password = createRef();

  const onSubmit = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      })
    });
    const json = await res.json();
    if (res.status === 200) {
      props.value.setLogged(true);
    } else {
      setState({ error: json.errors.message, hasError: true });
    }
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };
  return (
    <>
      <Helmet>
        <title>Login - Porte Finder</title>
      </Helmet>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Celestus porte finder
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se Connecter
          </Typography>
          <form className={classes.form} noValidate onKeyDown={onKeyDown}>
            <TextField
              autoComplete="new-password"
              helperText={state.error}
              inputRef={username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Identifiant"
              autoFocus
              error={state.hasError}
            />
            <TextField
              inputRef={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de Passe"
              type="password"
              id="password"
              autoComplete="current-password"
              error={state.hasError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Connexion
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default WithContext(Login);
