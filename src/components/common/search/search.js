import { Fragment } from "react";

function Search() {
  return (
    <Fragment>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
        />
      </div>
    </Fragment>
  );
}

export default Search;
