import React from "react";
import { Route, Switch } from "react-router-dom";
// components
import FormMovie from "../views/movie/formMovie/formMovie";
import ListMovies from "../views/movie/listMovies/listMovies";

const moviesRoutes = () => {
  return (
    <Switch>
      <Route exact path="/movies/list" component={ListMovies}></Route>
      <Route exact path="/movies/form" component={FormMovie}></Route>
      <Route exact path="/movies/form/:id" component={FormMovie}></Route>
    </Switch>
  );
};

export default moviesRoutes;
