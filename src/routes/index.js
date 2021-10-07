import Home from "../views/home/home";
import Actor from "../views/actor/actor";
import Movie from "../views/movie/movie";
import { Switch, Route } from "react-router-dom";



import React from 'react'

 const IndexRoute = () => {
  return (
    <Switch>
    <Route path="/home">
      <Home></Home>
    </Route>
    <Route path="/actors">
      <Actor />
    </Route>
    <Route path="/movies">
      <Movie></Movie>
    </Route>
    <Route path="/popup">popup</Route>
  </Switch>
  )
}



export default IndexRoute;