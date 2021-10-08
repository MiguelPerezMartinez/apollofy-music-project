import React, { useState } from "react";
import { useSelector } from "react-redux";

import RightMenu from "../components/RightMenu";
import BottomMenu from "../components/BottomMenu";
import ModalTrackUp from "../components/ModalTrackUp";
import PlayBar from "../components/PlayBar";
import DialogueBox from "../components/DialogueBox";

function BarsAndModal(WrappedComponent) {
  function WrapperComponent() {
    const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    const dialogueHandler = useSelector((state) => state.dialogueHandler);

    return (
      <>
        <BottomMenu
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
        <RightMenu
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
        {dialogueHandler.active && <DialogueBox />}
        {showModal && <ModalTrackUp handleClose={handleCloseModal} />}
        <WrappedComponent />
        {isPlayBarDisplayed && <PlayBar />}
      </>
    );
  }

  return WrapperComponent;
}

export default BarsAndModal;
