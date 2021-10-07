import { Fragment } from "react";
import FormMovie from "./formMovie/formMovie";
import ListMovies from "./listMovies/listMovies";

function Movie() {
  return (
    <Fragment>
      <FormMovie />
      <ListMovies></ListMovies>
    </Fragment> 
  );
}

export default Movie;
