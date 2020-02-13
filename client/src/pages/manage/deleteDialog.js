import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import WithRouter from "../../withContext";

const DeleteDialog = props => {
  const confirm = () => {
    for (const id of props.ids) {
      props.deletePorte(id);
    }
    props.toggleDialog();
  };
  return (
    <Dialog
      open={props.isOpenDialog}
      onClose={props.toggleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir supprimer ce
          {props.ids.length > 1 ? `s ${props.ids.length} portes` : "tte porte"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleDialog} color="primary">
          Fermer
        </Button>
        <Button onClick={confirm} autoFocus color="secondary">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithRouter(DeleteDialog);
