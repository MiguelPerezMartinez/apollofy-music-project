import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getCurrentUserToken, getCurrentUserId } from "../../services/firebase";

import { getById } from "../../services/api/index";

function Profile() {
  async function handleSubmit() {
    const userToken = await getCurrentUserToken();
    const userId = await getCurrentUserId();
    const { data } = await getById(userId, userToken);
    const { currentUser } = data;
    // const { username, email } = currentUser;
    console.log(currentUser);
    // console.log("usr id", userId);
  }

  return (
    <main>
      <Container>
        <Row>
          <Col
            className="d-flex justify-content-center align-items-center"
            xs={12}
            md={2}
            lg={2}
          >
            Image
          </Col>
          <Col xs={9} md={8} lg={8}>
            <h1>Message</h1>
          </Col>
          <Col className="d-flex flex-row-reverse" xs={3} md={2} lg={2}>
            <button>Button</button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} md={12} lg={6}>
            <div className="d-flex mb-2">
              <div className="w-50"> Username:</div>
              <div>Handsome_Jonathan</div>
            </div>
            <div className="d-flex mb-2">
              <div className="w-50"> Email:</div>
              <div>Handsome_Jonathan</div>
            </div>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <div className="d-flex mb-2">
              <div className="w-50"> Birthday:</div>
              <div>Handsome_Jonathan</div>
            </div>
            <div className="d-flex mb-2">
              <div className="w-50"> Country or Region:</div>
              <div>Handsome_Jonathan</div>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <button onClick={handleSubmit}>EDIT PROFILE</button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Profile;
