//Imports
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import "./styles.css";
import { getCurrentUser, updateCurrentUser } from "../../services/api/index";

//Import components
import RightMenu from "../../components/RightMenu";
import ProfileCircleIcon from "../../components/ProfileCircleIcon";
import Input from "../../components/Input";

function Profile() {
  const [currentUser, setCurrentUser] = useState("");

  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    birthday: "",
    country: "",
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

  //Manage values of state properties
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  //Update profile changes
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("fitrbaseUpdateEmpty");
    const firebase = await updateCurrentUser(state);
    setCurrentUser(state);
    setEditing(false);
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
              <h1>Message</h1>
            </Col>
            <Col className="d-flex flex-row-reverse" xs={1} md={3} lg={3}>
              LOGOUT
            </Col>
          </Row>
          <form onSubmit={handleSubmit}>
            <Row className="mt-4">
              <Col xs={12} md={12} lg={6}>
                <Row>
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Username:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
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
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    First name:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
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
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Last name:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
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
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Email:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
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
                  <Col xs={12} md={6} lg={6} className="w-50 profile-input-row">
                    Birthday:
                  </Col>
                  <Col xs={12} md={6} lg={6} className="profile-input-row">
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
