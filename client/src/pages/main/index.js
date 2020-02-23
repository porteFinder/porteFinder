import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";

import { Spinner } from "../../common";
import Porte from "./porte";

import { makeStyles } from "@material-ui/core/styles";
import WithContext from "../../withContext";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "0 auto 0 auto"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  center: {
    margin: "0 auto 0 auto"
  },
  title: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  rootmt: {
    marginTop: "130px",
    textAlign: "center"
  },
  mt3: {
    marginTop: theme.spacing(5)
  }
}));

const Main = props => {
  const classes = useStyles();

  const [coo, setCoo] = useState("");

  const handleSubmit = () => props.value.getPorte(coo);
  const handleChange = newVal => setCoo(newVal);
  const handleReset = () => {
    setCoo("");
    props.value.setPorte([]);
  };
  return (
    <>
      <Helmet>
        <title>Porte Finder</title>
      </Helmet>
      <Container className={classes.rootmt}>
        <Typography
          className={classes.titleP}
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom={true}
        >
          Recherche de Porte
        </Typography>
        <SearchBar
          onChange={handleChange}
          onRequestSearch={handleSubmit}
          value={coo}
          placeholder="Entrez vos coordonnées"
          onCancelSearch={handleReset}
        />
        {props.value.isFetching ? (
          <Spinner message={"Recherche..."} />
        ) : props.value.hasResult ? (
          props.value.portes.length > 0 ? (
            <>
              <Divider className={classes.mt3} light />
              <div style={{ width: "100%" }}>
                <Typography
                  variant="body2"
                  display="block"
                  gutterBottom
                  style={{
                    width: "100%",
                    marginTop: "1.3rem",
                    textAlign: "left",
                    marginBottom: "1.3rem"
                  }}
                >
                  <span style={{ color: "#3f51b5", fontWeight: "bold" }}>
                    {props.value.portes.length}
                  </span>{" "}
                  resultats pour{" "}
                  <span style={{ color: "#3f51b5", fontWeight: "bold" }}>
                    {props.value.coo}
                  </span>
                </Typography>
                {props.value.portes.map(p => (
                  <Porte porte={p} />
                ))}
              </div>
            </>
          ) : (
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", marginTop: "5rem" }}
            >
              Pas de résultats
            </Typography>
          )
        ) : null}
      </Container>
    </>
  );
};

export default WithContext(Main);
