//Imports
import React, { useEffect } from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

//Components
import Track from "../../components/Track";
import PlayButton from "../../components/PlayButton";

//imports to set userRedux
import { useSelector } from "react-redux";

function Home() {
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlayBarDisplayed } = trackReducer;

  const dataTrack = {
    title: "Deltoya",
    author: "Robe",
    album: "Deltoya",
    releaseYear: "15 de juny de 1992",
    genre: "Transgressive rock",
    urlImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/extremoduro-robe-iniesta-separacion-1576666810.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
    urlTrack: "res",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "2 min",
  };

  return (
    <>
      <main>
        <h1>HOME</h1>
        <h2>Songs</h2>
        <h3>My plylist</h3>

        <Track dataTrack={dataTrack} />
        {isPlayBarDisplayed && <PlayButton />}
      </main>
    </>
  );
}

export default withAuth(BarsAndModal(Home));
