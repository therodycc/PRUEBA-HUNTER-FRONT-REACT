// from react
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// pages
import Home from "../views/home/home";
// routes
import actorsRoutes from "./actorsRoutes";
import moviesRoutes from "./moviesRoutes";
import { popupRoutes } from "./popupRoutes";

const IndexRoute = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home}></Route>
      <Route path="/actors" component={actorsRoutes}></Route>
      <Route path="/movies" component={moviesRoutes}></Route>
      <Route path="/popup" component={popupRoutes}></Route>
      <Route path="*" component={Home}>
        <Redirect to="/home"></Redirect>
      </Route>
    </Switch>
  );
};

export default IndexRoute;
