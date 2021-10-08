import React from "react";
import { Route,Switch } from "react-router-dom";
import PopUp from "../views/popup/popup";

export const popupRoutes = () => {
  return (
    <Switch>
      <Route exact path="/popup/actors/:id" component={PopUp}></Route>
      <Route exact path="/popup/movies/:id" component={PopUp}></Route>
    </Switch>
  );
};
