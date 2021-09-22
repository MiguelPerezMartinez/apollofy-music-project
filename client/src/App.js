import React from "react";
import { Route, Switch } from "react-router-dom";

//Components
import RightMenu from "./components/RightMenu";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

// import { authenticationObserver } from "./services/firebase";

function App() {
  // Mover a un HoC -----------------------------------
  // const history = useHistory();
  // useEffect(() => {
  //   authenticationObserver((user) => {
  //     if (user) {
  //       // history.push("/");
  //     } else {
  //       // history.push("/login");
  //     }
  //   });
  // }, []);
  // ---------------------------------------------------

  return (
    <>
      <RightMenu />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
