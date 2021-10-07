import { Fragment } from "react";

function Search() {
  return (
    <Fragment>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Search"
        />
      </div>
    </Fragment>
  );
}

export default Search;
