import React from "react";
import DialogBox from "../DialogBox";
function ThreeButtons() {
  const threeButtonsClick = (e) => {
    console.log(e.pageX, e.pageY);
    const x = e.pageX;
    const y = e.pageY;

    return <DialogBox x={x} y={y} />;
  };

  return <div onClick={threeButtonsClick}>...</div>;
}

export default ThreeButtons;
