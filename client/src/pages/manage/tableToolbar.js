import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Tooltip } from "@material-ui/core";

import DeleteDialog from "./deleteDialog";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  },
  button: {
    margin: theme.spacing(1),
    minWidth: "unset"
  }
}));

const CustomTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const toggleDialogDelete = () => setOpenDialogDelete(!openDialogDelete);
  const handleDelete = method => {
    props.clearSelected();
  };
  return (
    <Toolbar
      className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selectionné
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitleSecteur"
        >
          Portes
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Button
            onClick={toggleDialogDelete}
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Supprimer
          </Button>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

      <DeleteDialog
        toggleDialog={toggleDialogDelete}
        isOpenDialog={openDialogDelete}
        deletePorte={props.deletePorte}
        ids={props.ids}
      />
    </Toolbar>
  );
};

CustomTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default CustomTableToolbar;
