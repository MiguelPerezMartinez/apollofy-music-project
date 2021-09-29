//Imports
import React from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";

//Components
import RightMenu from "../../components/RightMenu";
import Track from "../../components/Track";
import { useDispatch, useSelector } from "react-redux";
import { isPlayBarDisplayed, isPlaying } from "../../redux/trackData/actions";
function Home() {
  const dispatch = useDispatch();
  const isDisplayed = useSelector(
    (state) => state.trackReducer.isPlayBarDisplayed,
  );
  function barDisplayed() {
    if (isDisplayed === false) {
      dispatch(isPlayBarDisplayed(true));
    } else {
      dispatch(isPlayBarDisplayed(false));
    }
  }

  function PlayingSong() {
    dispatch(isPlaying());
  }

  return (
    <>
      <RightMenu />
      <main>
        <Track />
        <h1>HOME</h1>
        <h2>Songs</h2>
        <h3>My plylist</h3>
        <div className="general-container">Home Page</div>
        <button onClick={barDisplayed}>varDislayed</button>
        <button onClick={PlayingSong}>PlayingSong</button>
      </main>
    </>
  );
}

export default withAuth(Home);
