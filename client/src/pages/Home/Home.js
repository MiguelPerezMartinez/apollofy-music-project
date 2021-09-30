//Imports
import React, { useEffect } from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import sound from "./sound.wav";
import BarsAndModal from "../../hoc/BarsAndModal";

//Components
import Track from "../../components/Track";
import PlayButton from "../../components/PlayButton";
import PlayBar from "../../components/PlayBar";

//imports to set userRedux
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../services/api/index";
import { setUser } from "../../redux/userData/actions";

function Home() {
  const dispatch = useDispatch();
  const trackReducer = useSelector((stete) => stete.trackReducer);
  const { isPlayBarDisplayed } = trackReducer;
  // set data in userReducer
  useEffect(() => {
    getCurrentUser().then((response) => {
      dispatch(
        setUser({
          user_id: response._id,
          username: response.username,
        }),
      );
    });
  }, []);
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
        <audio controls>
          <source src={sound} type="audio/wav" />
        </audio>

        {/* <Track dataTrack={dataTrack} />
        {isPlayBarDisplayed && <PlayButton />} */}
        <Track dataTrack={dataTrack} />
        {isPlayBarDisplayed && (
          <PlayButton className="playBar" trackUrl={sound} />
        )}
      </main>
      {isPlayBarDisplayed && <PlayBar />}
    </>
  );
}

export default withAuth(BarsAndModal(Home));
