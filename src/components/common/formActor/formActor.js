import { Fragment } from "react";
import "./formActor.css";

function FormActor() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <Fragment>
      <h1 className="text-left text-warning p-3 m-3">Actors</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-body">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <div className="row">
                <div className="form-group col-lg-6">
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="date"
                    name="Born"
                    className="form-control"
                    placeholder="Born"
                  />
                </div>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  aria-label="Default select example"
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Image"
                  className="form-control"
                  placeholder="Image"
                />
              </div>
              <button type="submit" className="btn btn-warning btn-block">
                Add actor
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div class="card mb-4">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UY1200_CR84,0,630,1200_AL_.jpg"
                  className="img"
                  alt=""
                />
              </div>
              <div class="col-md-7 pl-5">
                <div class="card-body">
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

export default FormActor;
