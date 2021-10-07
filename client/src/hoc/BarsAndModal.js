import React, { useState } from "react";
import { useSelector } from "react-redux";

import RightMenu from "../components/RightMenu";
import BottomMenu from "../components/BottomMenu";
import ModalTrackUp from "../components/ModalTrackUp";
import PlayBar from "../components/PlayBar";

function BarsAndModal(WrappedComponent) {
  function WrapperComponent() {
    const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

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
        {showModal && <ModalTrackUp handleClose={handleCloseModal} />}
        <WrappedComponent />
        {isPlayBarDisplayed && <PlayBar />}
      </>
    );
  }

  return WrapperComponent;
}

export default BarsAndModal;
