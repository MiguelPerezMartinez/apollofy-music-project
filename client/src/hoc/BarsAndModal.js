import React, { useState } from "react";

import RightMenu from "../components/RightMenu";
import ModalTrackUp from "../components/ModalTrackUp";
import Button from "../components/Button";

function BarsAndModal(WrappedComponent) {
  function WrapperComponent() {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);
    return (
      <>
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
