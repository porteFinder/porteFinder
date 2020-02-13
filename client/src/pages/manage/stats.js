import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  },
  title: {
    marginBottom: ".9rem"
  },
  item: {
    marginBottom: ".2rem"
  }
});

const Stats = ({ portes }) => {
  const classes = useStyles();

  const sumNoCodes = portes => {
    let count = 0;
    for (const porte of portes) {
      if (porte.code === undefined) {
        count++;
      }
    }
    return count;
  };
  return (
    <>
      <Typography
        className={classes.title}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        Statistiques
      </Typography>
      <Typography className={classes.item} component="p" variant="subtitle1">
        Nombre de Portes: <b>{portes ? portes.length : 0}</b>
      </Typography>
      <Typography className={classes.item} component="p" variant="subtitle1">
        Nombre de Portes sans codes: <b>{portes ? sumNoCodes(portes) : 0}</b>
      </Typography>
    </>
  );
};

export default Stats;
