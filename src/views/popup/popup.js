import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import httpService from "../../services/httpService";
import "./popup.css";

function PopUp() {
  const [listActorsMovie, setListActorsMovie] = useState([]);
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [idActor, setIdActor] = useState("");

  useEffect(() => {
    getActorsMovie();
    getMovie();
    getActors();
  }, []);

  const { id } = useParams();
  const getActorsMovie = async () => {
    const data = await httpService.get(
      `http://localhost:3000/api/popup/movies/${id}`
    );
    setListActorsMovie(data);
  };

  const getMovie = async () => {
    const data = await httpService
      .getOne("http://localhost:3000/api/movies", id)
      .then((e) => {
        setMovie(e);
      })
      .catch((e) => console.log(e));
  };

  const getActors = async () => {
    try {
      const data = await httpService.get(`http://localhost:3000/api/actors`);
      setActors(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addNew = () => {
    const data = {
      id_actor: idActor,
      id_movie: id,
    };
    httpService.post(`http://localhost:3000/api/popup`, data).then(() => {
      getActorsMovie();
    });
  };

  const deleteActorFromMovie = (idActorDelete) => {
    httpService.delete(
      "http://localhost:3000/api/popup",
      `${idActorDelete}/${id}`
    ).then(() => {
      getActorsMovie();
    });
  };

  return (
    <Fragment>
      <div className="row d-flex justify-content-between col-12">
        <h1>Pop Up</h1>
        <Link to="/home" className="btn btn-danger ">
          Back home
        </Link>
      </div>
      <div class="row">
        <div class="col-lg-5">
          <select
            name="gender"
            className="form-control"
            onChange={(e) => setIdActor(e.target.value)}
          >
            <option selected>select an actor</option>
            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.full_name}
              </option>
            ))}
          </select>
        </div>
        <div class="col-lg-5">
          <button
            onClick={() => addNew()}
            type="button"
            className="btn btn-success"
          >
            Add new Actor
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">{movie.title || "No ha cargado"}</div>
            <div className="card-body p-0">
              <img
                className="col-lg-12 p-0"
                src={movie.photo || "None"}
                alt=""
              />
            </div>
            <div className="card-footer text-muted">
              {movie.gender || "No ha cargado"}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <ul className="list-group">
            {listActorsMovie.map((e) => (
              <li
                className="list-group-item border-list-item mb-3 "
                key={e.id_movie}
              >
                <div className="row d-flex align-items-center">
                  <div className="col-lg-2">
                    <img className=" p-0 imgRound" src={e.photo} alt="" />
                  </div>
                  <div className="col-lg-8 pl-3">
                    <h1>{e.full_name}</h1>
                    <span className="ml-3">{e.gender} </span>
                    <span className="ml-3">{e.born} </span>
                  </div>
                  <div className="col-lg-2 ">
                    <i
                      onClick={(id) => deleteActorFromMovie(e.id)}
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
