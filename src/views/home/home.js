// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// services
import httpService from "../../services/httpService";
// css
import "./home.css";
// assets
import serverDownImg from "../../assets/serverdown.svg";
import addNewImg from "../../assets/addNew.svg";

function Home() {
  const [movies, setMovies] = useState([1, 1, 3, 34, 5]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const data = await httpService.get("http://localhost:3000/api/movies");
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    await httpService
      .delete("http://localhost:3000/api/movies/", id)
      .then(() => {
        getMovies();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      {movies ? (
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
                  to={"/popup/actors/" + movie.id}
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
      ) : (
        <div className="p-5">
          <h1 className="text-danger col-lg-8 offset-2 mb-5">
            Service Unavailable 503
          </h1>
          <img src={serverDownImg} className="col-lg-6 offset-3" alt="" />
        </div>
      )}

      {movies.length === 0 ? (
        <div>
          <h1 className="text-warning col-lg-4 mt-5 offset-4">Add new movie</h1>
          <img src={addNewImg} className="col-lg-4 mt-5 offset-4" alt="" />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Home;
