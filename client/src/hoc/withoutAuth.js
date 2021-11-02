import React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

function withoutAuth(WrappedComponent) {
  function WrapperComponent() {
    const isAuthorized = useSelector((state) => state.isAuthorized);
    const { data } = useSelector((state) => state.userReducer);

    return <>{data === null ? <WrappedComponent /> : <Redirect to="/" />}</>;
  }

  return WrapperComponent;
}

export default withoutAuth;
