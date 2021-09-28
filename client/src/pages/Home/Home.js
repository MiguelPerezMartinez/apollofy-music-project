//Imports
import React from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";

//Components
import RightMenu from "../../components/RightMenu";
import { useDispatch } from "react-redux";
import {
  isPlayVarDisplayed,
  isPlaying,
  notPlayVarDisplayed,
  notPlaying,
} from "../../redux/trackData/actions";
function Home() {
  const dispatch = useDispatch();
  function varDisplayed() {
    dispatch(isPlayVarDisplayed());
  }
  function notDisplayed() {
    dispatch(notPlayVarDisplayed());
  }
  function notPlayingSong() {
    dispatch(notPlaying());
  }
  function PlayingSong() {
    dispatch(isPlaying());
  }
  function fillObjecTrack() {
    dispatch(isPlayVarDisplayed());
  }
  return (
    <>
      <RightMenu />
      <main>
        <h1>HOME</h1>
        <h2>Songs</h2>
        <h3>My plylist</h3>
        <div className="general-container">Home Page</div>
        <button onClick={varDisplayed}>varDislayed</button>
        <button onClick={notDisplayed}>notDislayed</button>
        <button onClick={notPlayingSong}>notPlayingSong</button>
        <button onClick={PlayingSong}>PlayingSong</button>
        <button onClick={fillObjecTrack}>fillObjecTrack</button>
      </main>
    </>
  );
}

export default withAuth(Home);
