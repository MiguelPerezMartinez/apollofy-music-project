import React from "react";

import { authenticationObserver } from "../services/firebase";

import { Redirect } from "react-router-dom";

// async function checkAuth() {
//   await authenticationObserver((user) => {
//     console.log(user);
//     if (user) {
//       console.log(user);
//       return true;
//     } else {
//       console.log(user);
//       return false;
//     }
//   });
// }

async function withAuth(WrappedComponent) {
  let  isAuthorized = false;
  authenticationObserver((user) => {
    // console.log("hello",user);
    if (user) {
      // console.log(user);
      isAuthorized = true;
    } else {
      // console.log(user);
      isAuthorized = false;
    }
  });
  console.log("isAuthorized => ", isAuthorized);
  function WrapperComponent() {
    return isAuthorized ? <WrappedComponent /> : <Redirect to="/login" />;
  }
  return WrapperComponent;
}

export default withAuth;
