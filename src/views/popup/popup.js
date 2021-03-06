import { Fragment, useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
// components
import Loading from "../../components/common/loading/loading";
// services
import httpService from "../../services/httpService";
import sweetAlertSvc from "../../services/sweetAlert";
// css
import "./popup.css";

function PopUp() {
  // actors
  const [listActorsMovie, setListActorsMovie] = useState([]);
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [idActor, setIdActor] = useState("");
  // movies
  const [listMoviesActor, setListMoviesActor] = useState([]);
  const [actor, setActor] = useState({});
  const [movies, setMovies] = useState([]);
  const [idMovie, setIdMovie] = useState("");

  const { path } = useRouteMatch();
  useEffect(() => {
    getActorsMovie();
    getMovie();
    getActors();
    getMoviesActor();
    getActor();
    getMovies();
  }, []);

  const { id } = useParams();

  // actors
  const getActorsMovie = async () => {
    try {
      const data = await httpService.get(
        `http://localhost:3000/api/popup/movies/${id}`
      );
      setListActorsMovie(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMovie = async () => {
    await httpService
      .getOne("http://localhost:3000/api/movies", id)
      .then((e) => {
        setMovie(e);
      })
      .catch((error) => console.log(error));
  };
  const getActors = async () => {
    try {
      const data = await httpService.get(`http://localhost:3000/api/actors`);
      setActors(data);
    } catch (e) {
      console.log(e);
    }
  };
  const addNewActor = async () => {
    const verify = await getExitings();
    if (verify) {
      return;
    }
    if (idActor === "") {
      sweetAlertSvc.fillInFields();
      return;
    }
    const data = {
      id_actor: idActor,
      id_movie: id,
    };
    httpService.post(`http://localhost:3000/api/popup`, data).then(() => {
      getActorsMovie();
    });
  };

  const deleteActorFromMovie = (idActorDelete) => {
    httpService
      .delete("http://localhost:3000/api/popup", `${idActorDelete}/${id}`)
      .then(() => {
        getActorsMovie();
      })
      .catch((error) => console.log(error));
  };

  const getExitings = async () => {
    return await httpService
      .get("http://localhost:3000/api/popup")
      .then((data) => {
        for (const popup of data) {
          if (popup.id_actor == idActor && popup.id_movie == id) {
            sweetAlertSvc.exitsData("Existing");
            console.log(
              "Existing actor",
              `${popup.id_actor}--${popup.id_movie}`
            );
            return true;
          }
          if (popup.id_actor == id && popup.id_movie == idMovie) {
            sweetAlertSvc.exitsData("Existing");
            console.log(
              "Existing movie",
              `${popup.id_actor}--${popup.id_movie}`
            );
            return true;
          }
        }
      })
      .catch((error) => console.log(error));
  };

  // movies
  const getMoviesActor = async () => {
    try {
      const data = await httpService.get(
        `http://localhost:3000/api/popup/actors/${id}`
      );
      setListMoviesActor(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getActor = async () => {
    await httpService
      .getOne("http://localhost:3000/api/actors", id)
      .then((e) => {
        setActor(e);
      })
      .catch((error) => console.log(error));
  };
  const getMovies = async () => {
    try {
      const data = await httpService.get(`http://localhost:3000/api/movies`);
      setMovies(data);
    } catch (e) {
      console.log(e);
    }
  };
  const addNewMovie = async () => {
    if (idMovie === "") {
      sweetAlertSvc.fillInFields();
      return;
    }
    const verify = await getExitings();

    if (verify) {
      return;
    }
    const data = {
      id_actor: id,
      id_movie: idMovie,
    };
    httpService
      .post(`http://localhost:3000/api/popup`, data)
      .then(() => {
        getMoviesActor();
      })
      .catch((error) => console.log(error));
  };
  const deleteMovieFromActor = (idMovieDelete) => {
    httpService
      .delete("http://localhost:3000/api/popup", `${id}/${idMovieDelete}`)
      .then(() => {
        getMoviesActor();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className="row d-flex justify-content-between col-12">
        <h1>Pop Up</h1>
        <Link to="/home" className="btn btn-danger ">
          Back home
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-5">
          <select
            name="gender"
            className="form-control"
            onChange={(e) =>
              path === "/popup/actors/:id"
                ? setIdActor(e.target.value)
                : setIdMovie(e.target.value)
            }
          >
            <option value="" selected>
              {path === "/popup/actors/:id"
                ? "select an actor"
                : "select an movie"}
            </option>
            {(path === "/popup/actors/:id" ? actors : movies).map((item) => (
              <option key={item.id} value={item.id}>
                {path === "/popup/actors/:id" ? item.full_name : item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-5">
          <button
            onClick={() =>
              path === "/popup/actors/:id" ? addNewActor() : addNewMovie()
            }
            type="button"
            className="btn btn-success"
          >
            Add new
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              {path === "/popup/actors/:id" ? movie.title : actor.full_name}
            </div>
            <div className="card-body p-0">
              <img
                className="col-lg-12 p-0"
                src={path === "/popup/actors/:id" ? movie.photo : actor.photo}
                alt=""
              />
            </div>
            <div className="card-footer text-muted">
              {path === "/popup/actors/:id" ? movie.gender : actor.gender}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <ul className="list-group">
            {(path === "/popup/actors/:id"
              ? listActorsMovie
              : listMoviesActor
            ).map((e) => (
              <li
                className="list-group-item border-list-item mb-3 "
                key={path === "/popup/actors/:id" ? e.id_movie : e.id_actor}
              >
                <div className="row d-flex align-items-center">
                  <div className="col-lg-2">
                    <img className=" p-0 imgRound" src={e.photo} alt="" />
                  </div>
                  <div className="col-lg-8 pl-3">
                    <h1>
                      {path === "/popup/actors/:id" ? e.full_name : e.title}
                    </h1>
                    <span className="ml-3">{e.gender} </span>
                    <span className="ml-3">
                      {path === "/popup/actors/:id" ? e.born : e.premiere}
                    </span>
                  </div>
                  <div className="col-lg-2 ">
                    <i
                      onClick={(id) =>
                        path === "/popup/actors/:id"
                          ? deleteActorFromMovie(e.id)
                          : deleteMovieFromActor(e.id)
                      }
                      className="fas fa-user-alt-slash btn btn-danger btn-lg"
                    ></i>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default PopUp;
