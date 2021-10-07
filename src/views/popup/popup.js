import { Fragment, useState } from "react";
import "./popup.css";

function PopUp() {
  const [listActors, setListActors] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <Fragment>
      <h1>Pop Up</h1>
      <div class="row mt-5">
        <div class="col-lg-4">
          <div className="card">
            <div className="card-header">Header</div>
            <div className="card-body p-0">
              <img
                className="col-lg-12 p-0"
                src="https://pbs.twimg.com/media/E3JqCabVgAIrMYC.jpg"
                alt=""
              />
            </div>
            <div className="card-footer text-muted">Footer</div>
          </div>
        </div>
        <div className="col-lg-8">
          <ul class="list-group">
            {listActors.map((e) => (
              <li className="list-group-item border-list-item mb-3 " key={e}>
                <div className="row">
                  <div className="col-lg-2">
                    <img
                      className="col-lg-12 p-0 imgRound"
                      src="https://pbs.twimg.com/media/E3JqCabVgAIrMYC.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-8">
                    <h2>Marcos Diaz</h2>
                    <span className="ml-3">Masculino {e}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default PopUp;
