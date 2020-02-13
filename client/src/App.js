import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import WithContext from "./withContext";

import { Login, Ajouter, Main, Manage } from "./pages";
import {
  Spinner,
  SnackbarError,
  SnackbarValidate,
  TabCustom,
  Topbar
} from "./common";

const App = props => {
  return (
    <>
      {props.value.isAppReady ? (
        <>
          <Topbar />
          {props.value.isLogged ? (
            <Switch>
              <Route exact path={"/"} component={Main} />
              <Route exact path={"/admin"} component={Ajouter}>
                <TabCustom />
                <Ajouter />
              </Route>
              <Route path={"/admin/ajouter"} component={Ajouter}>
                <TabCustom />
                <Ajouter />
              </Route>
              <Route path={"/admin/manage"} component={Manage}>
                <TabCustom />
                <Manage />
              </Route>
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path={"/"} component={Main} />
              <Route exact path={"/admin"} component={Login} />
              <Route path={"/admin/ajouter"} component={Login} />
              <Route path={"/admin/manage"} component={Login} />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          )}
        </>
      ) : (
        <Spinner message={"Chargement de l'application"} />
      )}
      <SnackbarError />
      <SnackbarValidate />
    </>
  );
};

export default WithContext(App);
