//Imports
import React from "react";

//Import components
import RightMenu from "../../components/RightMenu";

function Home() {
  return (
    <>
      <RightMenu />
      <main>
        <h1>HOME</h1>
        <h2>Songs</h2>
        <h3>My plylist</h3>
        <div className="general-container">Home Page</div>
      </main>
    </>
  );
}

export default Home;
