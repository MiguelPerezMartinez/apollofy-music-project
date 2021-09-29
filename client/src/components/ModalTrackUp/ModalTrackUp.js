import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.css";

//Import components
import { Row, Col } from "react-bootstrap";
import Button from "../Button";
import Input from "../Input";

import { trackUpload } from "../../services/api/index";

function Modal({ handleClose }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [trackData, setTrackData] = useState({
    title: "",
    author: "",
    album: "",
    releaseYear: "",
    genre: "",
    urlImage: "",
    urlTrack: "",
    owner: "614ca9e29d57e31debbf06a1",
  });

  const [songToUpload, setSongToUpload] = useState({
    file: "",
    isUploading: false,
  });

  useEffect(() => {
    console.log(songToUpload);
    console.log(trackData);
  }, [trackData, songToUpload]);

  const handlesubmit = (e) => {
    e.preventDefault();

    //Connexion con base de datos
    trackUpload(trackData).then((response) => {
      console.log(response);
    });
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

  function handleUploadChange(e) {
    setSongToUpload({
      ...songToUpload,
      file: e.target.files[0],
    });
    setIsFileSelected(true);
  }

  async function uploadFiles() {
    setSongToUpload({ ...songToUpload, isUploading: true });
    setIsFileSelected(false);
    const formData = new FormData();
    formData.append("file", songToUpload.file);
    formData.append("upload_preset", "upload_apollofy");

    await axios
      .post("https://api.cloudinary.com/v1_1/apollofy/video/upload", formData)
      .then((response) => {
        setSongToUpload({ ...songToUpload, isUploading: false });
        const { data } = response;
        setTrackData({ ...trackData, urlTrack: data.url });
        setIsUploaded(true);
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
                handleChange={() => {}}
              />

              <div className="xl-separator" />
              <Row className="general-container uploading-file">
                {songToUpload.isUploading ? (
                  <>
                    <div className="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                    <h3>Uploading file</h3>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      onChange={handleUploadChange}
                      className="upload-file-input"
                    />
                    <div className="upload-file-container">
                      <h1>
                        <img
                          src="./assets/img/upload.svg"
                          alt="upload new track"
                        />
                      </h1>
                    </div>
                  </>
                )}
              </Row>
              {isFileSelected && (
                <>
                  <div className="login-register-button-centered">
                    <Col className="d-flex justify-content-center">
                      <button
                        onClick={uploadFiles}
                        className="button"
                        title="Upload"
                      >
                        Upload song
                      </button>
                    </Col>
                  </div>
                </>
              )}
              {isUploaded ? (
                <>
                  <div className="login-register-button-centered">
                    <Col className="d-flex justify-content-center">
                      <Button title="Save song" />
                    </Col>
                  </div>
                </>
              ) : (
                <></>
              )}
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Modal;
