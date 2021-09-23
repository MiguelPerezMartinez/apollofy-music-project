import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Components
import ProfileCircleIcon from "../../components/ProfileCircleIcon";

function Profile() {
  return (
    <main>
      <Container>
        <Row>
          <Col
            className="profile-view-profile-image"
            xs={3}
            md={3}
            lg={3}
          >
            <ProfileCircleIcon />
          </Col>
          <Col xs={8} md={6} lg={6}>
            <h1>Message</h1>
          </Col>
          <Col className="d-flex flex-row-reverse" xs={1} md={3} lg={3}>
            <button>Button</button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} md={12} lg={6}>
            <Row>
              <Col xs={12} md={6} lg={6} className="w-50">
                {" "}
                Username:
              </Col>
              <Col xs={12} md={6} lg={6}>
                Handsome_Jonathan
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6} className="w-50">
                {" "}
                Email:
              </Col>
              <Col xs={12} md={6} lg={6}>
                Handsome_Jonathan
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <Row>
              <Col xs={12} md={6} lg={6} className="w-50">
                {" "}
                Birthday:
              </Col>
              <Col xs={12} md={6} lg={6}>
                Handsome_Jonathan
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6} className="w-50">
                {" "}
                Country or Region:
              </Col>
              <Col xs={12} md={6} lg={6}>
                Handsome_Jonathan
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <button>EDIT PROFILE</button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Profile;
