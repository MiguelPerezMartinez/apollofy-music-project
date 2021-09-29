//Imports
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

import "./styles.css";
import "./spinner.css";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import { getCurrentUser, updateCurrentUser } from "../../services/api/index";
import { updateUserPass } from "../../services/firebase";

import { logOut } from "../../services/firebase";

//Import components
import RightMenu from "../../components/RightMenu";
import ProfileCircleIcon from "../../components/ProfileCircleIcon";
import Input from "../../components/Input";
import { Row, Col } from "react-bootstrap";

function Profile() {
  const [currentUser, setCurrentUser] = useState("");
  const [songToUpload, setSongToUpload] = useState({
    file: "",
    isUploading: false,
  });

  const [editing, setEditing] = useState(false);
  const [editingPass, setEditingPass] = useState(false);
  const [state, setState] = useState({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    birthday: "",
    country: "",
  });
  const [passState, setPassState] = useState({
    password: "",
    confirmPassword: "",
  });

  //Load user
  useEffect(() => {
    getCurrentUser().then((response) => {
      setState({
        id: response._id,
        firstname: response.firstname,
        lastname: response.lastname,
        username: response.username,
        email: response.email,
        birthday: response.birthday,
        country: response.country,
      });
      setCurrentUser(response);
    });
  }, []);

  //Toggle editing fields
  function handleEdit() {
    editing === true ? setEditing(false) : setEditing(true);
  }

  //Toggle editing password fields
  function handleEditPass() {
    editingPass === true ? setEditingPass(false) : setEditingPass(true);
    setPassState({
      password: "",
      confirmPassword: "",
    });
  }

  //Manage values of state properties
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  //Manage values of state properties
  function handleChangePass(e) {
    setPassState({
      ...passState,
      [e.target.name]: e.target.value,
    });
  }

  //Update profile changes
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("fitrbaseUpdateEmpty");
    await updateCurrentUser(state);
    setCurrentUser(state);
    setEditing(false);
  }

  //Update profile changes
  async function handleSubmitPass() {
    if (passState.password === passState.confirmPassword) {
      updateUserPass(passState.password);
    }
    setEditingPass(false);
  }

  function handleUploadChange(e) {
    console.log(e.target.files);
    setSongToUpload({
      file: e.target.files[0],
      isUploading: true,
    });
    console.log(songToUpload);
  }

  function uploadFiles(e) {
    const formData = new FormData();
    formData.append("file", songToUpload.file);
    formData.append("upload_preset", "upload_apollofy");

    axios
      .post("https://api.cloudinary.com/v1_1/apollofy/video/upload", formData)
      .then((response) => {
        setSongToUpload({ ...songToUpload, isUploading: false });
        console.log(response);
      });
  }

  return (
    <>
      <RightMenu />
      <main>
        <Container>
          <Row>
            <Col className="profile-view-profile-image" xs={3} md={3} lg={3}>
              <ProfileCircleIcon />
            </Col>
            <Col xs={8} md={6} lg={6} className="profile-user-title">
              <h1>Welcome {currentUser.username}</h1>
            </Col>
            <Col
              className="profile-user-title profile-user-logout"
              xs={1}
              md={3}
              lg={3}
            >
              <img
                src="./assets/img/logout.svg"
                alt="logout"
                className="profile-logout-icon"
                onClick={logOut}
              />
            </Col>
          </Row>
          <div className="xl-separator" />
          <div className="xl-separator" />
          <form onSubmit={handleSubmit}>
            <Row className="mt-4 general-container">
              <Col xs={12} md={12} lg={6}>
                <Row>
                  <Col xs={6} md={6} lg={6} className="w-50 profile-input-row">
                    Username:
                  </Col>
                  <Col xs={6} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <Input
                        type="text"
                        id="username"
                        placeholder="username"
                        value={state.username}
                        handleChange={handleChange}
                      />
                    ) : (
                      currentUser.username
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6} lg={6} className="w-50 profile-input-row">
                    First name:
                  </Col>
                  <Col xs={6} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <Input
                        type="text"
                        id="firstname"
                        placeholder="firstname"
                        value={state.firstname}
                        handleChange={handleChange}
                      />
                    ) : (
                      currentUser.firstname
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6} lg={6} className="w-50 profile-input-row">
                    Last name:
                  </Col>
                  <Col xs={6} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <Input
                        type="text"
                        id="lastname"
                        placeholder="lastname"
                        value={state.lastname}
                        handleChange={handleChange}
                      />
                    ) : (
                      currentUser.lastname
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6} lg={6} className="w-50 profile-input-row">
                    Email:
                  </Col>
                  <Col xs={6} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <Input
                        type="email"
                        id="email"
                        placeholder="email"
                        value={state.email}
                        handleChange={handleChange}
                      />
                    ) : (
                      currentUser.email
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={12} lg={6}>
                <Row>
                  <Col xs={6} md={6} lg={6} className="w-50 profile-input-row">
                    Birthday:
                  </Col>
                  <Col xs={6} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <Input
                        type="text"
                        id="birthday"
                        placeholder="birthday"
                        value={state.birthday}
                        handleChange={handleChange}
                      />
                    ) : (
                      currentUser.birthday
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6} lg={6} className="w-50  profile-input-row">
                    Country or Region:
                  </Col>
                  <Col xs={6} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <Input
                        type="text"
                        id="country"
                        placeholder="country"
                        value={state.country}
                        handleChange={handleChange}
                      />
                    ) : (
                      currentUser.country
                    )}
                  </Col>
                </Row>
                {editingPass ? (
                  <>
                    <Row>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        Password:
                      </Col>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        <Input
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={passState.password}
                          handleChange={handleChangePass}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        Confirm password
                      </Col>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        <Input
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm password"
                          value={passState.confirmPassword}
                          handleChange={handleChangePass}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        <button
                          className="small-button"
                          onClick={handleSubmitPass}
                        >
                          Save
                        </button>
                      </Col>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        <button
                          className="small-button"
                          onClick={handleEditPass}
                        >
                          Cancell
                        </button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        Password:
                      </Col>
                      <Col xs={6} md={6} lg={6} className="profile-input-row">
                        ******
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <button className="button" onClick={handleEditPass}>
                          Change password
                        </button>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
            <div className="xl-separator" />
            {editing ? (
              <>
                <Row className="mt-2">
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="d-flex justify-content-center profile-input-row"
                  >
                    <button className="button">Save</button>
                  </Col>
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="d-flex justify-content-center profile-input-row"
                  >
                    <button className="button" onClick={handleEdit}>
                      Cancel
                    </button>
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="mt-2">
                <Col className="d-flex justify-content-center">
                  <button className="button" onClick={handleEdit}>
                    Edit profile info
                  </button>
                </Col>
              </Row>
            )}
          </form>
          <div className="xl-separator" />
          <div className="xl-separator" />
          <Row className="general-container uploading-file">
            {songToUpload.isUploading ? (
              <>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
                <h3>Uploading file</h3>
                <button onClick={uploadFiles}>Upload song</button>
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
                    <img src="./assets/img/upload.svg" alt="upload new track" />
                  </h1>
                  <button onClick={uploadFiles}>Upload song</button>
                </div>
              </>
            )}
          </Row>
        </Container>
        <div className="xl-separator" />
        <div className="xl-separator" />
        <div className="xl-separator" />
      </main>
    </>
  );
}

export default withAuth(Profile);
