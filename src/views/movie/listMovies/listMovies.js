// from react
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import Search from "../../../components/common/search/search";
// css
import "./listMovies.css";

function ListMovies(props) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getActors();
  }, []);

  const getActors = async () => {
    const res = await fetch("http://localhost:3000/api/movies");
    const data = await res.json();
    setMovies(data.data);
    console.log(data);
  };


  return (
    <Fragment>
      <h1 className="text-left text-warning">Movies</h1>
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
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
               {movies.map((item) => ( 
              <tr>
                <td>{item.id}</td>
                <td>
                   <img src={item.photo} alt="Logo" className="imgTable" /> 
                </td>
                <td>{item.title}</td>
                <td>{item.gender}</td>

                <td>
                  <button type="button" className="btn btn-primary">
                    <i className="far fa-star mr-1 text-warning"></i> See
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
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListMovies;
