import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.css";

//Import components
import { Row, Col } from "react-bootstrap";
import Input from "../Input";

import { apiTrackUpload } from "../../services/api/index";

function ModalTrackUp({ handleClose }) {
  const [coverUpload, setCoverUpload] = useState({
    file: "",
    isSelected: false,
    isUploading: false,
    isUploaded: false,
    error: "",
  });

  const [trackUpload, setTrackUpload] = useState({
    file: "",
    isSelected: false,
    isUploading: false,
    isUploaded: false,
    error: "",
  });

  const [trackData, setTrackData] = useState({
    title: "",
    author: "",
    album: "",
    releaseYear: "",
    genre: "",
    urlImage: "",
    urlTrack: "",
    owner: "6151de84f24ba470b66e13c7",
  });

  const [uploadState, setUploadState] = useState({
    isReady: false,
    isUploaded: false,
  });

  useEffect(() => {
    if (coverUpload.isSelected === true) {
      uploadFiles("cover");
    }
  }, [coverUpload.isSelected]);

  useEffect(() => {
    if (trackUpload.isSelected === true) {
      uploadFiles("track");
    }
  }, [trackUpload.isSelected]);

  useEffect(() => {
    if (trackData.urlImage !== "" && trackData.urlTrack !== "") {
      setUploadState({
        ...uploadState,
        isReady: true,
      });
    }
  }, [trackData]);

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

  function handleCoverUploadChange(e) {
    setCoverUpload({
      ...coverUpload,
      file: e.target.files[0],
      isSelected: true,
    });
  }

  function handleTrackUploadChange(e) {
    setTrackUpload({
      ...trackUpload,
      file: e.target.files[0],
      isSelected: true,
    });
  }

  function uploadFiles(folder) {
    if (folder === "cover") {
      setCoverUpload({ ...coverUpload, isUploading: true });
    } else {
      setTrackUpload({ ...trackUpload, isUploading: true });
    }
    const formData = new FormData();

    if (folder === "cover") {
      formData.append("file", coverUpload.file);
      formData.append("upload_preset", "upload_apollofy");
      formData.append("folder", folder);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/apollofy/image/upload/`,
          formData,
        )
        .then((response) => {
          setCoverUpload({
            ...coverUpload,
            isUploading: false,
            isUploaded: true,
          });
          const { data } = response;
          setTrackData({ ...trackData, urlImage: data.url });
        })
        .catch((error) => {
          setCoverUpload({
            ...coverUpload,
            error: error,
            file: "",
            isUploading: false,
            isUploaded: false,
          });
        });
    } else {
      formData.append("file", trackUpload.file);
      formData.append("upload_preset", "upload_apollofy");
      formData.append("folder", folder);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/apollofy/video/upload/`,
          formData,
        )
        .then((response) => {
          setTrackUpload({
            ...trackUpload,
            isUploading: false,
            isUploaded: true,
          });
          const { data } = response;
          setTrackData({ ...trackData, urlTrack: data.url });
        })
        .catch((error) => {
          setTrackUpload({
            ...coverUpload,
            error: error,
            file: "",
            isUploading: false,
            isUploaded: false,
          });
        });
    }
  }

  async function onSubmit() {
    await apiTrackUpload(trackData).then(handleClose());
  }

  return (
    <>
      <div className="modal-background" onClick={handleBlur}>
        <Row>
          <Col xs={12} md={6} className="track-upload">
            <h1 className="h3 mb-3 fw-normal">Upload track</h1>
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

            <Row className="upload-separator">
              <Col xs={12} md={6} lg={6} className="position-relative">
                {coverUpload.isUploaded ? (
                  <>
                    <Col className="uploaded-file">
                      <h3>Cover uploaded</h3>
                      <img src="./assets/img/uploaded.svg" alt="uploaded" />
                    </Col>
                  </>
                ) : coverUpload.isUploading ? (
                  <>
                    <Col className="lds-ripple">
                      <div></div>
                      <div></div>
                    </Col>
                    <h3>Uploading cover</h3>
                  </>
                ) : (
                  <>
                    <h5>Upload cover:</h5>
                    <input
                      type="file"
                      onChange={handleCoverUploadChange}
                      className="upload-file-input"
                    />
                    <div className="upload-file-container">
                      <h1>+</h1>
                    </div>
                  </>
                )}
              </Col>
              <Col xs={12} md={6} lg={6} className="position-relative">
                {trackUpload.isUploaded ? (
                  <>
                    <Col className="uploaded-file">
                      <h3>Track uploaded</h3>
                      <img src="./assets/img/uploaded.svg" alt="uploaded" />
                    </Col>
                  </>
                ) : trackUpload.isUploading ? (
                  <>
                    <Col className="lds-ripple">
                      <div></div>
                      <div></div>
                    </Col>
                    <h3>Uploading track</h3>
                  </>
                ) : (
                  <>
                    <h5>Upload track:</h5>
                    <input
                      type="file"
                      onChange={handleTrackUploadChange}
                      className="upload-file-input"
                    />
                    <div className="upload-file-container">
                      <h1>+</h1>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <div className="xl-separator" />

            {uploadState.isReady && (
              <>
                <div className="login-register-button-centered">
                  <Col className="d-flex justify-content-center">
                    <button className="button" onClick={onSubmit}>
                      Save song
                    </button>
                  </Col>
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ModalTrackUp;
