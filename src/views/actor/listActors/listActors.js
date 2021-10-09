// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import Search from "../../../components/common/search/search";
//services
import httpService from "../../../services/httpService";
// css
import "./listActors.css";

function ListActors() {
  const [actors, setActors] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    getActors();
  }, []);

  const getActors = async () => {
    const data = await httpService.get("http://localhost:3000/api/actors");
    setActors(data);
  };

  const deleteItem = async (id) => {
    await httpService
      .delete("http://localhost:3000/api/actors/", id)
      .then(() => {
        getActors();
      });
  };

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
                <th>Born</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {actors.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.photo} alt="Logo" className="imgTable" />
                  </td>
                  <td>{item.full_name}</td>
                  <td>{item.born}</td>
                  <td>{item.gender}</td>

                  <td>
                    <Link
                      to={"/popup/movies/" + item.id}
                      className="btn btn-primary"
                    >
                      <i className="far fa-star mr-1 text-warning"></i> See
                    </Link>
                    <button
                      onClick={(id) => deleteItem(item.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-user-alt-slash"></i>
                    </button>
                    <Link
                      to={"/actors/form/" + item.id}
                      type="button"
                      className="btn btn-warning"
                    >
                      <i className="fas fa-user-edit"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListActors;
