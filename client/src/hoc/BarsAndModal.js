import React, { useState } from "react";

import RightMenu from "../components/RightMenu";
import BottomMenu from "../components/BottomMenu";
import ModalTrackUp from "../components/ModalTrackUp";

function BarsAndModal(WrappedComponent) {
  function WrapperComponent() {
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
      </>
    );
  }

  return WrapperComponent;
}

export default BarsAndModal;
