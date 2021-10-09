import { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
// services
import httpService from "../../../services/httpService";
import sweetAlertSvc from "../../../services/sweetAlert";
// css
import "./formMovie.css";

function FormMovie() {
  const [title, setTitle] = useState("");
  const [premiere, setPremiere] = useState("");
  const [gender, setGender] = useState("Male");
  const [photo, setPhoto] = useState("");
  const [edit, setEdit] = useState("");

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/movies/list"),
    [history]
  );

  useEffect(() => {
    KnowParamsId();
  }, []);

  const { id } = useParams();
  const KnowParamsId = async () => {
    if (id) {
      setEdit(true);
      await httpService
        .getOne("http://localhost:3000/api/movies", id)
        .then((e) => {
          setTitle(e.title);
          setPremiere(e.premiere);
          setGender(e.gender);
          setPhoto(e.photo);
        })
        .catch((error) => console.log(error));
    } else {
      setEdit(false);
    }
  };

  const getMovies = async () => {
    return await httpService
      .get("http://localhost:3000/api/movies")
      .then((data) => {
        for (const movie of data) {
          if (movie.title.trim().toUpperCase() == title.trim().toUpperCase()) {
            return true;
          } else {
            return false;
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const add = async (e) => {
    e.preventDefault();

    const MOVIE = {
      title: title.trim(),
      premiere: premiere.trim(),
      gender: gender.trim(),
      photo: photo.trim(),
    };

    const titleVerify = await getMovies();
    if (titleVerify) {
      sweetAlertSvc.exitsData("Existing movie");
      return;
    }

    if (!title.trim() || !premiere.trim() || !gender.trim() || !photo.trim())
      return sweetAlertSvc.fillInFields();

    await httpService
      .post("http://localhost:3000/api/movies", MOVIE)
      .then(() => {
        handleOnClick();
      })
      .catch((error) => console.log(error));
  };

  const updateMovie = async (e) => {
    e.preventDefault();
    const MOVIE = {
      title: title.trim(),
      premiere: premiere.trim(),
      gender: gender.trim(),
      photo: photo.trim(),
    };
    await httpService
      .put("http://localhost:3000/api/movies", id, MOVIE)
      .then(() => {
        handleOnClick();
      });
    setEdit(false);
  };

  return (
    <Fragment>
      <h1 className="text-left text-warning p-3 m-3">Movies</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-body">
            <form
              onSubmit={(e) => {
                !edit ? add(e) : updateMovie(e);
              }}
            >
              <div className="row">
                <div className="form-group col-lg-6">
                  <input
                    type="text"
                    name="Title"
                    className="form-control"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="date"
                    name="Premiere"
                    className="form-control"
                    placeholder="Premiere"
                    onChange={(e) => setPremiere(e.target.value)}
                    value={premiere}
                  />
                </div>
              </div>
              <div className="form-group">
                <select
                  name="gender"
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="FICTION">FICTION</option>
                  <option value="ADVENTURE">ADVENTURE</option>
                  <option value="COMEDY">COMEDY</option>
                  <option value="TERROR">TERROR</option>
                  <option value="ACTION">ACTION</option>
                  <option value="SUSPENSE">SUSPENSE</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Image"
                  className="form-control"
                  placeholder="Image link"
                  onChange={(e) => setPhoto(e.target.value)}
                  value={photo}
                />
              </div>
              <button type="submit" className="btn btn-warning btn-block">
                {edit ? "Save movie" : "Add movie"}
              </button>
              <Link to="/movies/list" className="btn btn-danger btn-block">
                Back
              </Link>
            </form>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={
                    photo ||
                    "https://glhf.online/wp-content/themes/myarcadetheme/images/noimg.png"
                  }
                  className="img"
                  alt=""
                />
              </div>
              <div className="col-md-7 pl-5">
                <div className="card-body">
                  <h5 className="card-title">{title || "title"}</h5>
                  <p className="card-text"></p>
                  <p className="card-text">
                    <small className="text-muted">
                      {premiere || "DD/MM/YYYY"}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{gender || "Gender"}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormMovie;
