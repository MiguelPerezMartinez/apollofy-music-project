import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDialogue } from "../../redux/dialogueHandler/actions";
import { setTrackQueueInLocalStorage } from "../../services/localStorage";
import {
  trackObjectAction,
  isPlayBarDisplayedAction,
  setPositionInHistory,
} from "../../redux/trackData/actions";
import { resetPositionInHistory } from "../../services/localStorage";
import "./styles.css";
function DialoguePlaylist() {
  const dispatch = useDispatch();
  const { trackDataDialogPlaylist, position } = useSelector(
    (state) => state.dialogueHandler,
  );
  function closeDialoguePlaylist() {
    window.onscroll = () => {};
    dispatch(hideDialogue());
  }
  useEffect(() => {
    dialoguePlaylist.current.style.display = "block";

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dialoguePlaylistHeight = dialoguePlaylist.current.offsetHeight + 20;
    const dialoguePlaylistWidth = dialoguePlaylist.current.offsetWidth + 20;
    const clickedPosX = position.x;
    const clickedPosY = position.y;

    if (windowWidth - clickedPosX < dialoguePlaylistWidth) {
      dialoguePlaylist.current.style.left =
        windowWidth - dialoguePlaylistWidth + "px";
    } else {
      dialoguePlaylist.current.style.left = clickedPosX + "px";
    }

    if (windowHeight - clickedPosY < dialoguePlaylistHeight) {
      dialoguePlaylist.current.style.top =
        windowHeight - dialoguePlaylistHeight + "px";
    } else {
      dialoguePlaylist.current.style.top = clickedPosY + "px";
    }
  }, []);
  const dialoguePlaylist = useRef();
  function handlerAddToQueuePlaylist() {
    const { tracks } = trackDataDialogPlaylist;
    tracks.map((track) => setTrackQueueInLocalStorage(track));
    dispatch(trackObjectAction(tracks[0]));
    dispatch(isPlayBarDisplayedAction(true));

    const resetedHistoryPosition = resetPositionInHistory();
    dispatch(setPositionInHistory(resetedHistoryPosition));
  }
  function handlerMoreInfoPlaylist() {}
  function handlerSharePlaylist() {}
  return (
    <>
      <div onMouseDown={closeDialoguePlaylist} className="back-context"></div>
      <div ref={dialoguePlaylist} className="dialogue-box">
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

export default DialoguePlaylist;
