import { Fragment } from "react";
import "./App.css";
import Header from "./components/layouts/header/header";
import { BrowserRouter as Router } from "react-router-dom";
import IndexRoute from "./routes";


function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <div className="container mt-5">
            <IndexRoute></IndexRoute>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
