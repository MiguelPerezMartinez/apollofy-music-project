import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Profile() {
  return (
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
          <button>EDIT PROFILE</button>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
