import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../../components/common/search/search";
import FormActor from "../formActor/formActor";
// css
// import "./listActors.css";
function ListActors(props) {
  useEffect(() => {});

  return (
    <Fragment>
      <h1 className="text-left text-warning">Actors</h1>
      <div className="row mt-3 d-flex justify-content-between">
        <div className="col-lg-8">
          <Search></Search>
        </div>
        <div className="col-lg-2">
          <select
            className="form-control mb-3"
            aria-label=".form-select-lg example"
          >
            <option value="General">General</option>
            <option value="Gender">Gender</option>
          </select>
        </div>

        <div className="col-lg-2">
          <Link to="/actors/form" className="btn btn-info btn-block">
            add
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="text-warning">
              <tr>
                <th>ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {/* {props.info.map((item) => ( */}
              <tr>
                <td>item.id</td>
                <td>
                  {/* <img src={item.photo} alt="Logo" className="imgTable" /> */}
                </td>
                <td>item.full_name</td>
                <td>item.gender</td>

                <td>
                  <button type="button" className="btn btn-primary">
                    <i class="far fa-star mr-1 text-warning"></i> See
                  </button>
                  <button
                    // onClick={deleteItem(item.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-user-alt-slash"></i>
                  </button>
                  <button type="button" className="btn btn-warning">
                    <i className="fas fa-user-edit"></i>
                  </button>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListActors;
