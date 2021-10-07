import { Fragment, useEffect, useState } from "react";

import "./home.css";

function Home() {
  const [movies, setMovies] = useState([1, 1, 3, 34, 5]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const res = await fetch("http://localhost:3000/api/movies");
    const data = await res.json();
    console.log(data.data);
    setMovies(data.data);
  };

  return (
    <Fragment>
      <div className="row">
        {movies.map((movie, index) => (
          <div className="col-lg-4 mt-3">
            <div className="card" key={movie.id}>
              <div className="card-body p-0">
                <img
                  className="col-lg-12 p-0 imgPortada"
                  src={movie.photo}
                  alt=""
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Home;
