// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// services
import httpService from "../../services/httpService";
// css
import "./home.css";

function Home() {
  const [movies, setMovies] = useState([1, 1, 3, 34, 5]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await httpService.get("http://localhost:3000/api/movies");
    setMovies(data);
  };

  const deleteMovie = async (id) => {
    await httpService
      .delete("http://localhost:3000/api/movies/", id)
      .then(() => {
        getMovies();
      });
  };

  return (
    <Fragment>
      <div className="row">
        {movies.map((movie, index) => (
          <div className="col-lg-4 mt-3">
            <div className="card" key={movie.id}>
              <div className="card-body p-0">
                <img
                  className="col-lg-12 p-0 imgPortada"
                  src={movie.photo}
                  alt=""
                />
              </div>
            </div>
            <div className="card-footer">
              <Link
                to={"/popup/" + movie.id}
                className="btn btn-primary col-lg-4"
              >
                <i className="far fa-star mr-1 text-warning"></i> See
              </Link>
              <button
                onClick={(id) => deleteMovie(movie.id)}
                type="button"
                className="btn btn-danger col-lg-4"
              >
                <i className="fas fa-user-alt-slash"></i>
              </button>
              <Link
                to={"/movies/form/" + movie.id}
                type="button"
                className="btn btn-warning col-lg-4"
              >
                <i className="fas fa-user-edit"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Home;
