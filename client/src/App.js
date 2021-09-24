import React from "react";
import { Route, Switch } from "react-router-dom";

//Components
import RightMenu from "./components/RightMenu";

import withAuth from "./hoc/withAuth.js";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  

  return (
    <>
      <RightMenu />
      <Switch>
        <Route path="/recover-password" component={ResetPassword} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={withAuth(Home)} />
      </Switch>
    </>
  );
}

export default App;
