import { Fragment } from "react";
import "./App.css";
import Header from "./components/layouts/header/header";
import Actor from "./views/actor/actor";
import Home from "./views/home/home";
import Movie from "./views/movie/movie";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="container mt-5">
        <Actor></Actor>
      </div>
    </Fragment>
  );
}

export default App;
