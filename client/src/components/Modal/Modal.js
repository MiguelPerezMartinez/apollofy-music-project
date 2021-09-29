import React, { useState } from "react";

import "./styles.css";

//Import components
import { Row, Col } from "react-bootstrap";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Modal({ handleClose }) {
  const [trackData, setTrackData] = useState({
    title: "",
    author: "",
    album: "",
    releaseYear: "",
    genre: "",
    urlImage: "",
    urlTrack: "",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "time",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(trackData);
    handleClose();
  };

  const handleBlur = (e) => {
    if (e.target.className === "modal-background") {
      handleClose();
    }
  };

  //Manage values of state properties
  function handleChange(e) {
    setTrackData({
      ...trackData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      <div className="modal-background" onClick={handleBlur}>
        <Row>
          <Col xs={12} md={6} className="track-upload">
            <h1 className="h3 mb-3 fw-normal">Upload track</h1>
            <form onSubmit={handlesubmit}>
              <Input
                type="text"
                id="title"
                label="title"
                value={trackData.title}
                placeholder="Type title"
                handleChange={handleChange}
              />
              <Input
                type="text"
                id="author"
                label="author"
                value={trackData.author}
                placeholder="Type author"
                handleChange={handleChange}
              />
              <Input
                type="text"
                id="album"
                label="album"
                value={trackData.album}
                placeholder="Type album"
                handleChange={handleChange}
              />
              <Input
                type="releaseYear"
                id="releaseYear"
                label="Release year"
                value={trackData.releaseYear}
                placeholder="Type release year"
                handleChange={handleChange}
              />
              <Input
                type="text"
                id="genre"
                label="genre"
                value={trackData.genre}
                placeholder="Type genre"
                handleChange={handleChange}
              />
              <Input
                type="text"
                name="urlImage"
                id="urlImage"
                label="Image URL"
                value={trackData.urlImage}
                placeholder="Paste URL"
                handleChange={handleChange}
              />
              <Input
                type="text"
                name="urlTrack"
                id="urlTrack"
                label="Track"
                value={trackData.urlTrack}
                placeholder="Paste URL "
                handleChange={handleChange}
              />

              <div className="login-register-button-centered">
                <Col className="d-flex justify-content-center">
                  <Button title="Register" />
                </Col>
                <Col className="d-flex justify-content-center">
                  <div className="button cancel-button" onClick={handleClose}>
                    Cancel
                  </div>
                </Col>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Modal;
