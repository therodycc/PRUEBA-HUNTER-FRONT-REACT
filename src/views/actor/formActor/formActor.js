import { Fragment, useState, useCallback, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import httpService from "../../../services/httpService";
import sweetAlertSvc from "../../../services/sweetAlert";

import "./formActor.css";

function FormActor() {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [gender, setGender] = useState("Male");
  const [photo, setPhoto] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    KnowParamsId();
  }, []);

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/actors/list"),
    [history]
  );

  const { id } = useParams();
  const KnowParamsId = () => {
    console.log(id);
    if (id) {
      setEdit(true);
      httpService.getOne("http://localhost:3000/api/actors", id).then((e) => {
        setName(e.full_name);
        setBorn(e.born);
        setGender(e.gender);
        setPhoto(e.photo);
      });
    } else {
      setEdit(false);
    }
  };

  const getExisting = async () => {
    const res = await fetch("http://localhost:3000/api/actors");
    const data = await res.json();
    for (const item of data.data) {
      if (name === item.full_name) {
        return true;
      }
    }
  };

  const add = async (e) => {
    e.preventDefault();
    const ACTOR = {
      full_name: name.trim(),
      born: born.trim(),
      gender: gender.trim(),
      photo: photo.trim(),
    };
    if (!name.trim() || !born.trim() || !gender.trim() || !photo.trim())
      return sweetAlertSvc.fillInFields();

    await httpService
      .post("http://localhost:3000/api/actors", ACTOR)
      .then(() => {
        handleOnClick();
      });
  };

  const updateActor = async (e) => {
    e.preventDefault();
    const ACTOR = {
      full_name: name.trim(),
      born: born.trim(),
      gender: gender.trim(),
      photo: photo.trim(),
    };
    await httpService
      .put("http://localhost:3000/api/actors", id, ACTOR)
      .then(() => {
        handleOnClick();
      });
    setEdit(false);
  };

  return (
    <Fragment>
      <h1 className="text-left text-warning p-3 m-3">Actors</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-body">
            <form
              onSubmit={(e) => {
                !edit ? add(e) : updateActor(e);
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
                    value={name}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="date"
                    name="Born"
                    className="form-control"
                    placeholder="Born"
                    onChange={(e) => setBorn(e.target.value)}
                    value={born}
                  />
                </div>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
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
                  placeholder="Image link"
                  onChange={(e) => setPhoto(e.target.value)}
                  value={photo}
                />
              </div>
              <button type="submit" className="btn btn-warning btn-block">
                {edit ? "Save actor" : "Add actor"}
              </button>

              <Link to="/actors/list" className="btn btn-danger btn-block">
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
                    "http://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic.jpg"
                  }
                  className="img"
                  alt=""
                />
              </div>
              <div className="col-md-7 pl-5">
                <div className="card-body">
                  <h5 className="card-title">{name || "Nombre"}</h5>
                  <p className="card-text"></p>
                  <p className="card-text">
                    <small className="text-muted">{born || "DD/MM/YYYY"}</small>
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

export default FormActor;
