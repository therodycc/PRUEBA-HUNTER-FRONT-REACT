import { Fragment, useEffect } from "react";
import Search from "../../../components/common/search/search";
import "./listActors.css";
function ListActors(props) {
  useEffect(() => {});

  return (
    <Fragment>
      <div className="row mt-5">
        <div className="col-lg-5">
          <Search></Search>
        </div>
        <div className="col-lg-2">
          <button type="button" className="btn btn-info btn-block">
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

export default ListActors;
