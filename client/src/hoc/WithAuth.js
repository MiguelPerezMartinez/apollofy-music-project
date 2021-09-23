import React from "react";

import { authenticationObserver } from "../services/firebase";

import Login from "../pages/Login";

async function isAuth() {
  authenticationObserver((user) => {
    if (user) {
      // history.push("/");
      console.log("Estás logueado");
      return true;
    } else {
      // history.push("/login");
      console.log("No estás logueado");
      return false;
    }
  });
}

function withAuth(WrappedComponent) {
  console.log(WrappedComponent);
  if (isAuth) {
    console.log("I'm in");
    return (
      <>
        <WrappedComponent />
      </>
    );
  } else {
    console.log("I'm not in");
    return <Login />;
  }
  //   function WrapperComponent({ ...props }) {
  //     return <>{ ? <WrappedComponent /> : <Login />}</>;

  //   }

  //   if (logged) {
  //     return <WrappedComponent/>;
  //   } else {
  //     history.push("/login");
  //   }
}

export default withAuth;
