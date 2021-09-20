import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <>
      {/* <header>Header</header> */}
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
      {/* <footer>Footer</footer> */}
    </>
  );
}

export default App;
