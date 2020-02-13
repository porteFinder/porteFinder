import React, { useState } from "react";

import CustomTableToolbar from "./tableToolbar";
import CustomTableHead from "./tableHead";
import Row from "./row";

import { TablePagination, Switch, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

const headCells = [
  { id: "coo", numeric: true, disablePadding: true, label: "Coo" },
  { id: "code", numeric: false, disablePadding: false, label: "Code" },
  { id: "const", numeric: false, disablePadding: false, label: "Const" },
  { id: "voisin1", numeric: false, disablePadding: false, label: "Voisin 1" },
  { id: "voisin2", numeric: false, disablePadding: false, label: "Voisin 2" },
  { id: "voisin3", numeric: false, disablePadding: false, label: "Voisin 3" },
  { id: "voisin4", numeric: false, disablePadding: false, label: "Voisin 4" },
  { id: "voisin5", numeric: false, disablePadding: false, label: "Voisin 5" },
  { id: "voisin6", numeric: false, disablePadding: false, label: "Voisin 6" },
  { id: "edit", numeric: true, disablePadding: false, label: "Editer" }
];

const desc = (a, b, orderBy) =>
  b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;

const stableSort = (array, cpm) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cpm(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) =>
  order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);

const PortesTable = ({ portes, deletePorte, updatePorte, query }) => {
  const classes = useStyles();
  const clearSelected = () => setSelected([]);

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [porteEdit, setPorteEdit] = useState({});
  const [index, setIndex] = useState(0);

  const setPorte = index => setPorteEdit({ ...portes[index] });

  const isSelected = name => selected.indexOf(name) !== -1;

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = portes.map(n => n._id);
      return setSelected(newSelected);
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    /*const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = newSelected.concat(selected, name);
    else if (selectedIndex === 0)
      newSelected = newSelected.concat(selected.slice(1));
    else if (selectedIndex === selected.length - 1)
      newSelected = newSelected.concat(selected.slice(0, -1));
    else if (selectedIndex > 0)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex, selected.slice(selectedIndex + 1))
      );*/
    const newSelected = [...selected];
    const index = newSelected.indexOf(name);
    console.log(index);
    if (index === -1) {
      newSelected.push(name);
    } else {
      newSelected.splice(index, 1);
    }
    setSelected(newSelected);
  };

  const emptyRows = portes
    ? rowsPerPage - Math.min(rowsPerPage, portes - page * rowsPerPage)
    : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleRowChangePerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  return (
    <>
      <CustomTableToolbar
        ids={selected}
        numSelected={selected.length}
        deletePorte={deletePorte}
        clearSelected={clearSelected}
      />
      {portes ? (
        <>
          <div className={classes.table}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitleSecteur"
              size={dense ? "small" : "medium"}
            >
              <CustomTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={portes.length}
                headCells={headCells}
                desc={desc}
              />
              {portes && portes.length > 0 ? (
                <TableBody>
                  {stableSort(portes, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <Row
                        key={row._id}
                        row={row}
                        classes={classes}
                        handleClick={handleClick}
                        index={index}
                        isSelected={isSelected}
                        setModalEditOpen={setModalEditOpen}
                        setPorte={setPorte}
                        setIndex={setIndex}
                        setModalEditOpen={setModalEditOpen}
                        isModalEditOpen={isModalEditOpen}
                        updatePorte={updatePorte}
                      />
                    ))}

                  {portes && emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6}></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              ) : query !== "" ? (
                <TableBody>
                  <TableRow>
                    <TableCell colspan="11" style={{ "text-align": "center" }}>
                      <Typography variant="subtitle1" align="center">
                        Pas de resultat
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      <CircularProgress
                        disableShrink={true}
                        className={classes.spinner}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, portes.length]}
            component="div"
            rowsPerPage={rowsPerPage}
            count={portes.length}
            page={page}
            backIconButtonProps={{
              "aria-label": "page precedante"
            }}
            nextIconButtonProps={{
              "aria-label": "page suivante"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleRowChangePerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to === -1 ? count : to} sur ${count}`
            }
            labelRowsPerPage={"Lignes par page:"}
          ></TablePagination>
        </>
      ) : null}
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={handleChangeDense}
            label="Dense padding"
          />
        }
      />
    </>
  );
};

export default PortesTable;
