import { Fragment, useEffect } from "react";
import Search from "../../../components/common/search/search";
import "./listMovies.css";
function ListMovies(props) {
  useEffect(() => {});

  return (
    <Fragment>
      <div class="row mt-5">
        <div class="col-lg-5">
          <Search></Search>
        </div>
        <div class="col-lg-2">
          <button type="button" name="" id="" class="btn btn-info btn-block">
            add
          </button>
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

export default ListMovies;
