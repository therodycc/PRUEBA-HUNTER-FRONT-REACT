import { Fragment, useCallback, useState } from "react";
import { useHistory,Link } from "react-router-dom";

import httpService from "../../../services/httpService";
import sweetAlertSvc from "../../../services/sweetAlert";
import "./formMovie.css";

function FormMovie() {
  const [title, setTitle] = useState("");
  const [premiere, setPremiere] = useState("");
  const [gender, setGender] = useState("Male");
  const [photo, setPhoto] = useState("");

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/movies/list"),
    [history]
  );

  const add = async (e) => {
    e.preventDefault();
    const MOVIE = {
      title: title.trim(),
      premiere: premiere.trim(),
      gender: gender.trim(),
      photo: photo.trim(),
    };
    
    if (!title.trim() || !premiere.trim() || !gender.trim() || !photo.trim())
      return sweetAlertSvc.fillInFields();

    await httpService
      .post("http://localhost:3000/api/movies", MOVIE)
      .then(() => {
        handleOnClick();
      });
  };
  
  return (
    <Fragment>
      <h1 className="text-left text-warning p-3 m-3">Movies</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-body">
            <form onSubmit={(e)=> add(e)}>
              <div className="row">
                <div className="form-group col-lg-6">
                  <input
                    type="text"
                    name="Title"
                    className="form-control"
                    placeholder="Title"
                    onChange={e=>setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="date"
                    name="Premiere"
                    className="form-control"
                    placeholder="Premiere"
                    onChange={e=>setPremiere(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <select
                  name="gender"
                  className="form-control"
                  aria-label="Default select example"
                  onChange={e=>setGender(e.target.value)}
                >
                  <option value="FICTION">FICTION</option>
                  <option value="ADVENTURE">ADVENTURE</option>
                  <option value="COMEDY">COMEDY</option>
                  <option value="TERROR">TERROR</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Image"
                  className="form-control"
                  placeholder="Image"
                  onChange={e=>setPhoto(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-warning btn-block">
                Add movie
              </button>
              <Link to="/movies/list" className="btn btn-danger btn-block">
                Back
              </Link>
            </form>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div class="card mb-4">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://pbs.twimg.com/media/E3JqCabVgAIrMYC.jpg"
                  className="img"
                  alt=""
                />
              </div>
              <div class="col-md-8 pl-5">
                <div class="card-body ">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                  </p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
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
