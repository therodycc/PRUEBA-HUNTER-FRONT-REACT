import { Fragment } from "react";
import "./Table.css";
function Table() {
  return (
    <Fragment>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="text-warning">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src={"https://www.w3schools.com/howto/img_avatar.png"}
                    alt="Logo"
                    className="imgTable"
                  />
                </td>
                <td>Name</td>
                <td>Salary</td>
                <td>Country</td>
                <td>
                  <button type="button" className="btn btn-primary">
                    <i class="far fa-star mr-1 text-warning"></i> See
                  </button>
                  <button type="button" className="btn btn-danger">
                    <i className="fas fa-user-alt-slash"></i>
                  </button>
                  <button type="button" className="btn btn-warning">
                    <i className="fas fa-user-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default Table;
