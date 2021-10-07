import { Fragment } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <span className="navbar-brand">HUNTER MOVIES</span>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <Link className="nav-item" to="/home">
                <span className="nav-link">
                  <i class="fas fa-video text-warning mr-2"></i> Home
                </span>
              </Link>

              <Link className="nav-item" to="/actors">
                <span className="nav-link">
                  <i class="fas fa-video text-warning mr-2"></i>
                  actors
                </span>
              </Link>
              <Link className="nav-item" to="/movies">
                <span className="nav-link" >
                  <i class="fas fa-compact-disc text-warning mr-2"></i>
                  Movies
                </span>
              </Link>

              {/*         <button type="button" className="btn btn-info mr-3">
              <i class="fas fa-compact-disc text-warning mr-2"></i>
                Movies
              </button> */}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
