import React, { createRef, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "30%"
  }
}));

const EditDialog = props => {
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

  const closeModal = () => props.toggleDialog(false);

  const handleSubmit = async () => {
    const refs = [
      [constPorte, minPorte, maxPorte],
      [constVoisin1, minVoisin1, maxVoisin1],
      [constVoisin2, minVoisin2, maxVoisin2],
      [constVoisin3, minVoisin3, maxVoisin3],
      [constVoisin4, minVoisin4, maxVoisin4],
      [constVoisin5, minVoisin5, maxVoisin5],
      [constVoisin6, minVoisin6, maxVoisin6]
    ];
    console.log(minVoisin4);
    const voisins = refs.map(arr => {
      return {
        region: arr[0].current.value,
        min: arr[1].current.value,
        max: arr[2].current.value
      };
    });
    const body = {
      _id: props.porte._id,
      coo: coo.current.value,
      code: code.current.value,
      voisins: voisins
    };
    const close = await props.updatePorte(body, props.index);
  };

  return (
    <>
      <Dialog
        open={props.isOpenDialog}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edition</DialogTitle>
        {Object.keys(props.porte).length > 0 ? (
          <DialogContent>
            <div className={classes.form}>
              <TextField
                label="Coordonnées"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                autoComplete="off"
                inputRef={coo}
                className={classes.row1}
                defaultValue={props.porte.coo}
              />
              <TextField
                label="Code porte"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                autoComplete="off"
                helperText="Non requis"
                inputRef={code}
                defaultValue={props.porte.code || "Inconnu"}
              />
              <TextField
                label="Région const porte"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constPorte}
                // className={classes.row1}
                defaultValue={props.porte.voisins[0].region}
              />
              <TextField
                label="SS min const porte"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minPorte}
                defaultValue={props.porte.voisins[0].min}
              />
              <TextField
                label="SS max const porte"
                //id="margin-normal"
                margin="dense"
                className={classes.textField}
                autoComplete="off"
                inputRef={maxPorte}
                defaultValue={props.porte.voisins[0].max}
              />
              <TextField
                label="Région const 1"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constVoisin1}
                // className={classes.row1}
                defaultValue={props.porte.voisins[1].region}
              />
              <TextField
                label="SS min const 1"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minVoisin1}
                defaultValue={props.porte.voisins[1].min}
              />
              <TextField
                label="SS max const 1"
                //id="margin-normal"
                margin="dense"
                className={classes.textField}
                autoComplete="off"
                inputRef={maxVoisin1}
                defaultValue={props.porte.voisins[1].max}
              />
              <TextField
                label="Région const 2"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constVoisin2}
                // className={classes.row1}
                defaultValue={props.porte.voisins[2].region}
              />
              <TextField
                label="SS min const 2"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minVoisin2}
                defaultValue={props.porte.voisins[2].min}
              />
              <TextField
                label="SS max const 2"
                //id="margin-normal"
                margin="dense"
                className={classes.textField}
                autoComplete="off"
                inputRef={maxVoisin2}
                defaultValue={props.porte.voisins[2].max}
              />
              <TextField
                label="Région const 3"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constVoisin3}
                // className={classes.row1}
                defaultValue={props.porte.voisins[3].region}
              />
              <TextField
                label="SS min const 3"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minVoisin3}
                defaultValue={props.porte.voisins[3].min}
              />
              <TextField
                label="SS max const 3"
                //id="margin-normal"
                margin="dense"
                className={classes.textField}
                autoComplete="off"
                inputRef={maxVoisin3}
                defaultValue={props.porte.voisins[3].max}
              />
              <TextField
                label="Région const 4"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constVoisin4}
                // className={classes.row1}
                defaultValue={props.porte.voisins[4].region}
              />
              <TextField
                label="SS min const 4"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minVoisin4}
                defaultValue={props.porte.voisins[4].min}
              />
              <TextField
                label="SS max const 4"
                //id="margin-normal"
                margin="dense"
                className={classes.textField}
                autoComplete="off"
                inputRef={maxVoisin4}
                defaultValue={props.porte.voisins[4].max}
              />
              <TextField
                label="Région const 5"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constVoisin5}
                // className={classes.row1}
                defaultValue={props.porte.voisins[5].region}
              />
              <TextField
                label="SS min const 5"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minVoisin5}
                defaultValue={props.porte.voisins[5].min}
              />
              <TextField
                label="SS max const 5"
                //id="margin-normal"
                margin="dense"
                className={classes.textField}
                autoComplete="off"
                inputRef={maxVoisin5}
                defaultValue={props.porte.voisins[5].max}
              />
              <TextField
                label="Région const 6"
                //id="margin-none"
                className={(classes.textField, classes.row1)}
                autoComplete="off"
                margin="dense"
                inputRef={constVoisin6}
                // className={classes.row1}
                defaultValue={props.porte.voisins[6].region}
              />
              <TextField
                label="SS min const 6"
                //id="margin-dense"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={minVoisin6}
                defaultValue={props.porte.voisins[6].min}
              />
              <TextField
                label="SS max const 6"
                //id="margin-normal"
                className={classes.textField}
                margin="dense"
                autoComplete="off"
                inputRef={maxVoisin6}
                defaultValue={props.porte.voisins[6].max}
              />
            </div>
          </DialogContent>
        ) : null}
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Fermer
          </Button>
          <Button onClick={handleSubmit} autoFocus color="secondary">
            Editer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDialog;
