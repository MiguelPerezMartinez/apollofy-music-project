import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

//import dialogueHandlerReducer
import { hideDialogue } from "../../redux/dialogueHandler/actions";

function DialogueBox() {
  const dispatch = useDispatch();
  const dialogueHandler = useSelector((state) => state.dialogueHandler);
  const dialogueBox = useRef();

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dialogueBoxHeight = dialogueBox.current.offsetHeight + 5;
    const dialogueBoxWidth = dialogueBox.current.offsetWidth + 5;
    const clickedPosX = dialogueHandler.position.x;
    const clickedPosY = dialogueHandler.position.y;

    if (windowWidth - clickedPosX < dialogueBoxWidth) {
      dialogueBox.current.style.left = windowWidth - dialogueBoxWidth + "px";
    } else {
      dialogueBox.current.style.left = clickedPosX + "px";
    }

    if (windowHeight - clickedPosY < dialogueBoxHeight) {
      dialogueBox.current.style.top = windowHeight - dialogueBoxHeight + "px";
    } else {
      dialogueBox.current.style.top = clickedPosY + "px";
    }
    console.log("dialogueBoxHeight => ", dialogueBoxHeight);
    console.log("dialogueBoxWidth => ", dialogueBoxWidth);
  }, []);

  function closeDialogue(){
    dispatch(hideDialogue());
  }

  return (
    <>
    <div onClick={closeDialogue} className="back-context"></div>
      <div ref={dialogueBox} className="dialogue-box">
        <ul className="dialogue-list">
          <li>Add to queue</li>
          <li>Edit</li>
          <li>Delete</li>
          <li>Share</li>
          <li>Like</li>
        </ul>
      </div>
    </>
  );
}

export default DialogueBox;
