import React, { createRef, useEffect } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import WithContext from "../../withContext";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  root: {
    marginTop: "100px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "32%",
    ["@media (max-width:1280px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "30%"
    }
  }
}));

const Ajouter = props => {
  const classes = useStyles();

  const coo = createRef();
  const code = createRef();
  const constPorte = createRef();
  const minPorte = createRef();
  const maxPorte = createRef();
  const constVoisin1 = createRef();
  const minVoisin1 = createRef();
  const maxVoisin1 = createRef();
  const constVoisin2 = createRef();
  const minVoisin2 = createRef();
  const maxVoisin2 = createRef();
  const constVoisin3 = createRef();
  const minVoisin3 = createRef();
  const maxVoisin3 = createRef();
  const constVoisin4 = createRef();
  const minVoisin4 = createRef();
  const maxVoisin4 = createRef();
  const constVoisin5 = createRef();
  const minVoisin5 = createRef();
  const maxVoisin5 = createRef();
  const constVoisin6 = createRef();
  const minVoisin6 = createRef();
  const maxVoisin6 = createRef();

  useEffect(() => {
    if (props.value.shouldEmptyForm) {
      // eslint-disable-next-line
      refs.map(arr => {
        // eslint-disable-next-line
        arr.map(el => (el.current.value = ""));
      });
      coo.current.value = "";
      code.current.value = "";
      props.value.setShouldEmptyForm(false);
    }
    if (refs[0][0].current !== null && props.value.shouldComplete) {
      refs.map((arr, i) => {
        arr[0].current.parentElement.parentElement
          .querySelector("label")
          .classList.add("MuiInputLabel-shrink");
        arr[0].current.value = props.value.completeData[i].region;
        arr[1].current.parentElement.parentElement
          .querySelector("label")
          .classList.add("MuiInputLabel-shrink");
        arr[1].current.value = props.value.completeData[i].min;
        arr[2].current.parentElement.parentElement
          .querySelector("label")
          .classList.add("MuiInputLabel-shrink");
        arr[2].current.value = props.value.completeData[i].max;
      });
      props.value.setShouldComplete(false, []);
    }
  });

  let refs = [
    [constPorte, minPorte, maxPorte],
    [constVoisin1, minVoisin1, maxVoisin1],
    [constVoisin2, minVoisin2, maxVoisin2],
    [constVoisin3, minVoisin3, maxVoisin3],
    [constVoisin4, minVoisin4, maxVoisin4],
    [constVoisin5, minVoisin5, maxVoisin5],
    [constVoisin6, minVoisin6, maxVoisin6]
  ];

  const handleSubmit = () => {
    const voisins = refs.map(arr => ({
      region: arr[0].current.value,
      min: arr[1].current.value,
      max: arr[2].current.value
    }));
    const body = {
      coo: coo.current.value,
      code: code.current.value,
      voisin: voisins
    };
    props.value.addPorte(body);
  };

  const autocomplete = async e => {
    props.value.resetSnackbar();
    const res = await fetch(`/api/porte/autocomplete?coo=${coo.current.value}`);
    if (res.status !== 200) {
      const json = await res.json();
      props.value.setError(json.errors.message);
    } else {
      const json = await res.json();
      props.value.setShouldComplete(true, json.voisins);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ajouter - Porte Finder</title>
      </Helmet>
      <Container className={classes.root}>
        <div className={classes.form}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label="Coordonnées"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                autoComplete="off"
                inputRef={coo}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                size="small"
                variant="contained"
                color="default"
                style={{ marginTop: "17px" }}
                className={classes.button}
                startIcon={<GetAppIcon />}
                onClick={autocomplete}
              >
                Compléter
              </Button>
            </Grid>
          </Grid>
          <TextField
            label="Code porte"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            autoComplete="off"
            helperText="Non requis"
            inputRef={code}
          />
          <TextField
            label="Région constellation porte"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constPorte}
          />
          <TextField
            label="SS min constellation porte"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minPorte}
          />
          <TextField
            label="SS max constellation porte"
            //id="margin-normal"
            margin="dense"
            className={classes.textField}
            autoComplete="off"
            inputRef={maxPorte}
          />
          <TextField
            label="Région constellation voisine 1"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constVoisin1}
          />
          <TextField
            label="SS min constellation voisine 1"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minVoisin1}
          />
          <TextField
            label="SS max constellation voisine 1"
            //id="margin-normal"
            margin="dense"
            className={classes.textField}
            autoComplete="off"
            inputRef={maxVoisin1}
          />
          <TextField
            label="Région constellation voisine 2"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constVoisin2}
          />
          <TextField
            label="SS min constellation voisine 2"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minVoisin2}
          />
          <TextField
            label="SS max constellation voisine 2"
            //id="margin-normal"
            margin="dense"
            className={classes.textField}
            autoComplete="off"
            inputRef={maxVoisin2}
          />
          <TextField
            label="Région constellation voisine 3"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constVoisin3}
          />
          <TextField
            label="SS min constellation voisine 3"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minVoisin3}
          />
          <TextField
            label="SS max constellation voisine 3"
            //id="margin-normal"
            margin="dense"
            className={classes.textField}
            autoComplete="off"
            inputRef={maxVoisin3}
          />
          <TextField
            label="Région constellation voisine 4"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constVoisin4}
          />
          <TextField
            label="SS min constellation voisine 4"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minVoisin4}
          />
          <TextField
            label="SS max constellation voisine 4"
            //id="margin-normal"
            margin="dense"
            className={classes.textField}
            autoComplete="off"
            inputRef={maxVoisin4}
          />
          <TextField
            label="Région constellation voisine 5"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constVoisin5}
          />
          <TextField
            label="SS min constellation voisine 5"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minVoisin5}
          />
          <TextField
            label="SS max constellation voisine 5"
            //id="margin-normal"
            margin="dense"
            className={classes.textField}
            autoComplete="off"
            inputRef={maxVoisin5}
          />
          <TextField
            label="Région constellation voisine 6"
            //id="margin-none"
            className={classes.textField}
            autoComplete="off"
            margin="dense"
            inputRef={constVoisin6}
          />
          <TextField
            label="SS min constellation voisine 6"
            //id="margin-dense"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={minVoisin6}
          />
          <TextField
            label="SS max constellation voisine 6"
            //id="margin-normal"
            className={classes.textField}
            margin="dense"
            autoComplete="off"
            inputRef={maxVoisin6}
          />
        </div>
        <Button
          style={{ marginTop: "2rem" }}
          fullWidth={true}
          variant="contained"
          color="primary"
          href="#contained-buttons"
          onClick={handleSubmit}
        >
          Ajouter
        </Button>
      </Container>
    </>
  );
};

export default WithContext(Ajouter);
