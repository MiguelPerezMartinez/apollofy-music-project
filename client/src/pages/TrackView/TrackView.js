import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useParams } from "react-router-dom";

//Title, author, album, releseYear, genre, urlImage
function TrackView() {
  const { id } = useParams();
  const { trackDataDialog } = useSelector((state) => state.dialogueHandler);
  function handleMoreInfo() {
    console.log(id);
  }
  return (
    <div className="page">
      <Container className="track-view">
        <Row>
          <Col xs={12} md={12} lg={6}>
            <img className="track-image-container" />
          </Col>

          <Col xs={12} md={12} lg={6}>
            <div className="track-info-container">
              <h4 className="track-Author">Author: ethxn08</h4>
              <h4 className="track-Title">Title: Hymn for the weekend</h4>
              <h4 className="track-duration">Duration: 5:40</h4>
              <h4 className="track-album">Album: Beginers</h4>
              <h4 className="track-year">Relese Year: 1980 </h4>
              <h4 className="track-genre">Genre: Rock</h4>

              <button
                onClick={handleMoreInfo}
                className="form-control btn btn-primary mt-5 mb-5"
              >
                Go to PlayBar
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TrackView;
