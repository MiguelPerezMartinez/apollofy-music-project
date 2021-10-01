import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as $ from "jquery";
import validate from "jquery-validation";
import axios from "axios";

import "./styles.css";

//Import components
import { Row, Col } from "react-bootstrap";
import Input from "../Input";

import { apiTrackUpload } from "../../services/api/index";

function ModalTrackUp({ handleClose }) {
  const form = useRef();
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  const [coverUpload, setCoverUpload] = useState({
    file: "",
    isSelected: false,
    isUploading: false,
    isUploaded: false,
    error: "",
  });

  const [isReady, setIsReady] = useState(false);

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
    urlCover: "",
    urlTrack: "",
    owner: "",
  });

  const [tempUrl, setTempUrl] = useState({
    urlCover: "",
    urlTrack: "",
  });

  useEffect(() => {
    setTrackData({
      ...trackData,
      owner: userReducer.user_id,
    });
  }, []);

  useEffect(() => {
    if (coverUpload.isSelected === true) {
      uploadFiles("cover");
    }
  }, [coverUpload.isSelected]);

  useEffect(() => {
    setTrackData({
      ...trackData,
      urlCover: tempUrl.urlCover,
      urlTrack: tempUrl.urlTrack,
    });
  }, [tempUrl]);

  useEffect(() => {
    if (trackUpload.isSelected === true) {
      uploadFiles("track");
    }
  }, [trackUpload.isSelected]);

  const handleBlur = (e) => {
    if (e.target.className === "modal-background") {
      handleClose();
    }
  };

  //Manage values of state properties
  function handleChange(e) {
    setTrackData({
      ...trackData,
      owner: userReducer.user_id,
      [e.target.name]: e.target.value,
    });
    console.log(trackData);
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

  async function uploadFiles(folder) {
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
      await axios
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
          setTempUrl({ ...tempUrl, urlCover: data.url });
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
          setTempUrl({ ...tempUrl, urlTrack: data.url });
          setIsReady(true);
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

  async function onSubmit(e) {
    e.preventDefault();
    $(form.current).validate({
      rules: {
        title: { required: true },
        author: { required: true },
        genre: { required: true },
        track: { required: true },
      },
      messages: {
        title: { required: "Title field is required" },
        author: { required: "Author field is required" },
        genre: { required: "Genre field is required" },
        track: { required: "Track file is required" },
      },
      submitHandler: () => {
        console.log(trackData);
        apiTrackUpload(trackData).then(handleClose());
      },
    });
  }

  return (
    <>
      <div className="modal-background" onClick={handleBlur}>
        <form ref={form} onSubmit={onSubmit}>
          <Row>
            <Col xs={12} md={6} className="track-upload">
              <h1 className="h3 mb-3 fw-normal">Upload track</h1>
              <Input
                type="text"
                id="title"
                label="Title *"
                value={trackData.title}
                placeholder="Type title"
                handleChange={handleChange}
              />
              <Input
                type="text"
                id="author"
                label="Author *"
                value={trackData.author}
                placeholder="Type author"
                handleChange={handleChange}
              />
              <Input
                type="text"
                id="album"
                label="Album"
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
                label="Genre *"
                value={trackData.genre}
                placeholder="Type genre"
                handleChange={handleChange}
              />

              <div className="xl-separator" />

              <Row className="upload-separator">
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="position-relative flex-column d-flex justify-content-center"
                >
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
                        name="cover"
                        onChange={handleCoverUploadChange}
                        className="upload-file-input"
                      />
                      <div className="upload-file-container">
                        <h1>+</h1>
                      </div>
                    </>
                  )}
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={6}
                  className="position-relative d-flex flex-column justify-content-center"
                >
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
                      <h5>Upload track: *</h5>
                      <input
                        type="file"
                        name="track"
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

              <div className="login-register-button-centered">
                <Col className="d-flex justify-content-center">
                  <button type="submit" className="button" disabled={!isReady}>
                    Save song
                  </button>
                </Col>
              </div>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
}

export default ModalTrackUp;
