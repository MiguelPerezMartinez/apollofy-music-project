import React from "react";

import "./styles.css";

export default function TrackImg({ urlImage }) {
  console.log(urlImage);

  return (
    <>
      <div className="track-image-component-container">
        <div
          className="track-image-component-image"
          style={{ backgroundImage: `url(${urlImage})` }}
        />
      </div>
    </>
  );
}
