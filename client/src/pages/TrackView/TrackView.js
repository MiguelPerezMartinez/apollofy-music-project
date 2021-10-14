import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useParams } from "react-router-dom";
import { getTrackById } from "../../services/api/index";

//Title, author, album, releseYear, genre, urlImage
function TrackView() {
  const { id } = useParams();
  const { trackDataDialog } = useSelector((state) => state.dialogueHandler);

  const [trackData, setTrackData] = useState({});

  function handleMoreInfo() {
    console.log(id);
  }
  useEffect(() => {
    getTrackById(id).then((response) => {
      setTrackData(response.data.currentTrack);
      console.log(response.data.currentTrack);
    });
  }, []);
  return (
    <div className="page">
      <Container className="track-view">
        <Row>
          <Col xs={12} md={12} lg={6}>
            <img className="track-image-container" src={trackData.urlCover} />
          </Col>

          <Col xs={12} md={12} lg={6}>
            <div className="track-info-container">
              <h4 className="track-Author">Author: {trackData.author}</h4>
              <h4 className="track-Title">Title: {trackData.title}</h4>
              <h4 className="track-duration">
                Uploaded at: {trackData.createdAt}
              </h4>
              <h4 className="track-album">Album: {trackData.album}</h4>
              <h4 className="track-year">
                Relese Year: {trackData.releaseYear}
              </h4>
              <h4 className="track-genre">Genre: {trackData.genre}</h4>

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
