// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//services
import httpService from "../../../services/httpService";
// css
import "./listActors.css";
// assets
import imgNothing from "../../../assets/nothing.svg";


function ListActors() {
  const [actors, setActors] = useState([]);
  const [tableActors, setTableActors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchByDrop, setSearchByDrop] = useState("");

  useEffect(() => {
    getActors();
  }, []);

  const getActors = async () => {
    const data = await httpService.get("http://localhost:3000/api/actors");
    setActors(data);
    setTableActors(data);
  };

  const deleteItem = async (id) => {
    await httpService
      .delete("http://localhost:3000/api/actors/", id)
      .then(() => {
        getActors();
      });
  };

  const searchBy = (e) => {
    setSearchByDrop(e.target.value);
    filterData(e.target.value);
  };

  const searchData = async (e) => {
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (byItem) => {
    const searchResult = tableActors.filter((element) => {
      if (
        element.full_name
          .toString()
          .toLowerCase()
          .includes(byItem.toLowerCase()) ||
        element.born.toString().toLowerCase().includes(byItem.toLowerCase()) ||
        element.gender.toString().toLowerCase().includes(byItem.toLowerCase())
      ) {
        return element;
      }
    });
    setActors(searchResult);
  };
  return (
    <Fragment>
      <h1 className="text-left text-warning">Actors</h1>
      <div className="row mt-3 d-flex justify-content-between">
        <div className="col-lg-8">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => searchData(e)}
            />
          </div>
        </div>
        <div className="col-lg-2">
          <select
            className="form-control mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) => searchBy(e)}
          >
            <option value="">General</option>
            <option value="Male.">Male</option>
            <option value="Female">Female</option>
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
            {actors.length == 0 ? (
            <div className="col-lg-6 offset-2 p-5">
              <h6 className="text-warning">We haven't found anything</h6>
              <img src={imgNothing} className="imgNone col-lg-6 m-a" alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ListActors;
