//Imports
import React, { useEffect } from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";

//Components
import RightMenu from "../../components/RightMenu";
import Track from "../../components/Track";
import PlayButton from "../../components/PlayButton";

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
        {isPlayBarDisplayed && <PlayButton />}
      </main>
    </>
  );
}

export default withAuth(Home);
