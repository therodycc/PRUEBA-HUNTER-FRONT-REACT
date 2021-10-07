import { Fragment, useEffect, useState } from "react";

import FormActor from "./formActor/formActor";
import Search from "../../components/common/search/search";
import Table from "../../components/common/Table/Table";
import ListActors from "./listActors/listActors";

function Actor() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getActors();
  }, []);

  const getActors = async () => {
    const res = await fetch("http://localhost:3000/api/actors");
    const data = await res.json();
    setActors(data.data);
  };

  return (
    <Fragment>
      <FormActor></FormActor>
      <ListActors></ListActors>
    </Fragment>
  );
}

export default Actor;
