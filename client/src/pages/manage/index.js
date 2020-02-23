import React, { useEffect, useState } from "react";
import clsx from "clsx";
import WithContext from "../../withContext";
import { Helmet } from "react-helmet";

import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Stats from "./stats";
import PortesTable from "./portesTable";
import PorteForm from "./porteForm";

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  username: {
    fontWeight: "bold"
  },
  tabLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mt: {
    marginTop: "65px",
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const Manage = props => {
  const classes = useStyles();

  const [state, setState] = useState({
    query: "",
    portes: [],
    _portes: []
  });

  const fetch_portes = async () => {
    const res = await fetch("/api/porte/all");
    const json = await res.json();
    setState({ ...state, portes: json.portes, _portes: json.portes });
  };

  useEffect(() => {
    fetch_portes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state._portes && state._portes.length > 0) {
      const portes = [...state._portes].filter(el =>
        el.coo.includes(state.query)
      );
      setState({ ...state, portes: portes });
    }
    // eslint-disable-next-line
  }, [state.query]);

  const deletePorte = async id => {
    const res = await fetch("/api/porte/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id })
    });
    if (res.status === 200) {
      const json = await res.json();
      props.value.setValidate(json.msg);
      const portes = [...state.portes];
      for (let i = 0; i < portes.length; i++) {
        if (portes[i]._id === id) {
          portes.splice(i, 1);
          setState({ ...state, portes: portes, _portes: portes });
          break;
        }
      }
    } else {
      const json = await res.json();
      props.value.setError(json.errors.message);
    }
  };

  const get_index = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === id) {
        console.log("pass");
        return i;
      }
    }
  };

  const updatePorte = async (data, index) => {
    props.value.resetSnackbar();
    const res = await fetch("/api/porte/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ porte: data })
    });
    if (res.status === 200) {
      const json = await res.json();
      props.value.setValidate(json.msg);
      const portes = [...state.portes];
      const _portes = [...state._portes];
      console.log(json.porte);
      const indexConst = get_index(state._portes, json.porte._id);
      const indexRender = get_index(state.portes, json.porte._id);
      console.log(indexConst);
      console.log(portes);
      _portes[indexConst] = json.porte;
      portes[indexRender] = json.porte;
      console.log(portes);
      setState({ ...state, portes: portes, _portes: _portes });
      return true;
    } else {
      const json = await res.json();
      props.value.setError(json.errors.message);
      return false;
    }
  };

  const handleChange = e => setState({ ...state, query: e.target.value });

  return (
    <>
      <Helmet>
        <title>Gérer - Porte Finder</title>
      </Helmet>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={8}>
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
              <PorteForm handleChange={handleChange} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
              <Stats portes={state.portes} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={clsx(classes.paper)}>
              <PortesTable
                portes={state.portes}
                deletePorte={deletePorte}
                updatePorte={updatePorte}
                query={state.query}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WithContext(Manage);
