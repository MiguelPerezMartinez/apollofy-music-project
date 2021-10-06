import React, { useState } from "react";
import "./styles.css";
function DialogBox(x, y) {
  const style = () => {
    return {
      height: 200,
      width: 150,
      borderRadius: 3,
      backgroundColor: "white",
      color: "black",
      display: "flex",
      flexDirection: "column",
      padding: 10,
      top: y,
      left: x,
      textAlign: "center ",
    };
  };

  return (
    <div style={style()}>
      <span className="dialog-box-text">Favourites</span>
      <span className="dialog-box-text">Share</span>
      <span className="dialog-box-text">Add to line</span>
    </div>
  );
}

export default DialogBox;
