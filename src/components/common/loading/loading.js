import React, { Fragment } from "react";
// css
import "./loading.css";

export const loading = () => {
  return (
    <Fragment>
      <div class="cnt">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default loading;
