import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDialoguePlaylist } from "../../redux/dialogueHandler/actions";

function DialoguePlaylist() {
  function closeDialoguePlaylist() {
    window.onscroll = () => {};
    dispatch(hideDialoguePlaylist());
  }
  function handlerAddToQueuePlaylist() {}
  function handlerMoreInfoPlaylist() {}
  function handlerSharePlaylist() {}
  return (
    <>
      <div onMouseDown={closeDialoguePlaylist} className="back-context"></div>
      <div ref={dialogueBox} className="dialogue-box">
        <ul className="dialogue-list">
          <li className="dialogue-item" onClick={handlerAddToQueuePlaylist}>
            Add to queue
          </li>
          <li className="dialogue-item" onClick={handlerMoreInfoPlaylist}>
            More Info
          </li>
          <li className="dialogue-item" onClick={handlerSharePlaylist}>
            Share
          </li>
        </ul>
      </div>
    </>
  );
}
