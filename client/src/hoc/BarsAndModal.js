import React, { useState } from "react";
import { useSelector } from "react-redux";

import RightMenu from "../components/RightMenu";
import BottomMenu from "../components/BottomMenu";
import ModalTrackUp from "../components/ModalTrackUp";
import PlayBar from "../components/PlayBar";
import DialogueBox from "../components/DialogueBox";
import UpdateModal from "../components/UpdateTrackModal";
import DeleteModal from "../components/DeleteTrackModal";
import PlaylistSelector from "../components/PlaylistSelector";

function BarsAndModal(WrappedComponent) {
  function WrapperComponent() {
    const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    const { active, showDelete, showUpdate, showMyPlaylist } = useSelector(
      (state) => state.dialogueHandler,
    );

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
        {active && <DialogueBox />}
        {showDelete && <DeleteModal />}
        {showUpdate && <UpdateModal />}
        {showMyPlaylist && <PlaylistSelector />}
        {showModal && <ModalTrackUp handleClose={handleCloseModal} />}
        <WrappedComponent />
        {isPlayBarDisplayed && <PlayBar />}
      </>
    );
  }

  return WrapperComponent;
}

export default BarsAndModal;
