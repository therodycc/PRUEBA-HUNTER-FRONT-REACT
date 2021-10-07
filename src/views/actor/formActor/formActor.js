import { Fragment, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import sweetAlertSvc from "../../../services/sweetAlert";

import "./formActor.css";

function FormActor() {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/actors/list"),
    [history]
  );

  const getExisting = async () => {
    const res = await fetch("http://localhost:3000/api/actors");
    const data = await res.json();
    console.log(data);
    for (const item of data.data) {
      if (name == item.full_name) {
        return true;
      }
    }
  };

  const add = async (e) => {
    e.preventDefault();
    const ACTOR = {
      full_name: name,
      born: born,
      gender: gender,
      photo: photo,
    };

    if (!name.trim() || !born.trim() || !gender.trim() || !photo.trim())
      return sweetAlertSvc.fillInFields();

    if (getExisting()) return sweetAlertSvc.exitsUser();

    await fetch("http://localhost:3000/api/actors", {
      method: "POST",
      body: JSON.stringify(ACTOR),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => {
        sweetAlertSvc.sweetAdded();
        handleOnClick();
      })
      .catch((e) => sweetAlertSvc.sweetError(e));

    console.log(ACTOR);
  };

  return (
    <Fragment>
      <h1 className="text-left text-warning p-3 m-3">Actors</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-body">
            <form
              onSubmit={(e) => {
                add(e);
              }}
            >
              <div className="row">
                <div className="form-group col-lg-6">
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="date"
                    name="Born"
                    className="form-control"
                    placeholder="Born"
                    onChange={(e) => setBorn(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Image"
                  className="form-control"
                  placeholder="Image"
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-warning btn-block">
                Add actor
              </button>
              <Link to="/actors/list" className="btn btn-danger btn-block">
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
                  src={
                    photo ||
                    "http://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic.jpg"
                  }
                  className="img"
                  alt=""
                />
              </div>
              <div class="col-md-7 pl-5">
                <div class="card-body">
                  <h5 class="card-title">{name || "Nombre"}</h5>
                  <p class="card-text"></p>
                  <p class="card-text">
                    <small class="text-muted">{born || "DD/MM/YYYY"}</small>
                  </p>
                  <p class="card-text">
                    <small class="text-muted">{gender || "Gender"}</small>
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

export default FormActor;
