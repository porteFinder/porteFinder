import React, { useState } from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";

import EditDialog from "./editDialog";

const Row = props => {
  const { row, classes, handleClick, index, isSelected } = props;
  const isItemSelected = isSelected(row._id);
  const labelId = `enhanced-table-checkbox-secteur-${index}`;

  const [isModalEditOpen, setModalOpen] = useState(false);

  const toggleEditModal = () => {
    setModalOpen(true);
  };

  const update = async (body, index) => {
    const close = await props.updatePorte(body, index);
    if (close) {
      setModalOpen(false);
    }
  };

  return (
    <TableRow
      hover
      onClick={event => handleClick(event, row._id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {row.coo}
      </TableCell>
      <TableCell
        align="right"
        style={{ maxWidth: "10rem" }}
        className={classes.tableCell}
      >
        {row.code || "Inconnu"}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {row.voisins[0].region}:{row.voisins[0].min}-{row.voisins[0].max}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {row.voisins[1].region}:{row.voisins[1].min}-{row.voisins[1].max}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {row.voisins[2].region}:{row.voisins[2].min}-{row.voisins[2].max}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {row.voisins[3].region}:{row.voisins[3].min}-{row.voisins[3].max}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {row.voisins[4].region}:{row.voisins[4].min}-{row.voisins[4].max}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {row.voisins[5].region}:{row.voisins[5].min}-{row.voisins[5].max}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {row.voisins[6].region}:{row.voisins[6].min}-{row.voisins[6].max}
      </TableCell>
      <TableCell className={classes.tableCell} onClick={toggleEditModal}>
        <Link component="button" variant="body2">
          edit
        </Link>
      </TableCell>
      <EditDialog
        toggleDialog={setModalOpen}
        isOpenDialog={isModalEditOpen}
        porte={row}
        updatePorte={update}
        index={index}
      />
    </TableRow>
  );
};

export default Row;
