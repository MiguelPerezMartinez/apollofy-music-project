//Imports
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";

import "./styles.css";
import { getCurrentUser } from "../../services/api/index";

import { authenticationObserver } from "../../services/firebase";

//Import components
import RightMenu from "../../components/RightMenu";
import ProfileCircleIcon from "../../components/ProfileCircleIcon";

function Profile() {
  const [currentUser, setCurrentUser] = useState("");

  //Load user
  useEffect(() => {
    authenticationObserver((user) => {
      if (user) {
        getCurrentUser().then((response) => {
          setCurrentUser(response);
        });
      } else {
        console.log("No estás logueado");
      }
    });
  }, []);

  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    birthday: "",
    country: "",
  });

  //Toggle editing fields
  function handleEdit() {
    editing === true ? setEditing(false) : setEditing(true);
  }

  //Manage values of state properties
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  //Update profile changes
  function handleSubmit(e) {
    e.preventDefault();
    console.log(state);
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
            <Col xs={8} md={6} lg={6}>
              <h1>Welcome {currentUser.username}</h1>
            </Col>
            <Col className="d-flex flex-row-reverse" xs={1} md={3} lg={3}>
              LOGOUT
            </Col>
          </Row>
          <div className="xl-separator" />
          <form onSubmit={handleSubmit}>
            <Row className="mt-4 general-container">
              <Col xs={12} md={12} lg={6}>
                <Row>
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Username:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                      />
                    ) : (
                      currentUser.username
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    First name:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <input
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                      />
                    ) : (
                      currentUser.email
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Last name:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                      />
                    ) : (
                      "Handsome_Jonathan"
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Email:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <input type="text" name="email" onChange={handleChange} />
                    ) : (
                      "Handsome_Jonathan"
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={12} lg={6}>
                <Row>
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Birthday:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <input
                        type="text"
                        name="birthday"
                        onChange={handleChange}
                      />
                    ) : (
                      "Handsome_Jonathan"
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="w-50  profile-input-row"
                  >
                    Country or Region:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    {editing ? (
                      <input
                        type="text"
                        name="country"
                        onChange={handleChange}
                      />
                    ) : (
                      "Handsome_Jonathan"
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="w-50  profile-input-row profile-input-row"
                  >
                    Password:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
                    ******
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="m-separator" />
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
        </Container>
      </main>
    </>
  );
}

export default withAuth(Profile);
