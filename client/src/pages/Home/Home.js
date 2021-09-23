import React from "react";

import withAuth from "../../hoc/WithAuth";

function Home() {
  return (
    <>
      <main>
        <h1>HOME</h1>
        <h2>Songs</h2>
        <h3>My plylist</h3>
        <div className="general-container">Home Page</div>
      </main>
    </>
  );
}

export default withAuth(Home);
