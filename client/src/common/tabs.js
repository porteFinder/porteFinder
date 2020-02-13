import React from "react";
import { Link } from "react-router-dom";

import { Tabs, Tab } from "@material-ui/core";
import WithContext from "../withContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tabLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  mt: {
    marginTop: "65px",
    flexGrow: 1
  }
}));

const TabCustom = props => {
  const classes = useStyles();

  const { pathname } = window.location;

  if (pathname === "/admin/manage" && props.value.tab !== 1) {
    props.value.changeTab(1);
  }

  const handleChange = (e, newVal) => props.value.changeTab(newVal);

  return (
    <Tabs
      onChange={handleChange}
      value={props.value.tab}
      className={classes.mt}
      centered
    >
      <Tab
        value={0}
        label={"Ajouter"}
        className={classes.tabLink}
        component={Link}
        to={"/admin/ajouter"}
      />
      <Tab
        label={"Gérer"}
        className={classes.tabLink}
        component={Link}
        to={"/admin/manage"}
        value={1}
      />
    </Tabs>
  );
};

export default WithContext(TabCustom);
