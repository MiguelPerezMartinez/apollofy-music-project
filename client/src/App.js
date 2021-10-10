import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/RecoverPassword";
import ChangePassword from "./pages/ChangePassword";
import ElementsList from "./pages/ElementsList";
import FavPlaylist from "./pages/FavPlaylist";
import Radio from "./pages/Radio";

//Redux actions
import { fetchStateIsAuthorized } from "./redux/isAuthorized/actions";
import { fetchUserData, resetUserData } from "./redux/userData/actions";

function App() {
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  // Redux State to get the authorization
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.isAuthorized);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isAuthorized.loaded && isAuthorized.value) {
      if (userData.loaded) {
        setIsReadyToRender(true);
      } else {
        dispatch(fetchUserData());
      }
    } else if (isAuthorized.loaded && !isAuthorized.value) {
      dispatch(resetUserData());
      setIsReadyToRender(true);
    } else {
      dispatch(fetchStateIsAuthorized());
    }
  }, [dispatch, isAuthorized, userData]);

  if (isReadyToRender) {
    if (isAuthorized.value)
      console.log("¡Estás autenticado! Welcome", userData.data.username);
    else console.log("¡No estás autenticado!");
  }

  // Render a loading page while auth state and user data is loading
  if (!isReadyToRender) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <>
      <Switch>
        <Route path="/favourite-playlists" component={FavPlaylist} />
        <Route path="/favourite-tracks" component={ElementsList} />
        <Route path="/my-tracks" component={ElementsList} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/recover-password" component={ResetPassword} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/radio" component={Radio} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
