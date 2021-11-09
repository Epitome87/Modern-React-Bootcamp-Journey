import React from 'react';

import { Outlet, useParams } from 'react-router-dom';

function Doritos() {
  let params = useParams();

  return (
    <div>
      Specifically, Doritos {params.chipsType}
    </div>
  );
}

export default Doritos;
