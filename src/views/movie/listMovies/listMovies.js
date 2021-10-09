// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import httpService from "../../../services/httpService";
// css
import "./listMovies.css";

function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [Tablemovies, setTableMovies] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await httpService.get("http://localhost:3000/api/movies");
    setMovies(data);
    setTableMovies(data);
  };

  const deleteMovie = async (id) => {
    await httpService
      .delete("http://localhost:3000/api/movies/", id)
      .then(() => {
        getMovies();
      });
  };

  const searchData = async (e) => {
    setSearch(e.target.value);
    filterMovie(e.target.value);
  };

  const filterMovie = (byItem) => {
    const searchResult = Tablemovies.filter((element) => {
      if (
        element.title.toString().toLowerCase().includes(byItem.toLowerCase()) ||
        element.premiere
          .toString()
          .toLowerCase()
          .includes(byItem.toLowerCase()) ||
        element.gender.toString().toLowerCase().includes(byItem.toLowerCase())
      ) {
        return element;
      }
    });
    setMovies(searchResult);
  };

  return (
    <Fragment>
      <h1 className="text-left text-warning">Movies</h1>
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
            onChange={(e) => searchData(e)}
          >
            <option value="">General</option>
            {Tablemovies.map((item) => (
              <option value={item.gender}>{item.gender}</option>
            ))}
          </select>
        </div>

        <div className="col-lg-2">
          <Link to="/movies/form" className="btn btn-info btn-block">
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
                <th>Premiere</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.photo} alt="Logo" className="imgTable" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.premiere}</td>
                  <td>{item.gender}</td>

                  <td>
                    <Link
                      to={"/popup/actors/" + item.id}
                      className="btn btn-primary"
                    >
                      <i className="far fa-star mr-1 text-warning"></i> See
                    </Link>
                    <button
                      onClick={(id) => deleteMovie(item.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-user-alt-slash"></i>
                    </button>
                    <Link
                      to={"/movies/form/" + item.id}
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

export default ListMovies;
