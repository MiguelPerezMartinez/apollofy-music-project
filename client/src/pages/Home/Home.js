//Imports
import React from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";

//Components
import RightMenu from "../../components/RightMenu";
import Track from "../../components/Track";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const dispatch = useDispatch();
  // const isDisplayed = useSelector(
  //   (state) => state.trackReducer.isPlayBarDisplayed,
  // );

  //Hacer peticion y cambiar por dataTrack
  const dataTrack = {
    title: "La conga",
    author: "Congito",
    album: "Los congitos",
    releaseYear: "2002",
    genre: "Samba",
    urlImage: "eeeeeee",
    urlTrack: "res",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "time",
  };

  return (
    <>
      <RightMenu />
      <main>
        <Track dataTrack={dataTrack} />
        <h1>HOME</h1>
        <h2>Songs</h2>
        <h3>My plylist</h3>
        <div className="general-container">Home Page</div>
      </main>
    </>
  );
}

export default withAuth(Home);
