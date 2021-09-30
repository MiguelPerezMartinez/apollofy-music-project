//Imports
import React, { useState, useEffect } from "react";

import "./styles.css";
import "./spinner.css";

import { getCurrentUserToken } from "../../services/firebase";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";

//Functions
import { getCurrentUser, updateCurrentUser } from "../../services/api/index";
import { updateUserPass } from "../../services/firebase";
import { logOut } from "../../services/firebase";
import { changeMyProfilePicture } from "../../services/api/index";

//Import components
import BarsAndModal from "../../hoc/BarsAndModal";
import ProfileCircleIcon from "../../components/ProfileCircleIcon";
import Input from "../../components/Input";
import { Container, Row, Col } from "react-bootstrap";
import ModalTrackUp from "../../components/ModalTrackUp";

function Profile() {
  const [currentUser, setCurrentUser] = useState("");

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

  const [showModal, setShowModal] = useState(false);

  const [profilePicture, setProfilePicture] = useState({
    file: "",
    isSelected: false,
    isUploading: false,
    isUploaded: false,
  });

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

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
        profileImg: response.profileImg,
      });

      setCurrentUser(response);
    });
  }, []);

  useEffect(() => {
    uploadProfilePicture();
  }, [profilePicture.isSelected]);

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

  function handleProfilePictureChange(e) {
    setProfilePicture({
      ...profilePicture,
      file: e.target.files[0],
      isSelected: true,
      isUploading: true,
    });
  }

  async function uploadProfilePicture() {
    if (profilePicture.isSelected) {
      changeMyProfilePicture(profilePicture.file).then((response) => {
        console.log(response);
        setProfilePicture({
          ...profilePicture,
          isUploading: false,
          isUploaded: true,
        });
        updateCurrentUser({ id: state.id, profileImg: response.data.url });
        return true;
      });
    }
  }

  return (
    <>
      {showModal && <ModalTrackUp handleClose={handleCloseModal} />}
      <main>
        <Container>
          <Row>
            <Col
              className="profile-view-profile-image position-relative"
              xs={3}
              md={3}
              lg={3}
            >
              <ProfileCircleIcon profileImg={state.profileImg} />

              <div className="change-profile-picture d-flex justify-content-center">
                <h4>Change my picture</h4>
                <input
                  type="file"
                  onChange={handleProfilePictureChange}
                  className="upload-file-input"
                />
              </div>
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
        </Container>
        <Container className="general-container">
          <Col className="d-flex justify-content-center">
            <div className="button" onClick={handleOpenModal}>
              Upload track
            </div>
          </Col>
        </Container>
        <div className="xl-separator" />
        <div className="xl-separator" />
        <div className="xl-separator" />
      </main>
    </>
  );
}

export default withAuth(BarsAndModal(Profile));
