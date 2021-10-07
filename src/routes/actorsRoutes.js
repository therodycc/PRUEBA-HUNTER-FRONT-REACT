import React from "react";
import { Route, Switch } from "react-router-dom";
import FormActor from "../views/actor/formActor/formActor";
import ListActors from "../views/actor/listActors/listActors";

const actorsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/actors/list" component={ListActors}></Route>
      <Route exact path="/actors/form" component={FormActor}></Route>
      <Route exact path="/actors/form/:id" component={FormActor}></Route>
    </Switch>
  );
};

export default actorsRoutes;
