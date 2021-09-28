import React, { useState } from "react";

import "./styles.css";

function Modal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      {show && (
        <div className="modal-background">
          <button onClick={handleClose}>close modal</button>
        </div>
      )}
    </>
  );
}

export default Modal;
