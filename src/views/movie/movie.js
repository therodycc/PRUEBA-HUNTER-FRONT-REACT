import { Fragment } from "react";
import FormMovie from "../../components/common/formMovie/formMovie";
import Search from "../../components/common/search/search";
import Table from "../../components/common/Table/Table";

function Movie() {
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
      <Table />
      <FormMovie />
    </Fragment>
  );
}

export default Movie;
