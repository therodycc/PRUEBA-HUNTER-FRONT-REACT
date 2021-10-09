// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import Loading from "../../../components/common/loading/loading";
// services
import httpService from "../../../services/httpService";
// css
import "./listMovies.css";
// assets
import serverDownImg from "../../../assets/serverdown.svg";
import addNewImg from "../../../assets/addNew.svg";

function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [TableMovies, setTableMovies] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchByDrop, setSearchByDrop] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const data = await httpService.get("http://localhost:3000/api/movies");
      setMovies(data);
      setTableMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    await httpService
      .delete("http://localhost:3000/api/movies/", id)
      .then(() => {
        getMovies();
      })
      .catch((error) => console.log(error));
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
    const searchResult = TableMovies.filter((element) => {
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
            onChange={(e) => searchBy(e)}
          >
            <option value="">GENERAL</option>
            <option value="FICTION">FICTION</option>
            <option value="ADVENTURE">ADVENTURE</option>
            <option value="COMEDY">COMEDY</option>
            <option value="TERROR">TERROR</option>
            <option value="ACTION">ACTION</option>
            <option value="SUSPENSE">SUSPENSE</option>
          </select>
        </div>

        <div className="col-lg-2">
          <Link to="/movies/form" className="btn btn-info btn-block">
            add
          </Link>
        </div>
      </div>

      <div className="card">
        {movies ? (
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
            {!movies ? <Loading></Loading> : ""}
          </div>
        ) : (
          <div className="p-5">
            <h1 className="text-danger col-lg-8 offset-2 mb-5">
              Service Unavailable 503
            </h1>
            <img src={serverDownImg} className="col-lg-6 offset-3" alt="" />
          </div>
        )}

        {movies.length === 0 ? (
          <div>
            <h1 className="text-warning col-lg-4 mt-5 offset-4">
              Add new movie
            </h1>
            <img src={addNewImg} className="col-lg-4 mt-5 offset-4" alt="" />
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default ListMovies;
