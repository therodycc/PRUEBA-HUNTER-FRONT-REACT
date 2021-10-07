import { Fragment, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  return (
    <Fragment>
      <div className="row">
        {movies.map((movie, index) => (
          <div className="col-lg-4 mt-3" key={index}>
            <div className="card">
              <div className="card-header">Header</div>
              <div className="card-body p-0">
                <img
                  className="col-lg-12 p-0"
                  src="https://pbs.twimg.com/media/E3JqCabVgAIrMYC.jpg"
                  alt=""
                />
              </div>
              <div className="card-footer p-0 bg-secondary">
                <button type="button" name="" id="" class="btn btn-danger btn-sm">Delete</button>
                <button type="button" name="" id="" class="btn btn-success btn-sm">Delete</button>
                <button type="button" name="" id="" class="btn btn-warning btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Home;
